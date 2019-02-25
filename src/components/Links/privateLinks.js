import React from 'react'
import {
    NavLink as Link 
} from 'react-router-dom'
import {
    Badge,
    Typography
}from '@material-ui/core'

export default(props) => {
    const user = JSON.parse(localStorage.getItem('state'))
    const email = user ? user && user.user && user.user.email : 'Account'
    const user_type = user ? user && user.user && user.user.user_type : ''
    // const unver = props.unVerifiedSellers || []
    // const badgeCounter = unver.length 
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
                <button 
                    className='nav-link' 
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    onClick={
                        user_type === 'admin' ?
                            props.onUpdateAccount
                        : 
                            user_type === 'buyer' ?
                                props.onOpenBuyerNotification
                            :
                                props.onOpenOrders
                    }
                >
                    <Badge color="secondary" badgeContent={props.notifications.length}>
                        <Typography>Notification</Typography>
                    </Badge>
                </button>
            </li>
            <li className='nav-item'>
                <div className='dropdown show'>
                    <button 
                        className='nav-link dropdown-toggle' 
                        style={{ border:'none',background:'none', cursor: 'pointer' }}
                        id='dropdownMenuLink' 
                        data-toggle='dropdown' 
                        aria-haspopup='true' 
                        aria-expanded='false'
                    > 
                    { email }
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
                                <Link to='/myAccount' className='dropdown-item'>
                                    My Account
                                </Link>
                            </React.Fragment>
                        }
                        {
                            props.user_type === 'seller' &&
                            <React.Fragment>
                                <button className='dropdown-item' onClick={props.onUpdateAccount}>
                                    Account Details
                                </button>
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
