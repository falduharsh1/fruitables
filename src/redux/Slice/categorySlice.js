import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../utils/axiosInstance";
import { setAlert } from "./errorSlice";

const initialState = {
        isLoading: false,
        Category: [],
        error: null
}

export const getallCatData = createAsyncThunk(
    'Category/getallCatData',
    async () => {
        try {
            const response = await axiosInstance.get("/category/list-category")

            return response.data.data
        } catch (error) {
            console.log(error);
            
        }
    }
)


export const CategoryDataget = createAsyncThunk(
    'Category/CategoryDataget',
    async (data,{dispatch ,rejectWithValue}) => {
        try {
            console.log(data);  // {id: '', name: '', des: '', cat_img: ''}
            
            const response = await axiosInstance.post("/category/post-category", data ,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })

            console.log(response.data);

            if(response.data.success){
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

export const deleteCategory = createAsyncThunk(
    'Category/deleteCategory',
    async (id,{dispatch}) => {
        try {
            const response = await axiosInstance.delete("category/delete-category/" + id)

            if(response.data.success){

                dispatch(setAlert({variant : "success" , message : response.data.message }))
                return response.data.data._id

            }
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const editCategory = createAsyncThunk(
    'Category/editCategory',
    async (data,{dispatch}) => {
        try {
            console.log("ffff", data);
            
            const response = await axiosInstance.put("category/put-category/" + data._id , {name:data.name, description : data.description, cat_img : data.cat_img} , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })

            console.log(response);
            

            if(response.data.success){

                dispatch(setAlert({variant : "success" , message : response.data.message }))
                return response.data.data

            }

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
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
            state.isValidate = true;
        })
        builder.addCase(CategoryDataget.rejected, (state, action) => {
                    state.isLoading = false;
                    state.user = null;
                    state.error = action.payload;
                    state.isValidate = false;
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