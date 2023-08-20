import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    pizzaList: []
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {

        addPizza: (state, action) => {
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

        incrementPizza: (state, action) => {
            const findItem = state.pizzaList.find((item) =>
                item.basketId === action.payload.basketId
            )
            if (findItem) {
                findItem.count++
            }
            state.totalPrice = state.pizzaList.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },


        decrementPizza: (state, action) => {
            const findItem = state.pizzaList.find((item) =>
                item.basketId === action.payload.basketId
            )

            if (findItem && findItem.count > 1) {
                findItem.count--
            }

            state.totalPrice = state.pizzaList.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },

        removePizza: (state, action) => {
            state.pizzaList = state.pizzaList.filter((pizza) =>
                pizza.basketId !== action.payload.basketId
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

export const {
    addPizza,
    removePizza,
    clearBasket,
    incrementPizza,
    decrementPizza
} = basketSlice.actions

export default basketSlice.reducer