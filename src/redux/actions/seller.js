import { 
  CREATE_SELLER_REQUESTED,
  CLEAR_SELLER_STATE,
  VERIFY_EMAIL_REQUESTED,
  CHECK_EMAIL_TOKEN_REQUESTED,
  CHECK_CODE_EXIST_REQUESTED,
  GET_UNVERIFIED_SELLERS_REQUESTED,
  VERIFY_SELLER_REQUESTED,
  CLEAR_TOAST,
  GET_SELLER_INVENTORY_REPORT_REQUESTED,
  SEARCH_PRODUCT_NAME_REQUESTED,
  GET_ALL_SELLERS_REQUESTED,
  GET_ORDERS_OF_BUYERS_REQUESTED,
  DEACTIVATE_SELLER_REQUESTED,
  ACTIVATE_SELLER_REQUESTED,
  GET_COINS_PH_PAYMENT_REQUESTED,
  UPDATE_SELLER_TOKEN_REQUESTED,
  SEARCH_PAID_UNPAID_SELLER_REQUESTED,
  CLEAR_SELLER_UNMOUNT,
  UPDATE_BUYER_STATUS_WHEN_ORDER_PAID_REQUESTED,
  CLEAR_STATUS,
  GET_DELIVERY_DETAILS_REQUESTED,
  UPDATE_SELLER_ACCOUNT,
  CLOSE_UPDATE_SELLER_ACCOUNT,
  GET_SELLER_DETAILS_REQUESTED,
  UPDATE_SELLER_DETAILS_REQUESTED,
  GET_BUYERS_ORDERED_BY_PRODUCT_REQUESTED,
  GET_ALL_SELLERS_WHO_PAID_REQUESTED,
  OPEN_ORDERS_NOTIFICATION,
  RESET_ACTIVE_INDEX,
  GET_BUYERS_NOTICATION_REQUESTED,
  UPDATE_NOTIFICATION_STATUS_REQUESTED,
  SEARCH_ORDERS_REQUESTED,
  GET_RESERVATION_TAB_DETAILS_REQUESTED,
  SEARCH_RESERVATION_TAB_DETAILS_REQUESTED,
  UPDATE_PENDING_DELIVERY_REQUESTED,
  CLEAR_DELIVERY_STATUS,
  GOOGLE_PLACE_REQUESTED,
  CLEAR_GOOGLE_PLACE
} from '../types/seller'

export function CHECK_EMAIL_TOKEN_ACTION(email) {
  return {
    type: CHECK_EMAIL_TOKEN_REQUESTED,
    email
  }
}

export function CHECK_CODE_EXIST_ACTION(payload) {
  return {
    type: CHECK_CODE_EXIST_REQUESTED,
    payload
  }
}

export function VERIFY_EMAIL_ACTION(email) {
  return {
    type: VERIFY_EMAIL_REQUESTED,
    email
  }
}

export function CREATE_SELLER_ACTION(data) {
  return {
    type: CREATE_SELLER_REQUESTED,
    payload: data
  }
}

export function CLEAR_SELLER_STATE_ACTION() {
  return {
    type: CLEAR_SELLER_STATE
  }
}

export function GET_UNVERIFIED_SELLERS_ACTION() {
  return {
    type: GET_UNVERIFIED_SELLERS_REQUESTED
  }
}


export function VERIFY_SELLER_ACTION(id) {
  return {
    type: VERIFY_SELLER_REQUESTED,
    id
  }
}

export function CLEAR_TOAST_ACTION() {
  return {
    type: CLEAR_TOAST
  }
}

export function GET_SELLER_INVENTORY_REPORT_ACTION(seller_id) {
  return {
    type: GET_SELLER_INVENTORY_REPORT_REQUESTED,
    seller_id
  }
}

export function SEARCH_PRODUCT_NAME_ACTION(payload) {
  return {
      type: SEARCH_PRODUCT_NAME_REQUESTED,
      payload
  }
}

export function GET_ALL_SELLERS_ACTION() {
  return {
    type: GET_ALL_SELLERS_REQUESTED
  }
}

export function GET_ORDERS_OF_BUYERS_ACTION(payload) {
  return {
    type: GET_ORDERS_OF_BUYERS_REQUESTED,
    payload
  }
}

export function ACTIVATE_SELLER_ACTION(payload) {
  return {
    type: ACTIVATE_SELLER_REQUESTED,
    payload
  }
}


export function DEACTIVATE_SELLER_ACTION(payload) {
  return {
    type: DEACTIVATE_SELLER_REQUESTED,
    payload
  }
}

export function COINS_PH_PAYMENT_ACTION() {
  return {
    type: GET_COINS_PH_PAYMENT_REQUESTED
  }
}

export function UPDATE_SELLER_TOKEN_ACTION(payload) {
  return {
    type: UPDATE_SELLER_TOKEN_REQUESTED,
    payload
  }
}

export function SEARCH_PAID_UNPAID_SELLER_ACTION(payload) {
  return {
    type: SEARCH_PAID_UNPAID_SELLER_REQUESTED,
    payload
  }
}

export function CLEAR_SELLER_ACTION() {
  return {
    type: CLEAR_SELLER_UNMOUNT
  }
}

export function UPDATE_BUYERS_STATUS_IF_PAID_ACTION(payload) {
  return {
    type: UPDATE_BUYER_STATUS_WHEN_ORDER_PAID_REQUESTED,
    payload
  }
}

export function CLEAR_STATUS_ACTION() {
  return {
    type: CLEAR_STATUS
  }
}

export function GET_DELIVERY_DETAILS_ACTION(payload) {
  return {
    type: GET_DELIVERY_DETAILS_REQUESTED,
    payload
  }
}

export function UPDATE_SELLER_ACCOUNT_ACTION() {
  return {
    type: UPDATE_SELLER_ACCOUNT
  }
}

export function CLOSE_UPDATE_ACCOUNT_ACTION() {
  return {
    type: CLOSE_UPDATE_SELLER_ACCOUNT
  }
}

export function GET_SELLER_DETAILS_ACTION(payload) {
  return {
    type: GET_SELLER_DETAILS_REQUESTED,
    payload
  }
}

export function UPDATE_SELLER_DETAILS_ACTION(payload) {
  return {
    type: UPDATE_SELLER_DETAILS_REQUESTED,
    payload
  }
}

export function GET_BUYERS_ORDERED_BY_PRODUCT_ACTION(payload) {
  return {
    type: GET_BUYERS_ORDERED_BY_PRODUCT_REQUESTED,
    payload
  }
}


export function GET_ALL_SELLERS_WHO_PAID_ACTION(payload) {
  return {
    type: GET_ALL_SELLERS_WHO_PAID_REQUESTED,
    payload
  }
}

export function OPEN_ORDERS_NOTIFICATION_ACTION() {
  return {
    type: OPEN_ORDERS_NOTIFICATION
  }
}

export function RESET_ACTIVE_INDEX_ACTION() {
  return {
    type: RESET_ACTIVE_INDEX
  }
}

export function GET_BUYERS_NOTICATION_ACTION(payload) {
  return {
    type: GET_BUYERS_NOTICATION_REQUESTED,
    payload
  }
}

export function UPDATE_NOTIFICATION_STATUS_ACTION(payload) {
  return {
    type: UPDATE_NOTIFICATION_STATUS_REQUESTED,
    payload
  }
}

export function SEARCH_ORDERS_ACTION(payload) {
  return {
    type: SEARCH_ORDERS_REQUESTED,
    payload
  }
}

export function GET_RESERVATION_TAB_DETAILS_ACTION(payload) {
  return {
    type: GET_RESERVATION_TAB_DETAILS_REQUESTED,
    payload
  }
}

export function SEARCH_RESERVATION_TAB_DETAILS_ACTION(payload) {
  return {
    type: SEARCH_RESERVATION_TAB_DETAILS_REQUESTED,
    payload
  }
}

export function UPDATE_PENDING_DELIVERY_ACTION(payload) {
  return {
  type: UPDATE_PENDING_DELIVERY_REQUESTED,
    payload
  }
}

export function CLEAR_DELIVERY_STATUS_ACTION() {
  return {
  type: CLEAR_DELIVERY_STATUS
  }
}

export function GOOGLE_PLACE_ACTION(payload) {
  return {
    type: GOOGLE_PLACE_REQUESTED,
    payload
  }
}

export function CLEAR_GOOGLE_PLACE_ACTION(payload) {
  return {
    type: CLEAR_GOOGLE_PLACE,
    payload
  }
}