import React from 'react';

import Box from '@mui/material/Box';
import { Container, Typography, useMediaQuery ,useTheme} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';


const BannerBox = ({city,duration}:any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box
            sx={{
                padding: isMobile? 3: '2vw',
                borderRadius: 2,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Updated shadow
                backgroundColor: 'white',
                gap: '16px',
            }}
            className={isMobile ? '' : 'd-flex align-items-center'}
        >
            <Box  className='flex-grow-1'
                  sx={{   marginBottom: isMobile ? '16px' : '0px'}}
             
            >
                <Typography  sx={{
                        fontSize:  '2.5rem',
                        fontWeight: 500,
                        lineHeight: '3rem',
                    }}>Lucky Trip to </Typography>
                <Typography
                    sx={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        lineHeight: '3.5rem',
                        letterSpacing: '-0.03em',
                    }}
                >
                   {city}
                </Typography>
            </Box>
            <Box sx={{
                 boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                 borderRadius: 2,
                 borderTop:'2px #FFE900 solid',
                 gap: 1.5,
                 padding: 1.5,
                 width : isMobile ? '100%':'328px',
               
                 
            }}>
                {/* <Box className='d-flex justify-content-between'>
                    <Typography>Budget:</Typography>
                    <Typography sx={{
                        fontWeight: 600,
                    }}>$1000/person</Typography>
                </Box> */}
                <Box className='d-flex justify-content-between'>
                    <Typography>Duration:</Typography>
                    <Typography sx={{
                        fontWeight: 600
                    }}>{duration} days</Typography>
                </Box>
            </Box>
             
        </Box>
    );
};

export default BannerBox;