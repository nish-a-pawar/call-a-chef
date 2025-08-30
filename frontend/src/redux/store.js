import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import orderSlice from './orderSlice';
import cartSlice from './cartSlice';
export const store = configureStore({
    reducer:{
        auth:authSlice,
        orders:orderSlice,
        cart: cartSlice

    }

})