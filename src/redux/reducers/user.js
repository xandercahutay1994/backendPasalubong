import {createReducer} from './createReducer'

const userState = {
    isLoginModalVisible: false,
    isBtnSubmit: false,
    email: null,
    user_type: null,
    resStatus: null,
    message: '',
    response: '',
    login_id: null
}

const userActionsHandler = {
    LOGIN_USER: (state, { email, user_type, resStatus, login_id}) => {
        return { 
            ...state, 
            email,
            user_type,
            resStatus,
            login_id, 
            isBtnSubmit: false,
            isLoginModalVisible: false
        }
    },
    SHOW_LOGIN_DIALOG: state => {
        return {
            ...state,
            isLoginModalVisible: true
        }
    },
    HIDE_LOGIN_DIALOG: state => {
        return {    
            ...state,
            isLoginModalVisible: false,
            isBtnSubmit: false,
            isBtnDisabled: false
        }
    },
    BTN_LOGIN_CLICK: state => {
        return {
            ...state,
            isBtnSubmit: true
        }
    },
    CLEAR_NOT_AUTH_LOGIN: state => {
        return {
            ...state,
            message: '',
            resStatus: ''
        }
    },
    ERROR_LOGGING_USER: (state, action) => {
        return {
            ...state,
            message: action.message,
            resStatus: action.resStatus,
            isBtnSubmit: false
        }
    },
    CLEAR_LOGIN_USER: state => {
        return {
            ...state,
            response: '',
            email: '',
            user_type: '',
            resStatus: '',
            login_id: null,
            isLoginModalVisible: false
        }
    }
}

export default createReducer(userState, userActionsHandler)