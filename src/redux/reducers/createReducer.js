export function createReducer(initialState, actionHandlers) {
    return function reducer(state = initialState, action) {
        if (action === 'undefined') {
            return state
        }
        if (actionHandlers.hasOwnProperty(action.type)) {
            return actionHandlers[action.type](state, action)
        }
        return state
    }
}
