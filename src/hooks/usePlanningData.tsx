import { useSelector } from "react-redux";

const usePlanningData = (id:any) => {
    const activity=useSelector((state:any)=>state.fengShui.allActivities);
    const activityData=activity?.filter((item:any)=>item.id===id);
    if(activityData) return activityData[0];
    return null;
}

export default usePlanningData;
