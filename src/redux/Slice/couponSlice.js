import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/base"
import { axiosInstance } from "../../utils/axiosInstance"

const initialState = {
    isLoading: false,
    Coupon: [],
    error: null
}

export const getCoupon = createAsyncThunk(
    'Coupon/getCoupon',
    async () => {
        try {
            const response = await axiosInstance.get( "coupon/get-coupon")

            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const postCoupon = createAsyncThunk(
    'Coupon/postCoupon',
    async (data) => {
        try {
            const response = await axiosInstance.post( "coupon/post-coupon",data)

            return response.data.data
        } catch (error) {
            console.log(error);  
        }
    }
)

export const putCoupon = createAsyncThunk(
    'Coupon/putCoupon',
    async (data) => {
        try {
            const response = await axiosInstance.put( "coupon/put-coupon/" + data._id , data)

            return response.data.data

        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteCoupon = createAsyncThunk(
    'Coupon/deleteCoupon',
    async (id) => {
        try {
            const response = await axiosInstance.delete( "coupon/delete-coupon/" + id)

            return response.data.data._id

        } catch (error) {
            console.log(error);
        }
    }
)

const CouponSlice = createSlice({
    name : 'Coupon',
    initialState,
    extraReducers : (builder) => {
                builder.addCase(getCoupon.fulfilled, (state, action) => {
                    state.Coupon = action.payload
                })
                builder.addCase(postCoupon.fulfilled, (state, action) => {
                    state.Coupon = state.Coupon?.concat(action.payload)
                })
                builder.addCase(deleteCoupon.fulfilled, (state, action) => {
                    state.Coupon = state.Coupon.filter((v) => v._id !== action.payload)
                })
                builder.addCase(putCoupon.fulfilled, (state, action) => {
                    state.Coupon = state.Coupon?.map((v) => {
                        if (v._id === action.payload?._id) {
                            return action.payload
                        } else {
                            return v
                        }
                    })
                })
    }
})

export default CouponSlice.reducer
