import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DownLoadIcon, ShareIcon } from "./icons/icons";
import colors from "./colors";
import { useDispatch, useSelector } from "react-redux";
// import { saveTripData } from "../../../libs/slices/fengShuiSlice";
import { ShareUri } from "../../../assets/api";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveTripData } from "../../../libs/slices/fengShuiSlice";


export default function TripButtonGroup({ isMobile, target }: any) {

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

    const handleDownload = async () => {
        try {
            setLoading(true);
    
            const canvases = [];
            let totalHeight = 0;
            const elements = document.querySelectorAll("body > *");
    
            const elementsArray = Array.from(elements);
    
            for (const element of elementsArray) {
                const boundingRect = (element as HTMLElement).getBoundingClientRect();
    
                // Kiểm tra nếu phần tử có kích thước hợp lệ
                if (boundingRect.width === 0 || boundingRect.height === 0) {
                    console.warn("Bỏ qua phần tử với kích thước 0:", element);
                    continue;
                }
    
                try {
                    const canvas = await html2canvas(element as HTMLElement, {
                        scale: 2, 
                        useCORS: true, 
                    });
                    canvases.push(canvas);
                    totalHeight += canvas.height;
                } catch (canvasError) {
                    console.error("Lỗi khi tạo canvas cho phần tử:", element, canvasError);
                }
            }
    
            if (canvases.length === 0) {
                console.error("Không có canvas hợp lệ được tạo.");
                return;
            }
    
            const combinedCanvas = document.createElement("canvas");
            const ctx = combinedCanvas.getContext("2d");
    
            combinedCanvas.width = canvases[0].width;
            combinedCanvas.height = totalHeight;
    
            let currentHeight = 0;
            canvases.forEach((canvas) => {
                ctx?.drawImage(canvas, 0, currentHeight);
                currentHeight += canvas.height;
            });
    
            const imgData = combinedCanvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
    
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (combinedCanvas.height * pdfWidth) / combinedCanvas.width;
    
            if (pdfHeight <= pdf.internal.pageSize.getHeight()) {
                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            } else {
                let position = 0;
                while (position < pdfHeight) {
                    pdf.addImage(
                        imgData,
                        "PNG",
                        0,
                        position === 0 ? 0 : -position,
                        pdfWidth,
                        pdfHeight
                    );
                    position += pdf.internal.pageSize.getHeight();
                    if (position < pdfHeight) pdf.addPage();
                }
            }
    
            pdf.save("lich_trinh.pdf");
        } catch (err) {
            console.error("Error generating PDF:", err);
        } finally {
            setLoading(false);
        }
    };
    

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