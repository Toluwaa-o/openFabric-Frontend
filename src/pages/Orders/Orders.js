import {useState, useEffect} from 'react'
import instance from '../../components/Axios/Config'
import Order from './Order'
import Button from '../../components/Button/Button'
import Msg from '../../components/UI/Msg'
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from '../../store/uiSlice'

export default function Orders() {
  const dispatch = useDispatch()
  const showing = useSelector(state => state.ui.doneMsg)
  const [orders, setOrders] = useState(null)
  let loader = <div className="loader"></div>

  useEffect(() => {
    instance({
      url: '/orders',
      method: 'get'
    })
    .then(res => setOrders(res.data.order))
    .catch(err => {
      if(err.response.status === 404){
        setOrders([])
      }else {
        loader = <p style={{textAlign: 'center', fontWeight: '700', paddingTop: '3em', color: 'red'}}>Something went wrong, please try again!</p>
      }
    })

  }, [])

  useEffect(() => {
    
      if(showing){
        setTimeout(() => {
          dispatch(uiActions.setMessage(false))
          dispatch(uiActions.setIsError(false))
        }, 2000)
      }
}, [showing])

  return (
    <>
      {orders ? orders.length > 0 ? <div className='all-orders'>
        {orders.map(order => {
          return <Order key={order._id} total={order.total} status={order.status} orderItems={order.orderItems} shipping={order.shippingFee} tax={order.tax} />
        })}
        </div> : <div className='if-empty'>
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" ><path d="M21 4H2v2h2.3l3.28 9a3 3 0 0 0 2.82 2H19v-2h-8.6a1 1 0 0 1-.94-.66L9 13h9.28a2 2 0 0 0 1.92-1.45L22 5.27A1 1 0 0 0 21.27 4 .84.84 0 0 0 21 4zm-2.75 7h-10L6.43 6h13.24z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="16.5" cy="19.5" r="1.5"></circle></svg>
                </span>

                <h4>You haven't placed any orders yet!</h4>
                <p>Browse our shop and discover the best deals!</p>
                <Button to='/store' text='Start Shopping' />
            </div> : loader}
        <Msg />
    </>
  )
}
