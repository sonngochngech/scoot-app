import React from 'react';
import { Box, Typography } from "@mui/material";
import { buildVariant } from './theme';
import { useEffect, useState } from "react";
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';

// Define the type for the component props
interface WeatherProps {
  isMobile: boolean;
  content: any;
  tripInfo: any;
}

const Weather: React.FC<WeatherProps> = ({ isMobile,content,tripInfo }) => {
  const subBoxStyle = {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    borderTop: '2px #FFE900 solid',
    gap: 1.5,
    padding: 1.5,
    display: 'flex',
    flexDirection: 'column',
    width: isMobile ? '100%' : '410px',
    backgroundColor: '#FFFFFF',
  };

  const [sunUri,cloudyUri,rainUri]=[`/page3/sun.svg`,`/page3/cloudy.svg`,`/page3/rain.svg`]
    const [imgUri,setImgUri]=useState(sunUri)
    const startDate = (new Date(tripInfo?.startDate)).toLocaleDateString('en-GB', {
      weekday: 'short', // 'Sun'
      day: '2-digit',   // '19'
      month: 'short'    // 'Dec'
  });
    const endDate=(new Date(tripInfo?.endDate)).toLocaleDateString('en-GB', {
      weekday: 'short', // 'Sun'
      day: '2-digit',   // '19'
      month: 'short'    // 'Dec'
  });
    useEffect(()=>{
        if(content?.name){
            if(content.name==='cloudy'){
                setImgUri(cloudyUri)
            }else if (content.name==="sunny"){
                setImgUri(sunUri)
            }else if(content.name==='rainny'){
                setImgUri(rainUri)
            }
        }
    },[content])

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: isMobile?'column':'row',
        justifyContent: 'space-between',
        backgroundColor:'#EFEFEF',
        padding: '24px',
        borderRadius: '16px',
        gap: '24px',
    }}>
      <Box sx={{
        display:'flex',
        flexShrink:1,
        flexDirection: 'column'
      }}>
        <Typography sx={{ marginRight: '16px',...buildVariant(600,'40','48'),marginBottom:'24px' }}>{tripInfo?.arrival?.name}</Typography>
        <Typography>{content?.description}​</Typography>
      </Box>
      <Box sx={subBoxStyle}>
        <Typography sx={{ textAlign: 'center',...buildVariant(600,'18','24') }}>{startDate} - {endDate}</Typography>
        <Typography sx={{ textAlign: 'center' }}>{tripInfo?.duration} nights</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={imgUri} style={{marginLeft: '16px'}} alt="weather icon" />
          <Box>
            <Typography sx={{
              fontSize: '2.5rem',
              fontWeight: 600,
              lineHeight: '3rem',
            }}>{content?.temperature}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Weather;
