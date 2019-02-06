import React from 'react'
import {
    NavLink as Link 
} from 'react-router-dom'
import {
    Badge,
    Typography
}from '@material-ui/core'

export default(props) => {
    const unver = props.unVerifiedSellers || []
    const badgeCounter = unver.length 
    const clickLogout = () => {
        props.isLogout(true)
    }

    return (
        <ul className='navbar-nav ml-auto'>
            {
                props.user_type === 'buyer' &&
                <li className='nav-item'> 
                    <Link to='/' className='nav-link'> Home </Link>
                </li>
            }
            <li className='nav-item'>
                <Link to='/notification' className='nav-link'> 
                    <Badge color="secondary" badgeContent={badgeCounter}>
                        <Typography>Notification</Typography>
                    </Badge>
                </Link>
            </li>
            <li className='nav-item'>
                <div className='dropdown show'>
                    <button 
                        className='nav-link dropdown-toggle' 
                        style={{ border:'none',background:'none' }}
                        id='dropdownMenuLink' 
                        data-toggle='dropdown' 
                        aria-haspopup='true' 
                        aria-expanded='false'
                    > 
                    Account
                    </button>
                    <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                        {
                            props.user_type === 'buyer' &&
                            <React.Fragment>
                                <Link to='/myOrders' className='dropdown-item'>
                                    My Orders
                                </Link>
                                <Link to='/myReservations' className='dropdown-item'>
                                    My Reservations
                                </Link>
                            </React.Fragment>
                        }
                        <button className='dropdown-item' onClick={clickLogout}> 
                        Logout
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    )
}
