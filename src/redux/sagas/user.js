import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import { saveToSessionStorage } from '../storage'
import store from '../store/store'
import { 
    LOGIN_USER,
} from '../types/user'
import { 
    ERROR_LOGGING_USER,
} from '../types/error'
import { LOGIN_USER_API } from '../api/api';

export function* Login_User({payload}){
    const result = yield call(axios.post, LOGIN_USER_API, payload)
    const resStatus = result.status
    const response = result.data[0]

    if (resStatus !== 200) {
        yield put({
            type: ERROR_LOGGING_USER,
            message: response.message,
            resStatus  
        })
        return
    }

    store.subscribe(()=>{
        saveToSessionStorage({
            user: store.getState().user
        })
    })

    yield put({
        type: LOGIN_USER,
        message: response.message,
        email: response.email,
        user_type: response.type,
        login_id: response.login_id,
        resStatus
    })
}
