import {useState, useEffect} from 'react'
import instance from '../../components/Axios/Config'
import Order from './Order'


export default function AllOrders() {
  const [orders, setOrders] = useState(null)
  let loader = <div className="loader"></div>

  useEffect(() => {
    instance({
      url: '/orders/all-orders',
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

  return (
    <>
      {orders ? orders.length > 0 ? <div className='all-orders'>
        {orders.map(order => {
          return <Order key={order._id} total={order.total} status={order.status} orderItems={order.orderItems} shipping={order.shipping} tax={order.tax} />
        })}
        </div> : <p style={{textAlign: 'center', fontWeight: '700', paddingTop: '3em'}}>No orders found!</p> : loader}
    </>
  )
}
