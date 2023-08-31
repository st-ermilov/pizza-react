import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

type TypeFetchParams = {
    fetchParams: string
}
export const fetchPizzas = createAsyncThunk<TypePrimaryPizzaItem[], TypeFetchParams>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {fetchParams} = params
        const {data} = await axios.get<TypePrimaryPizzaItem[]>(`https://647734419233e82dd53b241b.mockapi.io/pizza_array?${fetchParams}`)
        return data
    }
)

export type TypePrimaryPizzaItem = {
    id: string,
    imageUrl: string,
    price: number,
    sizes: number[],
    types: number[],
    rating: number,
    category: number,
    title: string

}

type TypePizzasInitialState = {
    pizzas: TypePrimaryPizzaItem[],
    status: 'loading' | 'success' | 'error'
}

const initialState: TypePizzasInitialState = {
    pizzas: [],
    status: 'loading'
}


const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state, action: PayloadAction<TypePrimaryPizzaItem[]>) => {
            state.pizzas = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading'
            state.pizzas = []
        })

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = 'success'
            state.pizzas = action.payload
        })

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error'
            state.pizzas = []
        })

    }
})


export const selectPizzas = (state: RootState) => state.pizzas.pizzas
export const selectStatus = (state: RootState) => state.pizzas.status

export const {
    setPizzas,
} = pizzasSlice.actions

export default pizzasSlice.reducer