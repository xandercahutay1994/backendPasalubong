import React, {Fragment} from 'react'
import {
    NavLink as Link 
} from 'react-router-dom'

export default(props) => {
  return (
    <Fragment>
      <li className='nav-item'> 
        <Link to='/' className='nav-link'> HOME</Link>
      </li>
      <li className='nav-item'> 
        <Link to='/seller-sign-up' className='nav-link'> SELL ON IPASALUBONG </Link>
      </li>
      <li className='nav-item'> 
        <Link to='/sign-up' className='nav-link'> BUYER </Link>
      </li>
    </Fragment>
  )
}