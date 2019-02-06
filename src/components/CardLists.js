import React from 'react'
import { Card } from 'react-md'
import ImageLoader from './ImageLoader'
import { NavLink as Link } from 'react-router-dom'
import { productImgURL } from '../redux/api/api'

const CardLists = ({ 
  sellersProduct, products, login_id, sessionSetId,
  onShowFullDialog, inventoryReport, user_type
}) => {
  const lists = products.length > 0 ? (products || []) : (sellersProduct || [])
  return lists.map((product, i) => (
    <Card className="card cardLists" key={i}>
      <Link 
        to={ login_id ? user_type === 'buyer' ?
            `/product-details/${product.product_id}`
            :
            `/seller/${product.product_id}`
          :
            `/product-details/${product.product_id}`
        }
        onClick={()=> user_type === 'seller' && onShowFullDialog(product.product_id)}
      > 
      
        <div className="card-body">
            <ImageLoader
                src={`${productImgURL}${product.image}`}
                className={'card-img-top'}
                width={200}
                height={100}
                alt={product.title}
            />
            <div className='mt-1'>
              <span className='mt-3 prodName'> {product.name} </span>
            </div>
            <div className='footer'>
              <span className='text-primary priceList category'> {product.category} | ₱ {product.price } </span>
            </div>
        </div>
      </Link>
    </Card>

  ))
}

export default CardLists