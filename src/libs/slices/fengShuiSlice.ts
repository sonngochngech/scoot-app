import {  createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivityPayLoad } from "../types/type";
import { fengShuiService } from "../services/fengShui";
import { errorMessage } from "../../assets/constant";
interface FengShuiState {
    prediction: any;
    planning: any;
    originalData:any;
    outPlanning: any[];
    allActivities: any[];
    loading: boolean;
    error: string;
    isShare: boolean;
    userInfo: any;
    tripInfo: any;
    isShareLoading: boolean;
    isShareError: string;
    shareLink: string;
    tripLoading: boolean;
    tripError: string;
    isLoadedTrip: boolean;
}


const initialState: FengShuiState = {
    prediction: null,
    originalData:null,
    planning: null,
    outPlanning: [],
    allActivities: [],
    userInfo: null,
    tripInfo: null,
    tripLoading: false,
    tripError: "",
    loading: false,
    error: "",
    isShare: false,
    isShareLoading: false,
    isShareError: "",
    shareLink: "",
    isLoadedTrip: false
    
};

export const getFengShuiPrediction = createAsyncThunk(
    "fengShui/getFengShuiPrediction",
    async (body: any, thunkAPI) => {
        try {
            return await fengShuiService.getFengShui(body);
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getTripPlanning = createAsyncThunk(
    "fengShui/getTripPlanning",
    async (body: any, thunkAPI) => {
        try {
            return await fengShuiService.getTripPlanning(body);
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getTripData = createAsyncThunk(
    "fengShui/getTripData",
    async (id:string , thunkAPI) => {
        try {
            return await fengShuiService.getTripData(id);
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);

        }

    }
)

export const saveTripData=createAsyncThunk(
    "fengShui/saveTripData",
    async (data:any,thunkAPI)=>{
        try{
            return await fengShuiService.savedTripData(data);
        }catch(e:any){
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const fengShuiSlice = createSlice({
    name: "fengShui",
    initialState: initialState,
    reducers: {
        resetFengShuiPrediction: (state) => {
            state.prediction = {};
            state.planning = {};
            state.loading = false;
            state.error = "";
        },
        setPlanning(state, action: PayloadAction<ActivityPayLoad>) {
            const payLoad: ActivityPayLoad = action.payload;
            const outActivites = payLoad.outActivities.map((position) => state.allActivities[position - 1]);
            const inActivites = payLoad.activities.map((position) => state.allActivities[position - 1]);
            state.outPlanning = outActivites;
            state.planning.itinerary[payLoad.day - 1].activities = inActivites;
        },
        setValidImagePlanning(state, action: any){
            let{ validPlanningImages,validOutPlanningImages,allValidAllImages }=action.payload;
            let validPlanningCount=0;
            state.planning.itinerary.forEach((element:any)=>{
                element.activities.forEach((activity:any)=>{         
                        activity.img=[validPlanningImages[validPlanningCount]];
                        validPlanningCount++;
                })
            })
    
            state.outPlanning.forEach((activity:any,index: number)=>{
                    activity.img=[validOutPlanningImages[index]];
            });
            state.allActivities.forEach((activity:any,index:number)=>{
                activity.img=[allValidAllImages[index]];
            });
            state.isLoadedTrip=true;
        },
      
           
    },
    extraReducers: (builder) => {
        builder.addCase(getFengShuiPrediction.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(getFengShuiPrediction.fulfilled, (state, action) => {
            state.prediction = action.payload.result;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(getFengShuiPrediction.rejected, (state, action) => {
            state.error = action.payload as string || errorMessage;
            state.loading = false;
        })
        builder.addCase(getTripPlanning.pending, (state) => {
            state.tripLoading = true;
            state.tripError = "";
        })
        builder.addCase(getTripPlanning.fulfilled, (state, action) => {
            const stringData=JSON.stringify(action.payload.result);
            state.originalData=JSON.parse(stringData);

            action.payload.result.itinerary = action.payload.inPlanning;
            state.planning = action.payload.result;
            state.outPlanning = action.payload.outPlanning;
            state.allActivities =action.payload.allActivities;
            state.tripLoading = false;
            state.tripError = "";
            state.isLoadedTrip=false;
        })

        builder.addCase(getTripPlanning.rejected, (state, action) => {
            state.tripError = action.payload as string || errorMessage;
            state.tripLoading = false;
        })


        builder.addCase(getTripData.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(getTripData.fulfilled, (state, action) => {
            action.payload.result.tripData.itinerary = action.payload.inPlanning;
            state.planning = action.payload.result.tripData;
            state.outPlanning = action.payload.outPlanning;
            state.allActivities = action.payload.allActivities;
            state.loading = false;
            state.userInfo=action.payload.result.userInfo;
            state.tripInfo=action.payload.result.tripInfo;
            state.isShare = true;
            state.error = "";
            state.isLoadedTrip=false;
        })
        builder.addCase(getTripData.rejected, (state, action) => {
            state.error = action.payload as string || errorMessage;
            state.loading = false;

        })


        builder.addCase(saveTripData.pending, (state) => {
            state.isShareLoading = true;
            state.isShareError = "";
        })
        builder.addCase(saveTripData.fulfilled, (state, action) => {
            state.isShareLoading = false;
            state.shareLink = action.payload.result;
            state.isShareError = "";
            
        })
        builder.addCase(saveTripData.rejected, (state, action) => {
            state.isShareError = action.payload as string || errorMessage;
            state.isShareLoading = false
        });

    }
})


export const { resetFengShuiPrediction, setPlanning,setValidImagePlanning } = fengShuiSlice.actions;

export default fengShuiSlice.reducer;