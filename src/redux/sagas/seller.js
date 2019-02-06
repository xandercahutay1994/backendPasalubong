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
  SEARCH_PAID_UNPAID_SELLER_API
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
    UPDATED_SELLER_TOKEN
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

    yield put({
        type:  RETRIEVED_SELLER_INVENTORY_REPORT,
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

export function* Get_Orders_Of_Buyers({ payload }) {
    const result = yield call(axios, GET_ORDERS_OF_BUYERS_API + payload.seller_id)
    yield put({
        type: RETRIEVE_ORDERS_OF_BUYERS,
        ordersData: result.data,
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