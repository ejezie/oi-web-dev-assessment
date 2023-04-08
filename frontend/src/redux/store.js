import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/index"

export const store = configureStore({
    reducer,
    devTools: true
})