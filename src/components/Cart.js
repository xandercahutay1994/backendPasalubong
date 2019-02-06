import React from 'react'
import '../css/Cart.css'
import {
  Badge
}from '@material-ui/core'
import { NavLink as Link } from 'react-router-dom'

const Cart = props => {
  // const orderTotal = props.cartOrderTotal 
  const hasOrder = props.totalOrder === 'null' ? '' : (props.totalOrder || '')  
  const badgeColor = hasOrder === '' ? 'default' : 'secondary'
  
  return (
    <div className='cart'>
      <Link to='/cart' >
        <Badge color={badgeColor} badgeContent={hasOrder} >
            <i className="fa fa-shopping-bag ml-3" style={{fontSize:'25px'}}>
            </i> 
        </Badge>
      </Link> 
    </div>
  )
}

export default Cart