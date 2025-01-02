import { Box } from "@mui/material";
import Landing from "../components/page1/Landing";
import Part2 from "../components/page1/Part2";
import Part3 from "../components/page1/Part3";
import Part4 from "../components/page1/Part4";
import ChatComponent from "../components/ChatComponent";

export const Page1 = () => {
    return (
        <Box>
            <Landing />
            <Part2 />
            <Part4 />
            <Part3 />
            {/* <ChatComponent /> */}
        </Box>
    )
}