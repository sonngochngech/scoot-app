import { Box, Grid, Typography } from "@mui/material";

export default function Part1() {
    return (
        <Box
            sx={{
                marginLeft: {
                    md: "7%",
                    xs: "5%",
                },
                marginRight: {
                    md: "7%",
                    xs: "5%",
                },
                marginTop: {
                    md: "80px",
                    xs: "48px",
                },
                backgroundColor: "#FFFBCC",
                borderRadius: {
                    md: "32px",
                    xs: "16px",
                },
                paddingRight: {
                    md: "6%",
                    xs: 0,
                },
                paddingTop: {
                    md: "4%",
                    xs: "7%",
                },
            }}>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={9.5}
                    sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            paddingLeft: { md: "56px", xs: "32px" },
                            paddingRight: { md: "40px", xs: "32px" },
                            marginTop: {
                                md: "2%",
                            },
                            marginBottom: {
                                md: "5%",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    md: "28px",
                                    xs: "23px",
                                },
                                fontWeight: 600,
                                color: "#222222",
                            }}
                        >
                            “Travel brings power and love back into your life.”
                        </Typography>
                        <Typography
                            sx={{
                                marginTop: "8px",
                                color: "#222222",
                                fontSize: "15px",
                            }}
                        >
                            Let us help you <span style={{ color: "#DC437A" }}>heal</span>, <span style={{ color: "#DC437A" }}>recharge</span>, and <span style={{ color: "#DC437A" }}>find your balance</span> on every step of this amazing journey.
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={2.5}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: {
                                md: "center",
                                xs: "flex-end",
                            },
                            height: "100%",
                            alignItems: "flex-end",
                            paddingTop: {
                                md: 0,
                                xs: "56px",
                            },
                            paddingRight: {
                                md: 0,
                                xs: "9%",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "80%", md: "100%" },
                                maxWidth: "180px",
                                height: "auto",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src="/page1/ic_p1.svg"
                                alt="icon-3"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
