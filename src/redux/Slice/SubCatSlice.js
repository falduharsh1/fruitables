// import { createSlice } from "@reduxjs/toolkit"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

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
            const response = await axios.get("http://localhost:8000/api/v1/subcategory/list-subcategory");

            console.log(response);

            return response.data.data

        } catch (error) {
            console.log(error);

        }
    }
)

// export const getOneDataSubCat = createAsyncThunk(
//     'subCat/getOneDataSubCat',
//     async (data) => {
//         try {
//             const response = await axios.post("http://localhost:8000/subCategory", data ,{
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                   }
//             })

//             return response.data.data
            
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
// )

export const addSubCat = createAsyncThunk(
    'subCat/addSubCat',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/subCategory/post-subcategory", data,{
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

export const deleteSubCat = createAsyncThunk(
    'subCat/deleteSubCat',
    async (id) => {
        try {
            console.log(id);
            
            const response = await axios.delete("http://localhost:8000/api/v1/subCategory/delete-subcategory/" + id)

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
            const response = await axios.put("http://localhost:8000/api/v1/subCategory/put-subcategory/" + data._id, data,{
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
