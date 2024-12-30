import {
    Box,
    TextField,
    Typography,
    FormControlLabel,
    Slider,
    Button,
    Grid,
    useMediaQuery,
    Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomSingleInputDateRangeField from './CustomSingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from 'dayjs';
import cities from './cities.json';

export default function FormCustom() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [selectedPlace, setSelectedPlace] = useState<string>("domestic");
    const handleCheckboxChange = (value: string) => {
        setSelectedPlace(value);
    };
    const [value, setValue] = useState<any>([
        dayjs('01/01/2024', 'DD/MM/YYYY'),
        dayjs('31/12/2024', 'DD/MM/YYYY')
    ]);

    return (
        <Box>
            <Grid container sx={{ position: 'relative', zIndex: 100 }}>
                <Grid item xs={12} md="auto" sx={{ zIndex: 100 }}>
                    <Box
                        sx={{
                            backgroundColor: "#FFF698",
                            paddingTop: "16px",
                            paddingBottom: "16px",
                            paddingLeft: {
                                md: "32px",
                                xs: "16px",
                            },
                            paddingRight: {
                                md: "32px"
                            },
                            width: {
                                md: "fit-content"
                            },
                            borderTopLeftRadius: {
                                md: "16px",
                                xs: "12px",
                            },
                            borderTopRightRadius: {
                                md: "16px",
                                xs: "12px",
                            },
                        }}>
                        <Typography sx={{
                            fontWeight: "bold",
                            fontSize: {
                                md: "24px",
                                xs: "20px",
                            }
                        }}>
                            EXPLORE YOUR LUCKY TRIP
                        </Typography>
                    </Box>
                </Grid>
                {!isMobile &&
                    <Grid item xs={12} md="auto">
                        <Box sx={{
                            height: "100%",
                            position: "relative",
                            display: "flex",
                            alignItems: "flex-end",
                            marginLeft: "-1px",
                        }}>
                            <Box sx={{
                                height: "23px",
                                width: "23px",
                                backgroundColor: "#FFF698",
                                clipPath: "path('M 0 23 L 0 0 L 23 0 A 23 23 0 0 0 0 23 Z')",
                                transform: "scaleY(-1)",
                            }}>
                            </Box>
                        </Box>
                    </Grid>
                }
            </Grid>

            <Box component="form"
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    borderTopRightRadius: {
                        md: "24px",
                        xs: "0px",
                    },
                    borderBottomLeftRadius: {
                        md: "24px",
                        xs: "16px",
                    },
                    borderBottomRightRadius: {
                        md: "24px",
                        xs: "16px",
                    },
                    marginTop: "23px",
                    position: "relative",
                    zIndex: 100,
                }}>
                <Grid container
                    spacing={3}
                    sx={{
                        paddingBottom: "24px",
                        paddingLeft: {
                            md: "32px",
                            xs: "16px",
                        },
                        paddingRight: {
                            md: "32px",
                            xs: "16px",
                        },
                    }}>
                    <Grid item xs={6} md={2.4}>
                        <TextField
                            required
                            id="name"
                            label="Name"
                            placeholder="Your name"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <TextField
                            required
                            id="phone"
                            label="Phone"
                            placeholder="Your phone"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            inputProps={{
                                pattern: "[0-9]{10}",
                                inputMode: "numeric",
                            }}
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                input.value = input.value.replace(/[^0-9]/g, "");
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            placeholder="Your email"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            type="email"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        required: true,
                                        placeholder: "dd/mm/yyyy",
                                        variant: "standard",
                                        InputLabelProps: {
                                            shrink: true,
                                        },
                                        InputProps: {
                                            sx: {
                                                borderRadius: 2.5,
                                                height: "40px",
                                                placeholder: "dd/mm/yyyy",
                                                "& .MuiSvgIcon-root": { display: 'none' }
                                            },
                                        },
                                        sx: {
                                            height: "40px",
                                            width: "100%",
                                            placeholder: "dd/mm/yyyy",
                                        },
                                        fullWidth: true,
                                        label: "Date of birth",
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                format="HH:mm"
                                slotProps={{
                                    textField: {
                                        required: true,
                                        placeholder: "hh:mm",
                                        variant: "standard",
                                        InputLabelProps: {
                                            shrink: true,
                                        },
                                        InputProps: {
                                            sx: {
                                                borderRadius: 2.5,
                                                height: "40px",
                                                placeholder: "hh:mm",
                                                "& .MuiSvgIcon-root": { display: 'none' },
                                            },
                                        },
                                        sx: {
                                            height: "40px",
                                            width: "100%",
                                            placeholder: "hh:mm",
                                        },
                                        fullWidth: true,
                                        label: "Time of birth",
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <TextField
                            required
                            id="place-of-birth"
                            label="Place of birth"
                            placeholder="Your place of birth"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <Typography sx={{
                            fontSize: {
                                md: "14px",
                                xs: "13px",
                            },
                            fontWeight: "bold",
                            marginBottom: "5px",
                        }}>
                            You want to travel
                        </Typography>
                        <Grid container>
                            <Grid item md={12} xs={12}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedPlace === 'domestic'}
                                                onChange={() => handleCheckboxChange('domestic')}
                                                sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        width: 20,
                                                        height: 20,
                                                    },
                                                    '&.Mui-checked': {
                                                        color: '#000',
                                                        '& .MuiSvgIcon-root': {
                                                            borderColor: '#DDDDDD',
                                                        },
                                                    },
                                                    fontSize: "14px",
                                                }}
                                            />
                                        }
                                        label="Domestic"
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} xs={6}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedPlace === 'abroad'}
                                                onChange={() => handleCheckboxChange('abroad')}
                                                sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        width: 20,
                                                        height: 20,
                                                    },
                                                    '&.Mui-checked': {
                                                        color: '#000',
                                                        '& .MuiSvgIcon-root': {
                                                            borderColor: '#DDDDDD',
                                                        },
                                                    },
                                                    fontSize: "14px",
                                                }}
                                            />
                                        }
                                        label="Abroad"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <Typography sx={{
                            fontSize: {
                                md: "14px",
                                xs: "13px",
                            },
                            fontWeight: "bold",
                            marginBottom: "12px",
                        }}>
                            You are traveling from
                        </Typography>
                        <Autocomplete
                            size={"small"}
                            popupIcon={
                                <img
                                    src="/page1/ic_down.svg"
                                    alt="icon"
                                    style={{
                                        width: 18,
                                    }}
                                />
                            }
                            options={cities}
                            autoHighlight
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        {option.name}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Where from"
                                    placeholder="Select a city"
                                    required
                                    variant="standard"
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            borderRadius: 2.5,
                                        },
                                        marginTop: "12px",
                                    }}
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                />
                            )}
                            sx={{
                                "& .MuiAutocomplete-popupIndicator": {
                                    position: "relative",
                                    right: "12px",
                                    zIndex: 1,
                                },
                                "& .MuiAutocomplete-endAdornment": {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <Typography sx={{
                            fontSize: {
                                md: "14px",
                                xs: "13px",
                            },
                            fontWeight: "bold",
                            marginBottom: "12px",
                        }}>
                            You are traveling from
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['CustomSingleInputDateRangeField']}>
                                <CustomSingleInputDateRangeField value={value}
                                    onChange={(newValue: any) => setValue(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <Typography sx={{
                            fontSize: {
                                md: "14px",
                                xs: "13px",
                            },
                            fontWeight: "bold",
                            marginBottom: "12px",
                        }}>
                            Your desired destination
                        </Typography>
                        <Autocomplete
                            size={"small"}
                            popupIcon={
                                <img
                                    src="/page1/ic_down.svg"
                                    alt="icon"
                                    style={{
                                        width: 18,
                                    }}
                                />
                            }
                            options={cities}
                            autoHighlight
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        {option.name}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Where to"
                                    placeholder="Select a city"
                                    required
                                    variant="standard"
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            borderRadius: 2.5,
                                        },
                                        marginTop: "12px",
                                    }}
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                />
                            )}
                            sx={{
                                "& .MuiAutocomplete-popupIndicator": {
                                    position: "relative",
                                    right: "12px",
                                    zIndex: 1,
                                },
                                "& .MuiAutocomplete-endAdornment": {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: "#1F201E",
                        paddingTop: {
                            md: "20px",
                            xs: "18px",
                        },
                        paddingBottom: {
                            md: "20px",
                            xs: "18px",
                        },
                        textTransform: "none",
                        borderBottomLeftRadius: {
                            md: "24px",
                            xs: "16px",
                        },
                        borderBottomRightRadius: {
                            md: "24px",
                            xs: "16px",
                        },
                        fontSize: {
                            md: "16px",
                            xs: "14px",
                        },
                        marginTop: {
                            md: "-10px",
                            xs: "-10px",
                        },
                    }}
                >
                    EXPLORE NOW
                </Button>
            </Box>
        </Box>
    );
}