import { 
    CREATE_PRODUCT_REQUESTED,
    CLEAR_PRODUCT,
    SHOW_PRODUCT_DETAILS,
    GET_PRODUCTS_REQUESTED,
    GET_PRODUCT_DETAILS_REQUESTED,
    GET_ALL_SELLERS_PRODUCT_REQUESTED,
    UPDATE_PRODUCT_REQUESTED,
    DEACTIVATE_PRODUCT_REQUESTED,
    ACTIVATE_PRODUCT_REQUESTED,
    GET_DEACTIVATED_PRODUCTS_REQUESTED,
    CLEAR_CART_QUANTITY,
    FILTER_BY_PLACES_REQUESTED,
    CLEAR_STATE,
    SEARCH_PRODUCT_BY_NAME_REQUESTED,
    GET_ALL_COMMENTS_BY_PRODUCT_REQUESTED,
    GIVE_FEEDBACK_RATE_REQUESTED,
    CHECK_IF_BUYER_ORDERED_REQUESTED,
    GET_ALL_REVIEWS_OF_PRODUCT_REQUESTED,
    CLEAR_PRODUCTS_IF_LOGOUT,
    CLEAR_PRODUCT_DETAILS,
    LISTS_OF_SELLERS_REQUESTED
} from '../types/product'


export function CREATE_PRODUCT_ACTION(payload) {
    return {
        type: CREATE_PRODUCT_REQUESTED,
        payload
    }
}

export function CLEAR_PRODUCT_ACTION() {
    return {
        type: CLEAR_PRODUCT
    }
}

export function GET_PRODUCTS_ACTION(payload) {
    return {
        type: GET_PRODUCTS_REQUESTED,
        payload
    }
}

export function GET_PRODUCT_DETAILS_ACTION(id) {
    return {
        type: GET_PRODUCT_DETAILS_REQUESTED,
        payload: id
    }
}

export function SHOW_PRODUCT_DETAILS_ACTION(product_id) {
    return {
        type: SHOW_PRODUCT_DETAILS,
        product_id
    }
}

export function GET_ALL_SELLERS_PRODUCT_ACTION() {
    return {
        type: GET_ALL_SELLERS_PRODUCT_REQUESTED,
    }
}

export function CLEAR_CART_QUANTITY_ACTION() {
    return {
        type: CLEAR_CART_QUANTITY
    }
}

export function UPDATE_PRODUCT_ACTION(payload) {
    return {
        type: UPDATE_PRODUCT_REQUESTED,
        payload
    }
}

export function CLEAR_STATE_ACTION() {
    return {
        type: CLEAR_STATE
    }
}


export function DEACTIVATE_PRODUCT_ACTION(payload) {
    return {
        type: DEACTIVATE_PRODUCT_REQUESTED,
        payload
    }
}

export function ACTIVATE_PRODUCT_ACTION(payload) {
    return {
        type: ACTIVATE_PRODUCT_REQUESTED,
        payload
    }
}


export function GET_DEACTIVATED_PRODUCTS_ACTION(payload) {
    return {
        type: GET_DEACTIVATED_PRODUCTS_REQUESTED,
        payload
    }
}

export function FILTER_BY_PLACES_ACTION(payload) {
    return {
        type: FILTER_BY_PLACES_REQUESTED,
        payload
    }
}

export function SEARCH_PRODUCT_NAME_ACTION(payload) {
    return {
        type: SEARCH_PRODUCT_BY_NAME_REQUESTED,
        payload
    }
}

export function GET_ALL_COMMENTS_BY_PRODUCT_ACTION(payload) {
    return {
        type: GET_ALL_COMMENTS_BY_PRODUCT_REQUESTED,
        payload
    }
}
  
export function GIVE_FEEDBACK_RATE_ACTION(payload) {
    return {
      type: GIVE_FEEDBACK_RATE_REQUESTED,
      payload
    }
}

export function CHECK_IF_BUYER_ORDERED_ACTION(payload) {
    return {
        type: CHECK_IF_BUYER_ORDERED_REQUESTED,
        payload
    }
}

export function GET_ALL_REVIEWS_OF_PRODUCT_ACTION(payload) {
    return {
        type: GET_ALL_REVIEWS_OF_PRODUCT_REQUESTED,
        payload
    }
}
 
export function CLEAR_PRODUCTS_IF_LOGOUT_ACTION() {
    return {
        type: CLEAR_PRODUCTS_IF_LOGOUT
    }
}

export function CLEAR_PRODUCT_DETAILS_ACTION() {
    return {
        type: CLEAR_PRODUCT_DETAILS
    }
}

export function LISTS_OF_SELLERS_ACTION() {
    return {
        type: LISTS_OF_SELLERS_REQUESTED
    }
}
