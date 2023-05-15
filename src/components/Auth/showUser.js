import { useDispatch } from 'react-redux'
import { userActions } from '../../store/userSlice'
import instance from '../Axios/Config'

export const ShowUser = async () => {
    const dispatch = useDispatch()
    try {
        const res = await instance.get('/users/show-user')
        await dispatch(userActions.getUser(res.data.user))
        
        return true
    } catch (error) {
        return false
    }
}
