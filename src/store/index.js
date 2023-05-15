import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './orderSlice'
import productSlice from './productSlice'
import userSlice from './userSlice'
import uiSlice from './uiSlice'

const store = configureStore({
    reducer: {
        order: orderSlice.reducer,
        product: productSlice.reducer,
        user: userSlice.reducer,
        ui: uiSlice.reducer
    }
})

export default store