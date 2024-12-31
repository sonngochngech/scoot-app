
// import './styles.css';
// import './styles-mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BgBanner from '../components/page3/BgBanner';
import BannerBox from '../components/page3/BannerBox';
import Rating from '../components/page3/Rating';
import { BdBreakdown } from '../components/page3/BdBreakdown';
import LocationImageList from '../components/page3/LocationImageList';
import { useNavigate, useParams } from 'react-router-dom';
import FengShuiFlight from '../components/page3/FengShuiFlight';
import Tips from '../components/page3/Tips';
import Experience from '../components/page3/Experience';
import Inspiration from '../components/page3/Inspiration';
import Itinerary from '../components/page3/Itinerary';
import TripButtonGroup from '../components/page3/TripButtonGroup';
import Location from '../components/page3/Location';
import { validateImage } from "../../services";
import { getTripData, getTripPlanning, setValidImagePlanning } from "../../libs/slices/fengShuiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { SavedUserInfo, TripInfoTypePayLoad } from "../../types";  
import { json } from 'stream/consumers';

function calculateDuration(startDate: any, endDate:any) {

    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInMilliseconds = end.getTime() - start.getTime();
    if(differenceInMilliseconds<0){
        return 1;
    }
  

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const differenceInDays = differenceInMilliseconds / millisecondsPerDay;

  
    return differenceInDays;
  }


const Share = () => {

    const { id } = useParams<{ id: string }>();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate=useNavigate();

    const box1Style = {
        paddingLeft: '5.62vw',
        paddingRight: '5.62vw',
        paddingBottom: '32px',
        paddingTop: '32px'

    }
    const box2Style={
        paddingLeft: '5.62vw',
        paddingRight: isMobile ? '0': '5.62vw',
        paddingBottom: '32px',
        paddingTop: '32px',
    }

    const box3Style={
        paddingLeft: '5.62vw',
        paddingRight:'0',
        paddingBottom: '32px',
        paddingTop: '32px',
    }
    // ************** Handle Data ********************************
   
    const {  loading, error, planning: tripData, userInfo, tripInfo ,outPlanning,allActivities} = useSelector((state: any) => state.fengShui);
    const dispatch = useDispatch();


    useEffect(() => {

        if (id !== null && id !== undefined) {
            dispatch(getTripData(id) as any);
        }

    }, [id, dispatch])

 
    useEffect(() => {
        async function validateImageUrls() {
            if (!loading && tripData) {
                let validInPlanningImage: string[] = [];
                let validOutPlanningImage: string[] = [];
                let validAllActivitiesImage: string[] = [];

                if (allActivities) {
                    const allActivitiesPromises = allActivities.map(async (item: any) => {
                        const urls = await validateImage(item.img);
                        return urls && urls.length > 0 ? `${urls[0]}` : '/replacedImage.jpg';
                    });
                
                    const resolvedAllActivitiesImages = await Promise.all(allActivitiesPromises);
                    validAllActivitiesImage.push(...resolvedAllActivitiesImages);
                }
                
                if (outPlanning) {

                    const outPlanningPromises = outPlanning.map(async (item: any) => {
                        const urls = await validateImage(item.img);
                        return urls && urls.length > 0 ? `${urls[0]}` : '/replacedImage.jpg';
                    });
                
                    const resolvedOutPlanningImages = await Promise.all(outPlanningPromises);
                    validOutPlanningImage.push(...resolvedOutPlanningImages);
                }
                
                const itineraryPromises = tripData.itinerary.map(async (element: any) => {
                    const activityPromises = element.activities.map(async (item: any) => {
                        const urls = await validateImage(item.img);
                        return urls && urls.length > 0 ? `${urls[0]}` : '/replacedImage.jpg';
                    });
                
                    const resolvedActivityImages = await Promise.all(activityPromises);
                    validInPlanningImage.push(...resolvedActivityImages);
                });

                const payload: any = {
                    validPlanningImages: validInPlanningImage,
                    validOutPlanningImages: validOutPlanningImage,
                    allValidAllImages: validAllActivitiesImage
                };
                

                dispatch(setValidImagePlanning(payload));
            }
        }
        validateImageUrls();
    }, [loading]);

    return (
        <Box sx={{ position: 'relative' }} 
        >
            <BgBanner isMobile={isMobile} />
            <Box className='d-flex justify-content-left align-items-center' sx={{position:'absolute', top: '64px',left:'64px',zIndex:3}}>
                <img src="/page3/back-arrow.svg"
                    
                    onClick={() =>  navigate('-1')}
                    style={{ cursor: 'pointer', marginRight: '8px',
                        width:'40px',
                        height:'40px',
                     }}
                    alt="Back arrow"></img>
                <Typography sx={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                }}>Back</Typography>
            </Box>
            <Box sx={{
                position: 'absolute', top:  isMobile ?'90px':'15.625vw', zIndex: 3, width: "100%",
            }}>
                
                <Box sx={{ ...box1Style }}>
                    <BannerBox  city={tripInfo?.arrival} duration={tripInfo?.duration}></BannerBox>
                </Box>
                 <Box  sx={box3Style}>
                  <LocationImageList isMobile={isMobile} imgs={tripInfo?.arrivalImg}  description={tripInfo?.arrivalDescription} />
                 </Box> 
                
                <Stack sx={{ ...box1Style }} spacing={8} >
                    <Rating rating={null} />
                    <BdBreakdown isMobile={isMobile} budget={tripData?.totalFee} />
                    <Tips location={tripInfo?.arrival?.name} tips={tripData?.tips}></Tips>
                    <Location isMobile={isMobile} itemData={tripData?.locations} itemImage={tripData?.img?.location} title={'Santorini'} />
                    <Location isMobile={isMobile} itemData={tripData?.foods} itemImage={tripData?.img?.food} title={'Santorini'} />
                    <Location isMobile={isMobile} itemData={tripData?.accommodation} itemImage={tripData?.img?.accommodation} title={'Santorini'} />
                    <Inspiration wardrobe={tripData?.wardrobe}/>
                    <Experience experiences={tripData?.topExperience} imgs={tripInfo?.arrivalImg}/>
                    <FengShuiFlight/>
                    <Itinerary itineraries={tripData?.itinerary}  />
                   
                </Stack>

          
            </Box>
        </Box>
       
    );
};


export default Share;