import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import {
    Seller,
    Buyer
} from '../../containers'
import { Buyers, SellerShopPage, SellerMap } from '../../containers/ProtectedPages/index'
import ProductDetails from '../../containers/ProtectedPages/ProductDetails'
import CartSummary from '../../containers/ProtectedPages/CartSummary'

const PublicRoutes = () => {
    return (
        <Switch>
            <Route exact strict path='/' component={Buyers}/>
            <Route exact strict path='/seller-sign-up' component={Seller}/>
            <Route exact strict path='/sign-up' component={Buyer}/>
            <Route exact strict path='/product-details/:id' component={ProductDetails}/>
            <Route exact strict path='/cart' component={CartSummary}/>
            <Route exact strict path='/sellerPage/:id' component={SellerShopPage}/>
            <Route exact strict path='/sellerMap/:id' component={SellerMap}/>
            
        </Switch>
    )
}

export default PublicRoutes