// import { createSlice } from "@reduxjs/toolkit"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { axiosInstance } from "../../utils/axiosInstance";
import { setAlert } from "./errorSlice";

// export const initialState = {
//     isLoading : false,
//     subCat : [],
//     error : null
// }

// const SubCategorySlice = createSlice({
//     name : 'subcat',
//     initialState,
//     reducers : {
//         addSubCat : (state , action) => {
//             state.subCat = state.subCat.concat(action.payload)
//         },
//         deleteSubCat : (state , action) => {
//             state.subCat = state.subCat.filter((v) => v.id !== action.payload)
//         },
//         editSubCat : (state , action) => {
//             console.log(action.payload);

//             state.subCat = state.subCat.map((v) => {
//                 if(v.id === action.payload.id){
//                     return action.payload
//                 }else{      
//                     return v
//                 }   
//             })

//         }
//     }
// })

// export const {addSubCat , deleteSubCat , editSubCat} = SubCategorySlice.actions

// export default SubCategorySlice.reducer

const initialState = {
    isLoading: false,
    subCat: [],
    error: null
}

export const getsubcat = createAsyncThunk(
    'subCat/getsubcat',
    async () => {
        try {
            const response = await axiosInstance.get("subcategory/list-subcategory");

            console.log(response);

            return response.data.data

        } catch (error) {
            console.log(error);

        }
    }
)

export const addSubCat = createAsyncThunk(
    'subCat/addSubCat',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            console.log("subcatdata", data);

            const response = await axiosInstance.post("subCategory/post-subcategory", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);

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

export const deleteSubCat = createAsyncThunk(
    'subCat/deleteSubCat',
    async (id) => {
        try {
            console.log(id);

            const response = await axiosInstance.delete("subCategory/delete-subcategory/" + id)

            return response.data.data._id

        } catch (error) {
            console.log(error);

        }
    }
)

export const editSubCat = createAsyncThunk(
    'subCat/editSubCat',
    async (data) => {
        try {
            const response = await axiosInstance.put("subCategory/put-subcategory/" + data._id, { category: data.category, name: data.name, description: data.description, subCat_img: data.subCat_img }, {
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

const SubCategorySlice = createSlice({
    name: 'subCat',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getsubcat.fulfilled, (state, action) => {
            state.subCat = action.payload
        })
        builder.addCase(addSubCat.fulfilled, (state, action) => {
            console.log(action.payload)
            state.subCat = state.subCat?.concat(action.payload)
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
            state.isValidate = true;
        })
        builder.addCase(addSubCat.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
            state.isValidate = false;
        })
        builder.addCase(deleteSubCat.fulfilled, (state, action) => {
            state.subCat = state.subCat.filter((v) => v._id !== action.payload)
        })
        builder.addCase(editSubCat.fulfilled, (state, action) => {
            state.subCat = state.subCat?.map((v) => {
                if (v._id === action.payload?._id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })
    }
})


export default SubCategorySlice.reducer
