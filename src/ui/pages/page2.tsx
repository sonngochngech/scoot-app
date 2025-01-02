import { useState } from "react";
import { Slider, Box, Grid, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import BackIcon from "../components/page2/BackIcon";
import { SavedUserInfo, TripInfoTypePayLoad, UserInfoTypePayLoad } from "../../types";
import "swiper/css";
import { styled } from '@mui/material/styles';
import { getFengShuiPrediction, getTripPlanning } from "../../libs/slices/fengShuiSlice";
import { validateImage } from "../../services";
import { useNavigate } from "react-router";
import { json } from "stream/consumers";
import Swal from "sweetalert2";
import ChatComponent from "../components/ChatComponent";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
        borderRadius: '24px',
    },
}));

export const Page2 = () => {
    const MAX_BUDGET = 5000;
    const [budget, setBudget] = useState<number>(0);
    const navigate=useNavigate();
    const handleBudgetChange = (_: Event, newValue: number | number[]) => {
        setBudget(newValue as number);
    };

    const dispatch = useDispatch();
    const [renderData, setRenderData] = useState<any>(null);
    const { loading, error, prediction: data } = useSelector((state: any) => state.fengShui);
    const jsonUserInfo: SavedUserInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo") as string)
      : null;
  
    const getLuckyTravel = (data: any) => {
      dispatch(getFengShuiPrediction(data) as any);
    };
  
    useEffect(() => {
      if (data === null && jsonUserInfo) {
        const payload: UserInfoTypePayLoad = {
          userInfo: { 
             name: jsonUserInfo?.userInfo?.name,
                sex: jsonUserInfo?.userInfo?.sex,
                phone: jsonUserInfo?.userInfo?.phone,
                birthdate: jsonUserInfo?.userInfo?.birthdate,
                timeOfBirth: jsonUserInfo?.userInfo?.timeOfBirth,
                placeOfBirth: jsonUserInfo?.userInfo?.placeOfBirth?.code },
                departureCity: jsonUserInfo?.departureCity?.code,
                 arrivalCity: jsonUserInfo?.arrivalCity?.code,
        };
        if (payload) {
          getLuckyTravel(payload);
        }
      }
      
    }, []);

    useEffect(()=>{
        if(data){
            console.log(data);
            mapData(data).then((result)=>{
                setRenderData(result);
            })
        }
    },[data])

   


    const mapData=async (data:any)=>{
        const {start, enhancePart} = seperateText(data?.comment);
        const recommendedPlaces = await convertRecommendedPlaces(data?.arrivalCity, data?.suggestedCities);
        const result = {
            name: jsonUserInfo?.userInfo?.name||'zo zo',
            dateOfBirth: jsonUserInfo?.userInfo?.birthdate ||'zo zo ',
            detailFengShui:start,
            recommentFengShui: enhancePart,
            recommentPlaces: recommendedPlaces
        };
        return result;

    }
    const seperateText=(text: string)=>{
        const splitPoint = text.indexOf("To enhance");
        const start = text.slice(0, splitPoint).trim();
        const enhancePart = text.slice(splitPoint).trim();
        return {start, enhancePart};
    }

    const convertRecommendedPlaces=async (arrivalCity: any,suggestedCities:any )=>{
        const recommendedPlaces = [];
        const validArivalImages= await validateImage(arrivalCity.images);
        const validArivalImage = validArivalImages ?validArivalImages : [];

        const validSuggestedImages = await Promise.all(suggestedCities.map(async (city: any) => {
            const validImages = await validateImage(city.images);
            return validImages ? validArivalImage : [];
        }));

        recommendedPlaces.push({
            placeName: arrivalCity.name,
            code: arrivalCity.code,
            img: validArivalImage,
            description: [
                arrivalCity.reason[0]["description"],
                arrivalCity.reason[1]["description"],
                arrivalCity.reason[2]["description"],
            ],
        });
        suggestedCities.forEach((city:any, index:number)=>{
            recommendedPlaces.push({
                placeName: city.name,
                code: city.code,
                img: validSuggestedImages[index] ? validSuggestedImages[index] : "",
                description: [
                    city.reason[0]["description"],
                    city.reason[1]["description"],
                    city.reason[2]["description"],
                ],
            });
        });
        console.log("RecommendedPlaces");
        console.log(recommendedPlaces);
        return recommendedPlaces;
    }


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [isChoosenPosition, setIsChoosenPosition] = useState(0);
    const handleOpen = (index:any) =>{
     setOpen(true);
     setIsChoosenPosition(index);
    }
    const handleClose = () => setOpen(false);
    const handleGetTrip = () => {
        const arrival=renderData?.recommentPlaces[isChoosenPosition];
        const data: TripInfoTypePayLoad = {
        duration: jsonUserInfo?.tripInfo?.duration,
        budget: budget,
        arrival: {
            code : arrival.code,
            name: arrival.placeName
        },
        departure: jsonUserInfo?.tripInfo?.departure,
        travelerQuantities: 4,
        startDate: jsonUserInfo?.tripInfo?.startDate,
        endDate: jsonUserInfo?.tripInfo?.startDate,
        arrivalImg: arrival.img,
        arrivalDescription: arrival.description[0],
        }
        localStorage.setItem('tripInfo', JSON.stringify(data));

        console.log(data);
        navigate('/page3');

    };
    if(error){
        Swal.fire({
            icon: "warning",
            confirmButtonText: "Đồng ý",
            title: "<strong>Thông báo</strong>",
            text: error,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/");
            }
        });
    }


    return (
        <Box>
            {!loading && 
                <ChatComponent />
            }
            <Box sx={{
                paddingLeft: {
                    md: "7%",
                    xs: "5%",
                },
                paddingRight: {
                    md: "7%",
                    xs: "5%",
                },
                backgroundColor: "white",
                paddingBottom: {
                    md: "80px",
                    xs: "64px",
                },
            }}>
                <Box sx={{
                    marginTop: {
                        md: "64px",
                        xs: "50px",
                    },
                    marginBottom: "32px",
                }}>
                    <BackIcon url="/" />
                </Box>
                <Grid container spacing="24px">
                    <Grid item xs={12} md={8}>
                        <Typography sx={{
                            fontWeight: "bold",
                            fontSize: {
                                md: "64px",
                                xs: "44px",
                            },
                        }}>
                            Personal Energy Map Analysis Results
                        </Typography>

                        {isMobile &&
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: {
                                        xs: "flex-end",
                                        md: "flex-start",
                                    },
                                }}>
                                <Box
                                    component="img"
                                    src="page2/ic_right.svg"
                                    sx={{
                                        width: {
                                            md: "100%",
                                            xs: "66%",
                                        },
                                        height: "auto",
                                        maxWidth: {
                                            md: "auto",
                                            xs: "400px",
                                        }
                                    }}
                                />
                            </Box>
                        }

                        {loading ? (
                        <Skeleton
                            variant="text"
                            sx={{
                            fontSize: "16px",
                            width: {
                                md: "80%",
                                xs: "100%",
                            },
                            marginTop: {
                                md: "48px",
                                xs: "38px",
                            },
                            }}
                        />
                        ) : (
                        <Typography
                            sx={{
                            marginTop: {
                                md: "48px",
                                xs: "38px",
                            },
                            fontSize: "16px",
                            paddingRight: {
                                md: "50px",
                                xs: 0,
                            },
                            }}
                        >
                            For our customer {renderData?.name}, born on {renderData?.dateOfBirth}
                        </Typography>
                        )}

                        {loading ? (
                        <Skeleton
                            variant="text"
                            sx={{
                            fontSize: "16px",
                            width: {
                                md: "80%",
                                xs: "100%",
                            },
                            marginTop: {
                                md: "48px",
                                xs: "24px",
                            },
                            }}
                        />
                        ) : (
                        <Typography
                            sx={{
                            marginTop: {
                                md: "48px",
                                xs: "24px",
                            },
                            fontSize: "16px",
                            paddingRight: {
                                md: "50px",
                                xs: 0,
                            },
                            }}
                            dangerouslySetInnerHTML={{ __html: renderData?.detailFengShui }}
                        />
                        )}

                        {loading ? (
                        <Skeleton
                            variant="text"
                            sx={{
                            fontSize: "16px",
                            width: {
                                md: "80%",
                                xs: "100%",
                            },
                            marginTop: {
                                md: "48px",
                                xs: "24px",
                            },
                            }}
                        />
                        ) : (
                        <Typography
                            sx={{
                            marginTop: {
                                md: "48px",
                                xs: "24px",
                            },
                            fontSize: "16px",
                            paddingRight: {
                                md: "50px",
                                xs: 0,
                            },
                            }}
                            dangerouslySetInnerHTML={{ __html: renderData?.recommentFengShui }}
                        />
                        )}

                    </Grid>
                    {!isMobile &&
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: {
                                        xs: "flex-end",
                                        md: "flex-start",
                                    },
                                }}>
                                <Box
                                    component="img"
                                    src="page2/ic_right.svg"
                                    sx={{
                                        width: {
                                            md: "100%",
                                            xs: "66%",
                                        },
                                        height: "auto",
                                    }}
                                />
                            </Box>
                        </Grid>
                    }
                </Grid>
            </Box>

            <Box sx={{
                paddingLeft: {
                    md: "7%",
                    xs: "5%",
                },
                paddingRight: {
                    md: "7%",
                    xs: "5%",
                },
                backgroundColor: "#F6F6F6",
            }}>
                <Grid container>
                    <Grid item xs={12} md={7}>
                        <Typography sx={{
                            fontSize: {
                                md: "64px",
                                xs: "44px",
                            },
                            fontWeight: "bold",
                            wordBreak: "break-word",
                            hyphens: "auto",
                            marginTop: {
                                md: "80px",
                                xs: "64px",
                            },
                            marginBottom: {
                                md: "48px",
                                xs: "32px",
                            }
                        }}>
                            Here are the best destinations for you
                        </Typography>
                    </Grid>
                </Grid>
                {loading? <Skeleton variant="rectangular" height={40} />
                : renderData?.recommentPlaces?.map((place:any, place_idx:number) => (
                    <Box
                        sx={{
                            marginBottom: {
                                md: "56px",
                                xs: "32px",
                            },
                            backgroundColor: "white",
                            borderRadius: "24px",
                            position: "relative",
                            height: "auto",
                            display: "block",
                        }}
                    >
                        <Button
                            sx={{
                                position: "absolute",
                                top: {
                                    md: "-16px",
                                    xs: "-8px",
                                },
                                left: {
                                    md: "40px",
                                    xs: "16px",
                                },
                                backgroundColor: "#FFE900",
                                padding: {
                                    md: "27px 24px",
                                    xs: "9px 8px",
                                },
                                fontSize: {
                                    md: "24px",
                                    xs: "14px",
                                },
                                fontWeight: "bold",
                                color: "#1F201E",
                                borderBottomLeftRadius: "244px",
                                borderBottomRightRadius: "244px",
                                borderTopLeftRadius: "8px",
                                borderTopRightRadius: "8px",
                                minWidth: "auto",
                            }}
                        >
                            0{place_idx + 1}
                        </Button>
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    fontSize: {
                                        md: "40px",
                                        xs: "24px",
                                    },
                                    paddingTop: {
                                        md: "64px",
                                        xs: "48px",
                                    },
                                    width: "100%",
                                }}
                            >
                                {place.placeName}
                            </Typography>
                            <Box
                                sx={{
                                    padding: {
                                        md: "40px",
                                        xs: "16px 24px",
                                    },
                                    width: "100%",
                                    position: "relative",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={place.img[0]}
                                    sx={{
                                        width: "100%",
                                        height: {
                                            md: "400px",
                                            xs: "100px",
                                        },
                                        borderRadius: {
                                            md: "24px",
                                            xs: "16px",
                                        },
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    padding: {
                                        md: "0px 40px 40px 40px",
                                        xs: "0px 24px 16px 24px",
                                    },
                                    width: "100%",
                                    position: "relative",
                                }}
                            >
                                <Grid container justifyContent="center">
                                    <Grid item md={6.5} xs={12}>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs="auto"
                                                sx={{
                                                    paddingRight: {
                                                        md: "16px",
                                                        xs: "12px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                <Box
                                                    component="img"
                                                    src="/page2/ic1.svg"
                                                    sx={{
                                                        width: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        height: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        borderRadius: {
                                                            md: "24px",
                                                            xs: "16px",
                                                        },
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography sx={{
                                                    fontSize: {
                                                        md: "16px",
                                                        xs: "14px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                    {place.description[0]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs="auto"
                                                sx={{
                                                    paddingRight: {
                                                        md: "16px",
                                                        xs: "12px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                <Box
                                                    component="img"
                                                    src="/page2/ic2.svg"
                                                    sx={{
                                                        width: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        height: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        borderRadius: {
                                                            md: "24px",
                                                            xs: "16px",
                                                        },
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography sx={{
                                                    fontSize: {
                                                        md: "16px",
                                                        xs: "14px",
                                                    },
                                                    paddingTop: "12px",
                                                    paddingBottom: "12px",
                                                }}>
                                                    {place.description[1]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs="auto"
                                                sx={{
                                                    paddingRight: {
                                                        md: "16px",
                                                        xs: "12px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                <Box
                                                    component="img"
                                                    src="/page2/ic3.svg"
                                                    sx={{
                                                        width: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        height: {
                                                            md: "48px",
                                                            xs: "40px",
                                                        },
                                                        borderRadius: {
                                                            md: "24px",
                                                            xs: "16px",
                                                        },
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography sx={{
                                                    fontSize: {
                                                        md: "16px",
                                                        xs: "14px",
                                                    },
                                                    paddingBottom: "12px",
                                                    paddingTop: "12px",
                                                }}>
                                                    {place.description[2]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                sx={{
                                    padding: {
                                        md: "0px 40px 40px 40px",
                                        xs: "0px 24px 24px 24px",
                                    },
                                    width: "100%",
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    sx={{
                                        backgroundColor: "#000",
                                        color: "#fff",
                                        padding: {
                                            md: "20px 29px 20px 29px",
                                            xs: "13px 0px 13px 0px",
                                        },
                                        fontSize: {
                                            md: "16px",
                                            xs: "14px",
                                        },
                                        textTransform: "uppercase",
                                        borderRadius: "99px",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: "#333",
                                            transform: "scale(1.05)",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                                        },
                                        width: {
                                            md: "auto",
                                            xs: "100%",
                                        },
                                    }}
                                    onClick={()=>handleOpen(place_idx)}
                                >
                                    I WANT TO KNOW MORE
                                </Button>

                                <BootstrapDialog
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={open}
                                >
                                    <Box
                                        sx={{
                                            width: {
                                                md: "600px",
                                                xs: "343px",
                                            },
                                        }}>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: {
                                                    md: '24px',
                                                    xs: '16px',
                                                },
                                            }}
                                        >
                                            <DialogTitle
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: {
                                                        md: '28px',
                                                        xs: '16px',
                                                    },
                                                    margin: 0,
                                                    padding: 0,
                                                }}
                                                id="customized-dialog-title"
                                            >
                                                Let us know your budget!
                                            </DialogTitle>
                                            <IconButton
                                                aria-label="close"
                                                onClick={handleClose}
                                                sx={{
                                                    color: (theme) => theme.palette.grey[500],
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Box>
                                        <DialogContent dividers>
                                            <Box sx={{ padding: "30px 35px 30px 12px", overflow: "hidden", }} >
                                                <Typography sx={{
                                                    fontSize: {
                                                        md: "14px",
                                                        xs: "13px",
                                                    },
                                                    fontWeight: "bold",
                                                    marginBottom: "16px",
                                                }}>
                                                    Your budget {"($/person"}{")"}
                                                </Typography>
                                                <Box sx={{ width: "100%", position: "relative", mt: 5.2 }}>
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            left: `${(budget / MAX_BUDGET) * 100}%`,
                                                            transform: "translateX(-50%)",
                                                            top: "-30px",
                                                            backgroundColor: "#FFEB3B",
                                                            color: "black",
                                                            fontWeight: "bold",
                                                            padding: "5px 10px",
                                                            borderRadius: "5px",
                                                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                                            fontSize: {
                                                                md: "16px",
                                                                xs: "14px",
                                                            },
                                                        }}
                                                    >
                                                        {budget}
                                                    </Box>
                                                    <Slider
                                                        value={budget}
                                                        min={0}
                                                        max={MAX_BUDGET}
                                                        onChange={handleBudgetChange}
                                                        sx={{
                                                            color: "#FFEB3B",
                                                            height: 8,
                                                            '& .MuiSlider-thumb': {
                                                                height: 16,
                                                                width: 16,
                                                                backgroundColor: "#FFEB3B",
                                                                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                                                '&:hover': {
                                                                    boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
                                                                },
                                                            },
                                                            '& .MuiSlider-track': {
                                                                border: "none",
                                                            },
                                                            '& .MuiSlider-rail': {
                                                                opacity: 0.4,
                                                                backgroundColor: "#D3D3D3",
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </DialogContent>
                                        <DialogActions>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    padding: '24px',
                                                }}
                                            >
                                                {!isMobile &&
                                                    <Grid container spacing={"12px"}>
                                                        <Grid item xs={12} md={6}>
                                                            <Button
                                                                fullWidth
                                                                sx={{
                                                                    backgroundColor: '#fff',
                                                                    color: '#000',
                                                                    borderRadius: '99px',
                                                                    padding: '20px 0px',
                                                                    textTransform: 'uppercase',
                                                                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                                                                    '&:hover': {
                                                                        backgroundColor: '#f0f0f0',
                                                                        transform: 'scale(1.05)',
                                                                    },
                                                                    fontSize: {
                                                                        md: "16px",
                                                                        xs: "14px",
                                                                    },
                                                                }}
                                                                onClick={handleClose}
                                                            >
                                                                Return
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Button
                                                                fullWidth
                                                                sx={{
                                                                    backgroundColor: '#000',
                                                                    color: '#fff',
                                                                    borderRadius: '99px',
                                                                    padding: '20px 0px',
                                                                    textTransform: 'uppercase',
                                                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                                    '&:hover': {
                                                                        backgroundColor: '#333',
                                                                        transform: 'scale(1.05)',
                                                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                                                    },
                                                                    fontSize: {
                                                                        md: "16px",
                                                                        xs: "14px",
                                                                    },
                                                                }}
                                                                 onClick={handleGetTrip}
                                                            >
                                                                View Trip Schedule
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                }
                                                {isMobile &&
                                                    <Grid container spacing={"12px"}>
                                                        <Grid item xs={12} md={6}>
                                                            <Button
                                                                fullWidth
                                                                sx={{
                                                                    backgroundColor: '#000',
                                                                    color: '#fff',
                                                                    borderRadius: '99px',
                                                                    padding: '20px 0px',
                                                                    textTransform: 'uppercase',
                                                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                                    '&:hover': {
                                                                        backgroundColor: '#333',
                                                                        transform: 'scale(1.05)',
                                                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                                                    },
                                                                    fontSize: {
                                                                        md: "16px",
                                                                        xs: "14px",
                                                                    },
                                                                }}
                                                                onClick={handleGetTrip}
                                                            >
                                                                View Trip Schedule
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Button
                                                                fullWidth
                                                                sx={{
                                                                    backgroundColor: '#fff',
                                                                    color: '#000',
                                                                    borderRadius: '99px',
                                                                    padding: '20px 0px',
                                                                    textTransform: 'uppercase',
                                                                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                                                                    '&:hover': {
                                                                        backgroundColor: '#f0f0f0',
                                                                        transform: 'scale(1.05)',
                                                                    },
                                                                    fontSize: {
                                                                        md: "16px",
                                                                        xs: "14px",
                                                                    },
                                                                }}
                                                                onClick={handleClose}
                                                            >
                                                                Return
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                }
                                            </Box>
                                        </DialogActions>
                                    </Box>
                                </BootstrapDialog>
                            </Box>
                        </Box>
                    </Box>
                ))}

              
            </Box>
        </Box>
    )
}