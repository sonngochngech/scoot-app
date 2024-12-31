import { Box, Button, Card, Icon, IconButton } from '@mui/material';

import { Swiper, SwiperSlide,useSwiper  } from "swiper/react";
import { LeftIcon, RightIcon } from './icons/icons';
import { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';


export default function LocationImageList({ isMobile ,imgs,description}:any) {
   const swiper = useSwiper();
   const swiperRef = useRef<SwiperType|null>();
   const [activeIndex, setActiveIndex] = useState<number>(0);
   const handleSlideChange = () => {
    if (swiperRef.current) {
      setActiveIndex(swiperRef.current.activeIndex); // Update active index when slide changes
    }
  };
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
                  onSlideChange={handleSlideChange}
                
            >
                {imgs?.map((img_link:any, img_idx:number) => (
                    <SwiperSlide key={`${img_idx}`}
                    >
                        <Card

                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                width:'100%',
                                boxShadow: "none",
                                border: "none",
                            }}
                        >
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    width: "100%",
                                    backgroundColor: "white",
                                    boxShadow: "none",
                                    border: "none",
                                }}
                            >
                                <Box
                                    component="div"
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        overflow: "hidden",
                                        paddingTop: "60%",
                                        borderRadius: "16px",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={img_link}
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            height:img_idx === activeIndex ? '420px' : '275px',
                                            objectFit: "cover",
                                            borderRadius: "16px",
                                        }}
                                    />
                                </Box>
                            </Card>
                        </Card>
                    </SwiperSlide>
                ))}
            {!isMobile&& <IconButton  sx={{
                position: 'absolute',
                top: '50%',
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
                top: '50%',
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