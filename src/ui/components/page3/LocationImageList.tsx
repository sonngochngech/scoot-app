import { Box, Button, Card, Icon, IconButton } from '@mui/material';

import { Swiper, SwiperSlide,useSwiper  } from "swiper/react";
import { LeftIcon, RightIcon } from './icons/icons';
import { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';


export default function LocationImageList({ isMobile ,city}:any) {
   const swiper = useSwiper();
   const swiperRef = useRef<SwiperType|null>();
   const [activeIndex, setActiveIndex] = useState<number>(0);
   const handleSlideChange = () => {
    if (swiperRef.current) {
      setActiveIndex(swiperRef.current.activeIndex); // Update active index when slide changes
    }
  };
    const recommentPlaces= 
        {
            placeName: "Norwegian Fjords, Norway",
            images: [
                "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
                "https://media.istockphoto.com/id/1192780580/vi/anh/n%C3%BAi-ph%C3%BA-s%C4%A9-c%C3%A2y-phong-%C4%91%E1%BB%8F-v%C3%A0-thuy%E1%BB%81n-ng%C6%B0-d%C3%A2n-v%E1%BB%9Bi-s%C6%B0%C6%A1ng-m%C3%B9-bu%E1%BB%95i-s%C3%A1ng-v%C3%A0o-m%C3%B9a-thu-h%E1%BB%93-kawaguchiko.jpg?s=612x612&w=0&k=20&c=zlUO3Sp_MWoSQfE6ngxQuXvPxPzdQEga4iLxxABdZug=",
                "https://media.istockphoto.com/id/607280514/vi/anh/lupins-c%E1%BB%A7a-h%E1%BB%93-tekapo.jpg?s=612x612&w=0&k=20&c=B2C2PeENOjKrvFW1OrEUvMn_BD3nX0FeLt_MEVcju0Y=",
                "https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A=",
                "https://media.istockphoto.com/id/509288876/vi/anh/tossa-de-mar-tr%C3%AAn-costa-brava-catalonia-t%C3%A2y-ban-nha.jpg?s=612x612&w=0&k=20&c=tAK5cNHEzSEJRSZFky7i9OISwAWrleXUC6fLJY2gsKc=",
                "https://media.istockphoto.com/id/1038870630/vi/anh/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-%C4%91%E1%BB%A9ng-nh%C3%ACn-lago-di-carezza-%E1%BB%9F-dolomites.jpg?s=612x612&w=0&k=20&c=QQuLncmU2EyLt1GobspB2Zah0Llwy8G1JsZUqKSeN1M=",
            ],
            description: "The Norwegian Fjords are a spectacular natural wonder, known for their dramatic landscapes, deep blue waters, and towering cliffs. Traveling through the fjords, such as Geirangerfjord or Nærøyfjord, offers a unique opportunity to experience the tranquility of the sea combined with the majestic beauty of the mountains. The calm, reflective waters of the fjords provide a perfect setting for relaxation and absorbing the harmonious energy of nature.",
        }

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
                {recommentPlaces.images.map((img_link, img_idx) => (
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

   
    // return (
    //     <>
    //         <div key={city?.name} style={{ marginBottom: '48px' }}>
    //             <div className="d-flex justify-content-between">
    //                 {
    //                     !isMobile ?
                        
    //                         <div id={`carouselExampleControls${city?.name?.replace(/[\s,]/g, "")}`} className="w-100 carousel slide d-flex " data-bs-ride="carousel" data-bs-touch="true">
    //                             <div className="carousel-inner custom-carousel-inner">
    //                                 {city?.image?.map((img:any, index:number) => (
    //                                     <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
    //                                         <div className="d-flex align-items-end">
    //                                             <img src={img} className="special-img" alt="Tourist on Boat"    
    //                                             />
    //                                             <img src={city?.image[(index + 1) % 10]} className="normal-img mr-16" alt="Tourist on Boat"      
    //                                             />
    //                                             <img src={city?.image[(index + 2) % 10]} className="normal-img" alt="Tourist on Boat"
    //                                             />
    //                                         </div>
    //                                     </div>
    //                                 ))}
    //                                 <div>
    //                                     <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls${city?.name.replace(/[\s,]/g, "")}`} data-bs-slide="prev" style={{ right: '0%' }}>
    //                                         <img src="img/next-icon.svg" alt="Previous" className='controll-icon'/>
    //                                     </button>
    //                                     <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls${city?.name.replace(/[\s,]/g, "")}`} data-bs-slide="next">
    //                                         <img src="img/previous-icon.svg" alt="Next" className='controll-icon' />
    //                                     </button>
    //                                 </div>
    //                             </div>
    //                         </div>         
    //                         : 
    //                         <div id={`carouselExampleControlsMobile${city?.name?.replace(/[\s,]/g, "")}`} className=" w-100 carousel slide d-flex" data-bs-ride="carousel" data-bs-touch="true">
    //                             <div className="carousel-inner custom-carousel-inner">
    //                                 {city?.image?.map((img:any, index:number) => (
    //                                     <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
    //                                         <div className="d-flex align-items-end">
    //                                             <img src={img} className="normal-img me-2" alt="Phú Quốc Island"        
    //                                             />
    //                                             <img src={city.image[(index + 1) % 10]} className="normal-img" alt="Tourist on Boat" 
    //                                             />
    //                                         </div>
    //                                     </div>
    //                                 ))}
    //                                 <div>
    //                                     <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControlsMobile${city?.name.replace(/[\s,]/g, "")}`} data-bs-slide="prev">
    //                                         <img src="img/next-icon.svg" alt="Previous" className='carousel-control-prev-icon'/>
    //                                     </button>
    //                                     <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControlsMobile${city?.name.replace(/[\s,]/g, "")}`} data-bs-slide="next">
    //                                         <img src="img/previous-icon.svg" alt="Next" className='carousel-control-next-icon'  />
    //                                     </button>
    //                                 </div>
    //                             </div>
    //                         </div>    
    //                 }
    //             </div>
    //             <p className="desktop-regular-20 col-12 col-sm-8" style={{ marginTop: '48px' }}>{city?.description}</p>
    //         </div>
    //     </>
    // )
}