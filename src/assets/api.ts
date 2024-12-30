
const SERVER_URL=process.env.REACT_APP_SERVER;
const APP_URL=process.env.REACT_APP_GATEWAY;
const CHAT_URL=process.env.REACT_APP_CHAT;


export const  fengShuiAppApi={
    fengShuiPrediction: `${SERVER_URL}/api/v1/fengShui/prediction`,
    getTripPlanning: `${SERVER_URL}/api/v1/fengShui/tripPlanning`,
    getTripData: `${SERVER_URL}/api/v1/fengShui`,
    saveTripData: `${SERVER_URL}/api/v1/fengShui/create`,
    getAllLocaionData : `${SERVER_URL}/api/v1/fengShui/cities`,
    chatInit : `${CHAT_URL}/api/v1/chat/initialize`,
    chatVerify : `${CHAT_URL}/api/v1/chat/verify`,
    chatAsk : `${CHAT_URL}/api/v1/chat/ask`
}
export const MapUrl="https://www.google.com/maps/search"
export const ShareUri: string=`${APP_URL}/trip/`