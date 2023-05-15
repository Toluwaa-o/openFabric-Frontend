import {useState, useEffect} from 'react'
import instance from '../../components/Axios/Config'
import User from './User'

export default function AllUsers() {
  const [users, setUsers] = useState(null)
  let loader = <div className="loader"></div>

  useEffect(() => {
    instance({
      url: '/users',
      method: 'get'
    })
    .then(res => setUsers(res.data.users))
    .catch(err => {
      if(err.response.status === 404){
        setUsers([])
      }else {
        loader = <p style={{textAlign: 'center', fontWeight: '700', paddingTop: '3em', color: 'red'}}>Something went wrong, please try again!</p>
      }
    })

  }, [])

  return (
    <>
      {users ? users.length > 0 ? <div className='all-users'>
        {users.map(user => {
          return <User key={user._id} name={user.name} email={user.email} role={user.role} />
        })}
        </div> : <p style={{textAlign: 'center', fontWeight: '700', paddingTop: '3em'}}>No users found!</p> : loader}
    </>
  )
}
