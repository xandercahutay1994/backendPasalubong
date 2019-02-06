import React from 'react'
import ImageLoader from './ImageLoader'
import { productImgURL } from '../redux/api/api'
import { Card } from 'react-md'
import '../css/ProductDetail.css'
import {
    Typography,
    Button,
    FormControl,
    Input
} from '@material-ui/core'

const ProductDialog = props => {
  const product_id = JSON.parse(localStorage.getItem('product_id'))
  const filteredProducts = props.products.filter(product => product.product_id === product_id)
  const {
    image, 
    name, 
    price, 
    orderCounter, 
    description, 
    discount, 
    quantity, 
    category,
  } = filteredProducts[0]
  const {
    isEdit,
    onEdit,
    onUpdate,
    closeFullDialog,
    onSubmit,
    onChange,
    categoryState,
    descriptionState,
    quantityState,
    orderCounterState
  } = props
  let categoryRef = React.createRef()
  return (
    <div>

      <div className='details text-center row'>
        <Card className='col-lg-5 card-details card_detail'>
            <ImageLoader 
                src={`${productImgURL}${image}`}
                width='500'
                height='400'
                alt={name}
                className='card-img-top'
            />
        </Card>
        <Card className='col-lg-7 col-md-9 card_detail'>
          <form onSubmit={onSubmit}>
            <Card>
                <h4> {name} </h4>
            </Card>
            <hr/>
            <Card>
                <Typography className='text-primary' variant='h5'> ₱ { price }</Typography>
                <div className='product_detail'>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Description</label>
                        <div className='col-lg-8 col-md-9'>    
                          {
                            isEdit ?
                              <textarea 
                                name='descriptionState' 
                                className='span form-control' 
                                defaultValue={description || descriptionState} 
                                onChange={onChange}>
                              </textarea>
                            :    
                            <span className='span'> {description} </span>
                          }
                        </div>
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Category</label>
                        <div className='col-lg-8 col-md-9'>
                          {
                            isEdit ?
                              <input 
                              type='text' 
                              name='categoryState'
                              className='form-control' 
                              value={category}
                              ref={categoryRef}
                              onChange={onChange}
                              required/>
                            :
                            <span className='span'> { category }</span>
                          }
                        </div>  
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Quantity</label>
                        <div className='col-lg-8 col-md-9'>
                          {
                            isEdit ?
                              <input 
                              type='number' 
                              name='quantityState'
                              className='form-control' 
                              value={quantityState || quantity}
                              onChange={onChange}
                              required/>
                            :
                            <span className='span'> { quantity }</span>
                          }
                        </div>  
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'># of Orders</label>
                        <div className='col-lg-8 col-md-9'>
                          {
                            isEdit ?
                              <input 
                              type='number' 
                              name='orderCounterState'
                              className='form-control' 
                              value={orderCounterState || orderCounter}
                              onChange={onChange}
                              required/>
                            :
                            <span className='span'> { orderCounter }</span>
                          }
                            <span className='span'> {  }</span>
                        </div>  
                    </div>
                    <div className='row mB mt-5'>
                      <div className='col-lg-3'> </div>
                      {
                        isEdit ?
                          <Button type='submit' raised='raised' color='secondary' variant='contained' onClick={onUpdate}>
                            <i className='fa fa-save'></i> Save
                          </Button>
                        :
                          <Button raised='raised' color='primary' variant='outlined' onClick={onEdit}>
                            <i className='fa fa-edit'></i> Edit
                          </Button>
                      }
                      <Button raised='raised' color='secondary' variant='outlined' onClick={closeFullDialog}>
                        <i className='fa fa-close'></i> Close
                      </Button>
                    </div>
                </div>
            </Card>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default ProductDialog