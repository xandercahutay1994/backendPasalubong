import { createSelector } from 'reselect'

export default createSelector(
    state=> state.product,
    state=> state.user,
    state=> state.cart,
    state=> state.seller,
    (product, user, cart, seller)=>{
        return {
            products: product.products,
            productDetails: product.productDetails,
            isCreated: product.isCreated,
            message: product.message,
            resStatus: product.resStatus,
            isFetching: product.isFetching,
            product_id: product.product_id,
            email: user.email,
            sellersProduct: product.sellersProduct,
            deactivatedProducts: product.deactivatedProducts,
            isBtnSubmit: user.isBtnSubmit,
            login_id: user.login_id,
            user_type: user.user_type,
            cartOrder: product.cartOrder,
            cartData: cart.cartData,
            cartOrderTotal: cart.cartOrderTotal,
            inventoryReport: seller.inventoryReport,
            comments: product.comments,
            buyerHasOrdered: product.buyerHasOrdered,
            sellers: product.sellers
        }
    }

)