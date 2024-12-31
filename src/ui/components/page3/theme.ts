import { ThemeOptions } from "@mui/material"


const convertToRem=(px: number)=>{
    return `${px/16}rem`
}

export const buildVariant=(fontWeight: number, fontSize: string, lineHeight: string, color?: string)=>{
    return {
        fontSize: convertToRem(parseInt(fontSize)),
        fontWeight: fontWeight,
        lineHeight: convertToRem(parseInt(lineHeight)),
        color: color
    }
}

export function getThemeConfig(mode:any): ThemeOptions {
    return {
        palette: {
            mode: mode,
            primary: {
                main: '#FF0000'
            },
            secondary: {
                main: '#00FF00'
            }
        },
        typography: {
            fontFamily: 'Roboto',
            h1: buildVariant(600, '48px', '56px','white'),
            h2: buildVariant(600, '40px', '56px'),
            h3: buildVariant(600, '20px', '28px'),
            h4: buildVariant(600, '20px', '28px','#1890FF'),
            subtitle1: buildVariant(600, '16px', '24px'),
            subtitle2: buildVariant(600, '14px', '20px'),
            body1: buildVariant(400, '16px', '24px'),
            body2: buildVariant(400, '14px', '20px'),
            caption: buildVariant(400, '20px', '28px','white'),
        },
        breakpoints: {
            keys: ['xs',  'sm', 'md', 'lg', 'xl'],
            values: { xs: 0, sm: 760, md: 960, lg: 1280, xl: 1440},
        },
    }
}