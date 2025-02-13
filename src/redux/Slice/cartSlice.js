import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading : false,
    cart : [],
    error : null
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
    name : 'carts',
    initialState,
    reducers : {
        addToCart : (state, action) => {
            console.log(action);

           let carts = state.cart?.find((v) => v.pid === action.payload)
            console.log(carts);
            
            if(carts){
                carts.Qut++
            }else{
                state.cart?.push({
                    pid : action.payload,
                    Qut : 1
                })
            }
            
        }
    }
})

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer
