import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

// export const addToCart = () => {

// }

// export const IncrementQut = () => {

// }

// export const DecrementQut = () => {

// }

// export const RemoveProduct = () => {

// }

const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {

        addToCart: (state, action) => {

            console.log(action);

            let cartsdata = state.cart?.find((v) => v?.pid === action?.payload?.pid)
            console.log(cartsdata);

            if (cartsdata) {
                cartsdata.Qut = cartsdata.Qut + action.payload.Qut
            } else {
                state.cart?.push(action.payload)
            }

        },

        IncrementQut: (state, action) => {

            console.log("increment", action);

            let cartdata = state.cart?.find((v) => v?.pid === action?.payload?.pid)
            console.log(cartdata);

            if (cartdata) {
                cartdata.Qut = cartdata.Qut++
            }

        },

        // DecrementQut : (state, action) => {

        // }
    }
})

export const { addToCart, IncrementQut, DecrementQut } = cartSlice.actions

export default cartSlice.reducer
