import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import instance from '../../components/Axios/Config'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { productActions } from '../../store/productSlice'
import { orderActions } from '../../store/orderSlice'
import { uiActions } from '../../store/uiSlice'
import EditProduct from './EditProduct'
import AddReview from '../Reviews/AddReview'
import { useNavigate } from 'react-router'

export default function ExpandedProduct() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const edit = useSelector(state => state.ui.showEdit)
    const rev = useSelector(state => state.ui.showRev)
    const data = useLoaderData()
    const dispatch = useDispatch()

    const editSetup = () => {
        dispatch(productActions.oneProduct({title: data.title, price: data.price, image: data.image, discount: data.discount, _id: data._id, category: data.category, freeShipping: data.freeShipping}))
        dispatch(uiActions.toggleEdit())
      }
    
      const [ui, setUi] = useState({
        text: data.inventory > 1 ? 'Add to Cart' : 'Sold Out',
        color: data.inventory > 1 ? 'orangered' : 'gray'
      })
    
      const addToCart = () => {
        if(!user) {
          return navigate('/login')
        }
        
        if(data.inventory > 1 && user){
          dispatch(orderActions.addToCart({title: data.title, price: data.price, image: data.image, discount: data.discount, product: data._id, category: data.category, freeShipping: data.freeShipping}))
          setUi({
            text: 'Added to Cart',
            color: 'purple'
          })
        }
      }

      const deleteProduct = () => {
        instance.delete(`/products/${data._id}`)
        .then(() => {
          navigate('/store')
        })
        .catch(err => console.log(err))
      }

      useEffect(() => {
        dispatch(productActions.oneProduct({title: data.title, image: data.image, averageRating: data.averageRating}))
      }, [])

      useEffect(() => {
        setTimeout(() => {
          setUi({
            text: data.inventory > 1 ? 'Add to Cart' : 'Sold Out',
            color: data.inventory > 1 ? 'orangered' : 'gray'
          })
        }, 2000)
      }, [ui])

  return (
    <div className='expanded-product'>
        <img src={data.image} alt={data.title} />

        <div className='expanded-product-div'>
            <div>
                <h2>{data.title}</h2>
                <p className='category'>{data.category}</p>
                <div className='price-section'>
                    <h3>${data.price}</h3>
                    {data.discount > 0 && <p>-{data.discount}%</p>}
                </div>
            </div>

            <div className='details'>
                <p className='inventory'>{data.inventory} items left!</p>
                {data.numOfRatings > 0 ? <p className='rating'>Avg.Rating: {data.averageRating}
                <svg onClick={() => dispatch(uiActions.toggleRev())} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'orangered'}}><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg>
                </p> : <p className='rating'>No ratings yet
                <svg onClick={() => dispatch(uiActions.toggleRev())} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'orangered'}}><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg></p>}
            </div>

            <p className='description'>{data.description}</p>
            <Link className='show-reviews' to='reviews'>View Reviews</Link>
        </div>

        
        {user && user.role === 'admin' ? <div className='adminBtns'>
          <div onClick={editSetup} className='e-editBtn'>
            <p>Edit Product</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg>
          </div>
          
          <div onClick={deleteProduct} className='e-delete'>
            <p>Delete</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
          </div>
        </div> : <div style={{background: ui.color}} onClick={addToCart} className='e-addCart'>
            <p>{ui.text}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
          </div>}

        <Link className={user && user.role === 'admin' ? 'admin-purple' : 'user-orange'} to='/store'>Back</Link>
        {edit && <EditProduct />}
        {rev && <AddReview _id={data._id} />}
    </div>
  )
}

export const getData = async ({ params }) => {

    const res = await instance.get(`/products/${params.id}`)
    return res.data.product
}