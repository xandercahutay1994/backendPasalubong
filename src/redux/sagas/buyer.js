import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import {
    CREATE_BUYER_API,
    GET_ALL_ORDERS_OF_BUYERS_API
} from '../api/api'
import {
    CREATE_BUYER,
    RETRIEVE_ALL_ORDERS_OF_BUYER,
} from '../types/buyer'
import {
    ERROR_CREATING_BUYER
} from '../types/error'

export function* Create_Buyer({payload}){
    const result = yield call(axios.post, CREATE_BUYER_API, payload)
    const resStatus = result.status
    const response = result.data

    if (result.status !== 200){
        yield put({ 
            type: ERROR_CREATING_BUYER,
            payload: response,
            resStatus
        })
        return
    }
    yield put({ 
        type: CREATE_BUYER,
        payload: response,
        resStatus,
        buyerRegistered: true
    })
}

export function* Get_All_Orders_Of_Buyer({ payload }) {
    const result = yield call(axios.get, GET_ALL_ORDERS_OF_BUYERS_API + payload.login_id)

    if (result.status !== 200) {
        return
    }

    yield put({
        type: RETRIEVE_ALL_ORDERS_OF_BUYER,
        orderHistory: result.data
    })
}


