import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/products'

export default configureStore({
    reducer:{
        Products:productReducer
    }
})