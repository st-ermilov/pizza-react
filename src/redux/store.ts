import {combineReducers, configureStore} from '@reduxjs/toolkit'
import filterSlice from "./slices/filterSlice";
import basketSlice from "./slices/basketSlice";
import pizzasSlice from "./slices/pizzasSlice";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers(
    {
        filter: filterSlice,
        basket: basketSlice,
        pizzas: pizzasSlice
    }
)

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch