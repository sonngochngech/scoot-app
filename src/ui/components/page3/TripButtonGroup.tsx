import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DownLoadIcon, ShareIcon } from "./icons/icons";
import colors from "./colors";
import { useDispatch, useSelector } from "react-redux";
// import { saveTripData } from "../../../libs/slices/fengShuiSlice";
import { ShareUri } from "../../../assets/api";
import { useEffect, useState } from "react";

import { saveTripData } from "../../../libs/slices/fengShuiSlice";

import generatePDF from "react-to-pdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function TripButtonGroup({ isMobile, target,toPdf }: any) {

    const storedTripInfo = localStorage.getItem('tripInfo');
    const storedUserInfo = localStorage.getItem('userInfo');
    const tripInfo = storedTripInfo ? JSON.parse(storedTripInfo) : null;
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    const { isShare, originalData, isShareLoading, isShareError, shareLink, planning: tripData } = useSelector((state: any) => state.fengShui);
    const dispatch = useDispatch();
    const [isError, setIsError] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean | null>(false);

    useEffect(() => {
        if (isShareError) {
            setIsError(isShareError);
            const timer = setTimeout(() => {
                setIsError("");
            }, 5000);
            return () => clearTimeout(timer);
        }

    }, [isShareError]);

    const handleShare = () => {
        let newOrignalData = JSON.parse(JSON.stringify(originalData));
        newOrignalData.itinerary = tripData?.itinerary;
        const data = {
            tripInfo: tripInfo,
            userInfo: userInfo?.userInfo,
            tripData: newOrignalData
        }
        dispatch(saveTripData(data) as any);

    }
    // const handleCopy = () => {
    //     navigator.clipboard.writeText(shareLink);
    // }

    const handleDownload =async() => {
        try{
            setLoading(true);
        await toPdf();
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    

    if (isShare) {
        return (
            <>
            </>
        )
    }

    return (
        <Box sx={{
            marginBottom: '128px',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: !isMobile ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
            }}>


                <Button variant="text" startIcon={<ShareIcon />} sx={{
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    color: colors.black,
                    borderRadius: '8px',
                    width: isMobile ? '100%' : '332px',
                    backgroundColor: colors.white
                }}
                    onClick={handleShare}
                >
                    {isShareLoading ? <CircularProgress size="24px" /> : 'SHARE SCHEDULE'} </Button>

                        <Button variant="contained" sx={{
                            backgroundColor: colors.extentYellow,
                            color: 'black',
                            width: isMobile ? '100%' : '332px',
                            borderRadius: '32px',
                            paddingTop: '14px',
                            paddingBottom: '14px'
                        }} 
                        startIcon={<DownLoadIcon />} onClick={handleDownload}
                        >
                            {loading ? <CircularProgress color="primary" /> : 'DOWLOAD SCHEDULE'}</Button>
              
          
                
            </Box>

            <Box sx={{
                display: (shareLink || isError) ? 'flex' : 'none',
                flexDirection: 'row',
                gap: '16px',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '16px',
                marginTop: '16px',
            }}>

                {shareLink && <Typography sx={{ color: 'black' }}>{ShareUri}{shareLink}</Typography>}
                {isError && <Typography sx={{ color: colors.red }}>Hiện tại không thể chia sẻ, bạn vui lòng thử lại sau</Typography>}


            </Box>
        </Box>





    )


}