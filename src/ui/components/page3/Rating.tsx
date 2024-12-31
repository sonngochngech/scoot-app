
import React from 'react';
import { Box, Container, Grid2, Typography, useMediaQuery,useTheme } from "@mui/material";
import { useEffect, useState } from "react";


function Rating({rating}:any){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [data, setData] = useState<{title: string, rating: number}[]>([]);

    useEffect(() => {
        if(rating){
        
            const ratingData= Object.entries(rating).map(([key, value]:[any,any]) => {
                return {title: key, rating: value}
            });
            setData(ratingData);
        }
        
    },[rating]);
    
    return (
        <Box
         sx={{
            paddingTop:3,
            paddingBottom:3,
            paddingLeft:2,
            paddingRight:2,
            backgroundColor: '#FFFBCC',
            borderRadius: 1.5,
         }}

        >
            <Grid2 container spacing={{xs:2,md: 6,lg:8}} columns={15} >
            {data?.map((item, index) => (
                    <Grid2  key={index} size={{xs:15, sm:5,lg:3}} className= {isMobile ? 'd-flex justify-content-between align-items-center ':'d-flex align-items-center'} >
                        <Box className='d-flex align-items-center' sx={{
                                marginRight: '8px'
                             }}>
                            <img src="/page3/star.svg" style={{
                                width:'24px',
                                height:'24px'
                            }} />
                            <Typography>{item.title}:</Typography>
                        </Box>
                        <Typography sx={{
                            fontWeight:'600'
                        }}>{item.rating}/10</Typography>
                    </Grid2>
                ))}      
            </Grid2>
        </Box>
    )
}

export default Rating;