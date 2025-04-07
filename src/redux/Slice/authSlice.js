import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/base"

const initialState = {
    isLoading: false,
    user: null,
    error: null,
    isValidate: false
}

export const userRegister = createAsyncThunk(
    'auth/userRegister',
    async (data) => {
        const response = await axios.post(BASE_URL + '/user_exam/user-register', data)

        console.log(response)
    }
)

export const loginuser = createAsyncThunk(
    'auth/loginuser',
    async (data) => {
        const response = await axios.post(BASE_URL + '/user_exam/user-login', data,{withCredentials:true})

        if (response.data.success) {
            return response.data.data
        }
    }
)

export const logoutuser = createAsyncThunk(
    'auth/logoutuser',
    async (id) => {
        const response = await axios.post(BASE_URL + '/user_exam/user-logout-user', { _id: id },{withCredentials:true})
    }
)       

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        const response = await axios.post(BASE_URL + '/user_exam/user-check-auth')

        if (response.data.success) {
            return response.data.data
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginuser.fulfilled, (state, action) => {
            state.isLoading= false;
            state.user = action.payload;
            state.error = null;
            state.isValidate = true;
        })
        builder.addCase(logoutuser.fulfilled, (state, action) => {
            state.isLoading= false;
            state.user = null;
            state.error = null;
            state.isValidate = false;
        })
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading= false;
            state.user = action.payload;
            state.error = null;
            state.isValidate = true;
        })
    }
})

export default authSlice.reducer