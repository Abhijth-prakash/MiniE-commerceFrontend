import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE

export const registerUser = createAsyncThunk("user/register",
    async (userdata,{ rejectWithValue })=>{
        try{
        const res = await axios.post(`${baseURL}/user/register`,userdata)
        return res
        }catch(error){
       return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
         
    }
)

export const loginUser = createAsyncThunk("user/login",
    async (logindata,{rejectWithValue})=>{
        try{
        const res =  await axios.post(`${baseURL}/user/login`,logindata)
        return res.data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
      
    }
)


const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        user:null,
        isAdmin:false,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(build)=>{
        build
        .addCase(registerUser.pending,(state,action)=>{
            state.loading = true
            state.error = null
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(loginUser.pending,(state,action)=>{
            state.loading = true
            state.user =null
            state.isAdmin = false
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false
            state.user= action.payload
         state.isAdmin = action.payload.admin === true
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
}
)

export default userSlice.reducer