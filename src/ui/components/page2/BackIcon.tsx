import { Box, Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type BackIconInput = {
    url: string;
};

export default function BackIcon({ url }: BackIconInput) {
    const navigate = useNavigate();

    return (
        <Box
            onClick={() => {
                navigate(url);
            }}
            sx={{ width: "fit-content" }}>
            <Grid container sx={{ width: "fit-content" }}>
                <Grid item sx={{ width: "fit-content" }}>
                    <Button
                        sx={{
                            width: {
                                md: "40px",
                                xs: "24px",
                            },
                            height: {
                                md: "40px",
                                xs: "24px",
                            },
                            minWidth: "24px",
                            borderRadius: "50%",
                            backgroundColor: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            boxShadow: "0px 4px 4px 0px #00000040",
                            "&:hover": {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="/page2/ic_back.svg"
                            alt="icon"
                            sx={{
                                width: {
                                    md: "11.6px",
                                    xs: "7px",
                                },
                                height: "auto",
                            }}
                        />
                    </Button>
                </Grid>
                <Grid item sx={{ width: "fit-content", display: "flex", alignItems: "center" }}>
                    <Typography sx={{
                        fontSize: {
                            md: "16px",
                            xs: "14px",
                        },
                        fontWeight: "bold",
                        marginLeft: {
                            md: "16px",
                            xs: "12px",
                        }
                    }}>
                        Back
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}