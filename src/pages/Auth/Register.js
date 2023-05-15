import {useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import instance from '../../components/Axios/Config'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userActions } from '../../store/userSlice'

export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const [ui, setUi] = useState({
        text: 'sign up',
        color: '#689425',
        disable: false
    })

    const [errMsg, setErrMsg] = useState(null)
    const [hidden, setHidden] = useState({
        one: true,
        two: true
    })

    const dataUpdater = (e) => {
        const { name, value } = e.target
        setErrMsg(null)
        setData(prev => ({...prev, [name]: value}))
    }

    const submitData = (e) => {
        e.preventDefault()

        setUi({text: 'Hold on...', color: '#301934', disable: true})
        setErrMsg(null)

        let mailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(data.name === '') {
            setUi({ text: 'sign up', color: '#689425', disable: false })
            return setErrMsg('Please provide your full name')
        }

        if(data.email === '') {
            setUi({ text: 'sign up', color: '#689425', disable: false })
            return setErrMsg('Please provide your email')
        }

        if(!data.email.match(mailRegEx)) {
            setUi({ text: 'sign up', color: '#689425', disable: false })
            return setErrMsg('Please provide a valid email')
        }

        if(data.password === '') {
            setUi({ text: 'sign up', color: '#689425', disable: false })
            return setErrMsg('Please provide a password')
        }

        if(data.password.length < 8) {
            setUi({ text: 'sign up', color: '#689425', disable: false })
            return setErrMsg('Please provide a stronger password')
        }

        if(data.cpassword === '') {
            setUi({ text: 'sign up', color: '#689425', disable: false })
            return setErrMsg('Please confirm your password')
        }

        if(data.password && data.cpassword){
            const formData = { name: data.name, email: data.email, password: data.password }

            instance({
                url: '/auth/signup',
                method: 'post',
                data: formData,
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => {
                setUi({ text: 'sign up', color: '#689425', disable: false })
                dispatch(userActions.getUser(res.data.user))
                setData({
                    name: '',
                    email: '',
                    password: '',
                    cpassword: ''
                })
                navigate('/store')
            })
            .catch(err => {
                setUi({ text: 'sign up', color: '#689425', disable: false })
                if(!err.response){
                    return setErrMsg('Please check your connection and try again')
                }

                if(err.response.status === 404) {
                    setErrMsg('Please provide all necessary values')
                }else {
                    setErrMsg(err.response.data.msg)
                }
            })
        }else {
            setErrMsg('Please confirm your password')
            setUi({ text: 'sign up', color: '#689425', disable: false })
        }
    }

  return (
    <div className='signup'>
        <Logo />
        <form onSubmit={submitData}>
            <input onChange={dataUpdater} value={data.name} type='text' name='name' id='name' required placeholder='Enter your full name' aria-label='name' />

            <input onChange={dataUpdater} value={data.email} type='email' name='email' id='email' required placeholder='Enter your email' aria-label='email' />

            <div className='password'>
                <input onChange={dataUpdater} value={data.password} type={hidden.one ? 'password' : 'text'} name='password' id='password' required placeholder='Enter your password' aria-label='password' />

                {hidden.one ? <svg onClick={() => setHidden(prev => ({...prev, one: false}))} fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M2.21967 2.21967C1.9534 2.48594 1.9292 2.9026 2.14705 3.19621L2.21967 3.28033L6.25424 7.3149C4.33225 8.66437 2.89577 10.6799 2.29888 13.0644C2.1983 13.4662 2.4425 13.8735 2.84431 13.9741C3.24613 14.0746 3.6534 13.8305 3.75399 13.4286C4.28346 11.3135 5.59112 9.53947 7.33416 8.39452L9.14379 10.2043C8.43628 10.9258 8 11.9143 8 13.0046C8 15.2138 9.79086 17.0046 12 17.0046C13.0904 17.0046 14.0788 16.5683 14.8004 15.8608L20.7197 21.7803C21.0126 22.0732 21.4874 22.0732 21.7803 21.7803C22.0466 21.5141 22.0708 21.0974 21.8529 20.8038L21.7803 20.7197L15.6668 14.6055L15.668 14.604L14.4679 13.4061L11.598 10.5368L11.6 10.536L8.71877 7.65782L8.72 7.656L7.58672 6.52549L3.28033 2.21967C2.98744 1.92678 2.51256 1.92678 2.21967 2.21967ZM10.2041 11.2655L13.7392 14.8006C13.2892 15.2364 12.6759 15.5046 12 15.5046C10.6193 15.5046 9.5 14.3853 9.5 13.0046C9.5 12.3287 9.76824 11.7154 10.2041 11.2655ZM12 5.5C10.9997 5.5 10.0291 5.64807 9.11109 5.925L10.3481 7.16119C10.8839 7.05532 11.4364 7 12 7C15.9231 7 19.3099 9.68026 20.2471 13.4332C20.3475 13.835 20.7546 14.0794 21.1565 13.9791C21.5584 13.8787 21.8028 13.4716 21.7024 13.0697C20.5994 8.65272 16.6155 5.5 12 5.5ZM12.1947 9.00928L15.996 12.81C15.8942 10.7531 14.2472 9.10764 12.1947 9.00928Z" fill='gray' /></svg> : <svg onClick={() => setHidden(prev => ({...prev, one: true}))} fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M12 9.00462C14.2091 9.00462 16 10.7955 16 13.0046C16 15.2138 14.2091 17.0046 12 17.0046C9.79086 17.0046 8 15.2138 8 13.0046C8 10.7955 9.79086 9.00462 12 9.00462ZM12 10.5046C10.6193 10.5046 9.5 11.6239 9.5 13.0046C9.5 14.3853 10.6193 15.5046 12 15.5046C13.3807 15.5046 14.5 14.3853 14.5 13.0046C14.5 11.6239 13.3807 10.5046 12 10.5046ZM12 5.5C16.6135 5.5 20.5961 8.65001 21.7011 13.0644C21.8017 13.4662 21.5575 13.8735 21.1557 13.9741C20.7539 14.0746 20.3466 13.8305 20.246 13.4286C19.3071 9.67796 15.9214 7 12 7C8.07693 7 4.69009 9.68026 3.75285 13.4332C3.65249 13.835 3.24535 14.0794 2.84348 13.9791C2.44161 13.8787 2.19719 13.4716 2.29755 13.0697C3.40064 8.65272 7.38448 5.5 12 5.5Z" fill='gray'/></svg>}
            </div>
            
            <div className='password'>
                <input onChange={dataUpdater} value={data.cpassword} type={hidden.two ? 'password' : 'text'} name='cpassword' id='cpassword' required placeholder='Confirm your password' aria-label='cpassword' />

                {hidden.two ? <svg onClick={() => setHidden(prev => ({...prev, two: false}))} fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M2.21967 2.21967C1.9534 2.48594 1.9292 2.9026 2.14705 3.19621L2.21967 3.28033L6.25424 7.3149C4.33225 8.66437 2.89577 10.6799 2.29888 13.0644C2.1983 13.4662 2.4425 13.8735 2.84431 13.9741C3.24613 14.0746 3.6534 13.8305 3.75399 13.4286C4.28346 11.3135 5.59112 9.53947 7.33416 8.39452L9.14379 10.2043C8.43628 10.9258 8 11.9143 8 13.0046C8 15.2138 9.79086 17.0046 12 17.0046C13.0904 17.0046 14.0788 16.5683 14.8004 15.8608L20.7197 21.7803C21.0126 22.0732 21.4874 22.0732 21.7803 21.7803C22.0466 21.5141 22.0708 21.0974 21.8529 20.8038L21.7803 20.7197L15.6668 14.6055L15.668 14.604L14.4679 13.4061L11.598 10.5368L11.6 10.536L8.71877 7.65782L8.72 7.656L7.58672 6.52549L3.28033 2.21967C2.98744 1.92678 2.51256 1.92678 2.21967 2.21967ZM10.2041 11.2655L13.7392 14.8006C13.2892 15.2364 12.6759 15.5046 12 15.5046C10.6193 15.5046 9.5 14.3853 9.5 13.0046C9.5 12.3287 9.76824 11.7154 10.2041 11.2655ZM12 5.5C10.9997 5.5 10.0291 5.64807 9.11109 5.925L10.3481 7.16119C10.8839 7.05532 11.4364 7 12 7C15.9231 7 19.3099 9.68026 20.2471 13.4332C20.3475 13.835 20.7546 14.0794 21.1565 13.9791C21.5584 13.8787 21.8028 13.4716 21.7024 13.0697C20.5994 8.65272 16.6155 5.5 12 5.5ZM12.1947 9.00928L15.996 12.81C15.8942 10.7531 14.2472 9.10764 12.1947 9.00928Z" fill='gray' /></svg> : <svg onClick={() => setHidden(prev => ({...prev, two: true}))} fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M12 9.00462C14.2091 9.00462 16 10.7955 16 13.0046C16 15.2138 14.2091 17.0046 12 17.0046C9.79086 17.0046 8 15.2138 8 13.0046C8 10.7955 9.79086 9.00462 12 9.00462ZM12 10.5046C10.6193 10.5046 9.5 11.6239 9.5 13.0046C9.5 14.3853 10.6193 15.5046 12 15.5046C13.3807 15.5046 14.5 14.3853 14.5 13.0046C14.5 11.6239 13.3807 10.5046 12 10.5046ZM12 5.5C16.6135 5.5 20.5961 8.65001 21.7011 13.0644C21.8017 13.4662 21.5575 13.8735 21.1557 13.9741C20.7539 14.0746 20.3466 13.8305 20.246 13.4286C19.3071 9.67796 15.9214 7 12 7C8.07693 7 4.69009 9.68026 3.75285 13.4332C3.65249 13.835 3.24535 14.0794 2.84348 13.9791C2.44161 13.8787 2.19719 13.4716 2.29755 13.0697C3.40064 8.65272 7.38448 5.5 12 5.5Z" fill='gray'/></svg>}
            </div>
            

            {errMsg && <p style={{color: '#e3242b', textAlign: 'center', textTransform: 'uppercase', fontSize: '.8em', fontWeight: '700'}}>{errMsg}</p>}

            <button style={{background: ui.color}} disabled={ui.disable} type='submit'>{ui.text}</button>
        </form>

        <p>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
  )
}
