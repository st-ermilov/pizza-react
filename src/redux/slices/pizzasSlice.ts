import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store"

type TypeFetchParams = {
    fetchParams: string
}
export const fetchPizzas = createAsyncThunk<TypePrimaryPizzaItem[], TypeFetchParams>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {fetchParams} = params
        const {data} = await axios.get<TypePrimaryPizzaItem[]>(`https://66582d845c3617052647319b.mockapi.io/pizzas-array?${fetchParams}`)
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

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

type TypePizzasInitialState = {
    pizzas: TypePrimaryPizzaItem[],
    status: Status
}

const initialState: TypePizzasInitialState = {
    pizzas: [],
    status: Status.LOADING
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
            state.status = Status.LOADING
            state.pizzas = []
        })

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.pizzas = action.payload
        })

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
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