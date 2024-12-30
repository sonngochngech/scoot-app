import { Box, IconButton, Typography } from "@mui/material";
import { CardItem } from "./CardItem";
import { LeftIcon, RightIcon } from "./icons/icons";
import { useEffect, useState } from "react";



export default function LuckyLocation({ isMobile, itemData, itemImage,title }: any) {

    

    const [data, setData] = useState(itemData);
    const [maxIndex, setMaxIndex] = useState(0);
    const [cardPosition, setCardPosition] = useState(0);
    useEffect(() => {
        setData(itemData);
        setMaxIndex(itemData?.length - 4 > 0 ? itemData?.length - 4 : 0);
    }, [itemData]);

    const rightButtonStyle = {
        position: 'absolute',
        top: '40%',
        right: '32px',
        transform: 'translateY(-50%)',
        display: isMobile ? 'none' : (cardPosition === maxIndex?'none':'block'),
        zIndex: 1,
    }
    const leftButtonStyle = {
        position: 'absolute',
        top: '40%',
        left: '32px',
        transform: 'translateY(-50%)',
        display: isMobile ? 'none' : (cardPosition === 0 ? 'none':'block'),
        zIndex: 1,
    }


    const handleRightClick = () => {
        if (cardPosition === maxIndex) return;
        setCardPosition((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
    };

    const handleLeftClick = () => {
        if (cardPosition === 0) return;
        setCardPosition((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    return <Box sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '32px',

    }}>
        <Typography variant="h2" sx={{
            marginBottom: '32px',
            textAlign: 'center',
        }}
        >{title}</Typography>
        <Box sx={{
            width: '100%',
            position: 'relative',
            overflow: isMobile ? 'auto' : 'hidden',
            display: 'flex',
        }}>
            <Box sx={{
                display: 'flex',
                position: 'absoulte',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${cardPosition * 25}%)`,
                width: `100%`
            }}>

                {data?.map((location: any, index: any) => (
                    <Box key={index} sx={{
                        flex: isMobile ? '' : '0 0 25%',
                        boxSizing: isMobile ? '' : 'border-box',
                        marginRight: isMobile ? '16px' : '0',
                    }}>
                        <CardItem location={location} isMobile={isMobile} image={itemImage ? itemImage[index]:''} />
                    </Box>
                ))}
            </Box>
            <IconButton sx={leftButtonStyle}
                onClick={handleLeftClick}
                disabled={cardPosition === 0}
            >
                <LeftIcon sx={{ width: '48px', height: '48px' }} />
            </IconButton>
            <IconButton sx={rightButtonStyle}
                onClick={handleRightClick}
                disabled={cardPosition === maxIndex}
            >
                <RightIcon sx={{ width: '48px', height: '48px' }} />
            </IconButton>
        </Box>

    </Box>
}
