import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import {
  ADD_TO_CART_API,
  GET_ORDERS_SUMMARY_API,
  REMOVE_TO_CART_API,
  CHECKOUT_API,
  RESERVED_PRODUCT_API,
  GET_RESERVATION_DETAILS_API,
  DELETE_RESERVATION_API,
  SEARCH_RESERVATION_API,
  MOVE_TO_CART_API
} from '../api/api'
import {
  ADDED_TO_CART,
  RETRIEVED_ORDERS_SUMMARY,
  REMOVE_TO_CART,
  CHECKOUT_CART,
  RESERVED_BUYER,
  RETRIEVED_RESERVATION_DETAILS
} from '../types/cart'

export function* Add_To_Cart({payload}){
  const result =  yield call(axios.post, ADD_TO_CART_API, payload)
  // let quantity = response.quantity

  // const currOrderTotal = JSON.parse(localStorage.getItem('cartOrderTotal'))

  // if (response.buyer_id) {
  //   localStorage.setItem('cartOrderTotal', quantity + currOrderTotal)   
  // }

  // localStorage.setItem('cartOrderTotal', JSON.stringify(payload.orderQuantity + currOrderTotal,10))

  localStorage.setItem('cartOrderTotal', JSON.stringify(result.data.quantity))
  yield put({
    type: ADDED_TO_CART,
    quantity: result.data.quantity,
    resStatus: result.status
  })
}

export function* Get_Orders_Summary({ payload: { buyer_id }}) {
  const result = yield call(axios, GET_ORDERS_SUMMARY_API + buyer_id)
  const response = result.data.details
  const totalPayment = result.data.total
  const resStatus = result.status
  const buyerDetails = result.data.buyer[0]

  if (resStatus !== 200) {
    return
  }

  yield put({
    type: RETRIEVED_ORDERS_SUMMARY,
    cartData: response,
    totalPayment,
    resStatus,
    buyerDetails
  }) 
}

// export function* Remove_To_Cart({payload: { id, quantity }}) {
export function* Remove_To_Cart({ payload : { cart_id, quantity } }) {
  const result = yield call(axios.post, REMOVE_TO_CART_API, { cart_id })
  const response = result.data[0]
  const resStatus = result.status

  // const newList = response.list.reduce((acc, curr) => acc += parseInt(curr.quantity), 0)
  // if (resStatus !== 200) {
  //   return
  // }

  localStorage.setItem('cartOrderTotal', JSON.stringify(response.remainingOrder))
  
  yield put({
    type: REMOVE_TO_CART,
    // payload: response.list,
    resStatus,
    message: response.message,
    cart_id
  })
}

export function* Checkout_Cart({ payload }) {
  const result = yield call(axios.post, CHECKOUT_API, payload)
  const response = result.data
  const resStatus = result.status

  if (resStatus !== 200) {
    return
  }
  localStorage.setItem('cartOrderTotal', null)

  yield put({
    type: CHECKOUT_CART,
    // payload: response.deliver,
    message: response.message
  })
}

export function* ReservedBuyer({ payload }) {
  const result = yield call(axios.post, RESERVED_PRODUCT_API, payload)
  const response = result.data.details
  const totalPayment = result.data.total
  const resStatus = result.status
  const buyerDetails = result.data.buyer[0]

  if (resStatus !== 200) {
    return
  }
  localStorage.setItem('cartOrderTotal', result.data.quantity)

  yield put({
    type: RESERVED_BUYER,
    cartData: response,
    totalPayment,
    resStatus,
    buyerDetails,
    message: result.data.message
  }) 
}

export function* GetReservationDetails({ payload }) {
  const result = yield call(axios, GET_RESERVATION_DETAILS_API + payload.buyer_id)
  const resStatus = result.status
  
  if (resStatus !== 200) {
    return
  }

  yield put({
    type: RETRIEVED_RESERVATION_DETAILS,
    reservations: result.data.details,
    reservationQuantity: result.data.quantity
  })
}

export function* DeleteReservation({ payload }) {
  const result = yield call(axios.post, DELETE_RESERVATION_API, payload)
  const resStatus = result.status
  
  if (resStatus !== 200) {
    return
  }

  yield put({
    type: RETRIEVED_RESERVATION_DETAILS,
    reservations: result.data.original.details,
    reservationQuantity: result.data.original.quantity,
    resStatus: 200
  })
}

export function* SearchReservation({ payload }) {
  const result = yield call(axios.post, SEARCH_RESERVATION_API, payload)
  const resStatus = result.status
  
  if (resStatus !== 200) {
    return
  }

  yield put({
    type: RETRIEVED_RESERVATION_DETAILS,
    reservations: result.data
  })

}

export function* MoveToCart({ payload }) {
  const result = yield call(axios.post, MOVE_TO_CART_API, payload)
  const resStatus = result.status

  if (resStatus !== 200) {
    return
  }

  localStorage.setItem('cartOrderTotal', result.data.quantity)

  yield put({
    type: RETRIEVED_RESERVATION_DETAILS,
    reservations: result.data.reservations,
    resStatus: 200
  })
}