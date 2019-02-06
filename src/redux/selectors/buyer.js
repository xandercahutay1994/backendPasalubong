import { createSelector } from 'reselect'

export default createSelector(
    state=> state.buyer,
    (buyer)=>{
        return {
            buyerRegistered: buyer.buyerRegistered,
            message: buyer.message,
            resStatus: buyer.resStatus,
            orderHistory: buyer.orderHistory,
            isFetching: buyer.isFetching
        }
    }

)