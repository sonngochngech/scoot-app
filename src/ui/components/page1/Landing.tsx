import {
    Box, Grid, Typography, useMediaQuery,
} from "@mui/material";
import React, { useState } from 'react';
import FormCustom from "./FormCustom";
import { useTheme } from "@mui/material/styles";

export default function Landing() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [budget, setBudget] = useState(250);
    const handleBudgetChange = (event: Event, newValue: number | number[]) => {
        setBudget(newValue as number);
    };

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
                        <img src="/page1/ic_ld_xs.svg" width={"100%"} />
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
                        xs: "-36%",
                    }
                }}>
                <FormCustom />
            </Box>
        </Box>
    );
}