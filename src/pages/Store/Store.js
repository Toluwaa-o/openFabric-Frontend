import { Outlet } from "react-router"
import Navbar from "../../components/Navbar/Navbar"
import { useEffect } from "react"
import instance from "../../components/Axios/Config"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { userActions } from "../../store/userSlice"
import Msg from "../../components/UI/Msg"
import { uiActions } from "../../store/uiSlice"

export default function Store() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showing = useSelector(state => state.ui.doneMsg)

  useEffect(() => {
    
      if(showing){
        setTimeout(() => {
          dispatch(uiActions.setMessage(false))
          dispatch(uiActions.setIsError(false))
        }, 2000)
      }
}, [showing])

  useEffect(() => {
    instance({
      url: '/users/show-user',
      method: 'get'
    })
    .then(res => {
      dispatch(userActions.getUser(res.data.user))
    })
    .then(() => navigate('/store'))
    .catch(() => {
        console.log('not logged in')
    })

  }, [])

  return (
    <>
    <header>
        <Navbar />
    </header>

    <main>
        <Outlet />
        <Msg />
    </main>
    </>
  )
}
