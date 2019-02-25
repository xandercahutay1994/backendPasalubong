import { createReducer } from './createReducer'

const cartInitialState = {
    cartData: [],
    cartOrderTotal: localStorage.getItem('cartOrderTotal'),
    resStatus: '',
    message: '',
    totalPayment: 0,
    buyerDetails: '',
    isCheckout: false,
    reservations: [],
    reservationQuantity: [],
    isFetching: true,
    isOrderUpdated: false,
    isAddedToCart: false
}

const cartActionsHandler = {
    ADDED_TO_CART: (state, { quantity }) => {
        return {
            ...state,
            // cartData: [...state.cartData, action.data],
            cartOrderTotal: localStorage.getItem('cartOrderTotal'),
            isAddedToCart: true
        }
    },
    CLEAR_ADDED_TO_CART: (state) => {
        return {
            ...state,
            isAddedToCart: false
        }
    },
    RETRIEVED_ORDERS_SUMMARY: (state, { cartData, resStatus, totalPayment, buyerDetails }) => {
        return {
            ...state,
            cartData,
            resStatus,
            totalPayment,
            buyerDetails,
            isFetching: false,
            isOrderUpdated: false
        }
    },
    REMOVE_TO_CART: (state, { message, cart_id }) => {
        return {
            ...state,
            cartData: state.cartData.filter(cart => cart.cart_id !== cart_id),
            message: message
        }   
    },
    CLEAR_CART: state => {
        return {
            ...state,
            cartOrderTotal: null,
            cartData: [],
            resStatus: '',
            message: '',
            totalPayment: 0,
            isCheckout: false
        }
    },
    CHECKOUT_CART: (state, { response, message}) => {
        return {
            ...state,
            isCheckout: true,
            message
        }
    },
    RESET_CART: (state) => {
        return {
            ...state,
            resStatus: '',
            message: ''
        }
    },
    RESERVED_BUYER: (state, { cartData, resStatus, totalPayment, buyerDetails, message }) => {
        return {
            ...state,
            cartData,
            resStatus,
            totalPayment,
            buyerDetails,
            message
        }
    },
    RETRIEVED_RESERVATION_DETAILS: (state, { reservations, reservationQuantity }) => {
        return {
            ...state,
            reservations,
            reservationQuantity,
            resStatus: 200
        }
    },
    UPDATE_BUYERS_ORDERS: (state, { updated }) => {
        return {
            ...state,
            isOrderUpdated: updated
        }
    }
}

export default createReducer(cartInitialState, cartActionsHandler)