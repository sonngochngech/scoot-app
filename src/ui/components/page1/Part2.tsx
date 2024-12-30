import { Box, Typography, Card, CardContent, Grid, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Part2() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const cards = [
        {
            img: "/page1/ic_p2_1.svg",
            title: "Planning a vacation",
            description:
                "Say goodbye to worries about budget, safety, or navigating an unfamiliar destination. This tool offers reliable travel choices and helps you avoid unnecessary expenses, providing comprehensive guidance for a stress-free and enjoyable getaway.",
        },
        {
            img: "/page1/ic_p2_2.svg",
            title: "Planning a business trip",
            description:
                "Maximize your efficiency with time-saving travel tips and recommendations tailored to your business goals. This tool ensures a productive trip while leaving room for leisure activities to unwind and recharge.",
        },
        {
            img: "/page1/ic_p2_3.svg",
            title: "Planning a trip with family or friends",
            description:
                "Find the perfect balance for everyone! This tool creates a harmonious travel plan that caters to the unique needs and preferences of each member of your group, ensuring a memorable experience for all.",
        },
    ];

    return (
        <Box
            sx={{
                paddingLeft: {
                    md: "7%",
                    xs: "5%",
                },
                paddingRight: {
                    md: "7%",
                    xs: "5%",
                },
                marginTop: {
                    md: "80px",
                    xs: "48px",
                },
            }}>
            <Typography
                sx={{
                    fontWeight: "bold",
                    fontSize: {
                        md: "40px",
                        xs: "24px",
                    },
                    marginBottom: {
                        md: "40px",
                        xs: "24px",
                    },
                }}>
                This tool is perfect for you if you are
            </Typography>
            <Grid container spacing={2}>
                {!isMobile &&
                    cards.map((card, index) => (
                        <Grid item md={4}>
                            <Card
                                sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                    width: "100%",
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
                                            MozBorderRadiusTopleft: "16px",
                                            MozBorderRadiusTopright: "16px",
                                            overflow: "hidden",
                                            paddingTop: "50%",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={card.img}
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Box>
                                    <CardContent
                                        sx={{
                                            textAlign: "left",
                                            flexGrow: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "left",
                                            padding: 0,
                                            paddingTop: {
                                                xs: "16px",
                                                md: "24px",
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: {
                                                    xs: "18px",
                                                    md: "20px",
                                                },
                                                marginBottom: "8px",
                                                color: "#333",
                                                overflowWrap: "break-word",
                                            }}
                                        >
                                            {card.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    xs: "12px",
                                                    md: "14px",
                                                },
                                                color: "#555",
                                                lineHeight: {
                                                    md: "20px",
                                                    xs: "18px",
                                                },
                                                overflowWrap: "break-word",
                                            }}
                                        >
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Card>
                        </Grid>
                    ))
                }
                {isMobile &&
                    <Swiper
                        spaceBetween={12}
                        slidesPerView={1.2}
                        breakpoints={{
                            768: { slidesPerView: 3 },
                        }}
                        style={{
                            paddingLeft: "10px",
                            marginTop: "24px",
                        }}
                    >
                        {cards.map((card, index) => (
                            <SwiperSlide key={index}>
                                <Card
                                    sx={{
                                        position: "relative",
                                        overflow: "hidden",
                                        width: "100%",
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
                                                MozBorderRadiusTopleft: "16px",
                                                MozBorderRadiusTopright: "16px",
                                                overflow: "hidden",
                                                paddingTop: "50%",
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={card.img}
                                                sx={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </Box>
                                        <CardContent
                                            sx={{
                                                textAlign: "left",
                                                flexGrow: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "left",
                                                padding: 0,
                                                paddingTop: {
                                                    xs: "16px",
                                                    md: "24px",
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: {
                                                        xs: "18px",
                                                        md: "20px",
                                                    },
                                                    marginBottom: "8px",
                                                    color: "#333",
                                                    overflowWrap: "break-word",
                                                }}
                                            >
                                                {card.title}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: {
                                                        xs: "12px",
                                                        md: "14px",
                                                    },
                                                    color: "#555",
                                                    lineHeight: {
                                                        md: "20px",
                                                        xs: "18px",
                                                    },
                                                    overflowWrap: "break-word",
                                                }}
                                            >
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                }
            </Grid>
            <Box
                sx={{
                    padding: {
                        md: "40px 0px 0px 0px",
                        xs: "24px 0px 0px 0px",
                    },
                    width: "100%",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                    sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        padding: {
                            md: "20px 0px 20px 0px",
                            xs: "13px 0px 13px 0px",
                        },
                        fontSize: {
                            md: "16px",
                            xs: "14px",
                        },
                        textTransform: "uppercase",
                        borderRadius: "99px",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                            backgroundColor: "#333",
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                        },
                        width: {
                            md: "264px",
                            xs: "100%",
                        },
                    }}
                >
                    TRY NOW
                </Button>
            </Box>
        </Box>
    );
}