import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE
axios.defaults.withCredentials = true


//addintg to cart
export const addtocart =  createAsyncThunk("products/addtocart",
    async ({productId,quantity},{rejectWithValue})=>{
        try{
            const response = await axios.post(`${baseURL}/product/cart`, { productId,quantity })  
            return response.data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }

    }
)

//getting products from cart
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

//deleting products from cart
export const deleteCart = createAsyncThunk("products/deleteCart",
    async ({productId},{rejectWithValue})=>{
        try{
            const response = await axios.delete(`${baseURL}/product/cart?productId=${productId}`)
             const data = response.data.products
             return data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

//updating qt
export const updatingQt = createAsyncThunk(
    'products/updatingQt',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${baseURL}/product/cart`,
                { productId, quantity }
            )

            return response.data.product
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            )
        }
    }
)

export const orderPlace = createAsyncThunk(
    'products/orderPlace',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${baseURL}/product/cart/dispatch`
            )

            return response.data.product
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            )
        }
    }
)

    

const cartSlice = createSlice({
    name:"cartSLice",
    initialState:{
        cartItems:[],
        loading:true,
        error:null,
    },reducers:{
        clearCart:(state,action)=>{
            state.cartItems = []
        }
    },
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
         .addCase(deleteCart.pending,(state,action)=>{
            state.loading = true
            state.error = null
         })
         .addCase(deleteCart.fulfilled,(state,action)=>{
            state.loading = false
            state.cartItems = action.payload
            state.error = null
         })
         .addCase(deleteCart.rejected,(state,action)=>{
            state.loading= false
            state.error = action.payload
         })
         .addCase(updatingQt.pending,(state,action)=>{
            state.loading = true
            state.error = null
         })
         .addCase(updatingQt.fulfilled,(state,action)=>{
            state.loading = false
            state.cartItems = action.payload
            state.error = null
         })
         .addCase(updatingQt.rejected,(state,action)=>{
            state.loading= false
            state.error = action.payload
         })
         .addCase(orderPlace.pending,(state,action)=>{
            state.loading = true
            state.error = null
         })
         .addCase(orderPlace.fulfilled,(state,action)=>{
            state.loading = false
            state.error = null
         })
         .addCase(orderPlace.rejected,(state,action)=>{
            state.loading= false
            state.error = action.payload
         })
    }
})

export const {clearCart} = cartSlice.actions
export default cartSlice.reducer