
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
import { useNavigate } from 'react-router-dom';
import FengShuiFlight from '../components/page3/FengShuiFlight';
import Tips from '../components/page3/Tips';
import Experience from '../components/page3/Experience';
import Inspiration from '../components/page3/Inspiration';
import Itinerary from '../components/page3/Itinerary';
import TripButtonGroup from '../components/page3/TripButtonGroup';
import Location from '../components/page3/Location';
import { validateImage } from "../../services";
import { getTripPlanning, setValidImagePlanning } from "../../libs/slices/fengShuiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { SavedUserInfo, TripInfoTypePayLoad } from "../../types";  

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


const Page3 = () => {

   
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
    const [tripInfo, setTripInfo] = useState<TripInfoTypePayLoad | null>(null);
    const [userInfo, setUserInfo] = useState<SavedUserInfo | null>(null);
    const targetRef = useRef();

    const { tripLoading: loading, tripError: error, planning: tripData, allActivities, outPlanning ,isLoadedTrip} = useSelector((state: any) => state.fengShui);
    const dispatch = useDispatch();
    console.log('tripData',tripData);

    const storedTripInfo = localStorage.getItem('tripInfo');
    const storedUserInfo = localStorage.getItem('userInfo');
    // let jsonTripInfo: TripInfoTypePayLoad = storedTripInfo ? JSON.parse(storedTripInfo) : null;
    // let jsonUserInfo: SavedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const jsonUserInfo: SavedUserInfo = {
        userInfo: {
            name: "John Doe",
            sex: 1,
            email: "johndoe@example.com",
            phone: "+1234567890",
            birthdate: "1990-01-01",
            placeOfBirth: {
                name: "New York",
                code: "NY",
            },
            timeOfBirth: "08:30",
        },
        departureCity: {
            name: "San Francisco",
            code: "SF",
        },
        arrivalCity: {
            name: "Los Angeles",
            code: "LA",
        },
        tripInfo: {
            duration: 5,
            startDate: "2024-12-01",
            endDate: "2024-12-06",
            departure: {
                name: "San Francisco",
                code: "SF",
            },
        },
    };
    
    const jsonTripInfo: TripInfoTypePayLoad = {
        startDate: "2024-12-01",
        endDate: "2024-12-06",
        duration: 5,
        budget: 2000,
        departure: {
            name: "San Francisco",
            code: "SF",
        },
        arrival: {
            name: "Los Angeles",
            code: "LA",
        },
        travelerQuantities: 2,
        arrivalImg: [
            "https://kenh14cdn.com/thumb_w/650/2016/n1-1464592882945.jpg",
                "https://media.istockphoto.com/id/1406960186/vi/anh/%C4%91%C6%B0%E1%BB%9Dng-ch%C3%A2n-tr%E1%BB%9Di-c%E1%BB%A7a-th%C3%A0nh-ph%E1%BB%91-new-york-hoa-k%E1%BB%B3.jpg?s=612x612&w=0&k=20&c=rdZLmhIpV-EIFC7obUd2Ke8-sFelqEZn5eXUer77Fi4=",
                "https://media.istockphoto.com/id/1454217037/vi/anh/t%C6%B0%E1%BB%A3ng-n%E1%BB%AF-th%E1%BA%A7n-t%E1%BB%B1-do-v%C3%A0-%C4%91%C6%B0%E1%BB%9Dng-ch%C3%A2n-tr%E1%BB%9Di-th%C3%A0nh-ph%E1%BB%91-new-york-v%E1%BB%9Bi-khu-t%C3%A0i-ch%C3%ADnh-manhattan-trung-t%C3%A2m.jpg?s=612x612&w=0&k=20&c=S4eluGOFZJTAyb_Jgim5-nJmkZNMhcy5t4_VOA2kKR0=",
                "https://usis.us/uploads/images/contents/pr/danh_lam_thang_canh_my_2.jpg",
                "https://www.thm.vn/media/k2/items/cache/7e64c4d2a4a242251ffdaa790b21fa01_XL.jpg",
                "https://media.istockphoto.com/id/599766748/vi/anh/th%C3%A0nh-ph%E1%BB%91-c%E1%BB%A7a-nh%E1%BB%AFng-gi%E1%BA%A5c-m%C6%A1-%C4%91%C6%B0%E1%BB%9Dng-ch%C3%A2n-tr%E1%BB%9Di-c%E1%BB%A7a-th%C3%A0nh-ph%E1%BB%91-new-york-l%C3%BAc-ch%E1%BA%A1ng-v%E1%BA%A1ng.jpg?s=612x612&w=0&k=20&c=owVwNNd6z8qSe8NvsyjjkDhmcVDWo6EMkGrPbSmbpVk=",
                "https://www.tiktok.com/api/img/?itemId=7402612269676350737&location=0&aid=1988",
                "https://upload.wikimedia.org/wikipedia/commons/0/05/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg",
                "https://media.istockphoto.com/id/525232662/vi/anh/t%C3%B2a-nh%C3%A0-nh%C3%A0-n%C6%B0%E1%BB%9Bc-%C4%91%E1%BA%BF-ch%E1%BA%BF-new-york-v%C3%A0-t%C6%B0%E1%BB%A3ng-n%E1%BB%AF-th%E1%BA%A7n-t%E1%BB%B1-do.jpg?s=612x612&w=0&k=20&c=EMOwh8nXR-n3e5tlIgHbk1d0iEcIEiYGYziiJs1vvhY=",
                "https://vemaybaydimy.org.vn/static/ticket/2021/0330/thanh-pho-new-york-ve-dem-4-381_thumb_250x180.jpg"
        ],
        arrivalDescription:"The Santorini, Greece offer breathtaking natural beauty with towering cliffs, serene waters, and charming villages. It's a paradise for nature lovers, with opportunities for hiking, fjord cruises, and exploring rich cultural heritage in historic towns like Bergen."
    };

    useEffect(() => {
        console.log('tripData',tripData);
        if (jsonTripInfo && jsonUserInfo && Object.keys(jsonTripInfo).length > 0 && Object.keys(jsonUserInfo).length > 0 ) {
            setTripInfo(jsonTripInfo);
            setUserInfo(jsonUserInfo);
            const { arrivalImg,arrivalDescription, ...payload } = jsonTripInfo;
            if (tripData === null && (!loading) ) dispatch(getTripPlanning(payload) as any);
        }
    }, []);


    useEffect(() => {
        async function validateImageUrls() {
            try{
                if (tripData !==null && (!isLoadedTrip)) {
                    let validInPlanningImage: string[] = [];
                    let validOutPlanningImage: string[] = [];
                    let validAllActivitiesImage: string[] = [];
    
                    if (allActivities) {
                        const allActivitiesPromises = allActivities.map(async (item: any) => {
                            const urls = await validateImage(item.img);
                            return urls && urls.length > 0 ? urls[0] : '/replacedImage.jpg';
                        });
                    
                        const resolvedAllActivitiesImages = await Promise.all(allActivitiesPromises);
                        validAllActivitiesImage.push(...resolvedAllActivitiesImages);
                    }
                    
                    if (outPlanning) {
                        const outPlanningPromises = outPlanning.map(async (item: any) => {
                            const urls = await validateImage(item.img);
                            return urls && urls.length > 0 ? urls[0] : '/replacedImage.jpg';
                        });
                    
                        const resolvedOutPlanningImages = await Promise.all(outPlanningPromises);
                        validOutPlanningImage.push(...resolvedOutPlanningImages);
                    }
                    
                    const itineraryPromises = tripData.itinerary.map(async (element: any) => {
                        const activityPromises = element.activities.map(async (item: any) => {
                            const urls = await validateImage(item.img);
                            return urls && urls.length > 0 ? urls[0] : '/replacedImage.jpg';
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

            }catch(e){
                console.log(e);
            }
            
        }
        validateImageUrls();

       
        
    }, [tripData,isLoadedTrip]);



    // ************** Data ******************************** 



    

    





    return (
        <Box sx={{ position: 'relative' }} >
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
                    <BannerBox  city={jsonTripInfo?.arrival} duration={jsonTripInfo?.duration}></BannerBox>
                </Box>
                 <Box  sx={box3Style}>
                  <LocationImageList isMobile={isMobile} imgs={jsonTripInfo.arrivalImg}  description={jsonTripInfo.arrivalDescription} />
                 </Box> 
                
                <Stack sx={{ ...box1Style }} spacing={8} >
                    <Rating rating={null} />
                    <BdBreakdown isMobile={isMobile} budget={tripData?.totalFee} />
                    <Tips location={tripInfo?.arrival?.name} tips={tripData?.tips}></Tips>
                    <Location isMobile={isMobile} itemData={tripData?.locations} itemImage={tripData?.img?.location} title={'Santorini'} />
                    <Location isMobile={isMobile} itemData={tripData?.foods} itemImage={tripData?.img?.food} title={'Santorini'} />
                    <Location isMobile={isMobile} itemData={tripData?.accommodation} itemImage={tripData?.img?.accommodation} title={'Santorini'} />
                    <Inspiration wardrobe={tripData?.wardrobe}/>
                    <Experience experiences={tripData?.topExperience} imgs={jsonTripInfo.arrivalImg}/>
                    <FengShuiFlight/>
                    <Itinerary itineraries={tripData?.itinerary}  />
                    <TripButtonGroup/>
                   
                </Stack>

          
            </Box>
        </Box>
       
    );
};


export default Page3;