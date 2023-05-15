import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { userActions } from "../../store/userSlice"
import instance from "../Axios/Config"
import { orderActions } from '../../store/orderSlice'
import { useEffect } from 'react'

export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.getUser({}))
        instance({
            url: '/auth/logout',
            method: 'delete'
        })
        .then(() => dispatch(orderActions.clearOrders()))
        .then(() => navigate('/login'))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="loader">Logging out...</div>
    )
}