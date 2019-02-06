import {
    ADDED_TO_CART_REQUESTED,
    GET_ORDERS_SUMMARY_REQUESTED,
    REMOVE_TO_CART_REQUESTED,
    CHECKOUT_CART_REQUESTED,
    CLEAR_CART,
    RESERVED_BUYER_REQUESTED,
    RESET_CART,
    GET_RESERVATION_DETAILS_REQUESTED,
    DELETE_RESERVATION_REQUESTED,
    SEARCH_RESERVATION_REQUESTED,
    MOVE_TO_CART_REQUESTED
} from '../types/cart'

export function ADD_TO_CART_ACTION(payload) {
    return {
        type: ADDED_TO_CART_REQUESTED,
        payload
    }
}

export function GET_ORDERS_SUMMARY_ACTION(payload) {
    return {
        type: GET_ORDERS_SUMMARY_REQUESTED,
        payload
    }
}

export function REMOVE_TO_CART_ACTION(payload) {
    return {
        type: REMOVE_TO_CART_REQUESTED,
        payload
    }
}

export function CLEAR_CART_ACTION() {
    return {
        type: CLEAR_CART
    }
}

export function CHECKOUT_ACTION(payload) {
    return {
        type: CHECKOUT_CART_REQUESTED,
        payload
    }
}


export function RESERVED_BUYER_ACTION(payload) {
    return {
        type: RESERVED_BUYER_REQUESTED,
        payload
    }
}

export function RESET_CART_ACTION() {
    return {
        type: RESET_CART
    }
}

export function GET_RESERVATION_DETAILS_ACTION(payload) {
    return {
        type: GET_RESERVATION_DETAILS_REQUESTED,
        payload
    }
}

export function DELETE_RESERVATION_ACTION(payload) {
    return {
        type: DELETE_RESERVATION_REQUESTED,
        payload
    }
}

export function SEARCH_RESERVATION_ACTION(payload) {
    return {
        type: SEARCH_RESERVATION_REQUESTED,
        payload
    }
}

export function MOVE_TO_CART_ACTION(payload) {
    return {
        type: MOVE_TO_CART_REQUESTED,
        payload
    }
}