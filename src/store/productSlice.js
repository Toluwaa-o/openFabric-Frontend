import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: null,
        product: null
    },
    reducers: {
        allProducts(state, action) {
            state.products = action.payload
        },
        oneProduct(state, action) {
            state.product = action.payload
        }
    }
})

export const productActions = productSlice.actions
export default productSlice