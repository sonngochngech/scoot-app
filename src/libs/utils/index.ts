
export const formatDate=(dateStr:string|null)=>{
    if(dateStr===null) return "";
    const date: Date = new Date(dateStr);
const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
const formattedDate: string = date.toLocaleDateString('en-US', options).replace(/,/g, ',');
return formattedDate;
}