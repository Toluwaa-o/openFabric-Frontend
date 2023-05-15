import { useNavigate } from 'react-router'
import { useEffect } from "react"
import instance from '../components/Axios/Config'

export default function RouteProtection(props) {
    const navigate = useNavigate()

    useEffect(() => {
        instance({
          url: '/users/show-user',
          method: 'get'
        })
        .then(() => {
            return
        })
        .catch(err => {
            navigate('/login')
        })
    
      }, [])


    return (
        props.children
    )
}
