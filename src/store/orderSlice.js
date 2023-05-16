import { createSlice, current } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: null,
        order: null,
        cart: [],
        shipping: 0,
        total: 0
    },
    reducers: {
        allOrders(state, action) {
            state.orders = action.payload
        },
        oneOrder(state, action) {
            state.order = action.payload
        },
        addToCart(state, action) {
            let myIndex
            const isIncluded = state.cart.some((item, index) => {
                if(item.product === action.payload.product){
                    myIndex = index
                    return true
                }else {
                    return false
                }
            })
            action.payload.freeShipping ? state.shipping += 0 : state.shipping += 10
            
            if(isIncluded){
                
                if(Number(action.payload.discount) > 0){
                    let oneProd = (Number(action.payload.discount) / 100) * Number(action.payload.price)
                    let newPrice = Number(action.payload.price) - oneProd
                    state.total += newPrice
                    
                }else {
                    state.total += action.payload.price
                }
                state.cart[myIndex].amount = state.cart[myIndex].amount + 1
                
            }else {
                
                if(Number(action.payload.discount) > 0){
                    let oneProd = (Number(action.payload.discount) / 100) * Number(action.payload.price)
                    let newPrice = Number(action.payload.price) - oneProd
                    state.total += newPrice
                }else {
                    state.total += action.payload.price
                }
                const newObject = action.payload
                newObject.amount = 1
                state.cart = [...state.cart, newObject]
            }
        },
        removeFromCart(state, action) {
            let myIndex
            const isIncluded = state.cart.some((item, index) => {
                if(item._id === action.payload._id){
                    myIndex = index
                    return true
                }else {
                    return false
                }
            })

            action.payload.freeShipping ? state.shipping += 0 : state.shipping -= 10
            
            if(state.cart[myIndex].amount > 1){
                if(Number(action.payload.discount) > 0){
                    let oneProd = (Number(action.payload.discount) / 100) * Number(action.payload.price)
                    let newPrice = Number(action.payload.price) - oneProd
                    state.total -= newPrice
                }else {
                    state.total -= action.payload.price
                }

                state.cart[myIndex].amount = state.cart[myIndex].amount - 1
            }else {
                if(Number(action.payload.discount) > 0){
                    let oneProd = (Number(action.payload.discount) / 100) * Number(action.payload.price)
                    let newPrice = Number(action.payload.price) - oneProd
                    state.total -= newPrice
                }else {
                    state.total -= action.payload.price
                }

                state.cart.splice(myIndex, 1)
            }
        },
        clearOrders(state) {
            state.cart = []
        },
        populate(state, action) {
            state.cart = action.payload.cart
            state.order = action.payload.order
            state.orders = action.payload.orders
            state.shipping = action.payload.shipping
            state.total = action.payload.total
        },
        removeOneItem(state, action) {
            let myIndex
            const isIncluded = state.cart.some((item, index) => {
                if(item._id === action.payload._id){
                    myIndex = index
                    return true
                }
            })

            state.cart.splice(myIndex, 1)
        }
    }
})

export const orderActions = orderSlice.actions
export default orderSlice