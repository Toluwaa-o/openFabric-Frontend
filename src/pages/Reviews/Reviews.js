import instance from '../../components/Axios/Config'
import { useLoaderData } from 'react-router'
import Review from './Review'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Reviews() {
    const data = useLoaderData()
    const product = useSelector(state => state.product.product)

    return (
        <div className='reviews'>
            <div className='review-product'>
                <img src={product.image} alt={product.title} />
                <div>
                    <h3>{product.title}</h3>
                    <p>Average Rating: {product.averageRating}/5</p>
                </div>
            </div>
            {data.map(rev => {
                return <Review
                            key={rev._id}
                            name={rev.user.name}
                            title={rev.title}
                            rating={rev.rating}
                            comment={rev.comment}
                             />
            })}
            <Link to='/store'>Back to store</Link>
        </div>
    )
}

export const fetchRev = async ({params}) => {
    console.log(params)
    const res = await instance.get(`/products/${params.id}/reviews`)
    return res.data.reviews
}