import { useState } from 'react'
import instance from '../../components/Axios/Config'
import { useDispatch } from 'react-redux' 
import { uiActions } from '../../store/uiSlice'

export default function AddProduct() {
  const [opt, setOpt] = useState(false)
  const dispatch = useDispatch()

  const [data, setData] = useState({
    title: '',
    price: '',
    description: '',
    inventory: '',
    file: '',
    category: '',
    freeShipping: false,
    discount: ''
  })

  const [errMsg, setErrMsg] = useState(null)

  const [ui, setUi] = useState({
    text: 'Add Product',
    color: '#689425',
    disable: false
})

  const updateData = (e) => {
    setErrMsg(null)
    const {name, value} = e.target
    
    if(name === 'freeShipping') setData(prev => ({...prev, freeShipping: !prev.freeShipping}))
    else setData(prev => ({...prev, [name]: value}))
  }

  const uploadFile = (e) => {
    setErrMsg(null)
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    setUi(prev => ({...prev, disable: true}))

    instance({
      url: '/products/upload-image',
      method: 'post',
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => setData(prev => ({...prev, file: res.data.src})))
    .then(rus => setUi(prev => ({...prev, disable: false})))
    .catch(err => console.log(err))
  }

  const submitProduct = (e) => {
    e.preventDefault()
    setErrMsg(null)
    setUi({text: 'Hold on...', color: '#301934', disable: true})

    if(!data.title || !data.price || !data.description || !data.inventory || !data.file || !data.category ) {
      setUi({ text: 'Add Product', color: '#689425', disable: false })
      return setErrMsg('Please provide all the necessary information')
    }

    let prodData = { title: data.title, price: Number(data.price), description: data.description, inventory: Number(data.inventory), image: data.file, category: data.category, freeShipping: data.freeShipping}

    if(data.discount !== '') prodData.discount = Number(data.discount)

    instance({
      url: '/products',
      method: 'post',
      data: prodData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      setUi({ text: 'Add Product', color: '#689425', disable: false })
      setData({
        title: '',
        price: '',
        description: '',
        inventory: '',
        file: '',
        category: '',
        freeShipping: false,
        discount: ''
      })
      dispatch(uiActions.toggleAdd())
    })
    .catch(err => {
      setUi({ text: 'Add Product', color: '#689425', disable: false })
      console.log(err)
      if(!err.response) {
        return setErrMsg('Please check your connection and try again')
      }

      if(err.response.status === 400){
        setErrMsg('Please provide all the necessary information')
      }else {
        setErrMsg('Something went wrong, please try again')
      }
    })
  }

  return (
    <div className='addProduct'>
        <svg onClick={() => dispatch(uiActions.toggleAdd())} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" ><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
      <form onSubmit={submitProduct}>
        <input onChange={updateData} value={data.title} type='text' name='title' id='title' required aria-label='title' placeholder='Add a title' />

        <input onChange={updateData} value={data.price} type='number' name='price' id='price' required aria-label='price' placeholder='Add a price' />

        <textarea onChange={updateData} value={data.description} name='description' id='description' placeholder='Add a description' aria-label='Description' required></textarea>

        <input onChange={updateData} value={data.inventory} type='number' name='inventory' id='inventory' required aria-label='inventory' placeholder='Add amount in inventory' />

        <input onChange={uploadFile} type='file' name='image' id='image' required aria-label='image' />

        <select value={data.category} onChange={updateData} name='category' id='category'>
          <option value='' disabled >Select a category</option>
          <option value='fashion' >Fashion</option>
          <option value='electronics' >Electronics</option>
          <option value='computers/phones' >Computers/Phones</option>
          <option value='kitchen' >Kitchen</option>
          <option value='beauty' >Beauty</option>
          <option value='other' >Other</option>
        </select>

        <p onClick={() => setOpt(prev => !prev)}>
          Optional Settings
          {!opt ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="m12 15.586-4.293-4.293-1.414 1.414L12 18.414l5.707-5.707-1.414-1.414z"></path><path d="m17.707 7.707-1.414-1.414L12 10.586 7.707 6.293 6.293 7.707 12 13.414z"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m6.293 11.293 1.414 1.414L12 8.414l4.293 4.293 1.414-1.414L12 5.586z"></path><path d="m6.293 16.293 1.414 1.414L12 13.414l4.293 4.293 1.414-1.414L12 10.586z"></path></svg>}
        </p>

        <div style={{display: opt ? 'flex' : 'none'}} className='optional'>
          <label htmlFor='freeShipping'>Free Shipping: 
            <input className='shipping' onChange={updateData} checked={data.freeShipping} type='checkbox' name='freeShipping' id='freeShipping' />
          </label>
          
          <input onChange={updateData} value={data.discount} type='number' name='discount' id='discount' aria-label='discount' placeholder='Is there a discount?' />
        </div>

        {errMsg && <p style={{color: '#e3242b', textAlign: 'center', textTransform: 'uppercase', fontSize: '.8em', fontWeight: '700', background: 'none'}}>{errMsg}</p>}

        <button style={{background: ui.color}} disabled={ui.disable} type='submit'>{ui.text}</button>
      </form>
    </div>
  )
}
