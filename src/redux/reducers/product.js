import { createReducer } from './createReducer'

const productInitialState = {
    products: [],
    productDetails: [],
    isCreated: false,
    message: '',
    resStatus: '',
    isFetching: true,
    product_id: null,
    sellersProduct: [],
    deactivatedProducts: [],
    comments: [],
    buyerHasOrdered: [],
    sellers: []
}

const productActionsHandler = {
    CREATE_PRODUCT: (state, action) => {
        return {
            ...state,
            isCreated: true,
            message: action.payload,
            resStatus: action.resStatus
        }
    },
    CLEAR_PRODUCT: state => {
        return {
            ...state,
            message: '',
            resStatus: '',
            product_id: '',
        }
    },
    ERROR_CREATING_PRODUCT: (state, action) => {
        return {
            ...state,
            message: action.payload,
            resStatus: action.status
        }
    },
    RETRIEVED_PRODUCT: (state, action) => {
        return {
            ...state,
            products: action.payload,
            isFetching: false
        }
    },
    RETRIEVED_PRODUCT_DETAILS: (state, action) => {
        return {
            ...state,
            productDetails: action.payload,
            isFetching: false
        }
    },
    SHOW_PRODUCT_DETAILS: (state, action) => {
        return {
            ...state,
            product_id: action.product_id
        }
    },
    ERROR_GETTING_PRODUCT_DETAILS: (state, action) => {
        return {
            ...state,
            message: action.payload,
            resStatus: action.status
        }
    },
    RETRIEVED_ALL_SELLERS_PRODUCTS: (state, { sellersProduct, resStatus }) => {
        return {
            ...state,
            sellersProduct,
            resStatus,
            isFetching: false
        }
    },
    ERROR_GETTING_ALL_SELLERS_PRODUCTS: (state, action) => {
        return {
            ...state,
            isFetching: false,
            resStatus: action.resStatus
        }
    },
    CLEAR_CART_QUANTITY: state => {
        return {
            ...state,
            orderQuantity: 1
        }
    },
    UPDATE_PRODUCT: (state, { products }) => {
        return {
            ...state,
            products,
            message: 'Product Updated Successfully!',
            resStatus: 200
        }
    },
    CLEAR_STATE: state => {
        return {
            ...state,
            resStatus: '',
            message: ''
        }
    },
    DEACTIVATED_PRODUCT: (state, { products, resStatus }) => {
        return {
            ...state,
            products: [...products],
            // resStatus
        }
    },
    ACTIVATED_PRODUCT: (state, { products }) => {
        return {
            ...state,
            deactivatedProducts: [...products],
            resStatus: 200
        }
    },
    RETRIEVED_DEACTIVATED_PRODUCTS: (state, { products }) => {
        return {
            ...state,
            deactivatedProducts: products
        }
    },
    FILTER_BY_PLACES: (state, { sellersProduct }) => {
        return {
            ...state,
            sellersProduct
        }
    },
    SEARCH_PRODUCT_BY_NAME: (state, { products}) => {
        return {
            ...state,
            products
        }
    },
    RETRIEVED_ALL_COMMENTS_BY_PRODUCT: (state, { comments }) => {
        return {
            ...state,
            comments
        }
    },
    GIVE_FEEDBACK: (state, { resStatus, comments}) => {
        return {
          ...state,
          resStatus,
          comments
        }
    },
    CHECK_IF_BUYER_ORDERED: (state, { buyerHasOrdered }) => {
        return {
          ...state,
          buyerHasOrdered
        }
    },
    RETRIEVED_ALL_REVIEWS_OF_PRODUCT: (state, { comments }) => {
        return {
            ...state,
            comments
        }
    },
    CLEAR_PRODUCTS_IF_LOGOUT: (state) => {
        return {
            ...state,
            products: [],
            isFetching: false
        }
    },
    CLEAR_PRODUCT_DETAILS: (state) => {
        return {
            ...state,
            buyerHasOrdered: [],
            comments: []
        }
    },
    LISTS_OF_SELLERS: (state, { sellers }) => {
        return {
            ...state,
            sellers
        }
    }
}

export default createReducer(productInitialState, productActionsHandler)