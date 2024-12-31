export interface UserInfoTypePayLoad{
    userInfo:{
        name: string;
        sex: number;
        phone: string;
        birthdate: string|undefined|null;
        placeOfBirth: string|undefined|null;
        timeOfBirth: string|undefined|null;

    };
    departureCity: string|undefined|null;
    arrivalCity: string|undefined|null;

} 

export interface SavedUserInfo{
    userInfo:{
        name: string;
        sex: number;
        email: string;
        phone: string;
        birthdate: string;
        placeOfBirth: CityType| undefined|null;
        timeOfBirth: string| undefined|null;
    };
    departureCity: CityType|null|undefined;
    arrivalCity: CityType|null|undefined;
    tripInfo:{
        duration:number;
        startDate:  string;
        endDate: string;
        departure: CityType|null|undefined;
    }
}

export interface CityType{
    name: string|undefined;
    code: string|undefined;
}

export interface TripInfoTypePayLoad{
    startDate: string;
    endDate: string;
    duration: number;
    budget: number;  
    departure: CityType|null|undefined;
    arrival: CityType|null|undefined;
    travelerQuantities: number;
    arrivalImg: string[],
    arrivalDescription?: string,
}
