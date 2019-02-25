import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import {
  CREATE_SELLER_API,
  VERIFY_SELLER_EMAIL_API,
  CHECK_SELLER_EMAIL_TOKEN_API,
  CHECK_SELLER_CODE_API,
  UNVERIFIED_SELLERS_API,
  VERIFY_SELLER_API,
  GET_SELLER_INVENTORY_REPORT_API,
  SEARCH_PRODUCT_NAME_API,
  GET_ALL_SELLERS_API,
  GET_ORDERS_OF_BUYERS_API,
  DEACTIVATE_SELLER_API,
  ACTIVATE_SELLER_API,
  COINS_PH_PAYMENT_API,
  UPDATE_SELLER_TOKEN_API,
  SEARCH_PAID_UNPAID_SELLER_API,
  UPDATE_BUYERS_STATUS_IF_PAID_API,
  LISTS_OF_DELIVERIES_API,
  UPDATE_SELLER_DETAILS_API,
  GET_SELLER_DETAILS_API,
  GET_BUYERS_ORDERED_BY_PRODUCT_API,
  GET_ALL_SELLERS_WHO_PAID_API,
  GET_BUYERS_NOTICATION_API,
  UPDATE_NOTIFICATION_STATUS_API,
  SEARCH_ORDERS_API,
  GET_RESERVATION_TAB_DETAILS_API,
  SEARCH_RESERVATION_TAB_DETAILS_API,
  UPDATE_PENDING_DELIVERY_API,
  GOOGLE_PLACES_API,
} from '../api/api'
import {
    CREATE_SELLER,
    SENT_EMAIL,
    CHECK_EMAIL_TOKEN,
    CHECK_CODE_EXISTS,
    CODE_NOT_EXIST,
    RETRIEVED_UNVERIFIED_SELLERS,
    VERIFY_SELLER,
    RETRIEVED_SELLER_INVENTORY_REPORT,
    SEARCH_PRODUCT_NAME,
    RETRIEVE_ALL_SELLERS,
    RETRIEVE_ORDERS_OF_BUYERS,
    DEACTIVATE_SELLER,
    ACTIVATE_SELLER,
    RETRIEVED_COINS_PH_PAYMENT,
    UPDATED_SELLER_TOKEN,
    RETRIEVED_DELIVERY_DETAILS,
    RETRIEVED_SELLER_DETAILS,
    UPDATE_SELLER_DETAILS,
    RETRIEVED_BUYERS_ORDERED_BY_PRODUCT,
    RETRIEVED_ALL_SELLERS_WHO_PAID,
    RETRIEVED_BUYERS_NOTICATION,
    RETRIEVED_RESERVATION_TAB_DETAILS,
    RETRIEVED_ORDERS_OF_BUYERS_TWO,
    GOOGLE_PLACE
} from '../types/seller'
import {
  ERROR_CREATING_SELLER,
  ERROR_VERIFYING_EMAIL
} from '../types/error'
import { saveToSessionStorage } from '../storage/index';
import store from '../store/store';

export function* Check_Seller_Email_Token({email}){
    const result = yield call(axios.post, CHECK_SELLER_EMAIL_TOKEN_API, email)
    const resStatus = result.status
    const response = result.data[0]

    if (resStatus === 201) return

    store.subscribe(()=>{
        saveToSessionStorage({
            seller: store.getState().seller
        })
    })

    yield put({
        type: CHECK_EMAIL_TOKEN,
        hasToken: response.hasToken,
        resStatus
    })
}

export function* Check_Seller_Code_Exist({payload}){
    const result = yield call(axios.post, CHECK_SELLER_CODE_API, payload)
    const response = result.data
    const resStatus = result.status

    if (resStatus !== 200) {
        yield put({
            type: CODE_NOT_EXIST,
            message: response,
        })
        return
    }

    store.subscribe(()=>{
        saveToSessionStorage({
            seller: store.getState().seller
        })
    })

    yield put({
        type: CHECK_CODE_EXISTS,
        sellerCode: response.sellerCode,
    })
}

export function* Verify_Seller_Email({email}){
    const result = yield call(axios.post, VERIFY_SELLER_EMAIL_API, email)
    const resStatus = result.status
    const response = result.data[0]

    if (resStatus !== 200) {
        yield put({
            type: ERROR_VERIFYING_EMAIL,
            message: response.message,
            resStatus
        })
        return
    }

    store.subscribe(()=>{
        saveToSessionStorage({
            seller: store.getState().seller
        })
    })
  
    yield put({
        type: SENT_EMAIL,
        email: response.email,
        resStatus
    })
    
}

export function* Create_Seller(data){
    const result = yield call(axios.post, CREATE_SELLER_API, data.payload)
    const resStatus = result.status
    const response = result.data

    if (resStatus !== 200) {
        yield put({
            type: ERROR_CREATING_SELLER,
            message: response,
            resStatus
        })
        return
    }
    yield put({
        type: CREATE_SELLER,
        message: response,
        resStatus
    })
}

export function* Get_Unverified_Sellers() {
    const result = yield call(axios, UNVERIFIED_SELLERS_API)
    const response = result.data.sellers

    if (result.status !== 200) {
        return
    }

    yield put({
        type: RETRIEVED_UNVERIFIED_SELLERS,
        payload: response,
    })
}


export function* Get_All_Sellers() {
    const result = yield call(axios, GET_ALL_SELLERS_API)
    const response = result.data.sellers

    if (result.status !== 200) {
        return
    }

    yield put({
        type: RETRIEVE_ALL_SELLERS,
        allSellers: response,
    })
}

export function* Verify_Seller({ id: seller_id }) {
    const result = yield call(axios.post, VERIFY_SELLER_API, {seller_id})
    if (result.status !== 200) {
        return 
    }

    yield put({
        type: VERIFY_SELLER,
        id: seller_id
    })
}

export function* Get_Seller_Inventory_Report({ seller_id }) {
    const result = yield call(axios, GET_SELLER_INVENTORY_REPORT_API + seller_id) 
    
    if (result.status !== 200) {
        return
    }

    // const filterItems = result.data.reduce((acc, items) => {
    //     const ref = 
    //     acc[ref] = { ...items }
    //     acc.payment += (items.total_payment)
    //     // console.log('payment: ', acc);
    //     // acc[ref] = acc[ref].total_payment + items.total_payment
    //     // console.log(acc[ref].total_payment)
    //     return acc
    // }, {payment: 0})

    // console.log({filterItems})

    yield put({
        type:  RETRIEVED_SELLER_INVENTORY_REPORT,
        // payload: Object.values(filterItems)
        payload: result.data
    })
}


export function* Search_Product_Name({ payload }) {
    const result = yield call(axios.post, SEARCH_PRODUCT_NAME_API, payload)

    if (result.status !== 200) {
        return
    }

    yield put({
        type: SEARCH_PRODUCT_NAME,
        searchProducts: result.data,
    })
}

export function* Activate_Seller({ payload }) {
    const result = yield call(axios.post, ACTIVATE_SELLER_API, payload)    

    if (result.status !== 200) {
        return
    }

    yield put({
        type: ACTIVATE_SELLER,
        allSellers: result.data,
        resStatus: 200
    })
}

export function* DeActivate_Seller({ payload }) {
    const result = yield call(axios.post, DEACTIVATE_SELLER_API, payload)

    if (result.status !== 200) {
        return
    }

    yield put({
        type: DEACTIVATE_SELLER,
        allSellers: result.data,
        resStatus: 200
    })
}

export function* GetCoinsPhPayment() {
    const config = {
        method: 'get',
        url: COINS_PH_PAYMENT_API,
        headers: {
            'Authorization': 'Bearer aYQBRmOS30dM65oCglzXs9qLKXetCn',
            'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Credentials': "true",
            // 'Access-Control-Allow-Headers': "Authorization, Content-Type, X-Coins-Region, X-CSRFToken, X-Enforce-CSRF, X-Nonce",
            // 'Access-Control-Allow-Methods': "OPTIONS, GET, POST, PUT, DELETE, PATCH",
            // 'Allow': "GET, POST, OPTIONS"
        },
    }
    const result = yield call(axios, config) 
    yield put({
        type: RETRIEVED_COINS_PH_PAYMENT,
        coinsPayment: result.data
    })
}

export function* UpdateTokenSeller({ payload }) {
    const result = yield call(axios.post, UPDATE_SELLER_TOKEN_API, payload)

    if (result.status !== 200) {
        return
    }

    yield put({
        type: UPDATED_SELLER_TOKEN,
        unVerifiedSellers: result.data
    })
}

export function* SearchPaidUnpaidSeller({ payload }) {
    const result = yield call(axios.post, SEARCH_PAID_UNPAID_SELLER_API, payload)

    if (result.status !== 200) {
        return
    }

    if (result.data.type === 'paid') {
        yield put({
            type: RETRIEVE_ALL_SELLERS,
            allSellers: result.data.data
        })     
        return   
    }

    yield put({
        type: RETRIEVED_UNVERIFIED_SELLERS,
        payload: result.data.data
    })
}

// orders logic
export function* Get_Orders_Of_Buyers({ payload }) {
    const result = yield call(axios, GET_ORDERS_OF_BUYERS_API + payload.seller_id)

    const filter = result.data.details.reduce((acc, data) => {
        const ref = data.reference_number
        acc[ref] = {...data}
        return acc
    }, {})

    const filter2 = (result.data.unpaid && result.data.unpaid.length > 0) && result.data.unpaid.reduce((acc, data) => {
        const ref = data.reference_number
        acc[ref] = {...data}
        return acc
    }, {})

    const finalItems = {
        details: Object.values(filter),
        orders: result.data.orders,
        unpaid: Object.values(filter2)
    }

    yield put({
        type: RETRIEVE_ORDERS_OF_BUYERS,
        ordersData: finalItems
        // orderDetails: result.data.details,
        // orders: result.data.orders,
    })
}

export function* UpdateBuyerStatusWhenPaid({ payload }) {
    const result = yield call(axios.post, UPDATE_BUYERS_STATUS_IF_PAID_API, payload)
    
    if (result.status !== 200) {
        return
    }

    const filter = result.data && result.data.details && result.data.details.length  && result.data.details.reduce((acc, data) => {
        const ref = data.reference_number
        acc[ref] = {...data}
        return acc
    }, {})
    
    const finalItems = {
        details: Object.values(filter),
        orders: result.data.orders
    }

    yield put({
        type: RETRIEVED_ORDERS_OF_BUYERS_TWO,
        ordersData: finalItems,
        // resStatus: result.status,
        // orderDetails: result.data.details,
        // orders: result.data.orders,
    })
}

export function* GetDeliveryDetails({ payload }) {
    const result = yield call(axios, LISTS_OF_DELIVERIES_API + payload.seller_id)
    const filter = result.data.details.reduce((acc, data) => {
        const ref = data.reference_number
        acc[ref] = {...data}
        return acc
    }, {})

    const finalItems = {
        details: Object.values(filter),
        orders: result.data.orders
    }

    yield put({
        type: RETRIEVED_DELIVERY_DETAILS,
        // deliveries: result.data,
        deliveries: finalItems
    })
}

export function* GetSellerDetails({ payload }) {
    // const result = yield call(axios, GET_SELLER_DETAILS_API + payload.seller_id)
    // yield put({
    //     type: RETRIEVED_SELLER_DETAILS,
    //     sellerDetails: result.data[0],
    // })   
}

export function* UpdateSellerDetails({ payload }) {
    const result = yield call(axios.post, UPDATE_SELLER_DETAILS_API, payload)
    yield put({
        type: UPDATE_SELLER_DETAILS,
        sellerDetails: result.data[0],
    })
}

export function* GetBuyersOrderedByProduct({ payload }) {
    const result = yield call(axios.post, GET_BUYERS_ORDERED_BY_PRODUCT_API, payload)

    const filterItems = result.data.reduce((acc, items) => {
        // const ref = items.product_id
        const ref = items.reference_number
        acc[ref] = { ...items }
        return acc
    }, {})

    yield put({
        type: RETRIEVED_BUYERS_ORDERED_BY_PRODUCT,
        orderedBuyers: Object.values(filterItems),
        // orderedBuyers: result.data
    })
}

export function* GetAllSellersWhoPaidRequested({ payload }) {
    if (payload.user_type === 'admin') {
        const result = yield call(axios, GET_ALL_SELLERS_WHO_PAID_API) 
        
        yield put({
            type: RETRIEVED_ALL_SELLERS_WHO_PAID,
            notifications: result.data
        })
    }
}

export function* GetBuyersNotification({ payload }) {
    const result = yield call(axios, GET_BUYERS_NOTICATION_API + payload.buyer_id)    

    yield put({
        type: RETRIEVED_BUYERS_NOTICATION,
        buyerNotification: result.data
    })
}

export function* UpdateNotificationStatus({ payload }) {
    const result = yield call(axios.post, UPDATE_NOTIFICATION_STATUS_API, payload)    
    
    yield put({
        type: RETRIEVED_BUYERS_NOTICATION,
        buyerNotification: result.data
    })
}

export function* SearchOrders({ payload }) {
    const result = yield call(axios.post, SEARCH_ORDERS_API, payload)    

    const filterItems = result.data.details.reduce((acc, items) => {
        const ref = items.email
        acc[ref] = { ...items }
        return acc
    }, {})

    const finalItems = {
        details: Object.values(filterItems),
        orders: result.data.orders
    }

    yield put({
        type: RETRIEVE_ORDERS_OF_BUYERS,
        ordersData: finalItems,
    })
}

export function* GetReservationTabDetails({ payload }) {
    const result = yield call(axios, GET_RESERVATION_TAB_DETAILS_API + payload.seller_id)    
    
    yield put({
        type: RETRIEVED_RESERVATION_TAB_DETAILS,
        reservationDetails: result.data,
    })
}

export function* SearchReservationTabDetails({ payload }) {
    const result = yield call(axios.post, SEARCH_RESERVATION_TAB_DETAILS_API, payload)    
    
    yield put({
        type: RETRIEVED_RESERVATION_TAB_DETAILS,
        reservationDetails: result.data,
    })
}

export function* UpdatePendingDelivery({ payload }) { 
    const result = yield call(axios.post, UPDATE_PENDING_DELIVERY_API, payload)    

    const filter = result.data.details.reduce((acc, data) => {
        const ref = data.reference_number
        acc[ref] = {...data}
        return acc
    }, {})

    const finalItems = {
        details: Object.values(filter),
        orders: result.data.orders
    }

    yield put({
        type: RETRIEVED_DELIVERY_DETAILS,
        deliveries: finalItems,
    })
}


export function* GooglePlace({ payload }) { 
    const result = yield call(axios, GOOGLE_PLACES_API + payload)    

    if (result.data.predictions.length === 0) {
        return
    }
    
    yield put({
        type: GOOGLE_PLACE,
        philPlaces: result.data,
    })
}