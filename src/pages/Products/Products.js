import { useState, useEffect } from 'react'
import AddProduct from './AddProduct'
import { useSearchParams } from 'react-router-dom'
import instance from '../../components/Axios/Config'
import Product from './Product'
import { useSelector, useDispatch } from 'react-redux'
import { uiActions } from '../../store/uiSlice'

export default function Products() {
  const add = useSelector(state => state.ui.showAdd)
  const edit = useSelector(state => state.ui.showEdit)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams()
  let loader = <div className="loader"></div>

  const [prods, setProds] = useState(null)

  const [showFilter, setShowFilter] = useState(false)

  const [filters, setFilter] = useState({
    title: '',
    category: 'all',
    sort: 'all',
    min: '',
    max: ''
  })

  const [page, setPage] = useState({
    currPage: 1,
    uiPage: 1,
    numOfPages: 1
  })

  const updateFilterData = (e) => {
    const { name, value } = e.target

    setFilter(prev => ({...prev, [name]: value}))
  }

  useEffect(() => {
    setProds(null)
    let query = []
    for(const entry of searchParams.entries()){
        const [a, b] = entry
        query.push(`${a}=${b}`)
      }

    query = query.join('&')

    instance({
      url: `/products?page=${page.currPage}&${query}`,
      method: 'get'
    })
    .then(res => {
      setProds(res.data.products)
      setPage(prev => ({...prev, numOfPages: res.data.numOfPages}))
      setPage(prev => ({...prev, uiPage: page.currPage}))
    })
    .catch(err => {
      if(err.response.status === 404){
        setProds([])
      }else {
        loader = <p style={{textAlign: 'center', fontWeight: '700', paddingTop: '3em', color: 'red'}}>Something went wrong, please try again!</p>
      }
    })
  }, [searchParams, edit, add, page.currPage])

  const prodFilter = (e) => {
    e.preventDefault()
    setPage({
      currPage: 1,
      uiPage: 1,
      numOfPages: 1
    })
    const queryObject = {}

    if(filters.title !== '') queryObject.title = filters.title
    
    if(filters.category !== '') queryObject.category = filters.category

    if(filters.sort !== '') {
      if(filters.sort === 'last added') {
        queryObject.sort = '-createdAt'
      }else if(filters.sort === 'first added') {
        queryObject.sort = 'createdAt'
      }else if(filters.sort === 'all'){
        queryObject.sort = 'createdAt'
      }else {
        queryObject.sort = filters.sort
      }
    }

    if(filters.max !== '' || filters.min !== ''){
      queryObject.numFilter = []
      if(filters.min !== '') queryObject.numFilter.push(`price>${Number(filters.min)-1}`)
      if(filters.max !== '') queryObject.numFilter.push(`price<${Number(filters.max)+1}`)

      queryObject.numFilter = queryObject.numFilter.join(',')
    } 
    setShowFilter(false)
    setSearchParams(queryObject)
  }

  let num = []
  
  for(let i = 1; i < Number(page.numOfPages + 1); i++){
          num.push(i)
      }

  return (
    <>
    <div className='products'>
      <div className='top'>
      <div>
      {user && user.role === 'admin' && <p className='addProd' onClick={() => dispatch(uiActions.toggleAdd())}>
        Add Product
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
      </p>}

      <svg onClick={() => setShowFilter(prev => !prev)} fill="none" height="35" viewBox="0 0 157 133" width="35" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M126.506 116.642C126.083 118.028 125.781 119.205 125.368 120.34C122.745 127.559 117.164 131.078 109.994 132.496C104.277 133.639 98.3414 132.499 93.451 129.318C88.6571 126.351 86.3462 121.873 85.8775 116.058C84.9312 115.977 83.981 115.831 83.0294 115.823C62.3275 115.661 41.6249 115.549 20.9235 115.34C16.3969 115.294 11.8677 114.988 7.35279 114.638C6.13966 114.566 4.98132 114.107 4.04702 113.328C3.27571 112.449 2.82996 111.331 2.78476 110.161C2.70385 108.799 3.79068 108.021 5.09888 107.733C5.7433 107.588 6.40009 107.506 7.06018 107.487C15.2428 107.327 23.4247 107.138 31.6079 107.047C47.2169 106.874 62.8257 106.734 78.4342 106.626C81.7471 106.599 85.0607 106.622 87.9755 106.622C90.2896 103.916 92.1739 101.285 94.4802 99.1013C100.131 93.7508 106.949 92.6089 114.236 94.6805C119.331 96.1292 123.009 99.3089 124.075 104.856C124.178 105.394 124.407 105.91 124.731 106.913C125.773 106.913 126.949 106.899 128.125 106.913C135.099 107.005 142.074 107.061 149.046 107.234C150.589 107.28 152.116 107.558 153.577 108.058C154.484 108.353 155.265 108.947 155.793 109.743C156.322 110.538 156.568 111.489 156.49 112.442C156.51 113.342 156.235 114.224 155.709 114.954C155.182 115.684 154.432 116.221 153.572 116.484C152.1 116.936 150.565 117.152 149.025 117.124C142.715 117.032 136.408 116.808 130.099 116.644C129 116.618 127.899 116.642 126.506 116.642ZM116.486 112.101C116.47 108.857 115.709 105.628 114.215 103.641C113.638 102.879 112.823 102.334 111.899 102.092C105.369 100.776 98.3886 105.745 96.7147 111.546C95.2615 116.584 96.8552 119.771 101.764 121.567C109.834 124.52 116.528 120.219 116.486 112.102V112.101Z" fill="black"/><path d="M59.3029 59.9005C62.4922 59.9005 65.3571 59.9705 68.2185 59.8887C81.7252 59.5025 95.2337 59.0902 108.743 58.652C121.144 58.2342 133.541 57.7263 145.941 57.2819C147.487 57.1702 149.039 57.2012 150.58 57.3741C151.695 57.494 152.732 58.0071 153.505 58.8221C154.278 59.6371 154.737 60.7007 154.8 61.8233C154.822 63.8495 153.384 65.5822 150.955 66.2349C149.882 66.4996 148.783 66.6365 147.679 66.6411C127.633 67.0887 107.588 67.524 87.5444 67.947C78.5734 68.1495 69.6044 68.4291 60.6344 68.6834C60.0933 68.699 59.5541 68.8041 58.7352 68.8995C56.6185 79.1813 49.3189 83.497 39.7511 83.5619C31.2067 83.6229 24.7292 79.3954 21.9931 70.6778C17.6788 70.4831 13.4861 70.3482 9.30198 70.0776C7.76153 69.9622 6.23731 69.6858 4.75405 69.253C4.09666 69.0921 3.51863 68.6996 3.12465 68.1482C2.73068 67.5967 2.54681 66.922 2.60631 66.2459C2.60289 65.5673 2.84974 64.9107 3.29952 64.4029C3.74929 63.8951 4.37031 63.5718 5.04341 63.4947C6.23958 63.2824 7.4538 63.1894 8.66827 63.2176C12.9761 63.1871 17.2845 63.2052 21.635 63.2052C22.0882 61.8791 22.4526 60.9723 22.7096 60.0361C23.6986 56.3646 25.732 53.0606 28.5618 50.5273C30.3901 48.9344 32.6003 47.8453 34.9753 47.3671C38.4617 46.7658 42.0035 46.5511 45.5367 46.7269C52.2078 46.9617 56.2819 50.8234 58.4776 56.9128C58.8116 57.8464 59.0103 58.8287 59.3029 59.9005ZM39.0229 56.0302C37.7134 56.3248 35.4045 56.304 33.7312 57.3278C29.7056 59.7932 29.8111 69.0565 33.7772 71.6873C37.3917 74.0878 41.2898 73.9801 45.1328 72.1732C48.59 70.548 48.9655 67.1127 49.0264 64.0181C49.1125 59.6408 48.025 56.8018 42.4336 56.3509C41.5578 56.2795 40.6774 56.1853 39.0229 56.0302Z" fill="black"/><path d="M97.708 23.2841C96.6976 23.2841 95.9312 23.2783 95.1654 23.2841C68.2583 23.5004 41.3518 23.7143 14.4469 23.9262C12.1222 23.9444 9.79756 23.9065 7.47284 23.8122C6.25571 23.7704 5.04522 23.6131 3.85766 23.3424C1.93388 22.8883 0.738977 21.5117 0.793997 19.9176C0.785629 19.1288 1.05508 18.3623 1.55497 17.753C2.05485 17.1438 2.75313 16.7307 3.5269 16.5866C4.80784 16.2558 6.11675 16.0456 7.43665 15.9581C35.9633 14.1221 64.5352 14.0634 93.1012 13.7909C94.7524 13.7754 96.4024 13.7909 98.1229 13.7909C98.7353 12.5031 99.2758 11.4328 99.7593 10.337C100.909 7.52909 103.037 5.23489 105.747 3.8809C109.732 1.95467 113.888 0.385482 118.369 0.0740674C126.081 -0.462474 130.772 2.65224 133.35 9.93088C133.674 10.8534 133.969 11.7883 134.369 13.0003C138.362 12.8115 142.318 12.587 146.276 12.4566C147.706 12.3641 149.142 12.4489 150.551 12.7095C151.49 12.8883 152.343 13.3743 152.976 14.0912C153.61 14.8083 153.988 15.7157 154.051 16.6712C154.115 17.6267 153.86 18.5765 153.326 19.3712C152.794 20.1659 152.012 20.7607 151.105 21.0625C149.75 21.5344 148.339 21.8265 146.908 21.9308C142.619 22.3129 138.32 22.5827 133.832 22.911C131.178 32.5129 124.224 36.4282 114.891 36.1733C106.551 35.9449 100.21 32.26 97.708 23.2841ZM105.849 18.282C105.147 22.7405 109.493 27.5251 114.151 27.3707C121.1 27.1404 125.243 23.2268 125.24 18.0216C125.24 12.1696 122.484 9.01357 116.03 8.71318C109.904 8.42837 105.899 12.3911 105.849 18.282Z" fill="black"/></g><defs><clipPath id="clip0"><rect fill="white" height="133" transform="translate(0.777344)" width="156"/></clipPath></defs></svg>
      </div>

      <form onSubmit={prodFilter} className={showFilter ? 'showFilter' : 'hideFilter'}>
        <input onChange={updateFilterData} value={filters.title} type='text' name='title' id='title' placeholder='Search for product' aria-label='Search for product' />

        <select onChange={updateFilterData} value={filters.category} name='category' id='category'>
          <option value='all' >All categories</option>
          <option value='fashion' >Fashion</option>
          <option value='electronics' >Electronics</option>
          <option value='computers/phones' >Computers/Phones</option>
          <option value='kitchen' >Kitchen</option>
          <option value='beauty' >Beauty</option>
          <option value='other' >Other</option>
        </select>

        <select onChange={updateFilterData} value={filters.sort} name='sort' id='sort'>
          <option value='all' disabled>Sort By</option>
          <option value='name' >Name</option>
          <option value='price' >Price</option>
          <option value='last added' >Last Added</option>
          <option value='first added' >First Added</option>
          <option value='category' >Category</option>
        </select>

        <div className='priceFilters'>
          <p>Filter by price</p>
          <input onChange={updateFilterData} value={filters.min} type='number' name='min' id='min' aria-label='Minimum Price' placeholder='0' />
          <p>-</p>
          <input onChange={updateFilterData} value={filters.max} type='number' name='max' id='max' aria-label='Maximum Price' placeholder='100' />
        </div>

        <button type='submit'>Filter</button>
      </form>
      </div>
      
      {prods ? prods.length > 0 ? <Product prods={prods}/> : <h3 style={{textAlign: 'center', fontWeight: '700', paddingTop: '3em'}}>No Products available!</h3> : loader}
      
      {add && <AddProduct />}
      <div className='pagination'>
        {prods && num.map(number => <p style={{background: page.uiPage === number ? 'orangered' : 'gray'}} onClick={() => setPage(prev => ({...prev, currPage: number}))} key={number}>{number}</p>)}
        </div>
      </div>
    </>
  )
}
