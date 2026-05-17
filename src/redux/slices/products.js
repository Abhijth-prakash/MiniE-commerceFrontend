import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE

export const getProducts = createAsyncThunk('products/getproducts', 
    async ({ page = 1, limit = 6 ,search ="",filter="",sort="" } = {}) => {
        try {
            const response = await axios.get(baseURL, {
                params: { page, limit ,search, filter,sort }
            })
            return response.data  
        } catch(error) {
            console.log(error)
        }
    }
)

export const addProducts = createAsyncThunk( 'products/addproducts',
    async (ProductData)=>{
        try{
            const response = await axios.post(`${baseURL}/add`,ProductData)
            const data = response.data.product
            return data
        }catch(error){
            console.log(error)
        }
        
    }
)

const productSlice = createSlice({
    name:"products",
   initialState: {
    products: [],
    loading: false,
    error: null,
    page: 1,
    pages: 1,
    total: 0
},
    reducers: {
    setPage: (state, action) => {
        state.page = action.payload
    }
},
    extraReducers: (build)=>{
        build
        .addCase(getProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload.products          
            state.pages = action.payload.pagination.pages    
            state.total = action.payload.pagination.total     
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
export const {setPage} = productSlice.actions

