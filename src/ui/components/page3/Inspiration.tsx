import { Box, Typography } from '@mui/material';
import { buildVariant } from "./theme"
import colors from "./colors";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Inspiration({wardrobe}: any){

    return (
        <Box sx={{
            backgroundColor:colors.softYellow,
            borderRadius: '16px',
            padding:'32px',
            display: 'flex',
            flexDirection:{
                sm:'column',
                md:'row',
            }
        }}>
            <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flex:{
                sm:'1 0 100%',
                md:'1 0 30%',
            },
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
            padding:{
                sm:'16px',
                md:'32px',
            },
            borderRadius: '16px',
            minWidth:'275px',
            width:{
                sm:'100%',
                md:'33,33%',
            }

        }}>
            <Typography sx={{...buildVariant(600,'28','36')}}>Feng Shui-Inspired Travel Wardrobe for Santorini</Typography>
        </Box >
            <Box sx={{
                display: 'flex',
                gap: '16px',
                flexDirection: 'row',
                overflowX:{
                    md:'auto',
                    lg:'none',
                },
                justifyContent: 'space-between',
                marginTop:'32px',
            }}>
                <ExprienceItem title={"Pack Clothing for the Season"} content={wardrobe?.clotheRecommendations} img={"/page3/clothe-item.png"}/>
                <ExprienceItem title={'Accessory Recommendations'} content={wardrobe?.accessoriesRecommendations} img={"/page3/clothe-1-item.png"}/>
            </Box>
        </Box>
    )

}


const ExprienceItem=({title,content,img}:any)=>{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    
    return(
        <Box sx={{
            backgroundColor:colors.white,
            display: 'flex',
            flex:'1 0 45%',
            flexShrink: 0,
            flexDirection: 'column',
            borderRadius: '16px',
            minWidth:'275px',

        }}>
            <img src={img||''} style={{
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
                <Typography sx={buildVariant(600,'20','28')} >{title}</Typography>
                <Typography>{content}</Typography>
            </Box>

        </Box>
    )
}