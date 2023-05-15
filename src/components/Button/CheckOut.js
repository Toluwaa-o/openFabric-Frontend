import instance from '../Axios/Config'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { orderActions } from '../../store/orderSlice'

export default function CheckOut() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.order)
    
    const createOrder = () => {
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
        .then(() => console.log('Order placed'))
        .then(() => {
            dispatch(orderActions.clearOrders())
            navigate('/store')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='checkout'>
        <p onClick={createOrder}>Checkout (USD {Number(cart.total + cart.shipping + 30)})</p>
    </div>
  )
}
