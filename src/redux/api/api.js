const ipAddress = '127.0.0.1:8000'

export const productImgURL = 'http://127.0.0.1:8000/storage/productImages/'
export const sellerDtiURL = 'http://127.0.0.1:8000/storage/sellerDTIImages/'

export const COINS_PH_PAYMENT_API = 'https://coins.ph/api/v3/crypto-payments/'
/*
    USER API
*/
export const LOGIN_USER_API = `http://${ipAddress}/api/loginUser`
export const CHECK_EMAIL_IF_LOGIN = `http://${ipAddress}/api/checkUserIfLogin`

/*
    BUYER API
*/
export const CREATE_BUYER_API = `http://${ipAddress}/api/signUpBuyer`
export const GET_ALL_ORDERS_OF_BUYERS_API = `http://${ipAddress}/api/getBuyerOrders/`
export const CHECK_IF_BUYER_ORDERED_API = `http://${ipAddress}/api/checkIfBuyerOrderedAProduct/`

/*
    SELLER API
*/
export const VERIFY_SELLER_EMAIL_API = `http://${ipAddress}/api/verifyEmail`
export const CHECK_SELLER_EMAIL_TOKEN_API = `http://${ipAddress}/api/checkIfEmailSent`
export const CREATE_SELLER_API = `http://${ipAddress}/api/signUpSeller`
export const CHECK_SELLER_CODE_API = `http://${ipAddress}/api/checkIfCodeExist`
export const UNVERIFIED_SELLERS_API = `http://${ipAddress}/api/getUnverifiedSellers`
export const VERIFY_SELLER_API = `http://${ipAddress}/api/verifySeller`
export const GET_SELLER_INVENTORY_REPORT_API = `http://${ipAddress}/api/getInventoryReportOfSeller/`
export const SEARCH_PRODUCT_NAME_API = `http://${ipAddress}/api/searchByProductName/`
export const GET_ALL_SELLERS_API = `http://${ipAddress}/api/getAllSellers/`
export const GET_ORDERS_OF_BUYERS_API = `http://${ipAddress}/api/getDeliveryOrders/`
export const ACTIVATE_SELLER_API = `http://${ipAddress}/api/activateSeller`
export const DEACTIVATE_SELLER_API = `http://${ipAddress}/api/deactivateSeller`
export const UPDATE_SELLER_TOKEN_API = `http://${ipAddress}/api/updateSellerIfPaid`
export const SEARCH_PAID_UNPAID_SELLER_API = `http://${ipAddress}/api/searchPaidUnpaidSeller`
export const LISTS_OF_SELLERS_API = `http://${ipAddress}/api/listsOfSellers`

/*
    PRODUCT API
*/
export const CREATE_PRODUCT_API = `http://${ipAddress}/api/addProduct`
export const GET_PRODUCT_API = `http://${ipAddress}/api/getProductsOfSpecificSeller/`
export const GET_PRODUCT_DETAILS_API = `http://${ipAddress}/api/getProductDetails/`
export const GET_ALL_SELLERS_PRODUCTS_API = `http://${ipAddress}/api/getProductsOfAllSellers/`
export const UPDATE_PRODUCT_API = `http://${ipAddress}/api/updateProduct/`
export const DEACTIVATE_PRODUCT_API = `http://${ipAddress}/api/deactivateProduct/`
export const ACTIVATE_PRODUCT_API = `http://${ipAddress}/api/activateProduct/`
export const GET_DEACTIVATED_PRODUCT_API = `http://${ipAddress}/api/getDeactivateProducts/`
export const FILTER_BY_PLACES_API = `http://${ipAddress}/api/searchByPlaces/`
export const GET_ALL_REVIEWS_OF_PRODUCT_API = `http://${ipAddress}/api/getAllReviewsOfAProduct/`

/*
    RESERVATION API
*/
export const RESERVED_PRODUCT_API = `http://${ipAddress}/api/reserveProductByBuyer/`
export const GET_RESERVATION_DETAILS_API = `http://${ipAddress}/api/getReservationDetails/`
export const DELETE_RESERVATION_API = `http://${ipAddress}/api/deleteReservation/`
export const SEARCH_RESERVATION_API = `http://${ipAddress}/api/searchReservationDetails`
export const MOVE_TO_CART_API = `http://${ipAddress}/api/moveToCart`

/*
    CART API
*/
export const ADD_TO_CART_API = `http://${ipAddress}/api/cartOrderSummary`
export const GET_ORDERS_SUMMARY_API = `http://${ipAddress}/api/buyerCheckoutDetails/`
export const REMOVE_TO_CART_API = `http://${ipAddress}/api/removeProductToCart`
export const CHECKOUT_API = `http://${ipAddress}/api/createDeliveryCheckout`

/*
    FEEDBACK API
*/
export const GIVE_FEEDBACK_RATE_API = `http://${ipAddress}/api/giveFeedbacks`
export const GET_ALL_COMMENTS_BY_PRODUCT_API = `http://${ipAddress}/api/getAllFeedbackByProduct/`
