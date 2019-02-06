import { createReducer } from './createReducer'

const buyerInitialState = {
  buyerRegistered: false,
  message: '',
  resStatus: '',
  orderHistory: [],
  isFetching: true
}

const buyeActionsHandler = {
  CREATE_BUYER: (state, action) => {
    return {
      ...state,
      message: action.payload,
      buyerRegistered: true,
      resStatus: action.resStatus
    }
  },
  CLEAR_BUYER_STATE: state => {
    return{
      ...state,
      message: '',
      buyerRegistered: false,
      resStatus: ''
    }
  },
  ERROR_CREATING_BUYER: (state, action) => {
    return {
      ...state,
      resStatus: action.resStatus,
      message: action.payload,
      buyerRegistered: false
    }
  },
  RETRIEVE_ALL_ORDERS_OF_BUYER: (state, { orderHistory }) => {
    return {
      ...state,
      orderHistory,
      isFetching: false
    }
  }
}

export default createReducer(buyerInitialState, buyeActionsHandler)
