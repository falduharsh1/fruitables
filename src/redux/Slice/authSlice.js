import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/base"

const initialState = {
    isLoading : false,
    user : null,
    error : null,
    isValidate : false
}

export const userRegister = createAsyncThunk(
    'auth/userRegister',
    async (data) => {
        const response = await axios.post(BASE_URL + '/user/user-register' , data)

        console.log(response);
        
    }
)

export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async (data) => {
        const response = await axios.post(BASE_URL + '/user/user-login', data ,{withCredentials:true})

        console.log(response.data);

        if(response.data.success){
            return response.data.data
        }
    }
)

export const userLogout = createAsyncThunk(
    'auth/userLogout',
    async (id) => {
        const response = await axios.post(BASE_URL + '/user/logout-user', {_id : id} ,{withCredentials:true})

        console.log(response.data);

        // if(response.data.success){
        //     // return response.data.data
        // }
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(userLogin.fulfilled , (state,action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
            state.isValidate = true;
        })
        builder.addCase(userLogout.fulfilled , (state,action) => {
            state.isLoading = false;
            state.user = null;
            state.error = null;
            state.isValidate = false;
        })
    }
})

export default authSlice.reducer