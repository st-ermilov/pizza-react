import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
        setCategory: (state, action) => {
            state.category = action.payload
        },

        setSort: (state, action) => {
            state.sort = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})

export const selectCategory = (state) => state.filter.category
export const selectSort = (state) => state.filter.sort
export const selectSearch = (state) => state.filter.search
export const selectCurrentPage = (state) => state.filter.currentPage


export const {
    setCategory,
    setSort,
    setSearch,
    setCurrentPage
} = filterSlice.actions

export default filterSlice.reducer