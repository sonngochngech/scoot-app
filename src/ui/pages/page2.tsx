// import { Box, Grid, Typography, Card, Button, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { Swiper, SwiperSlide } from "swiper/react";
// import BackIcon from "../components/page2/BackIcon";
// import "swiper/css";

// export const Page2 = () => {
//     const data = {
//         name: "Nguyễn Mai Anh",
//         dateOfBirth: "08/08/2000",
//         placeOfBirth: "Hanoi",
//         detailFengShui: `According to Feng Shui Bazi, you have a <span style="font-weight: bold;">Metal element</span> and a <span style="font-weight: bold;">Water deficiency</span>. <span style="font-weight: bold;">Your strengths</span> lie in intelligence and excellent communication skills. <span style="font-weight: bold;">However</span>, you may easily be swayed by emotions, leading to stress and mental fatigue.`,
//         recommentFengShui: `To balance your destiny and invite more luck and joy into your life, it's recommended that you <span style="font-weight: bold;">should travel to the North</span>, visiting places connected to the <span style="font-weight: bold;">sea or rivers</span>. These destinations embody the dynamic, prosperous, and adventurous spirit that aligns with your element. The coastal atmosphere will help <span style="font-weight: bold;">relieve stress and restore emotional balance</span>. Additionally, you'll have the chance to fully absorb the vital energy of nature, drawing in harmonious vibes from the earth and sky.`,
//         recommentPlaces: [
//             {
//                 placeName: "Norwegian Fjords, Norway",
//                 images: [
//                     "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
//                     "https://media.istockphoto.com/id/1192780580/vi/anh/n%C3%BAi-ph%C3%BA-s%C4%A9-c%C3%A2y-phong-%C4%91%E1%BB%8F-v%C3%A0-thuy%E1%BB%81n-ng%C6%B0-d%C3%A2n-v%E1%BB%9Bi-s%C6%B0%C6%A1ng-m%C3%B9-bu%E1%BB%95i-s%C3%A1ng-v%C3%A0o-m%C3%B9a-thu-h%E1%BB%93-kawaguchiko.jpg?s=612x612&w=0&k=20&c=zlUO3Sp_MWoSQfE6ngxQuXvPxPzdQEga4iLxxABdZug=",
//                     "https://media.istockphoto.com/id/607280514/vi/anh/lupins-c%E1%BB%A7a-h%E1%BB%93-tekapo.jpg?s=612x612&w=0&k=20&c=B2C2PeENOjKrvFW1OrEUvMn_BD3nX0FeLt_MEVcju0Y=",
//                     "https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A=",
//                     "https://media.istockphoto.com/id/509288876/vi/anh/tossa-de-mar-tr%C3%AAn-costa-brava-catalonia-t%C3%A2y-ban-nha.jpg?s=612x612&w=0&k=20&c=tAK5cNHEzSEJRSZFky7i9OISwAWrleXUC6fLJY2gsKc=",
//                     "https://media.istockphoto.com/id/1038870630/vi/anh/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-%C4%91%E1%BB%A9ng-nh%C3%ACn-lago-di-carezza-%E1%BB%9F-dolomites.jpg?s=612x612&w=0&k=20&c=QQuLncmU2EyLt1GobspB2Zah0Llwy8G1JsZUqKSeN1M=",
//                 ],
//                 description: "The Norwegian Fjords are a spectacular natural wonder, known for their dramatic landscapes, deep blue waters, and towering cliffs. Traveling through the fjords, such as Geirangerfjord or Nærøyfjord, offers a unique opportunity to experience the tranquility of the sea combined with the majestic beauty of the mountains. The calm, reflective waters of the fjords provide a perfect setting for relaxation and absorbing the harmonious energy of nature.",
//             },
//             {
//                 placeName: "Norwegian Fjords, Norway",
//                 images: [
//                     "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
//                     "https://media.istockphoto.com/id/1192780580/vi/anh/n%C3%BAi-ph%C3%BA-s%C4%A9-c%C3%A2y-phong-%C4%91%E1%BB%8F-v%C3%A0-thuy%E1%BB%81n-ng%C6%B0-d%C3%A2n-v%E1%BB%9Bi-s%C6%B0%C6%A1ng-m%C3%B9-bu%E1%BB%95i-s%C3%A1ng-v%C3%A0o-m%C3%B9a-thu-h%E1%BB%93-kawaguchiko.jpg?s=612x612&w=0&k=20&c=zlUO3Sp_MWoSQfE6ngxQuXvPxPzdQEga4iLxxABdZug=",
//                     "https://media.istockphoto.com/id/607280514/vi/anh/lupins-c%E1%BB%A7a-h%E1%BB%93-tekapo.jpg?s=612x612&w=0&k=20&c=B2C2PeENOjKrvFW1OrEUvMn_BD3nX0FeLt_MEVcju0Y=",
//                     "https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A=",
//                     "https://media.istockphoto.com/id/509288876/vi/anh/tossa-de-mar-tr%C3%AAn-costa-brava-catalonia-t%C3%A2y-ban-nha.jpg?s=612x612&w=0&k=20&c=tAK5cNHEzSEJRSZFky7i9OISwAWrleXUC6fLJY2gsKc=",
//                     "https://media.istockphoto.com/id/1038870630/vi/anh/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-%C4%91%E1%BB%A9ng-nh%C3%ACn-lago-di-carezza-%E1%BB%9F-dolomites.jpg?s=612x612&w=0&k=20&c=QQuLncmU2EyLt1GobspB2Zah0Llwy8G1JsZUqKSeN1M=",
//                 ],
//                 description: "The Norwegian Fjords are a spectacular natural wonder, known for their dramatic landscapes, deep blue waters, and towering cliffs. Traveling through the fjords, such as Geirangerfjord or Nærøyfjord, offers a unique opportunity to experience the tranquility of the sea combined with the majestic beauty of the mountains. The calm, reflective waters of the fjords provide a perfect setting for relaxation and absorbing the harmonious energy of nature.",
//             },
//             {
//                 placeName: "Norwegian Fjords, Norway",
//                 images: [
//                     "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
//                     "https://media.istockphoto.com/id/1192780580/vi/anh/n%C3%BAi-ph%C3%BA-s%C4%A9-c%C3%A2y-phong-%C4%91%E1%BB%8F-v%C3%A0-thuy%E1%BB%81n-ng%C6%B0-d%C3%A2n-v%E1%BB%9Bi-s%C6%B0%C6%A1ng-m%C3%B9-bu%E1%BB%95i-s%C3%A1ng-v%C3%A0o-m%C3%B9a-thu-h%E1%BB%93-kawaguchiko.jpg?s=612x612&w=0&k=20&c=zlUO3Sp_MWoSQfE6ngxQuXvPxPzdQEga4iLxxABdZug=",
//                     "https://media.istockphoto.com/id/607280514/vi/anh/lupins-c%E1%BB%A7a-h%E1%BB%93-tekapo.jpg?s=612x612&w=0&k=20&c=B2C2PeENOjKrvFW1OrEUvMn_BD3nX0FeLt_MEVcju0Y=",
//                     "https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A=",
//                     "https://media.istockphoto.com/id/509288876/vi/anh/tossa-de-mar-tr%C3%AAn-costa-brava-catalonia-t%C3%A2y-ban-nha.jpg?s=612x612&w=0&k=20&c=tAK5cNHEzSEJRSZFky7i9OISwAWrleXUC6fLJY2gsKc=",
//                     "https://media.istockphoto.com/id/1038870630/vi/anh/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-%C4%91%E1%BB%A9ng-nh%C3%ACn-lago-di-carezza-%E1%BB%9F-dolomites.jpg?s=612x612&w=0&k=20&c=QQuLncmU2EyLt1GobspB2Zah0Llwy8G1JsZUqKSeN1M=",
//                 ],
//                 description: "The Norwegian Fjords are a spectacular natural wonder, known for their dramatic landscapes, deep blue waters, and towering cliffs. Traveling through the fjords, such as Geirangerfjord or Nærøyfjord, offers a unique opportunity to experience the tranquility of the sea combined with the majestic beauty of the mountains. The calm, reflective waters of the fjords provide a perfect setting for relaxation and absorbing the harmonious energy of nature.",
//             },
//         ],
//     };

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//     return (
//         <Box>
//             <Box sx={{
//                 paddingLeft: {
//                     md: "7%",
//                     xs: "5%",
//                 },
//                 paddingRight: {
//                     md: "7%",
//                     xs: "5%",
//                 },
//                 backgroundColor: "white",
//                 paddingBottom: {
//                     md: "80px",
//                     xs: "64px",
//                 },
//             }}>
//                 <Box sx={{
//                     marginTop: {
//                         md: "64px",
//                         xs: "50px",
//                     },
//                     marginBottom: "32px",
//                 }}>
//                     <BackIcon url="/" />
//                 </Box>
//                 <Grid container spacing="24px">
//                     <Grid item xs={12} md={8}>
//                         <Typography sx={{
//                             fontWeight: "bold",
//                             fontSize: {
//                                 md: "64px",
//                                 xs: "44px",
//                             },
//                         }}>
//                             Here is your trip?
//                         </Typography>

//                         {isMobile &&
//                             <Box
//                                 sx={{
//                                     display: "flex",
//                                     justifyContent: {
//                                         xs: "flex-end",
//                                         md: "flex-start",
//                                     },
//                                 }}>
//                                 <Box
//                                     component="img"
//                                     src="page2/ic_right.svg"
//                                     sx={{
//                                         width: {
//                                             md: "100%",
//                                             xs: "66%",
//                                         },
//                                         height: "auto",
//                                         maxWidth: {
//                                             md: "auto",
//                                             xs: "400px",
//                                         }
//                                     }}
//                                 />
//                             </Box>
//                         }

//                         <Typography sx={{
//                             marginTop: {
//                                 md: "48px",
//                                 xs: "38px",
//                             },
//                             fontSize: "16px",
//                             paddingRight: {
//                                 md: "50px",
//                                 xs: 0,
//                             },
//                         }}>
//                             For our customer <span style={{ fontWeight: "bold" }}>{data.name}, born on {data.dateOfBirth}, {data.placeOfBirth}</span>
//                         </Typography>
//                         <Typography
//                             sx={{
//                                 marginTop: {
//                                     md: "48px",
//                                     xs: "24px",
//                                 },
//                                 fontSize: "16px",
//                                 paddingRight: {
//                                     md: "50px",
//                                     xs: 0,
//                                 },
//                             }}
//                             dangerouslySetInnerHTML={{ __html: data.detailFengShui }}
//                         />
//                         <Typography
//                             sx={{
//                                 marginTop: {
//                                     md: "48px",
//                                     xs: "24px",
//                                 },
//                                 fontSize: "16px",
//                                 paddingRight: {
//                                     md: "50px",
//                                     xs: 0,
//                                 },
//                             }}
//                             dangerouslySetInnerHTML={{ __html: data.recommentFengShui }}
//                         />
//                     </Grid>
//                     {!isMobile &&
//                         <Grid item xs={12} md={4}>
//                             <Box
//                                 sx={{
//                                     display: "flex",
//                                     justifyContent: {
//                                         xs: "flex-end",
//                                         md: "flex-start",
//                                     },
//                                 }}>
//                                 <Box
//                                     component="img"
//                                     src="page2/ic_right.svg"
//                                     sx={{
//                                         width: {
//                                             md: "100%",
//                                             xs: "66%",
//                                         },
//                                         height: "auto",
//                                     }}
//                                 />
//                             </Box>
//                         </Grid>
//                     }
//                 </Grid>
//             </Box>

//             <Box sx={{
//                 paddingLeft: {
//                     md: "7%",
//                     xs: "5%",
//                 },
//                 paddingRight: {
//                     md: "7%",
//                     xs: "5%",
//                 },
//                 backgroundColor: "#F6F6F6",
//             }}>
//                 <Grid container>
//                     <Grid item xs={12} md={7}>
//                         <Typography sx={{
//                             fontSize: {
//                                 md: "64px",
//                                 xs: "44px",
//                             },
//                             fontWeight: "bold",
//                             wordBreak: "break-word",
//                             hyphens: "auto",
//                             marginTop: {
//                                 md: "80px",
//                                 xs: "64px",
//                             },
//                             marginBottom: {
//                                 md: "48px",
//                                 xs: "32px",
//                             }
//                         }}>
//                             Here are the best destinations for you
//                         </Typography>
//                     </Grid>
//                 </Grid>

//                 {data.recommentPlaces.map((place, place_idx) => (
//                     <Box sx={{
//                         marginBottom: {
//                             md: "80px",
//                             xs: "32px",
//                         },
//                     }}>
//                         <Grid container>
//                             <Grid item xs={12} md={7.5}>
//                                 <Typography sx={{
//                                     fontWeight: "bold",
//                                     fontSize: {
//                                         md: "48px",
//                                         xs: "32px",
//                                     }
//                                 }}>
//                                     {place.placeName}
//                                 </Typography>
//                             </Grid>
//                             {!isMobile &&
//                                 <Grid
//                                     item
//                                     xs={12}
//                                     md={4.5}
//                                     sx={{
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "flex-end",
//                                     }}>
//                                     <Button
//                                         variant="contained"
//                                         sx={{
//                                             backgroundColor: "#000",
//                                             color: "#fff",
//                                             padding: "20px 44px",
//                                             fontSize: "15px",
//                                             fontWeight: "bold",
//                                             textTransform: "none",
//                                             borderRadius: "12px",
//                                             transition: "all 0.3s ease",
//                                             "&:hover": {
//                                                 backgroundColor: "#333",
//                                                 color: "#f0f0f0",
//                                                 transform: "scale(1.05)",
//                                             },
//                                             marginLeft: {
//                                                 md: "20px",
//                                                 xs: 0,
//                                             },
//                                         }}
//                                     >
//                                         I want to know more!
//                                     </Button>
//                                 </Grid>
//                             }
//                         </Grid>
//                         <Box sx={{
//                             paddingTop: {
//                                 md: "32px",
//                                 xs: "16px",
//                             },
//                             paddingBottom: {
//                                 md: "32px",
//                                 xs: "16px",
//                             },
//                         }}>
//                             <Swiper
//                                 spaceBetween={12}
//                                 slidesPerView={1.2}
//                                 breakpoints={{
//                                     900: { slidesPerView: 3 },
//                                 }}
//                             >
//                                 {data.recommentPlaces[place_idx].images.map((img_link, img_idx) => (
//                                     <SwiperSlide key={`${place_idx}-${img_idx}`}>
//                                         <Card
//                                             sx={{
//                                                 position: "relative",
//                                                 overflow: "hidden",
//                                                 width: "100%",
//                                                 boxShadow: "none",
//                                                 border: "none",
//                                             }}
//                                         >
//                                             <Card
//                                                 sx={{
//                                                     display: "flex",
//                                                     flexDirection: "column",
//                                                     overflow: "hidden",
//                                                     width: "100%",
//                                                     backgroundColor: "white",
//                                                     boxShadow: "none",
//                                                     border: "none",
//                                                 }}
//                                             >
//                                                 <Box
//                                                     component="div"
//                                                     sx={{
//                                                         position: "relative",
//                                                         width: "100%",
//                                                         overflow: "hidden",
//                                                         paddingTop: "60%",
//                                                         borderRadius: "16px",
//                                                     }}
//                                                 >
//                                                     <Box
//                                                         component="img"
//                                                         src={img_link}
//                                                         sx={{
//                                                             position: "absolute",
//                                                             top: 0,
//                                                             left: 0,
//                                                             width: "100%",
//                                                             height: "120%",
//                                                             objectFit: "cover",
//                                                             borderRadius: "16px",
//                                                         }}
//                                                     />
//                                                 </Box>
//                                             </Card>
//                                         </Card>
//                                     </SwiperSlide>
//                                 ))}
//                             </Swiper>
//                         </Box>
//                         {isMobile &&
//                             <Box sx={{
//                                 marginBottom: {
//                                     md: "32px",
//                                     xs: "16px",
//                                 },
//                             }}>
//                                 <Button
//                                     variant="contained"
//                                     sx={{
//                                         backgroundColor: "#000",
//                                         color: "#fff",
//                                         padding: "20px 44px",
//                                         fontSize: "15px",
//                                         fontWeight: "bold",
//                                         textTransform: "none",
//                                         borderRadius: "8px",
//                                         transition: "all 0.3s ease",
//                                         "&:hover": {
//                                             backgroundColor: "#333",
//                                             color: "#f0f0f0",
//                                             transform: "scale(1.05)",
//                                         },
//                                         width: "100%",
//                                     }}
//                                 >
//                                     I want to know more!
//                                 </Button>
//                             </Box>
//                         }
//                         <Typography sx={{
//                             fontSize: {
//                                 md: "18px",
//                                 xs: "14px",
//                             }
//                         }}>
//                             {place.description}
//                         </Typography>
//                     </Box>
//                 ))}
//             </Box>
//         </Box>
//     )
// }
export const Page2 = () => {
    return(
        <></>
    )
}