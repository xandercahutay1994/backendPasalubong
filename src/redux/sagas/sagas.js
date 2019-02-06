import { takeLatest } from 'redux-saga/effects'
import { 
    LOGIN_USER_REQUESTED,
} from '../types/user'
import { 
    Login_User,
} from './user'
import { 
    CREATE_PRODUCT_REQUESTED,
    UPDATE_PRODUCT_REQUESTED,
    GET_PRODUCTS_REQUESTED, 
    GET_PRODUCT_DETAILS_REQUESTED,
    GET_ALL_SELLERS_PRODUCT_REQUESTED,
    DEACTIVATE_PRODUCT_REQUESTED,
    GET_DEACTIVATED_PRODUCTS_REQUESTED,
    ACTIVATE_PRODUCT_REQUESTED,
    FILTER_BY_PLACES_REQUESTED,
    SEARCH_PRODUCT_BY_NAME_REQUESTED,
    GET_ALL_COMMENTS_BY_PRODUCT_REQUESTED,
    GIVE_FEEDBACK_RATE_REQUESTED,
    CHECK_IF_BUYER_ORDERED_REQUESTED,
    GET_ALL_REVIEWS_OF_PRODUCT_REQUESTED,
    LISTS_OF_SELLERS_REQUESTED
} from '../types/product'
import { 
    CREATE_SELLER_REQUESTED,
    VERIFY_EMAIL_REQUESTED,
    CHECK_EMAIL_TOKEN_REQUESTED,
    CHECK_CODE_EXIST_REQUESTED,
    GET_UNVERIFIED_SELLERS_REQUESTED,
    VERIFY_SELLER_REQUESTED,
    GET_SELLER_INVENTORY_REPORT_REQUESTED,
    SEARCH_PRODUCT_NAME_REQUESTED,
    GET_ALL_SELLERS_REQUESTED,
    DEACTIVATE_SELLER_REQUESTED,
    ACTIVATE_SELLER_REQUESTED,
    GET_COINS_PH_PAYMENT_REQUESTED,
    UPDATE_SELLER_TOKEN_REQUESTED,
    SEARCH_PAID_UNPAID_SELLER_REQUESTED,
    GET_ORDERS_OF_BUYERS_REQUESTED
} from '../types/seller'
import { 
    CREATE_BUYER_REQUESTED,
    GET_ALL_ORDERS_OF_BUYERS_REQUESTED
} from '../types/buyer'
import { 
    ADDED_TO_CART_REQUESTED,
    GET_ORDERS_SUMMARY_REQUESTED,
    REMOVE_TO_CART_REQUESTED,
    CHECKOUT_CART_REQUESTED,
    RESERVED_BUYER_REQUESTED,
    GET_RESERVATION_DETAILS_REQUESTED,
    DELETE_RESERVATION_REQUESTED,
    SEARCH_RESERVATION_REQUESTED,
    MOVE_TO_CART_REQUESTED
} from '../types/cart'
import { 
    Get_Product, 
    Get_Product_Details, 
    Create_Product,
    Get_All_Sellers_Products,
    Update_Product,
    Deactivate_Product,
    Get_Deactivated_Products,
    Activate_Product,
    Filter_By_Places,
    Search_Product_By_Name,
    GetAllCommentsByProduct,
    GiveFeedbackRate,
    CheckIfBuyerOrdered,
    GetAllReviewsOfProduct,
    ListsOfSellers
 } from './product'
import { 
    Create_Buyer, 
    Get_All_Orders_Of_Buyer,
} from './buyer'
import { 
    Add_To_Cart,
    Get_Orders_Summary,
    Remove_To_Cart,
    Checkout_Cart,
    ReservedBuyer,
    GetReservationDetails,
    DeleteReservation,
    SearchReservation,
    MoveToCart
} from './cart'
import { 
    Create_Seller,
    Verify_Seller_Email,
    Check_Seller_Email_Token,
    Check_Seller_Code_Exist,
    Get_Unverified_Sellers,
    Verify_Seller,
    Get_Seller_Inventory_Report,
    Search_Product_Name,
    Get_All_Sellers,
    Get_Orders_Of_Buyers,
    DeActivate_Seller,
    Activate_Seller,
    GetCoinsPhPayment,
    UpdateTokenSeller,
    SearchPaidUnpaidSeller
} from './seller'

export default function* sagas() {
    yield takeLatest(LOGIN_USER_REQUESTED, Login_User)
    yield takeLatest(CREATE_PRODUCT_REQUESTED, Create_Product)
    yield takeLatest(GET_PRODUCTS_REQUESTED, Get_Product)
    yield takeLatest(GET_PRODUCT_DETAILS_REQUESTED, Get_Product_Details)
    yield takeLatest(CREATE_SELLER_REQUESTED, Create_Seller)
    yield takeLatest(VERIFY_EMAIL_REQUESTED, Verify_Seller_Email)
    yield takeLatest(CHECK_EMAIL_TOKEN_REQUESTED, Check_Seller_Email_Token)
    yield takeLatest(CHECK_CODE_EXIST_REQUESTED, Check_Seller_Code_Exist)
    yield takeLatest(CREATE_BUYER_REQUESTED, Create_Buyer)
    yield takeLatest(GET_ALL_SELLERS_PRODUCT_REQUESTED, Get_All_Sellers_Products)
    yield takeLatest(ADDED_TO_CART_REQUESTED, Add_To_Cart)
    yield takeLatest(GET_ORDERS_SUMMARY_REQUESTED, Get_Orders_Summary)
    yield takeLatest(REMOVE_TO_CART_REQUESTED, Remove_To_Cart)
    yield takeLatest(CHECKOUT_CART_REQUESTED, Checkout_Cart)
    yield takeLatest(GET_UNVERIFIED_SELLERS_REQUESTED, Get_Unverified_Sellers)
    yield takeLatest(VERIFY_SELLER_REQUESTED, Verify_Seller)
    yield takeLatest(GET_SELLER_INVENTORY_REPORT_REQUESTED, Get_Seller_Inventory_Report)
    yield takeLatest(SEARCH_PRODUCT_NAME_REQUESTED, Search_Product_Name)
    yield takeLatest(GET_ALL_SELLERS_REQUESTED, Get_All_Sellers)
    yield takeLatest(UPDATE_PRODUCT_REQUESTED, Update_Product)
    yield takeLatest(DEACTIVATE_PRODUCT_REQUESTED, Deactivate_Product)
    yield takeLatest(ACTIVATE_PRODUCT_REQUESTED, Activate_Product)
    yield takeLatest(GET_DEACTIVATED_PRODUCTS_REQUESTED, Get_Deactivated_Products)
    yield takeLatest(GET_ORDERS_OF_BUYERS_REQUESTED, Get_Orders_Of_Buyers)
    yield takeLatest(FILTER_BY_PLACES_REQUESTED, Filter_By_Places)
    yield takeLatest(SEARCH_PRODUCT_BY_NAME_REQUESTED, Search_Product_By_Name)
    yield takeLatest(GET_ALL_ORDERS_OF_BUYERS_REQUESTED, Get_All_Orders_Of_Buyer)
    yield takeLatest(ACTIVATE_SELLER_REQUESTED, Activate_Seller)
    yield takeLatest(DEACTIVATE_SELLER_REQUESTED, DeActivate_Seller)
    yield takeLatest(GET_COINS_PH_PAYMENT_REQUESTED, GetCoinsPhPayment)
    yield takeLatest(UPDATE_SELLER_TOKEN_REQUESTED, UpdateTokenSeller)
    yield takeLatest(SEARCH_PAID_UNPAID_SELLER_REQUESTED, SearchPaidUnpaidSeller)
    yield takeLatest(RESERVED_BUYER_REQUESTED, ReservedBuyer)
    yield takeLatest(GET_RESERVATION_DETAILS_REQUESTED, GetReservationDetails)
    yield takeLatest(DELETE_RESERVATION_REQUESTED, DeleteReservation)
    yield takeLatest(SEARCH_RESERVATION_REQUESTED, SearchReservation)
    yield takeLatest(MOVE_TO_CART_REQUESTED, MoveToCart)
    yield takeLatest(GIVE_FEEDBACK_RATE_REQUESTED, GiveFeedbackRate)
    yield takeLatest(GET_ALL_COMMENTS_BY_PRODUCT_REQUESTED, GetAllCommentsByProduct)
    yield takeLatest(CHECK_IF_BUYER_ORDERED_REQUESTED, CheckIfBuyerOrdered)
    yield takeLatest(GET_ALL_REVIEWS_OF_PRODUCT_REQUESTED, GetAllReviewsOfProduct)
    yield takeLatest(LISTS_OF_SELLERS_REQUESTED, ListsOfSellers)
}
