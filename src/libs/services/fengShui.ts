import axios from "axios";
import { LuckyTravelInfo } from "../types/type";
import { fengShuiAppApi } from "../../assets/api";
import { validateImage } from "../../services";

const getFengShui = async (body: LuckyTravelInfo) => {

    try{
        const response = await axios.post(fengShuiAppApi.fengShuiPrediction, body);
        return response.data;
    }catch(e:any){
        throw new Error(e?.response?.data?.message);
    }
}


const getTripPlanning = async (body: any) => {
    
        try{
            const response = await axios.post(fengShuiAppApi.getTripPlanning, body);
            
            const { inPlanning,  outPlanning, allActivities } = createPlanning(response.data.result);
            return {inPlanning: inPlanning, outPlanning: outPlanning, allActivities: allActivities,result: response.data.result};
        }catch(e:any){
                throw new Error(e?.response?.data?.message);
        }
    }

const getTripData= async(id:string)=>{
    try{
        const response=await axios.get(`${fengShuiAppApi.getTripData}/${id}`);
        const { inPlanning, outPlanning, allActivities } = createPlanning(response.data.result.tripData);
        
        
 
        return {inPlanning: inPlanning, outPlanning: outPlanning, allActivities: allActivities,result: response.data.result};
    }catch(e:any){
        console.log(e);
         throw new Error(e?.response?.data?.message);
    }
}

const savedTripData=async(body:any)=>{
    try{
        const response=await axios.post(fengShuiAppApi.saveTripData,body);
        return response.data;
    }catch(e:any){
        throw new Error(e?.response?.data?.message);
    }
}

const createPlanning = (data: any) => {
    try{
        const inLocation: number[] = [];
        const planningActivity: any = [];
        const outPlanningActivity: any = [];
        let allActivities: any[] = [];
        const inFood: number[] = [];
        let activityCount: number = 1;
        data.itinerary.forEach((element: any) => {
            const activityList: any = [];
            element.activities.forEach((activity: any) => {
                if (activity.type === "location") {
                    inLocation.push(activity.position);
                }
                if (activity.type === "food") {
                    inFood.push(activity.position);
                }
                const newActivity = createActivity(data, activity.type, activity.position, activityCount);
                activityList.push(newActivity);
                allActivities.push(newActivity);
                activityCount++;
            });
            planningActivity.push({
                day: element.day,
                realDay: element.realDay,
                activities: activityList
            });
        });
    
    
        data.locations.forEach((location: any) => {
            if (!(inLocation as any).includes(location.position)) {
                

                const newActivity = createActivity(data, "location", location.position, activityCount);
                outPlanningActivity.push(newActivity);
                allActivities.push(newActivity);
                activityCount++;
            }
        });
        data.foods.forEach((food: any) => {
            if (!(inFood as any).includes(food.position)) {
                const newActivity = createActivity(data, "food", food.position, activityCount);
                outPlanningActivity.push(newActivity);
                allActivities.push(newActivity);
                activityCount++;
            }
        });
        return {
            inPlanning: planningActivity,
            outPlanning: outPlanningActivity,
            allActivities: allActivities
        };
    }catch(e:any){
        throw new Error("Hiện tại không thể lên lịch trình cho bạn, vui lòng thử lại sau");
    }
}

const createActivity = (data: any, type: any, id: any, count: any) => {
    try{
        const activity = {
            name: '',
            address: '',
            img: '',
            type: '',
            position: '',
            id: count
    
        };
        if (type === "location") {
            activity.name = data.locations[id - 1]?.name;
            activity.address = data.locations[id - 1]?.address;
            activity.img = data.img.location[id - 1] && data.img.location[id - 1].length > 0 ? data.img.location[id - 1] : ['/replacedImage.jpg'];
            activity.type = "location";
            activity.position = id;
            activity.id = count;
        }
        if (type === "food") {
            activity.name = data.foods[id - 1]?.name;
            activity.address = data?.foods[id - 1]?.address;
            activity.img = data.img.food[id - 1] && data.img.food[id - 1].length > 0 ? data.img.food[id - 1] : ['/replacedImage.jpg]'];
            activity.type = "food";
            activity.position = id;
            activity.id = count;
        }
        return activity;

    }catch(e){
        throw e 
    }
    
    

}

export const fengShuiService = {
    getFengShui,
    getTripPlanning,
    getTripData,
    savedTripData
}