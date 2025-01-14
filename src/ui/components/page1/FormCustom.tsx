import {
    Box,
    TextField,
    Typography,
    FormControlLabel,
    Button,
    Grid,
    useMediaQuery,
    Checkbox,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomSingleInputDateRangeField from './CustomSingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Autocomplete from "@mui/material/Autocomplete";
import dayjs, { Dayjs } from 'dayjs';
import cities from '../../../assets/cities.json';
import { SavedUserInfo } from "../../../types";
import { getFengShuiPrediction } from "../../../libs/slices/fengShuiSlice";
import CustomAutocomplete from "./CustomAutocomplete";

interface FormState {
    name: string;
    phone: string;
    email: string;
    dateOfBirth: Dayjs | null;
    timeOfBirth: Dayjs | null;
    placeOfBirth: { name: string; code: string } | null;
    sex: string;
    travelingFrom: { name: string; code: string } | null;
    timeRange: [Dayjs | null, Dayjs | null];
    desiredDestination: { name: string; code: string } | null;
}

const getInitialState = (): FormState => {
    try {
        const storedState = localStorage.getItem('formState');
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            return {
                name: parsedState.name || '',
                phone: parsedState.phone || '',
                email: parsedState.email || '',
                dateOfBirth: parsedState.dateOfBirth ? dayjs(parsedState.dateOfBirth) : null,
                timeOfBirth: parsedState.timeOfBirth
                    ? dayjs().startOf('day').hour(parseInt(parsedState.timeOfBirth.split(':')[0], 10))
                        .minute(parseInt(parsedState.timeOfBirth.split(':')[1], 10))
                    : null,
                placeOfBirth: parsedState.placeOfBirth && parsedState.placeOfBirth.name && parsedState.placeOfBirth.code
                    ? { name: parsedState.placeOfBirth.name, code: parsedState.placeOfBirth.code }
                    : null,
                sex: parsedState.sex || '',
                travelingFrom: parsedState.travelingFrom && parsedState.travelingFrom.name && parsedState.travelingFrom.code
                    ? { name: parsedState.travelingFrom.name, code: parsedState.travelingFrom.code }
                    : null,
                timeRange: [
                    parsedState.timeRange?.[0] ? dayjs(parsedState.timeRange[0]) : null,
                    parsedState.timeRange?.[1] ? dayjs(parsedState.timeRange[1]) : null,
                ],
                desiredDestination: parsedState.desiredDestination && parsedState.desiredDestination.name && parsedState.desiredDestination.code
                    ? { name: parsedState.desiredDestination.name, code: parsedState.desiredDestination.code }
                    : null,
            };
        }
    } catch {
        return {
            name: '',
            phone: '',
            email: '',
            dateOfBirth: null,
            timeOfBirth: null,
            placeOfBirth: null,
            sex: '',
            travelingFrom: null,
            timeRange: [null, null],
            desiredDestination: null,
        };
    }
    return {
        name: '',
        phone: '',
        email: '',
        dateOfBirth: null,
        timeOfBirth: null,
        placeOfBirth: null,
        sex: '',
        travelingFrom: null,
        timeRange: [null, null],
        desiredDestination: null,
    };
};

const isFormStateInvalid = (state: FormState): boolean => {
    for (const [key, value] of Object.entries(state)) {
        if (
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.some((v) => v === null)) ||
            (dayjs.isDayjs(value) && !value.isValid())
        ) {
            return true;
        }
    }
    return false;
};

export default function FormCustom() {
    const [formState, setFormState] = useState<FormState>(getInitialState);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            localStorage.setItem(
                'formState',
                JSON.stringify({
                    ...formState,
                    dateOfBirth: formState.dateOfBirth?.format('YYYY-MM-DD') || null,
                    timeOfBirth: formState.timeOfBirth
                        ? `${formState.timeOfBirth.format('HH')}:${formState.timeOfBirth.format('mm')}`
                        : null,
                    timeRange: [
                        formState.timeRange[0]?.format('YYYY-MM-DD') || null,
                        formState.timeRange[1]?.format('YYYY-MM-DD') || null,
                    ],
                })
            );
        } catch {

        }
    }, [formState]);

    const handleInputChange = (field: keyof FormState, value: any) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const handleSubmit = () => {
        const startDate = formState.timeRange[0] || dayjs();
        const endDate = formState.timeRange[1] || startDate;
        const luckyTravelInfor: SavedUserInfo = {
            userInfo: {
                name: formState.name,
                email: formState.email,
                birthdate: `${Number(formState.dateOfBirth?.get("year"))}-${Number(formState.dateOfBirth?.get("month"))}-${Number(formState.dateOfBirth?.get("date"))}`,
                sex: formState.sex === "male" ? 0 : 1,
                phone: formState.phone,
                timeOfBirth: formState.timeOfBirth ? `${formState.timeOfBirth.format('HH')}:${formState.timeOfBirth.format('mm')}` : null,
                placeOfBirth: formState.placeOfBirth,
            },
            departureCity: formState.travelingFrom,
            arrivalCity: formState.desiredDestination,
            tripInfo: {
                duration: Math.abs(endDate.diff(startDate, "day")),
                startDate: `${Number(formState.timeRange[0]?.get("year"))}-${Number(formState.timeRange[0]?.get("month"))}-${Number(formState.timeRange[0]?.get("date"))}`,
                endDate: `${Number(formState.timeRange[1]?.get("year"))}-${Number(formState.timeRange[1]?.get("month"))}-${Number(formState.timeRange[1]?.get("date"))}`,
                departure: formState.travelingFrom,
            }
        };

        // const payload: UserInfoTypePayLoad = {
        //     userInfo: { ...luckyTravelInfor.userInfo, placeOfBirth: birthPlace?.code },
        //     departureCity: fromPlace?.code,
        //     arrivalCity: toPlace?.code
        // }

        localStorage.setItem("userInfo", JSON.stringify(luckyTravelInfor));
        if (!isFormStateInvalid(formState)) {
            navigate('/trip');
        }
    }

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
                            value={formState.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <TextField
                            required
                            id="phone"
                            label="Phone"
                            placeholder="Your phone"
                            variant="standard"
                            value={formState.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
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
                            value={formState.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={formState.dateOfBirth}
                                onChange={(newValue) => handleInputChange('dateOfBirth', newValue)}
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
                                                // "& .MuiSvgIcon-root": { display: 'none' }
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
                                value={formState.timeOfBirth}
                                onChange={(newValue) => handleInputChange('timeOfBirth', newValue)}
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
                                                // "& .MuiSvgIcon-root": { display: 'none' },
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
                        <CustomAutocomplete
                            label="Place of birth"
                            placeholder="Your place of birth"
                            value={formState.placeOfBirth || null}
                            onChange={(e, value) => handleInputChange('placeOfBirth', value)}
                            options={cities}
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
                            You are
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
                                                checked={formState.sex === 'male'}
                                                onChange={() => handleInputChange('sex', 'male')}
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
                                        label="Male"
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
                                                checked={formState.sex === 'female'}
                                                onChange={() => handleInputChange('sex', 'female')}
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
                                        label="Female"
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
                            marginBottom: "20px",
                        }}>
                            You are traveling from
                        </Typography>
                        <CustomAutocomplete
                            label="Where from"
                            placeholder="Select a city"
                            value={formState.travelingFrom || null}
                            onChange={(e, value) => handleInputChange('travelingFrom', value)}
                            options={cities}
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
                            Time you want to travel
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['CustomSingleInputDateRangeField']}>
                                <CustomSingleInputDateRangeField
                                    value={[
                                        formState.timeRange[0] || null,
                                        formState.timeRange[1] || null,
                                    ]}
                                    onChange={(newValue: [Dayjs | null, Dayjs | null]) => {
                                        handleInputChange('timeRange', [
                                            newValue[0] || null,
                                            newValue[1] || null,
                                        ]);
                                    }} />
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
                            marginBottom: "20px",
                        }}>
                            Your desired destination
                        </Typography>
                        <CustomAutocomplete
                            label="Where to"
                            placeholder="Select a city"
                            value={formState.desiredDestination || null}
                            onChange={(e, value) => handleInputChange('desiredDestination', value)}
                            options={cities}
                        />
                    </Grid>
                </Grid>
                <Button
                    onClick={handleSubmit}
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