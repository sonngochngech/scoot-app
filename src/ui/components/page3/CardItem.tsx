import { Box,  Typography} from '@mui/material';
import { buildVariant } from "./theme"

import { MapIcon } from "./icons/icons";
import { useEffect, useState } from "react";
import { MapUrl } from "../../../assets/api";
import { validateImage } from '../../../services';

export const CardItem = ({ location, isMobile, image }: {location:any, isMobile: any,image: any}) => {
    const [hover, setHover] = useState(false);
    const [isValidImage, setIsValidImage] = useState<string>('');
    const handleMapClick=()=>{
        const url = `${MapUrl}/${location?.name} ${location?.address}`;
        window.open(url, '_blank');

    }
    useEffect(() => {
        const checkImage = async () => {
            const urls = await validateImage(image);
            setIsValidImage(urls && urls.length> 0 ? urls[0] : '/replacedImage.jpg');
        };
        checkImage();
    },[image]);
    return (
        <Box sx={{
            width: isMobile ? '150px' : '28.5vw',
            position: 'relative',
            "&:hover": {
                cursor: "pointer",
            },
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
             <Box sx={{
                borderRadius: '50%',
                padding: '4px',
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#FFFFFF',
            }}
            >
                <MapIcon onClick={handleMapClick} />
            </Box>
            <img src={isValidImage} style={{
                width: isMobile ? '150px' : '28.5vw',
                height: isMobile ? '100px' : '14.3vw',
                borderRadius: '16px',
            }}></img>
            <Typography sx={buildVariant(600,'20','28')}>{location?.name}</Typography>
            <Typography variant="body2">{location?.description} </Typography>
            
        </Box>
    )
}
