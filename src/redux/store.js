import {configureStore} from '@reduxjs/toolkit'
import filterSlice from "./slices/filterSlice";
import basketSlice from "./slices/basketSlice";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        basket: basketSlice,
        pizzas: pizzasSlice
    }
})