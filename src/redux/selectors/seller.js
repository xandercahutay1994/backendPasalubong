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
          coinsPayment: seller.coinsPayment,
          deliveries: seller.deliveries,
          isUpdateAccount: seller.isUpdateAccount,
          orderedBuyers: seller.orderedBuyers,
          orderDetails: seller.orderDetails,
          orders: seller.orders,
          notifications: seller.notifications,
          reservationDetails: seller.reservationDetails,
          orderStatus: seller.orderStatus,
          deliveryStatus: seller.deliveryStatus,
          philPlaces: seller.philPlaces,
          unpaid: seller.unpaid,
          reservationDetails: seller.reservationDetails
        }
    }
)