import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { axiosInstance } from "../../utils/axiosInstance"
import { setAlert } from "./errorSlice"

const initialState = {
    isLoading: false,
    user: null,
    error: null,
    isValidate: false
}

export const userRegister = createAsyncThunk(
    'auth/userRegister',
    async (data, { dispatch }) => {

        try {

            const response = await axiosInstance.post('user/user-register', data)

            console.log(response);

            localStorage.setItem("UserEmail",data.email)

            if (response.data.success) {
                dispatch(setAlert({ variant: "success", message: response.data.message }))
            }

        } catch (error) {

            dispatch(setAlert({ variant: "error", message: error.response.data.message }))

        }

    }
)

export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async (data, { dispatch, rejectWithValue }) => {

        try {

            const response = await axiosInstance.post('user/user-login', data)

            console.log(response.data);

            if (response.data.success) {
                dispatch(setAlert({ variant: "success", message: response.data.message }))
                return response.data.data
            }

        } catch (error) {

            console.log(error);

            dispatch(setAlert({ variant: "error", message: error.response.data.message }))
            return rejectWithValue(error)

        }

    }
)

export const userLogout = createAsyncThunk(
    'auth/userLogout',
    async (id, { dispatch, rejectWithValue }) => {

        try {

            const response = await axiosInstance.post('user/logout-user', { _id: id })

            console.log(response.data);

            if (response.data.success) {
                dispatch(setAlert({ variant: "success", message: response.data.message }))
            }

        } catch (error) {

            dispatch(setAlert({ variant: "error", message: error.response.data.message }))
            return rejectWithValue(error)

        }
    }
)


export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        const response = await axiosInstance.get('user/check-auth')

        console.log(response.data);

        if (response.data.success) {
            return response.data.data
        }
    }
)

export const checkOTP = createAsyncThunk(
    'auth/checkOTP',
    async (data, { dispatch, rejectWithValue }) => {

        try {

            const response = await axiosInstance.post('user/check-verification', data)

            console.log(response.data);

            if (response.data.success) {
                dispatch(setAlert({ variant: "success", message: response.data.message }))
            }

        } catch (error) {

            dispatch(setAlert({ variant: "error", message: error.response.data.message }))
            return rejectWithValue(error)

        }
    }
)

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data , { dispatch, rejectWithValue }) => {

        try {

            const response = await axiosInstance.post('user/forgot-password',data)

            console.log(response.data);

            if (response.data.success) {
                dispatch(setAlert({ variant: "success", message: response.data.message }))
            }

        } catch (error) {

            dispatch(setAlert({ variant: "error", message: error.response.data.message }))
            return rejectWithValue(error)

        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
            state.isValidate = true;
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isValidate = false;
        })
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = null;
            state.isValidate = false;
        })
        builder.addCase(userLogout.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isValidate = false;
        })
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
            state.isValidate = true;
        })
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
            state.isValidate = true;
        })
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = null;
            state.isValidate = false;
        })
    }
})

export default authSlice.reducer