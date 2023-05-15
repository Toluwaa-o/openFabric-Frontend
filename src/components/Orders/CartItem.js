import { useDispatch, useSelector } from 'react-redux'
import { orderActions } from '../../store/orderSlice'

export default function CartItem({image, title, category, price, discount, amount, _id, freeShipping}) {
    const cart = useSelector(state => state.order)
    const dispatch = useDispatch()
    const addToCart = () => {
        dispatch(orderActions.addToCart({title, price, image, discount, product: _id, category, freeShipping}))
      }

    const removeFromCart = () => {
        if(amount > 1){
            dispatch(orderActions.removeFromCart({title, price, image, discount, product: _id, category, freeShipping}))
        }
    }

    const removeItem = () => {
        dispatch(orderActions.removeOneItem({title, price, image, discount, product: _id, category, freeShipping}))
    }

  return (
    <div className='cart-item'>
        <div>
            <img src={image} alt={title} />
            <div>
                <p>{title}</p>
                {!freeShipping && <p>Shipping: ${cart.shipping}</p>}
                <p>Tax: $30</p>
            </div>
            {discount > 0 && <p>-{discount}%</p>}
            <h3>${price - ((discount/100)*price)}</h3>
        </div>
        <div>
            <span onClick={removeItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" ><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
            <p>Remove</p>
            </span>

            <div>
                <span style={{background: amount > 1 ? 'orangered' : 'rgb(240, 131, 91)'}} onClick={removeFromCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 11h14v2H5z"></path></svg>
                </span>
                
                <p>{amount}</p>

                <span onClick={addToCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                </span>
            </div>
        </div>
    </div>
  )
}
