import { Box, Button, Grid2, Typography } from "@mui/material";
import { combineSlices } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

interface Budget {
    price: number|null;
    content: string|null;
    title:string;
    img: string;

}

export function BdBreakdown({isMobile,budget}:any) {
    const boxStyle={
        backgroundColor: 'black',
        borderRadius: '20px',

    }
    const subBoxStyle={
        backgroundColor:'#FFE900',
        padding:'1.75rem',
        borderRadius: '16px',
    }
    const secondSubBoxStyle={
        backgroundColor:'black',
        paddingTop:'24px',
        paddingLeft:'24px',
        paddingRight:'24px',
        borderRadius: '16px',
        display: isMobile ? '':'flex',

    }
    const gridStyle={
        backgroundColor:'white',
        borderRadius: '12px',
        padding: 3,
        width: '100%',
    }

    const headingStyle={
        fontSize: '2rem',
        lineHeight: '2.25rem',
        fontWeight: 600,
        marginBottom: '1.75rem'
    }
    const pricestyle={
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: '2rem',
        textAlign: 'right',
    }
    const tileStyle={
        fontSize:'16px',
        fontWeight:500
    }
    const textStyle={
        fontSize: '14px'
    }
    const text1Style={
        fontSize: '20px',
        fontWeight: 500,
        color:'white',
    }
    const buttonStyle={
         backgroundColor: 'white', 
         color: 'black',
         borderRadius: '12px',
         padding:'10px 24px',
         marginBottom:'24px',
         width: isMobile ?  '100%': 'auto',
        }
    
    const imgStyle={
        width:'32px',
        height:'32px'
    }
    const imgStyle1={
        width:'64px',
        height:'64px',
        marginBottom:isMobile ? '16px':''
    }
    const igData: Budget[] = [
        {
            img: '/page3/budget/budget1.svg',
            title: 'Flights',
            content:'Round trip for 1 person',
            price: 1000,

        },
        {
            img: '/page3/budget/budget2.svg',
            title: 'Transportation',
            content:'Airport transfer, public transportation',
            price: 200,
        },
        {
            img: '/page3/budget/budget3.svg',
            title: 'Activities',
            content:'Museum, tours, etc',
            price: 300,

        },
        {
            img: '/page3/budget/budget4.svg',
            title: 'Accommodation',
            content:'Hotel, hostel, etc',
            price: 400,

        },
        {
            img: '/page3/budget/budget5.svg',
            title: 'Food',
            content:'Restaurant, grocery, etc',
            price: 200,
        },
        {
            img: '/page3/budget/budget6.svg',
            title: 'Miscellaneous',
            content:'Souvenirs, tips, etc',
            price: 100,
        },   
    ];
    const  [data,setData]=useState<Budget[]>(igData)
    
    // useEffect(()=>{
    //     if(budget){
    //         const budgetData=Object.entries(budget).map(([key,value])=>{
    //             return {content: value.description,price: value.price}
    //         }
    //     )
    //     setData(data.map((item,index)=>{
    //         return {...item,content: budgetData[index].content,price: budgetData[index].price}
    //     }));
    //     }
        
    // },[budget])
    return (
        <Box sx={boxStyle}>
            <Box sx={subBoxStyle}>
                <Typography sx={headingStyle}>Estimated Budget Breakdown</Typography>
                <Grid2 container spacing={4}>
                    {[0, 1, 2, 3, 4].map((item) => (
                        <Grid2 key={item} className='d-flex justify-content-between' size={{ sm: 12, md: 6 }} sx={gridStyle}>
                            <Box className='d-flex'>
                            <img src={data[item].img} style={{ marginRight: '16px', ...imgStyle }} alt={data[item].title} />
                            <Box>
                                <Typography sx={tileStyle}>{data[item]?.title}</Typography>
                                <Typography sx={textStyle}>{data[item]?.content}</Typography>
                            </Box>
                                
                            </Box>
                            <Box>
                                <Typography sx={pricestyle}>${data[item]?.price}</Typography>
                            </Box>
                        </Grid2>
                    ))}
                    <Grid2 className='d-flex' size={{ sm: 12, md: 6 }} sx={gridStyle}>
                        <img src={data[5].img} style={{ marginRight: '16px',...imgStyle }} alt={data[5].title} />
                        <Box className='flex-grow-1 d-flex align-items-center'>
                            <Typography sx={tileStyle}>{data[5].title}</Typography>
                        </Box>
                        <Box>
                            <Typography sx={pricestyle}>${data[5].price}</Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
            <Box  sx={secondSubBoxStyle}>
                <Box className= {isMobile ?'': 'd-flex align-items-center flex-grow-1'} sx={{
                    marginBottom: '24px',
                }}>
                    <img src="/page3/budget/budget7.svg" alt="Discount" style={{marginRight:'16px',...imgStyle1}} />
                    <Typography sx={text1Style}>We have discount air tickets here for you!</Typography>
                </Box>
                <Button variant='contained' sx={buttonStyle}>
                    Get voucher Now
                </Button>
            </Box>
        </Box>
    )
}