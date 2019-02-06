import { 
    GET_CURRENT_ROUTE,
} from '../types/route'

export function GET_CURRENT_ROUTE_ACTION(route) {
    return {
        type: GET_CURRENT_ROUTE,
        route
    }
}