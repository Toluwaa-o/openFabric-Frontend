import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Product({title, price, image, discount, _id, inventory}) {
  const user = useSelector(state => state.user.user)

  const [ui, setUi] = useState({
    text: inventory > 1 ? 'Add to Cart' : 'Sold Out',
    color: inventory > 1 ? 'orangered' : 'gray'
  })

  useEffect(() => {
    setTimeout(() => {
      setUi({
        text: inventory > 1 ? 'Add to Cart' : 'Sold Out',
        color: inventory > 1 ? 'orangered' : 'gray'
      })
    }, 2000)
  }, [ui])

  return (
    <Link to={`product/${_id}`} className='product'>
        <img src={image} alt={title} />
        <div className='top'>
            <h2>{title}</h2>
            <p>${price}</p>
        </div>
        {Number(discount) > 0 && <p>-{discount}%</p>}
      
        {user && user.role === 'admin' ? <div className='editBtn'>
          <p>Edit Product</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg>
          </div> : <div style={{background: ui.color}} className='addCart'>
          <p>{ui.text}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
          </div>}
    </Link>
  )
}
