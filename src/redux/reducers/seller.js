import { createReducer } from './createReducer'

const sellerInitialState = {
  email: '',
  message: '',
  resStatus: '',
  hasToken: false,
  sellerCode: null,
  isRegistered: false,
  unVerifiedSellers: [],
  toast: false,
  issubmit: false,
  inventoryReport: [],
  isFetching: true,
  allSellers: [],
  ordersData: [],
  coinsPayment: []
}

const sellerActionsHandler = {
  CHECK_EMAIL_TOKEN: (state, action) => {
    return {
      ...state,
      hasToken: action.hasToken
    }
  },
  SENT_EMAIL: (state, action) => {
    return {
      ...state,
      email: action.email,
      resStatus: action.resStatus,
      hasToken: true,
      sellerCode: ''
    }
  },
  CHECK_CODE_EXISTS: (state, action) => {
    return {
      ...state,
      sellerCode: action.sellerCode
    }
  },
  CODE_NOT_EXIST: (state, action) => {
    return {
      ...state,
      message: action.message
    }
  },
  ERROR_VERIFYING_EMAIL: (state, action) => {
    return {
      ...state,
      message: action.message,
      resStatus: action.resStatus
    }
  },
  CREATE_SELLER: (state, action) => {
    return {
      ...state,
      message: action.message,
      isRegistered: true,
      hasToken: false,
      email: '',
      sellerCode: ''
    }
  },
  ERROR_CREATING_SELLER: (state) => {
    return {
      ...state,
      email: '',
      message: '',
      resStatus: '',
      next: false,  
      hasToken: false,
      sellerCode: null,
      isRegistered: false
    }
  },
  CLEAR_SELLER_STATE: state => {
    return {
      ...state,
      message: '',
      resStatus: '',
      isRegistered: false
    }
  },
  RETRIEVED_UNVERIFIED_SELLERS: (state, { payload }) => {
    return {
      ...state,
      unVerifiedSellers: payload
    }
  },
  VERIFY_SELLER: (state, { id }) => {
    return {
      ...state,
      unVerifiedSellers: state.unVerifiedSellers.filter(({ seller_id }) => seller_id !== id),
      toast: true,
      issubmit: true
    }
  },
  CLEAR_TOAST: state => {
    return {
      ...state,
      toast: false,
      issubmit: false
    }
  },
  RETRIEVED_SELLER_INVENTORY_REPORT: (state, { payload }) => {
    return {
      ...state,
      inventoryReport: payload,
      isFetching: false
    }
  },
  SEARCH_PRODUCT_NAME: (state, { searchProducts }) => {
      return {
        ...state,
        inventoryReport: [ ...searchProducts ]
      }
  },
  RETRIEVE_ALL_SELLERS: (state, { allSellers }) => {
    return {
      ...state,
      allSellers,
      isFetching: true
    }
  },
  RETRIEVE_ORDERS_OF_BUYERS: (state, { ordersData }) => {
    return {
      ...state,
      ordersData
    }
  },
  ACTIVATE_SELLER: (state, { allSellers }) => {
    return {
      ...state,
      allSellers,
      resStatus: 200
    }
  },
  DEACTIVATE_SELLER: (state, { allSellers }) => {
    return {
      ...state,
      allSellers,
      resStatus: 200
    }
  },
  RETRIEVED_COINS_PH_PAYMENT: (state, { coinsPayment }) => {
    return {
      ...state,
      coinsPayment
    }
  },
  UPDATED_SELLER_TOKEN: (state, { unVerifiedSellers }) => {
    return {
      ...state,
      unVerifiedSellers,
      resStatus: 200
    }
  },
  CLEAR_SELLER_UNMOUNT: (state) => {
    return {
      ...state,
    }
  }
}

export default createReducer(sellerInitialState, sellerActionsHandler)