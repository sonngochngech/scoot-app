import { Box } from "@mui/material";
import Landing from "../components/page1/Landing";
import Part1 from "../components/page1/Part1";
import Part2 from "../components/page1/Part2";
import Part3 from "../components/page1/Part3";
import Part4 from "../components/page1/Part4";

export const Page1 = () => {
    return (
        <Box>
            <Landing />
            <Part1 />
            <Part2 />
            <Part3 />
            <Part4 />
        </Box>
    )
}