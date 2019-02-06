import { createSelector } from 'reselect'

export default createSelector(
    state=> state.seller,
    state=> state.user,
    (seller, user)=>{
        return {
          email: seller.email,
          message: seller.message,
          resStatus: seller.resStatus,
          hasToken: seller.hasToken,
          sellerCode: seller.sellerCode,
          isRegistered: seller.isRegistered,
          unVerifiedSellers: seller.unVerifiedSellers,
          toast: seller.toast,
          issubmit: seller.issubmit,
          login_id: user.login_id,
          inventoryReport: seller.inventoryReport,
          allSellers: seller.allSellers,
          ordersData: seller.ordersData,
          coinsPayment: seller.coinsPayment
        }
    }
)