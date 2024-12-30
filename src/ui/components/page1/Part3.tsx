import { Box, Grid, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Part3() {
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
                    md: "70px",
                    xs: "38px",
                },
                marginBottom: {
                    md: "109px",
                    xs: "51px",
                }
            }}>
            <Box
                sx={{
                    borderRadius: {
                        md: "32px",
                        xs: "16px",
                    },
                    width: "100%",
                    overflow: "hidden",
                    position: "relative",
                    backgroundImage: {
                        md: `url('/page1/bg_p3.png')`,
                        xs: `url('/page1/bg_p3_small.png')`
                    },
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                }}
            >
                <Grid container>
                    <Grid item md={6.6} xs={12}>
                    </Grid>
                    <Grid item md={0.9} xs={12} sx={{ marginBottom: { xs: "31px" } }}>
                        <Box sx={{
                            display: { md: "flex" },
                            justifyContent: { md: "center" },
                            height: "100%",
                            paddingTop: { md: "90%", xs: "40px" },
                            paddingLeft: {
                                xs: "52px",
                            },
                        }}>
                            <Box
                                component="img"
                                src={isMobile ? '/page1/ic_p3_left_small.svg' : '/page1/ic_p3_left.svg'}
                                sx={{
                                    width: "37px",
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={3.6}
                        xs={12}
                    >
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: {
                                xs: "32px",
                            },
                            paddingRight: {
                                xs: "32px",
                            },
                            paddingTop: {
                                md: "22%",
                                xs: 0,
                            },
                            paddingBottom: {
                                md: "22%",
                                xs: 0,
                            },
                        }}>
                            <Button
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                                sx={{
                                    backgroundColor: "white",
                                    color: "black",
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                    },
                                    border: "1px solid black",
                                    borderRadius: {
                                        md: "99px",
                                        xs: "115px",
                                    },
                                    paddingTop: {
                                        md: "20px",
                                        xs: "18px",
                                    },
                                    paddingBottom: {
                                        md: "20px",
                                        xs: "18px",
                                    },
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    fontSize: {
                                        md: "16px",
                                        xs: "14px",
                                    },
                                    width: "100%",
                                    maxWidth: { md: "264px" },
                                }}
                            >
                                GET STARTED
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item md={0.9} xs={12} sx={{ marginTop: { xs: "25px" } }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: { md: "center", xs: "flex-end" },
                            height: { md: "100%" },
                            width: { xs: "100%" },
                            paddingBottom: { md: "90%", xs: "36px" },
                            paddingRight: {
                                xs: "56px",
                            },
                        }}>
                            <Box
                                component="img"
                                src={isMobile ? '/page1/ic_p3_right_small.svg' : '/page1/ic_p3_right.svg'}
                                sx={{
                                    width: "37px",
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}