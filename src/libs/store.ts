import { configureStore } from "@reduxjs/toolkit";
import fengShuiReducer from "./slices/fengShuiSlice";

export const store = configureStore({
    reducer: {
        fengShui: fengShuiReducer
    }
});