import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/base"

const initialState = {
    isLoading : false,
    user : null,
    error : null
}

export const userRegister = createAsyncThunk(
    'auth/userRegister',
    async (data) => {
        const response = await axios.post(BASE_URL + '/user/user-register' , data)

        console.log(response);
        
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState,
    extraReducers : (builder) => {

    }
})

export default authSlice.reducer