import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE
axios.defaults.withCredentials = true

export const addtocart =  createAsyncThunk("products/addtocart",
    async (productId,{rejectWithValue})=>{
        try{
            const response = await axios.post(`${baseURL}/product/cart`, { productId })  
            console.log(response)
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }

    }
)

export const getCart = createAsyncThunk("products/getCart",
    async (_, {rejectWithValue})=>{
        try{
              const response =  await axios.get(`${baseURL}/product/cart`)
              const data = response.data.products
              return data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

const cartSlice = createSlice({
    name:"cartSLice",
    initialState:{
        cartItems:[],
        loading:false,
        error:null
    },reducers:{},
    extraReducers:(build)=>{
         build
         .addCase(addtocart.pending,(state,action)=>{
            state.loading = true
            state.error = null
         })
         .addCase(addtocart.fulfilled,(state,action)=>{
            state.loading = false
            state.error = null
         })
         .addCase(addtocart.rejected,(state,action)=>{
            state.loading= false
            state.error = action.payload
         })
         .addCase(getCart.pending,(state,action)=>{
            state.loading = true
            state.error = null
         })
         .addCase(getCart.fulfilled,(state,action)=>{
            state.loading = false
            state.cartItems = action.payload
            state.error = null
         })
         .addCase(getCart.rejected,(state,action)=>{
            state.loading= false
            state.error = action.payload
         })
    }
})

export default cartSlice.reducer