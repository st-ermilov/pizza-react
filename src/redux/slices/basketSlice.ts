import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type TypePizzaItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    size: number,
    type: string,
    count: number,
    basketId: string
}

type TypeBasketInitialState = {
    totalPrice: number,
    pizzaList: TypePizzaItem[]
}

const initialState: TypeBasketInitialState = {
    totalPrice: 0,
    pizzaList: []
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {

        addPizza: (state, action: PayloadAction<TypePizzaItem>) => {
            const findItem = state.pizzaList.find((item) =>
                item.basketId === action.payload.basketId
            )
            if (findItem) {
                findItem.count++
            } else {
                state.pizzaList.push({...action.payload, count: 1})
            }
            state.totalPrice = state.pizzaList.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },

        incrementPizza: (state, action: PayloadAction<string>) => {
            const findItem = state.pizzaList.find((item) =>
                item.basketId === action.payload
            )
            if (findItem) {
                findItem.count++
            }
            state.totalPrice = state.pizzaList.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },


        decrementPizza: (state, action: PayloadAction<string>) => {
            const findItem = state.pizzaList.find((item) =>
                item.basketId === action.payload
            )

            if (findItem && findItem.count > 1) {
                findItem.count--
            }

            state.totalPrice = state.pizzaList.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },

        removePizza: (state, action: PayloadAction<string>) => {
            state.pizzaList = state.pizzaList.filter((pizza) =>
                pizza.basketId !== action.payload
            )
            state.totalPrice = state.pizzaList.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },

        clearBasket: (state) => {
            state.pizzaList = []
            state.totalPrice = 0
        }
    }
})

export const selectPizzaList = (state: RootState) => state.basket.pizzaList
export const selectTotalPrice = (state: RootState) => state.basket.totalPrice

export const selectFindItem = (basketId: string) => (state: RootState) => state.basket.pizzaList.find((item: TypePizzaItem) => item.basketId === basketId)

export const {
    addPizza,
    removePizza,
    clearBasket,
    incrementPizza,
    decrementPizza
} = basketSlice.actions

export default basketSlice.reducer