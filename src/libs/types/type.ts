export interface LuckyUserInfo{
    name: string;
    birthdate: Date;
    sex: number;
    timeOfBirth: string;
    placeOfBirth: string;
}
export interface LuckyTravelInfo{
    userInfo: LuckyUserInfo;
    departureCity: string;
    arrivalCity: string;
}

export interface ActivityPayLoad{
    day: number;
    activities: number[];
    outActivities: number[];
}

export interface UserInfoPayLoad{
     sex: number;
     hour: number| string;
     minute: number| string;
     gender: string;
     date: string;

}