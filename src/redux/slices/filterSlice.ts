import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type TypeSort = {
    name: string,
    sortProp: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price'
}

type TypeFilterInitialState = {
    category: number,
    sort: TypeSort,
    search: string,
    currentPage: number
}

const initialState: TypeFilterInitialState = {
    category: 0,
    sort: {
        name: 'популярности (возр.)', sortProp: 'rating'
    },
    search: '',
    currentPage: 1
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload
        },

        setSort: (state, action: PayloadAction<TypeSort>) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        }
    }
})

export const selectCategory = (state: RootState) => state.filter.category
export const selectSort = (state: RootState) => state.filter.sort
export const selectSearch = (state: RootState) => state.filter.search
export const selectCurrentPage = (state: RootState) => state.filter.currentPage


export const {
    setCategory,
    setSort,
    setSearch,
    setCurrentPage
} = filterSlice.actions

export default filterSlice.reducer