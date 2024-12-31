export interface UserInfoTypePayLoad{
    userInfo:{
        name: string;
        sex: number;
        phone: string;
        birthdate: string|undefined;
        placeOfBirth: string|undefined;
        timeOfBirth: string|undefined;

    };
    departureCity: string|undefined;
    arrivalCity: string|undefined;

} 

export interface SavedUserInfo{
    userInfo:{
        name: string;
        domestic: number;
        email: string;
        phone: string;
        birthdate: string;
        placeOfBirth: CityType| null;
        timeOfBirth: string| null;
    };
    departureCity: CityType| null;
    arrivalCity: CityType| null;
    tripInfo: {
        duration: number;
        startDate: string;
        endDate: string;
        departure: CityType| null;
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
    departure: CityType;
    arrival: CityType;
    travelerQuantities: number;
    arrivalImg: string,
}
