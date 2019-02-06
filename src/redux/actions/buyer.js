import { 
  CREATE_BUYER_REQUESTED,
  CLEAR_BUYER_STATE,
  GET_ALL_ORDERS_OF_BUYERS_REQUESTED
} from '../types/buyer'

export function CREATE_BUYER_ACTION(data){
  return {
      type: CREATE_BUYER_REQUESTED,
      payload: data
  }
}

export function CLEAR_BUYER_STATE_ACTION(){
  return {
      type: CLEAR_BUYER_STATE
  }
}

export function GET_ALL_ORDERS_OF_BUYERS_ACTION(payload) {
  return {
    type: GET_ALL_ORDERS_OF_BUYERS_REQUESTED,
    payload
  }
}
