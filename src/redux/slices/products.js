import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE
axios.defaults.withCredentials = true



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

const productSlice = createSlice({
    name:"products",
    initialState: {
    products: [],
    loading: true,
    error: null,
    page: 1,
    pages: 1,
    total: 0,
    search:"",
    sort:"",
    filter:"",
},
    reducers: {
    setPage: (state, action) => {
        state.page = action.payload
    },
    setSort: (state, action) => {
        state.sort = action.payload
    },
    setFilter: (state, action) => {
        state.filter = action.payload
    },
    setSearch:(state,action)=>{
        state.search = (action.payload)
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
    }
})

export default productSlice.reducer
export const {setPage,setSearch,setSort,setFilter} = productSlice.actions

