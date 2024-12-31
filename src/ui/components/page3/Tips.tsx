import { Box, Typography } from "@mui/material"
import { buildVariant } from "./theme";
import colors from "./colors";

export default function Tips({location,tips}:any){
    return (
    <Box sx={{
        backgroundImage:'url(/page3/tip.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding:{
            xs:'16px',
            sm:'64px',
        },
     
        borderRadius: '16px',   

        
    }}>
        <Box sx={{
           marginTop:{
            lg:'128px',
            sm:'64px',
            xs:'64px',
           },
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography sx={{...buildVariant(600,'40','48',colors.white)}}>{location} travel tips</Typography>
            <Box sx={{
                display: 'flex',
                gap: '16px',
                flexDirection: 'row',
                marginTop:'32px',
               
                overflowX:{
                    xs:'auto',
                }
            }}>
                {tips?.map((item:any,index:number)=>(
                    <TipItem index={index+1}  header={item?.name} content={item?.description}/>
                ))}
            </Box>  
        </Box>

    </Box>
    )
}

const TipItem=({index,header,content}: any)=>{
    return(
        <Box sx={{
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap:'16px',
            backgroundColor:colors.white,
            minWidth:'275px',
        }}>
            <Box sx={{
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                backgroundColor:'#FFE900',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography >{index}</Typography>
            </Box>
            <Typography sx={buildVariant(600,'20','28')} >{header}</Typography>
            <Typography>{content}</Typography>
        </Box>
    )
}