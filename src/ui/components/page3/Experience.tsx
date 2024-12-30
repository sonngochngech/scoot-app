import { Box, Typography } from '@mui/material';
import { buildVariant } from "./theme"
import colors from "./colors";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Experience(){

    return (
        <Box sx={{
            backgroundColor:colors.softYellow,
            borderRadius: '16px',
            padding:'32px',
        }}>
            <Typography sx={buildVariant(600,'28','36')}>Transform Your Wellness with Santorini's Unique Experiences</Typography>
            <Box sx={{
                display: 'flex',
                gap: '16px',
                flexDirection: 'row',
                overflowX:{
                    xs:'auto',
                },
                justifyContent: 'space-between',
                marginTop:'32px',
            }}>
                <ExprienceItem/>
                <ExprienceItem/>
                <ExprienceItem/>
            </Box>
        </Box>
    )

}


const ExprienceItem=()=>{
    const header="Pack Clothing for the Season";
    const content="Santorini’s weather in early spring can be mild, with cool evenings. Prepare light layers, and for luck and harmony, wear shades of blue and white—symbolizing Water and Metal elements for balance and clarity.";
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    
    return(
        <Box sx={{
            backgroundColor:colors.white,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            minWidth:'275px',

        }}>
            <img src="/page3/experience-item.png" style={{
                width:'100%',
                height: isMobile ?'138px':'206px'
            }}
            ></img>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '16px',
            }}>
                <Typography sx={buildVariant(600,'20','28')} >{header}</Typography>
                <Typography>{content}</Typography>
            </Box>

        </Box>
    )
}