





































// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//     isLoading: false,
//     MyAuto: [],
//     error: null
// }

// export const getMyAuto = createAsyncThunk(
//     'MyAuto/getMyAuto',
//     async () => {
//         try {
//             const response = await axios("http://localhost:8000/MyAuto")

//             // console.log(response);

//             return response.data
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )

// export const addMyAuto = createAsyncThunk(
//     'MyAuto/addMyAuto',
//     async (data) => {
//         try {
//             const response = await axios.post("http://localhost:8000/MyAuto", data)

//             return response.data

//         } catch (error) {
//             console.log(error);
//         }
//     }
// )

// export const deleteMyAuto = createAsyncThunk(
//     'MyAuto/deleteMyAuto',
//     async (id) => {
//         console.log(id);

//         try {
//             const response = await axios.delete("http://localhost:8000/MyAuto/" + id)
//             return id
//         } catch (error) {
//             console.log(error);

//         }
//     }
// )

// export const editMyAuto = createAsyncThunk(
//     'MyAuto/editMyAuto',
//     async (data) => {
//         try {
//             const response = await axios.put("http://localhost:8000/MyAuto/" + data.id, data)

//             return response.data
//         } catch (error) {
//             console.log(error);

//         }
//     }
// )
// const MyAutoSlice = createSlice({
//     name: 'MyAuto',
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(getMyAuto.fulfilled, (state, action) => {
//             console.log(" Data:", action.payload);
//             state.MyAuto = action.payload
//         })
//         builder.addCase(addMyAuto.fulfilled, (state, action) => {
//             state.MyAuto = state.MyAuto.concat(action.payload)
//         })
//         builder.addCase(deleteMyAuto.fulfilled, (state, action) => {
//             state.MyAuto = state.MyAuto.filter((v) => v.id !== action.payload)
//         })
//         builder.addCase(editMyAuto.fulfilled, (state, action) => {
//             console.log(action);

//             state.MyAuto = state.MyAuto?.map((v) => {
//                 if (v.id === action.payload?.id) {
//                     return action.payload
//                 } else {
//                     return v
//                 }
//             })
//         })
//     }
// })

// export default MyAutoSlice.reducer
