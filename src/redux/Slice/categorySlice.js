import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/base";

const initialState = {
        isLoading: false,
        Category: [],
        error: null
}


export const getallCatData = createAsyncThunk(
    'Category/getallCatData',
    async () => {
        try {
            const response = await axios.get(BASE_URL + "/category/list-category")

            return response.data.data
        } catch (error) {
            console.log(error);
            
        }
    }
)


export const CategoryDataget = createAsyncThunk(
    'Category/CategoryDataget',
    async (data) => {
        try {
            console.log(data);
            
            const response = await axios.post(BASE_URL + "/category/post-category", data ,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })

            console.log(response.data);

            return response.data.data
            
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'Category/deleteCategory',
    async (id) => {
        try {
            const response = await axios.delete(BASE_URL + "/category/delete-category/" + id)

            return response.data.data._id
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const editCategory = createAsyncThunk(
    'Category/editCategory',
    async (data) => {
        try {
            const response = await axios.put(BASE_URL + "/category/put-category/" + data._id , data , {
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

const categorySlice = createSlice({
    name : 'Category',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(CategoryDataget.fulfilled, (state,action) => {
            state.Category = state.Category.concat(action.payload)
        })
        builder.addCase(getallCatData.fulfilled, (state,action) => {
            state.Category = action.payload
        })
        builder.addCase(deleteCategory.fulfilled, (state,action) => {
            console.log(action.payload);
            
            state.Category = state.Category.filter((v) => v._id !== action.payload)
        })
        builder.addCase(editCategory.fulfilled, (state,action) => {
            state.Category = state.Category?.map((v) => {
                if(v._id === action.payload?._id){
                    return action.payload
                }else{
                    return v
                }
            })
        })  
    }
})

export default categorySlice.reducer