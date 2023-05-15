import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { orderActions } from '../store/orderSlice'

export default function Page() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'))

    if(storedCart && storedCart.length > 0) {
      dispatch(orderActions.populate(storedCart))
    }
  }, [])

  useEffect(() => {
    if(location.pathname === '/'){
      if(user) {
        console.log('here')
        return navigate('/store')
      }else {
        return navigate('/login')
      }
    }
  })
  return (
    <Outlet />
  )
}
