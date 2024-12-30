import { Box, Button, Typography, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Part4() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
                paddingTop: {
                    md: "80px",
                    xs: "48px",
                },
            }}>
            <Grid container>
                <Grid item md={8} xs={12}>
                    <Typography sx={{
                        fontWeight: "bold",
                        fontSize: {
                            md: "40px",
                            xs: "24px",
                        },
                        marginBottom: {
                            md: "16px",
                            xs: "12px",
                        },
                    }}>
                        Discover Harmony in Every Journey
                    </Typography>
                    <Typography sx={{
                        fontSize: {
                            md: "16px",
                            xs: "14px",
                        },
                        marginBottom: {
                            md: "40px",
                            xs: "24px",
                        },
                    }}>
                        The Wellness Travel Assistance Tool blends the ancient wisdom of Feng Shui with modern technology, aligning your personal energy (Chi) with your surroundings. Experience journeys that not only relax but rejuvenate, helping you connect deeply with each destination.
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={isMobile ? "12px" : "24px"}>
                <Grid item xs={12} md={4}>
                    <Box sx={{
                        backgroundColor: "#EFEFEF",
                        borderRadius: {
                            md: "16px",
                            xs: "12px",
                        },
                        padding: {
                            md: "24px",
                            xs: "16px",
                        },
                        height: "100%",
                    }}>
                        <Grid container>
                            <Grid item xs={12} md={12} sx={{
                                marginRight: {
                                    md: "24px",
                                },
                                marginBottom: {
                                    md: "24px",
                                    xs: "16px",
                                },
                            }}>
                                <Box sx={{
                                    height: "100%",
                                    width: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    <Box
                                        component="img"
                                        src="/page1/ic_p4_1.svg"
                                        sx={{
                                            width: {
                                                md: "180px",
                                                xs: "120px"
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box
                                    sx={{
                                        justifyContent: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: { md: "100%" },
                                    }}>
                                    <Typography sx={{
                                        fontSize: {
                                            md: "20px",
                                            xs: "18px",
                                        },
                                        fontWeight: "bold",
                                        marginBottom: "8px",
                                    }}>
                                        Personalized Wellness Through Bazi Analysis
                                    </Typography>
                                    <Typography sx={{
                                        wordBreak: "break-word",
                                        whiteSpace: "normal",
                                        fontSize: "14px",
                                        marginTop: {
                                            md: "4px",
                                        },
                                    }}>
                                        Leveraging the ancient art of Bazi (Four Pillars of Destiny), our tool analyzes your unique energy profile to recommend activities, destinations, and accommodations tailored to your personal elements and favorable directions.
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{
                        backgroundColor: "#EFEFEF",
                        borderRadius: {
                            md: "16px",
                            xs: "12px",
                        },
                        padding: {
                            md: "24px",
                            xs: "16px",
                        },
                        height: "100%",
                    }}>
                        <Grid container>
                            <Grid item xs={12} md={12} sx={{
                                marginRight: {
                                    md: "24px",
                                },
                                marginBottom: {
                                    md: "24px",
                                    xs: "16px",
                                },
                            }}>
                                <Box sx={{
                                    height: "100%",
                                    width: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    <Box
                                        component="img"
                                        src="/page1/ic_p4_2.svg"
                                        sx={{
                                            width: {
                                                md: "180px",
                                                xs: "120px"
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box
                                    sx={{
                                        justifyContent: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: { md: "100%" },
                                    }}>
                                    <Typography sx={{
                                        fontSize: {
                                            md: "20px",
                                            xs: "18px",
                                        },
                                        fontWeight: "bold",
                                        marginBottom: "8px",
                                    }}>
                                        Authentic and Data-Driven Recommendations
                                    </Typography>
                                    <Typography sx={{
                                        wordBreak: "break-word",
                                        whiteSpace: "normal",
                                        fontSize: "14px",
                                        marginTop: {
                                            md: "4px",
                                        },
                                    }}>
                                        Our AI algorithms, trained on a vast database of historical data and user preferences, seamlessly integrate traditional wisdom with modern technology, providing intuitive and enriching travel solutions for every journey.
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{
                        backgroundColor: "#EFEFEF",
                        borderRadius: {
                            md: "16px",
                            xs: "12px",
                        },
                        padding: {
                            md: "24px",
                            xs: "16px",
                        },
                        height: "100%",
                    }}>
                        <Grid container>
                            <Grid item xs={12} md={12} sx={{
                                marginRight: {
                                    md: "24px",
                                },
                                marginBottom: {
                                    md: "24px",
                                    xs: "16px",
                                },
                            }}>
                                <Box sx={{
                                    height: "100%",
                                    width: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    <Box
                                        component="img"
                                        src="/page1/ic_p4_3.svg"
                                        sx={{
                                            width: {
                                                md: "180px",
                                                xs: "120px"
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box
                                    sx={{
                                        justifyContent: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: { md: "100%" },
                                    }}>
                                    <Typography sx={{
                                        fontSize: {
                                            md: "20px",
                                            xs: "18px",
                                        },
                                        fontWeight: "bold",
                                        marginBottom: "8px",
                                    }}>
                                        Comprehensive Travel Guidance for Total Well-Being
                                    </Typography>
                                    <Typography sx={{
                                        wordBreak: "break-word",
                                        whiteSpace: "normal",
                                        fontSize: "14px",
                                        marginTop: {
                                            md: "4px",
                                        },
                                    }}>
                                        Our tool provides a holistic travel guide, including selecting ideal destinations, choosing lucky dates and times, suggesting personalized activities, offering tailored travel tips and more. Every detail is designed to align with your energy profile for a seamless and enriching journey.
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
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
                    DISCOVER NOW
                </Button>
            </Box>
        </Box>
    );
}