import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {fetchParams} = params
        const response = await axios.get(`https://647734419233e82dd53b241b.mockapi.io/pizza_array?${fetchParams}`)
        return response.data
    }
)

const initialState = {
    pizzas: [],
    status: 'loading'
}


const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.pizzas = action.payload
        }
    },
    extraReducers:
        {
            [fetchPizzas.pending]: (state) => {
                state.status = 'loading'
                state.pizzas = []
            },

            [fetchPizzas.fulfilled]: (state, action) => {
                state.pizzas = action.payload
                state.status = 'success'
            },

            [fetchPizzas.rejected]: (state) => {
                state.status = 'error'
                state.pizzas = []
            }
        }
})


export const selectPizzas = (state) => state.pizzas.pizzas
export const selectStatus = (state) => state.pizzas.status

export const {
    setPizzas,
} = pizzasSlice.actions

export default pizzasSlice.reducer