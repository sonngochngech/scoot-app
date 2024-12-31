import { Box, Typography } from '@mui/material';
import { buildVariant } from "./theme"
import colors from "./colors";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Experience({experiences,imgs}: any){

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
                <ExprienceItem header={"For the Body"} content={experiences?.forTheBody}  img={imgs[0]} />
                <ExprienceItem header={"For the Mind"} content={experiences?.forTheMind} img={imgs[1]}/>
                <ExprienceItem header={"For the Soul"} content={experiences?.forTheSoul} img={imgs[2]}/>
            </Box>
        </Box>
    )

}


const ExprienceItem=({header,content,img}:any)=>{
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
            <img src={img} style={{
                width:'100%',
                height: isMobile ?'138px':'206px',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
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