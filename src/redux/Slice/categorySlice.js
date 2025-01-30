import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
        isLoading: false,
        Category: [],
        error: null
}

export const CategoryDataget = createAsyncThunk(
    'Category/CategoryDataget',
    async (data) => {
        try {
            console.log(data);
            
            const response = await axios.post("http://localhost:4000/api/v1/category/post-category", data ,{
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

const categorySlice = createSlice({
    name : 'Category',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(CategoryDataget.fulfilled, (state,action) => {
            state.Category = state.Category.concat(action.payload)
        })
    }
})

export default categorySlice.reducer