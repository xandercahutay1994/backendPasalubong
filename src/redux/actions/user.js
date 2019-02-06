import { 
    CLEAR_LOGIN_USER,
    SHOW_LOGIN_DIALOG,
    HIDE_LOGIN_DIALOG,
    BTN_LOGIN_CLICK,
    LOGOUT_USER,
    LOGIN_USER_REQUESTED,
    CLEAR_NOT_AUTH_LOGIN,
    CHECK_USER_LOGIN_REQUESTED
  } from '../types/user'
  
  export function SHOW_LOGIN_DIALOG_ACTION() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
  }
  
  export function HIDE_LOGIN_DIALOG_ACTION(){
    return {
        type: HIDE_LOGIN_DIALOG
    }
  }
  
  export function BTN_LOGIN_CLICK_ACTION(){
    return {
        type: BTN_LOGIN_CLICK
    }
  }
  
  export function LOGIN_USER_ACTION(data){
    return {
        type: LOGIN_USER_REQUESTED, 
        payload: data
    }
  }

  export function CHECK_USER_LOGIN_ACTION(email) {
    return {
      type: CHECK_USER_LOGIN_REQUESTED, 
      payload: email
  }
  }
  
  export function LOGOUT_USER_ACTION(){
    return {
        type: LOGOUT_USER
    }
  }
  
  export function CLEAR_USER_ACTION(){
    return {
        type: CLEAR_LOGIN_USER
    }
  }

  export function CLEAR_LOGIN_NOT_AUTH_USER_ACTION(){
    return {
        type: CLEAR_NOT_AUTH_LOGIN
    }
  }
  