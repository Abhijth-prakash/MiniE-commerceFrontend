import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/products'
import userReducer from './slices/userSlice'
import Cartreducer from './slices/cartSlice'

export default configureStore({
    reducer:{
        Products:productReducer,
        Users:userReducer,
        cart:Cartreducer
    }
})