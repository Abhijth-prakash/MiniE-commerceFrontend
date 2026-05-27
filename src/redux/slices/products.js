import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE
axios.defaults.withCredentials = true


//geting producs
export const getProducts = createAsyncThunk('products/getproducts', 
    async ({ page = 1, limit = 6, search = "", filter = "", sort = "" } = {}, { rejectWithValue }) => {
        try {
            const response = await axios.get(baseURL, {
                params: { page, limit ,search, filter,sort }
            })
            return response.data  
        } catch(error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

//adding products
export const addProducts = createAsyncThunk( 'products/addproducts',
    async (ProductData,{rejectWithValue})=>{
        try{
            const response = await axios.post(`${baseURL}/product/add`,ProductData)
            const data = response.data.product
            return data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
        
    }
)


//deleting products
export const deleteProducts = createAsyncThunk('products/deleteproducts',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseURL}/product?id=${id}`)
            return response.data.product
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

//upadting products
export const updateProducts = createAsyncThunk('products/updateproducts',
    async ( {ProductData,id} , { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${baseURL}/product?id=${id}`,ProductData)
            return response.data.product
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

export const getProduct = createAsyncThunk(
    'products/getproduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/product/${id}`)
            return response.data.product
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            )
        }
    }
)

const productSlice = createSlice({
    name:"products",
    initialState: {
    products: [],
    product:null,
    loading: true,
    error: null,
    page: 1,
    pages: 1,
    total: 0,
    search:"",
    sort:"",
    filter:"",
    prevstate:[]
},
    reducers: {
    setPage: (state, action) => {
        state.page = action.payload
    },
    setSort: (state, action) => {
        state.sort = action.payload
        state.page = 1
    },
    setFilter: (state, action) => {
        state.filter = action.payload
        state.page = 1
    },
    setSearch:(state,action)=>{
        state.search = (action.payload)
        state.page = 1
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
            state.error = action.payload
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
            state.error = action.payload
        })
        .addCase(deleteProducts.pending,(state,action)=>{
            const id = action.meta.arg
            state.prevstate = state.products
            state.products = state.products.filter(item=> item._id !== id)
            state.loading =  true
        })
        .addCase(deleteProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload
        })
        .addCase(deleteProducts.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
            state.products = state.prevstate
        })
        .addCase(getProduct.pending,(state,action)=>{
            state.loading =  true
        })
        .addCase(getProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.product = action.payload
        })
        .addCase(getProduct.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default productSlice.reducer
export const {setPage,setSearch,setSort,setFilter} = productSlice.actions

