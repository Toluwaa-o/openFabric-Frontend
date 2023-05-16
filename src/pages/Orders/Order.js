import React from 'react'

export default function Order({total, status, orderItems, shipping, tax}) {
  return (
    <div className='order-item'>
      {orderItems.map(item => {
        return (
        <div key={item._id} className='order-sec'>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
          <p>{parseInt(item.price)} x {item.amount} = {parseInt(item.price*item.amount)}</p>
        </div>
        )
      })}
      <div>
        <div>
          <p>Shipping Free: ${shipping}</p>
          <p>Tax: ${tax}</p>
        </div>
        <div>
        <p style={{color: status === 'pending' ? 'gray' : status === 'cancelled' ? 'red' : 'green', fontWeight: '700'}}>{status}</p>
        <h3 style={{fontWeight: '800'}}>Total: ${parseInt(total)}</h3>
        </div>
      </div>
    </div>
  )
}
