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
            <Box sx={{
                borderRadius: {
                    md: "32px",
                    xs: "16px",
                },
                backgroundColor: "#FFE900",
            }}>
                <Box sx={{
                    padding: {
                        md: "32px",
                        xs: "16px",
                    },
                }}>
                    <Box
                        sx={{
                            display: "inline-flex",
                            flexWrap: "wrap",
                            gap: "8px",
                        }}
                    >
                        <Box
                            component="img"
                            src="/page1/ic_p4_top.svg"
                        />
                        <Box sx={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <Typography
                                sx={{
                                    fontSize: {
                                        md: "40px",
                                        xs: "32px",
                                    },
                                    wordBreak: "break-word",
                                    fontWeight: "bold",
                                    marginBottom: {
                                        md: "24px",
                                        xs: "16px",
                                    },
                                }}
                            >
                                Let Scoot take you to this wonderful adventure
                            </Typography>
                        </Box>
                    </Box>
                    <Grid container spacing={isMobile ? "16px" : "24px"}>
                        <Grid item xs={12} md={12}>
                            <Box sx={{
                                backgroundColor: "white",
                                borderRadius: {
                                    md: "16px",
                                    xs: "12px",
                                },
                                padding: {
                                    md: "24px",
                                    xs: "16px",
                                },
                                paddingTop: {
                                    md: "48px",
                                },
                                paddingBottom: {
                                    md: "48px",
                                },
                                height: "100%",
                            }}>
                                <Grid container>
                                    <Grid item xs={12} md="auto" sx={{
                                        marginRight: {
                                            md: "24px",
                                        },
                                        marginBottom: {
                                            md: 0,
                                            xs: "24px",
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
                                                        md: "80px",
                                                        xs: "48px"
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md>
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
                                            }}>
                                                Affordable Fares
                                            </Typography>
                                            <Typography sx={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                                fontSize: "14px",
                                                marginTop: {
                                                    md: "4px",
                                                },
                                            }}>
                                                Competitive pricing makes travel accessible without compromising quality.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{
                                backgroundColor: "white",
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
                                            md: "21.5%",
                                            xs: "24px",
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
                                                        md: "80px",
                                                        xs: "48px"
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
                                            }}>
                                                Modern Fleet
                                            </Typography>
                                            <Typography sx={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                                fontSize: "14px",
                                                marginTop: {
                                                    md: "4px",
                                                },
                                            }}>
                                                A young, fuel-efficient fleet ensures comfort and reliability.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{
                                backgroundColor: "white",
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
                                            md: "21.5%",
                                            xs: "24px",
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
                                                        md: "80px",
                                                        xs: "48px"
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
                                            }}>
                                                Flexible Options
                                            </Typography>
                                            <Typography sx={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                                fontSize: "14px",
                                                marginTop: {
                                                    md: "4px",
                                                },
                                            }}>
                                                Customizable travel packages let you pay for only the extras you need.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{
                                backgroundColor: "white",
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
                                            md: "21.5%",
                                            xs: "24px",
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
                                                src="/page1/ic_p4_4.svg"
                                                sx={{
                                                    width: {
                                                        md: "80px",
                                                        xs: "48px"
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
                                            }}>
                                                Wide Network
                                            </Typography>
                                            <Typography sx={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                                fontSize: "14px",
                                                marginTop: {
                                                    md: "4px",
                                                },
                                            }}>
                                                Connections to numerous destinations across Asia, Australia, and Europe.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{
                                backgroundColor: "white",
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
                                            md: "21.5%",
                                            xs: "24px",
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
                                                src="/page1/ic_p4_5.svg"
                                                sx={{
                                                    width: {
                                                        md: "80px",
                                                        xs: "48px"
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
                                            }}>
                                                Quality Service
                                            </Typography>
                                            <Typography sx={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                                fontSize: "14px",
                                                marginTop: {
                                                    md: "4px",
                                                },
                                            }}>
                                                Friendly, professional service enhances your travel experience.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Button
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: "#1F201E",
                        paddingTop: {
                            md: "20px",
                            xs: "18px",
                        },
                        paddingBottom: {
                            md: "20px",
                            xs: "18px",
                        },
                        textTransform: "none",
                        borderBottomLeftRadius: {
                            md: "32px",
                            xs: "16px",
                        },
                        borderBottomRightRadius: {
                            md: "32px",
                            xs: "16px",
                        },
                        fontSize: {
                            md: "16px",
                            xs: "14px",
                        },
                    }}
                >
                    Explore your luck
                </Button>
            </Box>
        </Box>
    );
}