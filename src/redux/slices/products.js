import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { data } from "react-router-dom";

export const getProducts =  createAsyncThunk('products/getproducts', 
    async () => {
    const response = await axios.get('http://localhost:8888')
    const data = response.data.products
    console.log(data)
    return data
})

const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: (build)=>{
        build
        .addCase(getProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.products = action.payload
            state.loading = false
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer

