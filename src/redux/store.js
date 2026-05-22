import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/products'
import userReducer from './slices/userSlice'

export default configureStore({
    reducer:{
        Products:productReducer,
        Users:userReducer
    }
})