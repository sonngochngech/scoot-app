import React from 'react';
import { Box,  Typography, Grid2 } from '@mui/material';



function BgBanner({isMobile}:any) {

    
    return (
        <Box sx={{
            backgroundImage:'url(/page3/banner-background.png)',
            backgroundSize: 'cover',
            height: isMobile ? '360px':'25vw',
            width: '100%',
            position: 'absolute', // Fixed typo: 'postion' to 'position'
            zIndex: 1,
        }}> 
           <img src="/page3/plane-banner.svg" alt="banner" 
            style={{
                 width: isMobile ? '326px':'50%',
                 height: isMobile? '168px': '22.78vw',
                 top: '0',
                 right: '0',
                 position: 'absolute',
            }}/>
        </Box>
    );
}
export default BgBanner;