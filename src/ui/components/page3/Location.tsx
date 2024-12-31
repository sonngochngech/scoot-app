import { Box, Button, Card, Icon, IconButton } from '@mui/material';
import { CardItem } from "./CardItem";
import { Swiper, SwiperSlide,useSwiper  } from "swiper/react";
import { LeftIcon, RightIcon } from './icons/icons';
import { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';


export default function Location({isMobile, itemData, itemImage,title}:any) {
   const swiperRef = useRef<SwiperType|null>();
  


    return (
        <Box sx={{
            paddingTop: {
                md: "32px",
                xs: "16px",
            },
            paddingBottom: {
                md: "32px",
                xs: "16px",
            },
            position:'relative',
        }}>
            <Swiper
                spaceBetween={12}
                slidesPerView={1.2}
                breakpoints={{
                    900: { slidesPerView: 3 },
                }}
                onSwiper={(swiper:SwiperType) => {
                    swiperRef.current = swiper;
                  }}
                 
                
            >
                {itemData?.map((location: any, index: any) => (
                    <SwiperSlide key={`${index}`}
                    >
                    <CardItem location={location} isMobile={isMobile} image={itemImage ? itemImage[index]:''} />
                    </SwiperSlide>
                ))}
            {!isMobile&& <IconButton  sx={{
                position: 'absolute',
                top: '30%',
                left: '0',
                zIndex: 1,
                width:'60px',
                height:'60px',
                
            }}
            onClick={() => swiperRef?.current?.slidePrev()}
            >
                <LeftIcon sx={{width:'100%',height:'100%'}}  />
            </IconButton>}
            {!isMobile&&<IconButton  sx={{
                position: 'absolute',
                top: '30%',
                right: '0',
                width: '60px',
                height: '60px',
                zIndex: 1,
            }}
            onClick={() => swiperRef?.current?.slideNext()}
            >
                <RightIcon sx={{width:'100%',height:'100%'}} />
            </IconButton>  }
            </Swiper>
            
        </Box>
    )

   
       
}