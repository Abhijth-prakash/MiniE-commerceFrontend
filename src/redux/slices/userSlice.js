import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE

export const registerUser = createAsyncThunk("user/register",
    async (userdata,{ rejectWithValue })=>{
        try{
        const res = await axios.post(`${baseURL}/user/register`,userdata)
        return res
        }catch(error){
        return rejectWithValue(error.response.data.message)
        }
         
    }
)

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        user:{},
        isAdmin:false,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(build)=>{
        build
        .addCase(registerUser.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
}
)

export default userSlice.reducer