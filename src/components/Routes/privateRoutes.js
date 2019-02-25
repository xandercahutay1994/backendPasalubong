import React from 'react'
// import Notification from '../Layouts/Notification'
import CartSummary from '../../containers/ProtectedPages/CartSummary'
import Checkout from '../../containers/ProtectedPages/Checkout'
import { 
    Seller,
    ProductDetails,
    Buyers, 
    Admin,
    BuyerOrders,
    Reservation,
    SellerShopPage,
    BuyerAccount,
    BuyerNotification,
    SellerMap
} from '../../containers/ProtectedPages'
import {
    Switch,
    Route
} from 'react-router-dom'

const PrivateRoutes = () => (
    <Switch>
        <Route exact strict path='/' component={Buyers}/>
        <Route exact strict path='/seller/:id?' component={Seller}/>
        <Route exact strict path='/admin' component={Admin}/>
        <Route exact strict path='/product-details/:id' component={ProductDetails}/>
        <Route exact strict path='/cart' component={CartSummary}/>
        <Route exact strict path='/checkout' component={Checkout}/>
        <Route exact strict path='/myOrders' component={BuyerOrders}/>
        <Route exact strict path='/myReservations' component={Reservation}/>
        <Route exact strict path='/myAccount' component={BuyerAccount}/>
        <Route exact strict path='/notification' component={BuyerNotification}/>
        <Route exact strict path='/sellerPage/:id' component={SellerShopPage}/>
        <Route exact strict path='/sellerMap/:id' component={SellerMap}/>
    </Switch>
)

export default PrivateRoutes