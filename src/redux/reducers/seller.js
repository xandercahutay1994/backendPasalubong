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
  coinsPayment: [],
  deliveries: [],
  isUpdateAccount: false,
  sellerDetails: {},
  orderedBuyers: [],
  orderDetails: [],
  orders: [],
  notifications: [],
  activeIndex: 0,
  buyerNotification: [],
  reservationDetails: [],
  orderStatus: '',
  deliveryStatus: '',
  philPlaces: [],
  unpaid: []
}

const sellerActionsHandler = {
  CHECK_EMAIL_TOKEN: (state, action) => {
    return {
      ...state,
      hasToken: action.hasToken
    }
  },
  UPDATE_SELLER_ACCOUNT: (state) => {
    return {
      ...state,
      isUpdateAccount: true
    }
  },
  CLOSE_UPDATE_SELLER_ACCOUNT: (state) => {
    return {
      ...state,
      isUpdateAccount: false
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
  RETRIEVE_ORDERS_OF_BUYERS: (state, { ordersData, orderDetails, orders, unpaid }) => {
    return {
      ...state,
      ordersData,
      // orderDetails: [...orderDetails],
      // orders,
      notifications: ordersData.details,
      unpaid
    }
  },
  RETRIEVED_ORDERS_OF_BUYERS_TWO: (state, { ordersData, orderDetails, orders }) => {
    return {
      ...state,
      ordersData,
      // orderDetails: [...orderDetails],
      // orders,
      orderStatus: 200,
      notifications: ordersData.details
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
  },
  RETRIEVED_DELIVERY_DETAILS: (state, { deliveries }) => {
    return {
      ...state,
      deliveries,
      deliveryStatus: 200
    }
  },
  CLEAR_STATUS: (state) => {
    return {
      ...state,
      resStatus: '',
      orderStatus: ''
    }
  },
  RETRIEVED_SELLER_DETAILS: (state, { sellerDetails }) => {
    return {
      ...state,
      sellerDetails
    }
  },
  UPDATE_SELLER_DETAILS: (state, { sellerDetails }) => {
    return {
      ...state,
      sellerDetails,
      resStatus: 200
    }
  },
  RETRIEVED_BUYERS_ORDERED_BY_PRODUCT: (state, { orderedBuyers }) => {
    return {
      ...state,
      orderedBuyers
    }
  },
  RETRIEVED_ALL_SELLERS_WHO_PAID: (state, { notifications }) => {
    return {
      ...state,
      notifications
    }
  },
  OPEN_ORDERS_NOTIFICATION: (state) => {
    return {
      ...state,
      activeIndex: 3
    }
  },
  RESET_ACTIVE_INDEX: (state) => {
    return {
      ...state,
      activeIndex: ''
    }
  },
  RETRIEVED_BUYERS_NOTICATION: (state, { buyerNotification }) => {
    return {
      ...state,
      notifications: buyerNotification,
      buyerNotification
    }
  },
  CLEAR_DELIVERY_STATUS: (state) => {
    return {
      ...state,
      deliveryStatus: ''
    }
  },
  GOOGLE_PLACE: (state, { philPlaces }) => {
    return {
      ...state,
      philPlaces
    }
  },
  CLEAR_GOOGLE_PLACE: (state) => {
    return {
      ...state,
      philPlaces: []
    }
  },
  RETRIEVED_RESERVATION_TAB_DETAILS: (state, {reservationDetails}) => {
    return {
      ...state,
      reservationDetails
    }
  }
} 

export default createReducer(sellerInitialState, sellerActionsHandler)