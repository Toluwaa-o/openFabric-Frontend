import { useNavigate } from 'react-router'
import { useEffect } from "react"
import instance from '../components/Axios/Config'

export default function AdminRoutes(props) {
    const navigate = useNavigate()

    useEffect(() => {
        instance({
          url: '/users/show-user',
          method: 'get'
        })
        .then(res => {
            
            if(res.data.user.role !== 'admin') {
                navigate('/store')
            }
        })
        .catch(() => {
            navigate('/store')
        })
    
      }, [])

    return (
        props.children
    )
}
