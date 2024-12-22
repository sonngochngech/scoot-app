import { Box, Typography, Card, CardContent, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Part2() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const cards = [
        {
            img: "/page1/ic_p2_1.svg",
            title: "Boost Your Energy",
            description:
                "Traveling to destinations that align with your personal Feng Shui elements can help rejuvenate your energy, leaving fatigue and illness behind.",
        },
        {
            img: "/page1/ic_p2_2.svg",
            title: "Spiritual & Emotional Healing",
            description:
                'Certain locations with strong positive energy can aid in emotional and spiritual healing, helping you release past traumas and embrace a more balanced, peaceful state of mind.',
        },
        {
            img: "/page1/ic_p2_3.svg",
            title: "Stress Reduction",
            description:
                "Embrace a FRESH, BALANCED and POSITIVE vibe when traveling. Create a more peaceful and relaxing environment, reducing stress and promoting a sense of calm.",
        },
        {
            img: "/page1/ic_p2_4.svg",
            title: "Increase Luck & Prosperity",
            description:
                "Traveling to places aligned with your birth elements will boost your energy, attracting luck and unexpected opportunities in life. We use Bazi, known as Four Pillars of Destiny or Chinese astrology. ",
        },
        {
            img: "/page1/ic_p2_5.svg",
            title: "Personal Growth & Clarity",
            description:
                "Feng Shui can help you choose destinations that support your personal and professional growth. The balanced energy of these places can foster creativity, clearer thinking, and better decision-making.",
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
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <Box
                        component="img"
                        src="/page1/ic_p2_fengshui.svg"
                    />
                    <Typography sx={{
                        fontWeight: "bold",
                        fontSize: {
                            md: "40px",
                            xs: "32px",
                        },
                        marginTop: "16px",
                    }}>
                        Travel with
                    </Typography>
                    <Typography sx={{
                        fontWeight: "bold",
                        fontSize: {
                            md: "40px",
                            xs: "32px",
                        },
                    }}>
                        Feng Shui
                    </Typography>
                    <Typography sx={{
                        color: "#DC437A",
                        fontWeight: "bold",
                        fontSize: {
                            md: "40px",
                            xs: "32px",
                        },
                    }}>
                        Healing therapy?
                    </Typography>
                </Grid>
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
        </Box>
    );
}