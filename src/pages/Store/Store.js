import { Outlet } from "react-router"
import Navbar from "../../components/Navbar/Navbar"
import { useEffect } from "react"
import instance from "../../components/Axios/Config"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { userActions } from "../../store/userSlice"

export default function Store() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

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
    </main>
    </>
  )
}
