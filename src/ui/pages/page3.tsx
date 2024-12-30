import React, { useEffect, useState } from 'react';

// import './styles.css';
// import './styles-mobile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
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



    // ************** Data ******************************** 


    const itineraries={
        "itineraries": [
            {
                "realDay": "Day 1",
                "day": "Day 1",
                "date": "2023-04-01",
                "location": "Santorini",
                "activities": [
                    {
                        "activity": "Arrive in Santorini",
                        "img":["/page3/activity-item.png"],
                        "description": "Arrive in Santorini and check in at your hotel. Enjoy a leisurely lunch and explore the local"},
                    {
                        "activity": "Arrive in Santorini",
                        "img":["/page3/activity-item.png"],
                        "description": "Arrive in Santorini and check in at your hotel. Enjoy a leisurely lunch and explore the local"},


                ]
             }
            ]
        }


    const data={
        location:[
            {
                name:'Santorini',
                description:'Santorini is the supermodel of the Greek islands, a head-turner whose face is instantly recognisable around the world: multicoloured cliffs soar out of a sea-drowned caldera, topped by drifts of whitewashed buildings. With its reputation for dazzling panoramas, romantic sunsets and volcanic-sand beaches, it’s hardly surprising the island features on so many travellers’ bucket lists.',
                address:'Thira 847 00, Greece',
            },
            {
                name:'Santorini',
                description:'Santorini is the supermodel of the Greek islands, a head-turner whose face is instantly recognisable around the world: multicoloured cliffs soar out of a sea-drowned caldera, topped by drifts of whitewashed buildings. With its reputation for dazzling panoramas, romantic sunsets and volcanic-sand beaches, it’s hardly surprising the island features on so many travellers’ bucket lists.',
                address:'Thira 847 00, Greece',
            },
            {
                name:'Santorini',
                description:'Santorini is the supermodel of the Greek islands, a head-turner whose face is instantly recognisable around the world: multicoloured cliffs soar out of a sea-drowned caldera, topped by drifts of whitewashed buildings. With its reputation for dazzling panoramas, romantic sunsets and volcanic-sand beaches, it’s hardly surprising the island features on so many travellers’ bucket lists.',
                address:'Thira 847 00, Greece',
            },
        ],
        img:[
            ['/page3/location-item.png'],
            ['/page3/location-item.png'],
            ['/page3/location-item.png']
        ]
           
            

        
    }

    

    





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
                    <BannerBox  city={null} duration={null}></BannerBox>
                </Box>
                 <Box  sx={box3Style}>
                  <LocationImageList isMobile={isMobile} city={null}  />
                 </Box>
                
                <Stack sx={{ ...box1Style }} spacing={8} >
                    <Rating rating={null} />
                    <BdBreakdown isMobile={isMobile} budget={null} />
                    <FengShuiFlight isMobile={isMobile} />
                    <Tips></Tips>
                    <Location isMobile={isMobile} itemData={data.location} itemImage={data.img} title={'Santorini'} />
                    <Experience/>
                    <Inspiration/>
                    <Itinerary itineraries={itineraries.itineraries}  />
                    <TripButtonGroup/>
                   
                </Stack>

          
            </Box>
        </Box>
       
    );
};


export default Page3;