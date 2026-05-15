import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getProducts =  createAsyncThunk('products/getproducts', 
    async () => {
        try{
    const response = await axios.get('http://localhost:8888')
    const data = response.data.products
    return data
        }catch(error){
            console.log(error)
        }

})

export const addProducts = createAsyncThunk( 'products/addproducts',
    async (ProductData)=>{
        try{
            const response = await axios.post('http://localhost:8888/add',ProductData)
            const data = response.data.product
            return data
        }catch(error){
            console.log(error)
        }
        
    }
)

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
        .addCase(addProducts.pending,(state)=>{
            state.loading =  true
        })
        .addCase(addProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products.push(action.payload)
        })
        .addCase(addProducts.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer

