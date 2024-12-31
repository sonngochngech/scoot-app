import { useState } from "react";
import { Slider, Box, Grid, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from "@mui/material";
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
    //   if (data === null && jsonUserInfo) {
    //     console.log("oooooo");
    //     const payload: UserInfoTypePayLoad = {
    //       userInfo: { ...jsonUserInfo.userInfo, placeOfBirth: jsonUserInfo?.userInfo?.placeOfBirth?.code },
    //       departureCity: jsonUserInfo?.departureCity?.code,
    //       arrivalCity: jsonUserInfo?.arrivalCity?.code,
    //     };
    //     if (payload) {
    //       getLuckyTravel(payload);
    //     }
    //   }
      if (data === null && jsonUserInfo) {
        console.log("oooooo");
        const payload: UserInfoTypePayLoad = {
            userInfo: {
              "name": "Nguyen Van A",
              "birthdate": "1990-01-01",
              "sex": 1,
              "timeOfBirth": "10:30",
              "placeOfBirth": "HN-VN",
              "phone": "0123456789"
            },
            departureCity: "HN-VN",
            arrivalCity: "NY-US"
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
        console.log("convertRecommendedPlaces");
        console.log(arrivalCity);
        console.log(suggestedCities);
        const recommendedPlaces = [];
        const validArivalImages= await validateImage(arrivalCity.images);
        const validArivalImage = validArivalImages ? validArivalImages[0] : "";

        const validSuggestedImages = await Promise.all(suggestedCities.map(async (city: any) => {
            const validImages = await validateImage(city.images);
            return validImages ? validImages[0] : "";
        }));

        recommendedPlaces.push({
            placeName: arrivalCity.name,
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

    const previousdata = {
        name: "Nguyễn Mai Anh",
        dateOfBirth: "08/08/2000",
        detailFengShui: `According to Feng Shui Bazi, you have a <span style="font-weight: bold;">Metal element</span> and a <span style="font-weight: bold;">Water deficiency</span>. <span style="font-weight: bold;">Your strengths</span> lie in intelligence and excellent communication skills. <span style="font-weight: bold;">However</span>, you may easily be swayed by emotions, leading to stress and mental fatigue.`,
        recommentFengShui: `To balance your destiny and invite more luck and joy into your life, it's recommended that you <span style="font-weight: bold;">should travel to the North</span>, visiting places connected to the <span style="font-weight: bold;">sea or rivers</span>. These destinations embody the dynamic, prosperous, and adventurous spirit that aligns with your element. The coastal atmosphere will help <span style="font-weight: bold;">relieve stress and restore emotional balance</span>. Additionally, you'll have the chance to fully absorb the vital energy of nature, drawing in harmonious vibes from the earth and sky.`,
        recommentPlaces: [
            {
                placeName: "Bali, Indonesia",
                img: "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
                description: [
                    "Bali is a destination rich in Water and Wood elements, symbolizing growth, renewal, and emotional healing—perfect for balancing your energy map.",
                    "Its lush tropical environment and tranquil beaches promote relaxation, emotional harmony, and creative inspiration.",
                    "Enjoy yoga retreats in Ubud, relax by the ocean at Seminyak Beach, and explore sacred water temples like Tirta Empul for spiritual cleansing.",
                ],
            },
            {
                placeName: "Bali, Indonesia",
                img: "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
                description: [
                    "Bali is a destination rich in Water and Wood elements, symbolizing growth, renewal, and emotional healing—perfect for balancing your energy map.",
                    "Its lush tropical environment and tranquil beaches promote relaxation, emotional harmony, and creative inspiration.",
                    "Enjoy yoga retreats in Ubud, relax by the ocean at Seminyak Beach, and explore sacred water temples like Tirta Empul for spiritual cleansing.",
                ],
            },
            {
                placeName: "Bali, Indonesia",
                img: "https://media.istockphoto.com/id/944812540/vi/anh/c%E1%BA%A3nh-quan-n%C3%BAi-ponta-delgada-azores.jpg?s=612x612&w=0&k=20&c=_Q2nGyKzOQDYK3FP8WChOfvOZAM0uw5R0t6Oi1WW_gQ=",
                description: [
                    "Bali is a destination rich in Water and Wood elements, symbolizing growth, renewal, and emotional healing—perfect for balancing your energy map.",
                    "Its lush tropical environment and tranquil beaches promote relaxation, emotional harmony, and creative inspiration.",
                    "Enjoy yoga retreats in Ubud, relax by the ocean at Seminyak Beach, and explore sacred water temples like Tirta Empul for spiritual cleansing.",
                ],
            },
        ],
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleGetTrip = (index:any) => {
        const arrival=renderData?.recommentPlaces[index];
    
    
    const data: TripInfoTypePayLoad = {
      duration: jsonUserInfo?.tripInfo?.duration,
      budget: budget*1000000,
      arrival: arrival,
      departure: jsonUserInfo?.tripInfo?.departure,
      travelerQuantities: 4,
      startDate: jsonUserInfo?.tripInfo?.startDate,
      endDate: jsonUserInfo?.tripInfo?.startDate,
      arrivalImg: arrival.img,
    }
    localStorage.setItem('tripInfo', JSON.stringify(data));
    dispatch(getTripPlanning(data) as any);
    navigate('/page3');

    };

    return (
        <Box>
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

                        <Typography sx={{
                            marginTop: {
                                md: "48px",
                                xs: "38px",
                            },
                            fontSize: "16px",
                            paddingRight: {
                                md: "50px",
                                xs: 0,
                            },
                        }}>
                            For our customer {renderData?.name}, born on {renderData?.dateOfBirth}
                        </Typography>
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

                {renderData?.recommentPlaces?.map((place:any, place_idx:number) => (
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
                                    src={place.img}
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
                                    onClick={handleOpen}
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
                                            <Box sx={{ padding: "30px 12px 30px 12px" }}>
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
                                                            left: `${(budget / 1000) * 100}%`,
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
                                                        max={1000}
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