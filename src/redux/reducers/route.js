import { createReducer } from './createReducer'

const routeInitialState = {
    route: null
}

const routeActionsHandler = {
    GET_CURRENT_ROUTE: (state, action) => {
        return {
            ...state,
            route: action.route
        }
    }
}


export default createReducer(routeInitialState, routeActionsHandler)