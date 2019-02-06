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
  CLEAR_SELLER_UNMOUNT
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