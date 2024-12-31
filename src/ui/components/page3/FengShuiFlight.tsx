import { Box, Divider, Typography } from '@mui/material';
import colors from './colors';
import { buildVariant } from './theme';
import { SeatIcon, TimeIcon } from './icons/icons';
import EastIcon from '@mui/icons-material/East';
import SeatDialog from './SeatDialog';



export default function FengShuiFlight({ isMobile }: any) {
    const textTypo = {
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '20px',

    }
    return (
        <>
            <Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box component={'img'} src="/page3/header1.svg" sx={{ width: '96px', height: '132px' }} />
                </Box>
                <Typography sx={{ ...buildVariant(600, '40', '56'), textAlign: 'center' }}  >THE BEST TIMING</Typography>
                <Typography sx={{ ...buildVariant(600, '40', '56'), textAlign: 'center' }}  >FOR THE BEST OF LUCK</Typography>
            </Box>
            <Box sx={{
                background: colors.white,
                borderRadius: '16px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                border: '2px #DC437A solid',
            }}>
                <Box sx={{
                    backgroundColor: colors.extentPink,
                    color: colors.white,
                    borderRadius: '16px 16px 0 0',
                    padding: '16px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '8px',
                        flexDirection: 'row',
                        alignItems: 'center',


                    }}>

                        <Typography sx={buildVariant(600, '32', '40', 'white')}>Hà Nội</Typography>
                        <EastIcon sx={{ color: colors.white }} />
                        <Typography sx={buildVariant(600, '32', '40', 'white')}>Nha Trang</Typography>
                    </Box>
                    <Typography sx={{ ...buildVariant(400, '20', '28', 'white'), marginBottom: '16px' }}>Các chuyến bay Hà Nội tới Nha Trang vào ngày 17 tháng 2 sẽ mang lại may mắn cho bạn</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'auto',
                    padding: '16px',
                    gap: '16px',
                    justifyContent: 'space-between',

                }}>
                    <TicketCard isMobile={isMobile} />
                    <TicketCard isMobile={isMobile} />
                    <TicketCard isMobile={isMobile} />
                </Box>

            </Box>
        </>

    )

}


const TicketCard = ({ isMobile }: any) => {

    return (
        <Box sx={{ width: '24rem', backgroundColor: colors.white, gap: '0px', borderRadius: '16px 0 16px 0' }}>
            <Box sx={{ backgroundColor: colors.softPink, borderRadius: '16px 16px 0 0', padding: '1rem', width: '22rem' }}>
                <Typography>Khởi hành: Thứ 2, 17/02</Typography>
                <Divider sx={{ marginTop: '8px', marginBottom: '8px', backgroundColor: colors.extentPink }} />
                <Box sx={{ display: 'flex', gap: '20px', paddingTop: '16px' }}>
                    <img src="/page3/scoot-logo.png" style={{ width: '56px', height: '56px' }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Typography sx={buildVariant(600, '32', '40', colors.red)}>07:45 - 09:30</Typography>
                        <Typography sx={buildVariant(400, '16', '24', colors.grey)}>HAN-SGN</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '16px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',

                    }}>
                        <Typography sx={buildVariant(600, '16', '24')}>07:45</Typography>
                        <Typography sx={buildVariant(600, '16', '24')} >07:45</Typography>
                    </Box>
                    <TimeIcon sx={{ height: '100%' }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Typography sx={buildVariant(600, '16', '24')}>Hà Nội (HAN)</Typography>
                        <Typography sx={buildVariant(600, '16', '24', colors.grey)}>VJ-127 / Airbus A320</Typography>
                        <Typography sx={buildVariant(600, '16', '24')}>Hà Nội (HAN)</Typography>
                    </Box>

                </Box>
            </Box>
            <Box sx={{ width: '22rem', height: '32px', display: 'flex', justifyContent: 'space-between', backgroundColor: colors.softPink }}>
                <Box sx={{ borderRadius: '0 50% 50% 0', width: '32px', height: '32', background: colors.white }}></Box>
                <Box sx={{ borderRadius: '50% 0  0 50%', width: '32px', height: '32', background: colors.white }}></Box>
            </Box>
            <Box sx={{ width: '22rem', backgroundColor: colors.softPink, borderRadius: '0 0 16px 16px' }}>
                <Box sx={{ top: '31.5px', width: '100%', right: '0px', display: 'flex', justifyContent: 'center', paddingBottom: '16px', paddingTop: '16px' }}>
                    <SeatDialog isMobile={isMobile} />
                </Box>
            </Box>
            <Box>
            </Box>
        </Box>
    )

}

const Seat = () => {
    return (
        <Box sx={{
            display: 'flex',
            gap: '8px',
            flex: '0 0 50%',
        }}>
            <SeatIcon sx={{ width: '24px', height: '24px' }} />
            <Typography sx={buildVariant(600, '20', '24')}>Ghế 9</Typography>
        </Box>
    )
}