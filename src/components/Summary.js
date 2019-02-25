import React from 'react'
import { productImgURL } from '../redux/api/api'
import {
  Paper,
  Typography,
  Button
} from '@material-ui/core/'
import { NavLink as Link } from 'react-router-dom'


const Summary = ({
  cartData,
  onRemove, onReserve,
  onInputChange,
  fieldValues,
  dataRemain
}) => { 
  return fieldValues.length > 0 && fieldValues.map((cart, i) => (
  // return cartData.map((cart, i) => (
    <Paper 
      key={i}
      elevation={2} 
      className='mr-4 mb-2' 
    > 
      <div className='summary-section'>
        <Link to={`product-details/${cart.product_id}`}>
          <img 
            src={`${productImgURL}${cart.image}`}
            alt={cart.title}
            className='m-3 cartImage'
          />
        </Link>
        <div className='p-3'>
          <Typography variant='h5' color='primary'>
            {cart.name} 
          </Typography>
          <Typography style={{ fontSize: '20px', marginTop: '5px' }}>
            <span > ₱ {cart.price} </span> 
          </Typography>
          <div className='row'>
            <div className='ml-3'>
              Quantity Left :
              <span className='text-primary'> { cart.quantity } </span>
            </div>
          </div>
          <div className='row'>
            <div className='ml-3'>
              Minimum Order :
              <span className='text-primary'> { cart.minimum_order } </span>
            </div>
          </div>
          <div className='row'>
            <div className='ml-3'>
              Item Quantity
            </div>
            <div className='mt-1'>
              <input 
                type='number' 
                name="orderQuantity" 
                className='col-lg-5 col-md-10 col-sm-10 form-control ml-3'
                style={{ marginTop: '-3px'}}
                value={cart.orderQuantity}
                onChange={(e)=>onInputChange(e, cart.product_id, cart.quantity)}
              />
            </div>
          </div>
          <div className='row btnActions'>
            <div className='col'>
              <Button   
                raised='raised'
                color='secondary' 
                variant='outlined'
                className='btn btn-danger btn-block mt-3'
                onClick={()=>onRemove(cart.cart_id, cart.orderQuantity)}
              >
                <i className='fa fa-close mr-1' style={{ fontSize: '18px' }}> </i>  Remove
              </Button>
            </div>
            <div className='col'>
              <Button 
                raised='raised'
                color='primary' 
                variant='outlined'
                className='btn btn-danger btn-block mt-3'
                onClick={()=>onReserve(cart.product_id, cart.buyer_id)}
              >
                <i className='fa fa-arrow-right mr-1' style={{ fontSize: '18px' }}></i> Move to Reserved
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  ))        
} 

export default Summary