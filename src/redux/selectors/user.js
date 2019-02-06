import { createSelector } from 'reselect'

export default createSelector(
    state=> state.user,
    state=> state.product,
    state=> state.route,
    state=> state.seller,
    state=> state.cart,
    (user, product, route, seller, cart)=>{
        return {
            login_id: user.login_id,
            isLoginModalVisible: user.isLoginModalVisible,
            isBtnSubmit: user.isBtnSubmit,
            resStatus: user.resStatus,
            message: user.message,
            user_type: user.user_type,
            product_id: product.product_id,
            sellersProduct: product.sellersProduct,
            route: route.route,
            email: seller.email,
            cartOrder: product.cartOrder,
            cartOrderTotal: cart.cartOrderTotal,
            isCheckout: cart.isCheckout,
            productDetails: cart.productDetails,
            unVerifiedSellers: seller.unVerifiedSellers
        }
    }

)