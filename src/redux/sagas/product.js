import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import {
    CREATE_PRODUCT,
    RETRIEVED_PRODUCT,
    RETRIEVED_PRODUCT_DETAILS,
    RETRIEVED_ALL_SELLERS_PRODUCTS,
    UPDATE_PRODUCT,
    DEACTIVATED_PRODUCT,
    RETRIEVED_DEACTIVATED_PRODUCTS,
    ACTIVATED_PRODUCT,
    FILTER_BY_PLACES,
    SEARCH_PRODUCT_BY_NAME,
    RETRIEVED_ALL_COMMENTS_BY_PRODUCT,
    GIVE_FEEDBACK,
    CHECK_IF_BUYER_ORDERED,
    RETRIEVED_ALL_REVIEWS_OF_PRODUCT,
    LISTS_OF_SELLERS
} from '../types/product'
import {
    ERROR_CREATING_PRODUCT,
    ERROR_GETTING_PRODUCTS,
    ERROR_GETTING_PRODUCT_DETAILS,
    ERROR_GETTING_ALL_SELLERS_PRODUCTS
} from '../types/error'
import {
    CREATE_PRODUCT_API,
    GET_PRODUCT_API,
    GET_PRODUCT_DETAILS_API,
    GET_ALL_SELLERS_PRODUCTS_API,
    UPDATE_PRODUCT_API,
    DEACTIVATE_PRODUCT_API,
    GET_DEACTIVATED_PRODUCT_API,
    ACTIVATE_PRODUCT_API,
    FILTER_BY_PLACES_API,
    SEARCH_PRODUCT_NAME_API,
    GET_ALL_COMMENTS_BY_PRODUCT_API,
    GIVE_FEEDBACK_RATE_API,
    CHECK_IF_BUYER_ORDERED_API,
    LISTS_OF_SELLERS_API,
    GET_ALL_REVIEWS_OF_PRODUCT_API
} from '../api/api'

export function* Create_Product({payload}) {
    const result = yield call(axios.post, CREATE_PRODUCT_API, payload)
    const response = result.data
    const resStatus = result.status    

    if (resStatus !== 200) {
        yield put({
            type: ERROR_CREATING_PRODUCT,
            payload: response,
            resStatus  
        })
    }

    yield put({
        type: CREATE_PRODUCT,
        payload: response,
        resStatus  
    })
}

export function* Get_Product({payload}) {
    const result = yield call(axios, GET_PRODUCT_API + payload)
    const response = result.data
    const resStatus = result.status    

    if (resStatus !== 200) {
        yield put({
            type: ERROR_GETTING_PRODUCTS,
            payload: response,
            resStatus
        })
    }

    yield put({
        type: RETRIEVED_PRODUCT,
        payload: response,
        resStatus  
    })
}

export function* Get_Product_Details({payload}) {
    const result = yield call(axios, GET_PRODUCT_DETAILS_API + payload)
    const response = result.data[0]
    const resStatus = result.status    

    if (!result || resStatus !== 200) {
        yield put({
            type: ERROR_GETTING_PRODUCT_DETAILS,
            payload: response,
            resStatus
        })
        return
    }
    
    yield put({
        type: RETRIEVED_PRODUCT_DETAILS,
        payload: response,
        resStatus  
    })
}

export function* Get_All_Sellers_Products() {
    const result = yield call(axios, GET_ALL_SELLERS_PRODUCTS_API)
    const response = result.data[0]
    const resStatus = result.status    

    if (resStatus !== 200) {
        yield put({
            type: ERROR_GETTING_ALL_SELLERS_PRODUCTS,
            resStatus  
        })
        return        
    }

    yield put({
        type: RETRIEVED_ALL_SELLERS_PRODUCTS,
        sellersProduct: response.products,
        resStatus  
    })
}

export function* Update_Product({ payload }) {
    const result = yield call(axios.post, UPDATE_PRODUCT_API, payload)
    const response = result.data

    if (result.status !== 200) {
        return 
    }

    yield put({
        type: UPDATE_PRODUCT,
        products: response
    })
}

export function* Deactivate_Product({ payload }) {
    const result = yield call(axios.post, DEACTIVATE_PRODUCT_API, payload)
    const response = result.data

    if (result.status !== 200) {
        return 
    }

    yield put({
        type: DEACTIVATED_PRODUCT,
        products: response,
        resStatus: result.status
    })
}

export function* Activate_Product({ payload }) {
    const result = yield call(axios.post, ACTIVATE_PRODUCT_API, payload)
    const response = result.data

    if (result.status !== 200) {
        return 
    }

    yield put({
        type: ACTIVATED_PRODUCT,
        products: response
    })
}

export function* Get_Deactivated_Products({ payload }) {
    const result = yield call(axios, GET_DEACTIVATED_PRODUCT_API + payload.seller_id)
    const response = result.data

    if (result.status !== 200) {
        return 
    }

    yield put({
        type: RETRIEVED_DEACTIVATED_PRODUCTS,
        products: response
    })
}

export function* Filter_By_Places({ payload }) {
    const result = yield call(axios.post, FILTER_BY_PLACES_API, payload)

    if (result.status !== 200) {
        return 
    }

    yield put({
        type: FILTER_BY_PLACES,
        sellersProduct: result.data
    })
}

export function* Search_Product_By_Name({ payload }) {
    const result = yield call(axios.post, SEARCH_PRODUCT_NAME_API, payload)

    if (result.status !== 200) {
        return 
    }

    yield put({
        type: SEARCH_PRODUCT_BY_NAME,
        products: result.data
    })
}

export function* GetAllCommentsByProduct({ payload }) {
    const result = yield call(axios.get, GET_ALL_COMMENTS_BY_PRODUCT_API + payload.product_id)

    if (result.status !== 200) {
        return 
    }

    yield put({
        type: RETRIEVED_ALL_COMMENTS_BY_PRODUCT,
        comments: result.data
    })
}


export function* GiveFeedbackRate({ payload }) {
    const result = yield call(axios.post, GIVE_FEEDBACK_RATE_API, payload)

    if (result.status !== 200) {
        return
    }

    yield put({
        type: GIVE_FEEDBACK,
        resStatus: result.status,
        comments: result.data
    })
}

export function* CheckIfBuyerOrdered({ payload }) {
    const result = yield call(axios.post, CHECK_IF_BUYER_ORDERED_API, payload)

    if (result.status !== 200) {
        return
    }

    yield put({
        type: CHECK_IF_BUYER_ORDERED,
        buyerHasOrdered: result.data
    })
}

export function* GetAllReviewsOfProduct({ payload }) {
    // const result = yield call(axios.get, GET_ALL_COMMENTS_BY_PRODUCT_API + payload.product_id)
    const result = yield call(axios.get, GET_ALL_REVIEWS_OF_PRODUCT_API + payload.product_id)

    if (result.status !== 200) {
        return
    }

    yield put({
        type: RETRIEVED_ALL_REVIEWS_OF_PRODUCT,
        comments: result.data
    })
}

export function* ListsOfSellers() {
    const result = yield call(axios.get, LISTS_OF_SELLERS_API)

    if (result.status !== 200) {
        return
    }

    yield put({
        type: LISTS_OF_SELLERS,
        sellers: result.data
    })

}