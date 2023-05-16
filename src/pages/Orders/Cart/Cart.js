import { useEffect} from 'react'
import CartItem from '../../../components/Orders/CartItem'
import { useSelector } from 'react-redux'
import Button from '../../../components/Button/Button'
import CheckOut from '../../../components/Button/CheckOut'

export default function Cart() {
    const order = useSelector(state => state.order)

    useEffect(() => {
      if(order.cart.length > 0) {
        localStorage.setItem('orderSlice', JSON.stringify(order))
      }
    }, [order.cart])

  return (
    <div className='cart'>
        {order.cart && order.cart.length > 0 ? <> 
       { order.cart.map(c => {
            return (
                <CartItem 
                key={c.product} 
                title={c.title}
                image={c.image}
                category={c.category}
                discount={c.discount}
                amount={c.amount}
                price={c.price}
                _id={c.product}
                freeShipping={c.freeShipping}
                 />
            )
        })} 
        <CheckOut />
        </>: <div className='if-empty'>
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" ><path d="M21 4H2v2h2.3l3.28 9a3 3 0 0 0 2.82 2H19v-2h-8.6a1 1 0 0 1-.94-.66L9 13h9.28a2 2 0 0 0 1.92-1.45L22 5.27A1 1 0 0 0 21.27 4 .84.84 0 0 0 21 4zm-2.75 7h-10L6.43 6h13.24z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="16.5" cy="19.5" r="1.5"></circle></svg>
                </span>

                <h4>Your cart is empty!</h4>
                <p>Browse our shop and discover the best deals!</p>
                <Button to='/store' text='Start Shopping' />
            </div>}
    </div>
  )
}
