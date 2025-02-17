import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

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
                cartdata.Qut += 1;
            }

        },

        DecrementQut: (state, action) => {

            let cartData = state?.cart?.find((v) => v?.pid === action?.payload?.pid)

            if (cartData) {
                cartData.Qut += -1
            }
        },

        RemoveProduct : (state , action) => {
            console.log(action.payload);
            console.log(state.cart);
            
            let i = state?.cart?.findIndex((v) => v._pid !== action.payload.pid)

            state.cart.splice(i, 1)

            // console.log(cartData);
            // return cartData
            
     
        }
    }
})

export const { addToCart, IncrementQut, DecrementQut, RemoveProduct} = cartSlice.actions

export default cartSlice.reducer
