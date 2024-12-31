import { Box, useMediaQuery } from "@mui/material";
import FormCustom from "./FormCustom";
import { useTheme } from "@mui/material/styles";

export default function Landing() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box>
            <Box sx={{ backgroundColor: '#FFF586', }}>
                {!isMobile &&
                    <Box>
                        <img src="/page1/ic_ld_md.svg" width={"100%"} />
                    </Box>
                }
                {isMobile &&
                    <Box>
                        <img src="/page1/ic_ld_xs.png" width={"100%"} />
                    </Box>
                }
            </Box>
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
                        md: "-13.5%",
                        xs: "-68%",
                    }
                }}>
                <FormCustom />
            </Box>
        </Box>
    );
}