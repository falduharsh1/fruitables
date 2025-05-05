import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../utils/axiosInstance";

const initialState = {
    isLoading: false,
    product: [],
    subcategory : [],
    error: null
}
export const getproduct = createAsyncThunk(
    'product/getproduct',
    async () => {
        try {
            const response = await axiosInstance.get("product/list-product");

            console.log(response.data.data);

            return response.data.data

        } catch (error) {
            console.log(error);
        }
    }
)

export const addproduct = createAsyncThunk(
    'product/addproduct',
    async (data) => {
        try {
            console.log("helllo");
            
            const response = await axiosInstance.post("product/post-product", data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            });

            console.log(response);

            return response.data.data   
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteproduct = createAsyncThunk(
    'product/deleteproduct',
    async (id) => {
        try {
            console.log(id);
            
            const response = await axiosInstance.delete("product/delete-product/" + id)

            return response.data.data._id
            
        } catch (error) {
            console.log(error);

        }
    }
)

export const editproduct = createAsyncThunk(
    'product/editproduct',
    async (data) => {
        try {
            const response = await axiosInstance.put("product/put-product/" + data._id, {category : data.category , subcategory : data.subcategory , name:data.name, description : data.description, price : data.price ,product_img : data.product_img},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })

            return response.data.data
        } catch (error) {
            console.log(error);

        }
    }
)

export const getSubByCat = createAsyncThunk(
    'subcategory/getSubByCat',
    async (category_id) => {
        try {
            console.log(category_id);
            
            const response = await axiosInstance.get("product/getSubByCat/" + category_id)

            console.log("SubCategoryget", response.data.data);
            

            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getproduct.fulfilled, (state, action) => {
            console.log(action.payload)
            state.product = action.payload
        })
        builder.addCase(getSubByCat.fulfilled ,(state, action) => {
            state.subcategory = action.payload
        })
        builder.addCase(addproduct.fulfilled, (state, action) => {
            state.product = state.product?.concat(action.payload)
        })
        builder.addCase(deleteproduct.fulfilled, (state, action) => {
            state.product = state.product.filter((v) => v._id !== action.payload)
        })
        builder.addCase(editproduct.fulfilled, (state, action) => {
            state.product = state.product?.map((v) => {
                if (v._id === action.payload?._id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })
    }
})


export default productSlice.reducer
