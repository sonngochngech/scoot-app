import styled from "@emotion/styled";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import { buildVariant } from "./theme";
import colors from "./colors";
import { SeatIcon } from "./icons/icons";

export default function SeatDialog({ isMobile }: any) {

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Button variant="contained" sx={{ backgroundColor: colors.black, color: colors.white ,borderRadius:'32px',padding:'16px'}} onClick={handleClickOpen} > VIEW LUCKY SEAT NUMBER</Button>
            <CustomDialog open={open} fullWidth={true}>
                <DialogTitle>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Typography sx={buildVariant(600, '24', '32')}>Xây dựng lịch trình</Typography>
                        <ClearIcon onClick={handleClose} />
                    </Box>
                </DialogTitle>
                <DialogContent sx={{
                    display: 'flex',
                    gap: '32px',
                    padding: isMobile ? '8px' : '16px',
                }}>
                    <Box sx={{
                        display: isMobile ? 'none' : 'block',
                    }}>
                        <Typography>Trở về: Thứ 4, 19/02</Typography>
                        <Divider />
                        <Box sx={{ display: 'flex', gap: '20px', paddingTop: '16px' }}>
                            <img src="/tripPlanning/flight.png" style={{ width: '56px', height: '56px' }} />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                <Typography sx={buildVariant(600, '32', '40', 'black')}>07:45 - 09:30</Typography>
                                <Typography sx={buildVariant(400, '16', '24', colors.grey)}>HAN-SGN</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1, padding: isMobile ? '8px' : '16px' }}>
                        <Box sx={{
                            backgroundColor: colors.purple,
                            borderRadius: '16px',
                            padding: '16px',

                        }}>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item: any,index:number) => (
                                    <LineSeat isMobile={isMobile} key={index} />
                                ))
                            }
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        padding: '16px',
                        width: '100%',
                    }}>
                        <Button variant="text" sx={{ color: '#2D43CA', marginRight: '16px' }}>Trở lại</Button>
                        <Button variant="contained" sx={{ backgroundColor: '#2D43CA', color: '#FFFFFF' }}>đặt vé</Button>
                    </Box>
                </DialogActions>
            </CustomDialog>
        </>
    )
}

const LineSeat = ({ isMobile }: any) => {
    return !isMobile ? (<Box sx={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px'
        }}>
            {["A", "B", "C"].map((row: any) => (
                <SeatAvailable seat={row} key={row} />
            ))}
        </Box>
        <Seat />
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px'
            }}
        >
            {["D", "E", "F"].map((row: any) => (
                <SeatAvailable seat={row} key={row} />
            ))}
        </Box>
    </Box>) : (
        <Box sx={{
            marginBottom: '16px',
        }}>
            <Seat />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '8px',
            }}>
                {["A", "B", "C", "D", "E", "F"].map((row: any) => (
                    <SeatAvailable seat={row} isMobile={isMobile} key={row} />
                ))}
            </Box>
        </Box>
    )

}

const Seat = ({ isMobile }: any) => {
    return (
        <Box sx={{
            display: 'flex',
            gap: '8px'
        }}>
            <SeatIcon />
            <Typography sx={buildVariant(600, '16', '24', colors.red)}>Ghế 1</Typography>
        </Box>
    )
}

const SeatAvailable = ({ isMobile, seat }: any) => {
    return (
        <Box sx={{
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            padding: isMobile ? '14px' : '2.3vw',
            backgroundColor: colors.white,
        }}>
            <Typography sx={buildVariant(600, '16', '24', colors.grey)}> {seat}</Typography>

        </Box>
    )
}

const CustomDialog = styled(Dialog)(() => ({
    '& .MuiDialog-paper': {
        maxWidth: '1200px',
        borderRadius: '24px',
        backgroundColor: 'white',
        height: '800px'
    },

}))