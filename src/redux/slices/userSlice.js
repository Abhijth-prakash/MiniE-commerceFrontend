import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE
axios.defaults.withCredentials = true


//registering user
export const registerUser = createAsyncThunk("user/register",
    async (userdata,{ rejectWithValue })=>{
        try{
        const res = await axios.post(`${baseURL}/user/register`,userdata)
        return res.data
        }catch(error){
       return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
         
    }
)


//loginuser
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

//getting user data
export const userProfile = createAsyncThunk("user/profile",
   async (_, {rejectWithValue})=>{
        try{
        const res =  await axios.get(`${baseURL}/user/profile`)
        return res.data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
      
    }
)


//user logout
export const logoutUser = createAsyncThunk("user/logout",
   async (_, {rejectWithValue})=>{
        try{
        const res =  await axios.post(`${baseURL}/user/logout`)
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
        loading:true,
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
            const {user} = action.payload
            state.user= user
            state.isAdmin = user.admin === true
            state.error = null
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(userProfile.pending,(state,action)=>{
            state.loading = true
            state.error = null
        })
        .addCase(userProfile.fulfilled,(state,action)=>{
            state.loading = false
            const {user} = action.payload
            state.user= user
            state.isAdmin = user.admin === true
        })
        .addCase(userProfile.rejected,(state,action)=>{
            state.loading = false
            state.user = null
            state.isAdmin = false
        })
        .addCase(logoutUser.pending,(state,action)=>{
            state.loading = true
            state.error = null
        })
        .addCase(logoutUser.fulfilled,(state,action)=>{
            state.loading = false
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
}
)

export default userSlice.reducer