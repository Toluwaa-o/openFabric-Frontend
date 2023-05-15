import { useState } from 'react'
import instance from '../../components/Axios/Config'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../store/uiSlice'

export default function AddReview({_id}) {
    const dispatch = useDispatch()

    const [data, setData] = useState({
        product: _id,
        title: '',
        rating: '',
        comment: ''
      })

      const [errMsg, setErrMsg] = useState(null)

      const updateData = (e) => {
        setErrMsg(null)
        const {name, value} = e.target

        console.log(name, value)
        console.log(name === 'rating', Number(value) < 1 || Number(value) > 5)
        
        setData(prev => ({...prev, [name]: value}))
        
      }

      const [ui, setUi] = useState({
        text: 'Add Review',
        color: 'purple',
        disable: false
    })

      const submitReview = (e) => {
        e.preventDefault()
        setErrMsg(null)
        setUi({text: 'Hold on...', color: 'gray', disable: true})
    
        if(!data.title || !data.product || !data.rating || !data.comment ) {
          setUi({ text: 'Add Review', color: 'purple', disable: false })
          return setErrMsg('Please provide all the necessary information')
        }

        if(Number(data.rating < 1) || Number(data.rating > 5)) {
            return setErrMsg('Please provide a rating between 1 - 5')
        }
    
        let revData = { title: data.title, rating: Number(data.rating), comment: data.comment, product: data.product }
    
        instance({
          url: `/reviews`,
          method: 'post',
          data: revData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          setUi({ text: 'Add Review', color: 'purple', disable: false })
          setData({
            product: _id,
            title: '',
            rating: '',
            comment: ''
          })
          dispatch(uiActions.toggleRev())
        })
        .catch(err => {
          setUi({ text: 'Add Review', color: 'purple', disable: false })
          console.log(err)
          if(!err.response) {
            return setErrMsg('Please check your connection and try again')
          }
    
          if(err.response.status === 400){
            setErrMsg('Please provide all the necessary information')
          }else if (err.response.status === 403){
            setErrMsg(err.response.data.msg)
          }else {
            setErrMsg('Something went wrong, please try again')
          }
        })
      }

    return (
        <div className='add-review'>
            <svg onClick={() => dispatch(uiActions.toggleRev())} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" ><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            <form onSubmit={submitReview}>
        <input onChange={updateData} value={data.title} type='text' name='title' id='title' required aria-label='title' placeholder='Add a title' />

        <input onChange={updateData} value={data.price} type='number' name='rating' id='rating' required aria-label='rating' placeholder='Add a rating' min='1' max='5' />

        <textarea onChange={updateData} value={data.description} name='comment' id='comment' placeholder='Add a comment' aria-label='comment' required></textarea>

        {errMsg && <p style={{color: '#e3242b', textAlign: 'center', textTransform: 'uppercase', fontSize: '.8em', fontWeight: '700', background: 'none'}}>{errMsg}</p>}

        <button style={{background: ui.color}} disabled={ui.disable} type='submit'>{ui.text}</button>
      </form>
        </div>
    )
}