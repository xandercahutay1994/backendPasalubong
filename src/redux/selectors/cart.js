import { createSelector } from 'reselect'

export default createSelector(
    state=> state.cart,
    state=> state.product,
    state=> state.user,
    (cart, product, user)=>{
        return {
          cartData: cart.cartData,
          cartOrderTotal: cart.cartOrderTotal,
          sellersProduct: product.sellersProduct,
          email: user.email,
          login_id: user.login_id,
          totalPayment: cart.totalPayment,
          buyerDetails: cart.buyerDetails,
          isCheckout: cart.isCheckout,
          resStatus: cart.resStatus,
          message: cart.message,
          reservations: cart.reservations,
          reservationQuantity: cart.reservationQuantity,
          isFetching: cart.isFetching,
          isOrderUpdated: cart.isOrderUpdated,
          isAddedToCart: cart.isAddedToCart
        }
    }

)