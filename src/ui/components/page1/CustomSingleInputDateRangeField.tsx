import React from 'react';
import { Box, TextField, Popover } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import dayjs, { Dayjs } from 'dayjs';

interface CustomSingleInputDateRangeFieldProps {
    value: [Dayjs | null, Dayjs | null];
    onChange: (newValue: [Dayjs | null, Dayjs | null]) => void;
}

const CustomSingleInputDateRangeField: React.FC<CustomSingleInputDateRangeFieldProps> = ({ value, onChange }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

    const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (ranges: any) => {
        onChange([dayjs(ranges.selection.startDate), dayjs(ranges.selection.endDate)]);
        handleClose();
    };

    const formattedDateRange = value[0] && value[1]
        ? `${value[0].format('DD/MM/YYYY')} - ${value[1].format('DD/MM/YYYY')}`
        : '';

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <TextField
                label="Date"
                variant="standard"
                value={formattedDateRange}
                placeholder="dd/mm/yyyy - dd/mm/yyyy"
                onClick={handleOpen}
                fullWidth
                InputProps={{
                    sx: {
                        borderRadius: 2.5,
                        height: '40px',
                    },
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <DateRangePicker
                    ranges={[
                        {
                            startDate: value[0]?.toDate() || new Date(),
                            endDate: value[1]?.toDate() || new Date(),
                            key: 'selection',
                        },
                    ]}
                    onChange={handleSelect}
                    showSelectionPreview
                    moveRangeOnFirstSelection={false}
                    months={1}
                    direction="horizontal"
                />
            </Popover>
        </Box>
    );
};

export default CustomSingleInputDateRangeField;