import SingleProduct from '../../components/Product/Product'

export default function Product({prods}) {
  return (
    <div className='allProducts'>
      {prods.map(product => {
        return <SingleProduct  
                      key={product._id} 
                      title={product.title} 
                      price={product.price} 
                      image={product.image} 
                      discount={product.discount} 
                      _id={product._id} 
                      category={product.category} 
                      freeShipping={product.freeShipping} 
                      inventory={product.inventory} />
      })}
    </div>
  )
}
