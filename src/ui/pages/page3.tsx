
import { Box, Skeleton, Stack, Typography } from '@mui/material';
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
import { usePDF } from 'react-to-pdf';
import Weather from '../components/page3/Weather';
import { buildVariant } from '../components/page3/theme';
import Swal from "sweetalert2";
import e from 'cors';


function calculateDuration(startDate: any, endDate: any) {

    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInMilliseconds = end.getTime() - start.getTime();
    if (differenceInMilliseconds < 0) {
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
    const navigate = useNavigate();

    const [tripInfo, setTripInfo] = useState<TripInfoTypePayLoad | null>(null);
    const [userInfo, setUserInfo] = useState<SavedUserInfo | null>(null);
    // const targetRef = useRef();
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    const { tripLoading: loading, tripError: error, planning: tripData, allActivities, outPlanning, isLoadedTrip } = useSelector((state: any) => state.fengShui);
    const dispatch = useDispatch();
    const storedTripInfo = localStorage.getItem('tripInfo');
    const storedUserInfo = localStorage.getItem('userInfo');
    let jsonTripInfo: TripInfoTypePayLoad = storedTripInfo ? JSON.parse(storedTripInfo) : null;
    let jsonUserInfo: SavedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    useEffect(() => {
        if (jsonTripInfo && jsonUserInfo && Object.keys(jsonTripInfo).length > 0 && Object.keys(jsonUserInfo).length > 0) {
            setTripInfo(jsonTripInfo);
            setUserInfo(jsonUserInfo);
            const { arrivalImg, arrivalDescription, ...payload } = jsonTripInfo;
            if (tripData === null && (!loading)) dispatch(getTripPlanning(payload) as any);
        }
    }, []);




    useEffect(() => {
        async function validateImageUrls() {
            try {
                if (tripData !== null && (!isLoadedTrip)) {
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

            } catch (e) {
                console.log(e);
            }

        }
        validateImageUrls();



    }, [tripData, isLoadedTrip]);

    if(error){
        Swal.fire({
            icon: "warning",
            confirmButtonText: "Đồng ý",
            title: "<strong>Thông báo</strong>",
            text: error,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/trip");
            }
        });
    }

    // **************** Style ***********************

    const box1Style = {
        paddingLeft: '5.62vw',
        paddingRight: '5.62vw',
        paddingBottom: '32px',
        paddingTop: '32px'

    }
    const box2Style = {
        paddingLeft: '5.62vw',
        paddingRight: isMobile ? '0' : '5.62vw',
        paddingBottom: '32px',
        paddingTop: '32px',
    }

    const box3Style = {
        paddingLeft: '5.62vw',
        paddingRight: '0',
        paddingBottom: '32px',
        paddingTop: '32px',
    }

    return (
        <Box>
            <Box sx={{ position: 'relative' }}  >
                <BgBanner isMobile={isMobile} />
                <Box className='d-flex justify-content-left align-items-center' sx={{ position: 'absolute', top: '64px', left: '64px', zIndex: 3 }}>
                    <img src="/page3/back-arrow.svg"

                        onClick={() => navigate('/trip')}
                        style={{
                            cursor: 'pointer', marginRight: '8px',
                            width: '40px',
                            height: '40px',
                        }}
                        alt="Back arrow"></img>
                    <Typography sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        lineHeight: '1.5rem',
                    }}>Back</Typography>
                </Box>
                <Box sx={{
                    position: 'absolute', top: isMobile ? '90px' : '15.625vw', zIndex: 3, width: "100%",
                }} ref={targetRef} id="target">

                    <Box sx={{ ...box1Style }} >
                        <BannerBox city={tripInfo?.arrival} duration={tripInfo?.duration}></BannerBox>
                    </Box>
                    <Box sx={box3Style}>
                        <LocationImageList isMobile={isMobile} imgs={tripInfo?.arrivalImg} description={tripInfo?.arrivalDescription} />
                    </Box>

                    <Stack sx={{ ...box1Style }} spacing={8} >
                        {loading ? (
                            <Skeleton variant="rectangular" height={40} />
                        ) : (
                            <Rating rating={tripData?.rating} />
                        )}

                        {loading ? (
                            <Skeleton variant="rectangular" height={40} />
                        ) : (
                            <FengShuiFlight />
                        )}


                            <Header2 />

                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <Location
                                isMobile={isMobile}
                                itemData={tripData?.locations}
                                itemImage={tripData?.img?.location}
                                title={'Santorini'}
                            />
                        )}

                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <Location
                                isMobile={isMobile}
                                itemData={tripData?.foods}
                                itemImage={tripData?.img?.food}
                                title={'Santorini'}
                            />
                        )}

                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <Location
                                isMobile={isMobile}
                                itemData={tripData?.accommodation}
                                itemImage={tripData?.img?.accommodation}
                                title={'Santorini'}
                            />
                        )}

                        {loading ? (
                            <Skeleton variant="rectangular" height={40} />
                        ) : (
                            <Tips location={tripInfo?.arrival?.name} tips={tripData?.tips} />
                        )}

                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <Weather
                                isMobile={isMobile}
                                content={tripData?.weather}
                                tripInfo={tripInfo}
                            />
                        )}
                        <Header3 />
                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <Inspiration wardrobe={tripData?.wardrobe} />
                        )}

                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <Experience
                                experiences={tripData?.topExperience}
                                imgs={tripInfo?.arrivalImg}
                            />
                        )}

                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <BdBreakdown isMobile={isMobile} budget={tripData?.totalFee} />
                        )}

                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <Itinerary itineraries={tripData?.itinerary} />
                        )}

                        {loading ? (
                            <Skeleton variant="rectangular" height={40} />
                        ) : (
                            <TripButtonGroup target={targetRef} toPdf={toPDF} />
                        )}

                    </Stack>
                </Box>
            </Box>
        </Box>


    );
};

const Header2 = () => {
    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box component={'img'} src="/page3/header2.svg" sx={{ width: '96px', height: '132px' }} />
            </Box>
            <Typography sx={{ ...buildVariant(600, '40', '56'), textAlign: 'center' }}  >DESTINATIONS THAT </Typography>
            <Typography sx={{ ...buildVariant(600, '40', '56'), textAlign: 'center' }}  >GROUND YOUR ENERGY</Typography>
        </Box>

    )
}
const Header3 = () => {
    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box component={'img'} src="/page3/header3.svg" sx={{ width: '96px', height: '132px' }} />
            </Box>
            <Typography sx={{ ...buildVariant(600, '40', '56'), textAlign: 'center' }}  >PERSONALIZED FOR</Typography>
            <Typography sx={{ ...buildVariant(600, '40', '56'), textAlign: 'center' }}  >INNER HARMONY</Typography>
        </Box>

    )
}



export default Page3;