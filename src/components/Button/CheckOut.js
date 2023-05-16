import instance from '../Axios/Config'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { orderActions } from '../../store/orderSlice'
import { uiActions } from '../../store/uiSlice'
import { useState, useEffect } from 'react'

export default function CheckOut() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.order)

    const [ui, setUi] = useState({
        text: '',
        color: 'orangered'
    })

    useEffect(() => {
        if(cart.cart.length > 0){
            setUi(prev => ({...prev, text: `Checkout (USD ${parseInt(Number(cart.total + cart.shipping + 30))})w.Tax`}))
        }
    }, [cart])
    
    const createOrder = () => {
        setUi({
            text: 'Placing Order...',
            color: 'purple'
        })
        const newCart = cart.cart.filter(c => {
            const { title, price, image, amount, product } = c
            return { title, price, image, amount, product }
        })

        let orderData = {
            tax: 30,
            shippingFee: cart.shipping,
            items: newCart
        }

        instance({
            url: '/orders',
            method: 'post',
            data: orderData,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            dispatch(uiActions.setMessage(true))
            dispatch(uiActions.setIsError(false))
        })
        .then(() => {
            dispatch(orderActions.clearOrders())
            navigate('/store/orders')
            setUi({
                text: '',
                color: 'orangered'
            })
        })
        .catch(() => {
            dispatch(uiActions.setMessage(true))
            dispatch(uiActions.setIsError(true))
        })
    }
  return (
    <div style={{background: ui.color}} className='checkout'>
        <p onClick={createOrder}>{ui.text}</p>
    </div>
  )
}
