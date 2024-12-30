import { Box, Grid, Typography, Card, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import BackIcon from "../components/page2/BackIcon";
import "swiper/css";

export const Page2 = () => {
    const data = {
        name: "Nguyễn Mai Anh",
        dateOfBirth: "08/08/2000",
        detailFengShui: `According to Feng Shui Bazi, you have a <span style="font-weight: bold;">Metal element</span> and a <span style="font-weight: bold;">Water deficiency</span>. <span style="font-weight: bold;">Your strengths</span> lie in intelligence and excellent communication skills. <span style="font-weight: bold;">However</span>, you may easily be swayed by emotions, leading to stress and mental fatigue.`,
        recommentFengShui: `To balance your destiny and invite more luck and joy into your life, it's recommended that you <span style="font-weight: bold;">should travel to the North</span>, visiting places connected to the <span style="font-weight: bold;">sea or rivers</span>. These destinations embody the dynamic, prosperous, and adventurous spirit that aligns with your element. The coastal atmosphere will help <span style="font-weight: bold;">relieve stress and restore emotional balance</span>. Additionally, you'll have the chance to fully absorb the vital energy of nature, drawing in harmonious vibes from the earth and sky.`,
        recommentPlaces: [
            {
                placeName: "Bali, Indonesia",
                img: "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
                description: [
                    "Bali is a destination rich in Water and Wood elements, symbolizing growth, renewal, and emotional healing—perfect for balancing your energy map.",
                    "Its lush tropical environment and tranquil beaches promote relaxation, emotional harmony, and creative inspiration.",
                    "Enjoy yoga retreats in Ubud, relax by the ocean at Seminyak Beach, and explore sacred water temples like Tirta Empul for spiritual cleansing.",
                ],
            },
            {
                placeName: "Bali, Indonesia",
                img: "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
                description: [
                    "Bali is a destination rich in Water and Wood elements, symbolizing growth, renewal, and emotional healing—perfect for balancing your energy map.",
                    "Its lush tropical environment and tranquil beaches promote relaxation, emotional harmony, and creative inspiration.",
                    "Enjoy yoga retreats in Ubud, relax by the ocean at Seminyak Beach, and explore sacred water temples like Tirta Empul for spiritual cleansing.",
                ],
            },
            {
                placeName: "Bali, Indonesia",
                img: "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
                description: [
                    "Bali is a destination rich in Water and Wood elements, symbolizing growth, renewal, and emotional healing—perfect for balancing your energy map.",
                    "Its lush tropical environment and tranquil beaches promote relaxation, emotional harmony, and creative inspiration.",
                    "Enjoy yoga retreats in Ubud, relax by the ocean at Seminyak Beach, and explore sacred water temples like Tirta Empul for spiritual cleansing.",
                ],
            },
        ],
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box>
            <Box sx={{
                paddingLeft: {
                    md: "7%",
                    xs: "5%",
                },
                paddingRight: {
                    md: "7%",
                    xs: "5%",
                },
                backgroundColor: "white",
                paddingBottom: {
                    md: "80px",
                    xs: "64px",
                },
            }}>
                <Box sx={{
                    marginTop: {
                        md: "64px",
                        xs: "50px",
                    },
                    marginBottom: "32px",
                }}>
                    <BackIcon url="/" />
                </Box>
                <Grid container spacing="24px">
                    <Grid item xs={12} md={8}>
                        <Typography sx={{
                            fontWeight: "bold",
                            fontSize: {
                                md: "64px",
                                xs: "44px",
                            },
                        }}>
                            Personal Energy Map Analysis Results
                        </Typography>

                        {isMobile &&
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: {
                                        xs: "flex-end",
                                        md: "flex-start",
                                    },
                                }}>
                                <Box
                                    component="img"
                                    src="page2/ic_right.svg"
                                    sx={{
                                        width: {
                                            md: "100%",
                                            xs: "66%",
                                        },
                                        height: "auto",
                                        maxWidth: {
                                            md: "auto",
                                            xs: "400px",
                                        }
                                    }}
                                />
                            </Box>
                        }

                        <Typography sx={{
                            marginTop: {
                                md: "48px",
                                xs: "38px",
                            },
                            fontSize: "16px",
                            paddingRight: {
                                md: "50px",
                                xs: 0,
                            },
                        }}>
                            For our customer {data.name}, born on {data.dateOfBirth}
                        </Typography>
                        <Typography
                            sx={{
                                marginTop: {
                                    md: "48px",
                                    xs: "24px",
                                },
                                fontSize: "16px",
                                paddingRight: {
                                    md: "50px",
                                    xs: 0,
                                },
                            }}
                            dangerouslySetInnerHTML={{ __html: data.detailFengShui }}
                        />
                        <Typography
                            sx={{
                                marginTop: {
                                    md: "48px",
                                    xs: "24px",
                                },
                                fontSize: "16px",
                                paddingRight: {
                                    md: "50px",
                                    xs: 0,
                                },
                            }}
                            dangerouslySetInnerHTML={{ __html: data.recommentFengShui }}
                        />
                    </Grid>
                    {!isMobile &&
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: {
                                        xs: "flex-end",
                                        md: "flex-start",
                                    },
                                }}>
                                <Box
                                    component="img"
                                    src="page2/ic_right.svg"
                                    sx={{
                                        width: {
                                            md: "100%",
                                            xs: "66%",
                                        },
                                        height: "auto",
                                    }}
                                />
                            </Box>
                        </Grid>
                    }
                </Grid>
            </Box>

            <Box sx={{
                paddingLeft: {
                    md: "7%",
                    xs: "5%",
                },
                paddingRight: {
                    md: "7%",
                    xs: "5%",
                },
                backgroundColor: "#F6F6F6",
            }}>
                <Grid container>
                    <Grid item xs={12} md={7}>
                        <Typography sx={{
                            fontSize: {
                                md: "64px",
                                xs: "44px",
                            },
                            fontWeight: "bold",
                            wordBreak: "break-word",
                            hyphens: "auto",
                            marginTop: {
                                md: "80px",
                                xs: "64px",
                            },
                            marginBottom: {
                                md: "48px",
                                xs: "32px",
                            }
                        }}>
                            Here are the best destinations for you
                        </Typography>
                    </Grid>
                </Grid>

                {data.recommentPlaces.map((place, place_idx) => (
                    <Box
                        sx={{
                            marginBottom: {
                                md: "56px",
                                xs: "32px",
                            },
                            backgroundColor: "white",
                            borderRadius: "24px",
                            position: "relative",
                            height: "auto",
                            display: "block",
                        }}
                    >
                        <Button
                            sx={{
                                position: "absolute",
                                top: {
                                    md: "-16px",
                                    xs: "-8px",
                                },
                                left: {
                                    md: "40px",
                                    xs: "16px",
                                },
                                backgroundColor: "#FFE900",
                                padding: {
                                    md: "27px 24px",
                                    xs: "9px 8px",
                                },
                                fontSize: {
                                    md: "24px",
                                    xs: "14px",
                                },
                                fontWeight: "bold",
                                color: "#1F201E",
                                borderBottomLeftRadius: "244px",
                                borderBottomRightRadius: "244px",
                                borderTopLeftRadius: "8px",
                                borderTopRightRadius: "8px",
                                minWidth: "auto",
                            }}
                        >
                            0{place_idx + 1}
                        </Button>
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    fontSize: {
                                        md: "40px",
                                        xs: "24px",
                                    },
                                    paddingTop: {
                                        md: "64px",
                                        xs: "48px",
                                    },
                                    width: "100%",
                                }}
                            >
                                {place.placeName}
                            </Typography>
                            <Box
                                sx={{
                                    padding: {
                                        md: "40px",
                                        xs: "16px 24px",
                                    },
                                    width: "100%",
                                    position: "relative",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={place.img}
                                    sx={{
                                        width: "100%",
                                        height: {
                                            md: "400px",
                                            xs: "100px",
                                        },
                                        borderRadius: {
                                            md: "24px",
                                            xs: "16px",
                                        },
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    padding: {
                                        md: "0px 40px 40px 40px",
                                        xs: "0px 24px 16px 24px",
                                    },
                                    width: "100%",
                                    position: "relative",
                                }}
                            >
                                <Grid container justifyContent="center">
                                    <Grid item md={6.5} xs={12}>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs="auto"
                                                sx={{
                                                    paddingRight: {
                                                        md: "16px",
                                                        xs: "12px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                <Box
                                                    component="img"
                                                    src="/page2/ic1.svg"
                                                    sx={{
                                                        width: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        height: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        borderRadius: {
                                                            md: "24px",
                                                            xs: "16px",
                                                        },
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography sx={{
                                                    fontSize: {
                                                        md: "16px",
                                                        xs: "14px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                    {place.description[0]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs="auto"
                                                sx={{
                                                    paddingRight: {
                                                        md: "16px",
                                                        xs: "12px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                <Box
                                                    component="img"
                                                    src="/page2/ic2.svg"
                                                    sx={{
                                                        width: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        height: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        borderRadius: {
                                                            md: "24px",
                                                            xs: "16px",
                                                        },
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography sx={{
                                                    fontSize: {
                                                        md: "16px",
                                                        xs: "14px",
                                                    },
                                                    paddingTop: "12px",
                                                    paddingBottom: "12px",
                                                }}>
                                                    {place.description[1]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs="auto"
                                                sx={{
                                                    paddingRight: {
                                                        md: "16px",
                                                        xs: "12px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                <Box
                                                    component="img"
                                                    src="/page2/ic3.svg"
                                                    sx={{
                                                        width: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        height: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        borderRadius: {
                                                            md: "24px",
                                                            xs: "16px",
                                                        },
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography sx={{
                                                    fontSize: {
                                                        md: "16px",
                                                        xs: "14px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                    {place.description[2]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                sx={{
                                    padding: {
                                        md: "0px 40px 40px 40px",
                                        xs: "0px 24px 24px 24px",
                                    },
                                    width: "100%",
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    sx={{
                                        backgroundColor: "#000",
                                        color: "#fff",
                                        padding: {
                                            md: "20px 29px 20px 29px",
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
                                            md: "auto",
                                            xs: "100%",
                                        },
                                    }}
                                >
                                    I WANT TO KNOW MORE
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}