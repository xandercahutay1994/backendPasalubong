import React from 'react'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import { compose } from 'recompose'
import { productSelector } from '../../redux/selectors'
import ProductDetails from './ProductDetails'
import CardLists from '../../components/CardLists'
import FullDialog from '../../components/FullDialog'
import ProductDialog from './ProductDialog'
import { createBrowserHistory } from 'history'
import swal from 'sweetalert'
import { 
    GET_PRODUCTS_ACTION,
    SHOW_PRODUCT_DETAILS_ACTION,
    DEACTIVATE_PRODUCT_ACTION,
    SEARCH_PRODUCT_NAME_ACTION,
    CLEAR_PRODUCTS_IF_LOGOUT_ACTION
} from '../../redux/actions/product'
import { GET_ORDERS_OF_BUYERS_ACTION } from '../../redux/actions/seller';
const history = createBrowserHistory()

class ProductLists extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            openFullDialog: false,
            isEdit: false,
            advance_search: ''
        }
    }

    componentDidMount() {
        document.title = 'Active Products'
        this.props.dispatch(GET_PRODUCTS_ACTION(this.props.login_id))
        // this.props.dispatch(GET_ORDERS_OF_BUYERS_ACTION({seller_id: this.props.login_id}))
    }   

    componentWillUnMount() {
        this.props.dispatch(CLEAR_PRODUCTS_IF_LOGOUT_ACTION())
    }

    sessionSetId = product_id => {
        const { dispatch } = this.props
        dispatch(SHOW_PRODUCT_DETAILS_ACTION(product_id))
    }

    renderProductLists() {
        const { isFetching } = this.props
        return (
            isFetching ?
                <Loader/>
            :
                <CardLists 
                    sessionSetId={this.sessionSetId}  
                    onShowFullDialog={this.handleShowFullDialog}
                    {...this.props}
                />
        )
    }

    handleShowFullDialog = fullDialogProductId => {
        localStorage.setItem('product_id', fullDialogProductId)
        this.setState({ openFullDialog: true })
    }

    handleCloseFullDialog = () => {
        history.push('/seller')
        this.setState({ openFullDialog: false, isEdit: false })
    }
    
    renderProductOrLists() {
        const { product_id } = this.props
        if (product_id) {
            return <ProductDetails {...this.props}/>
        }
        return this.renderProductLists()
}

    renderTitle = () => {
        return <h3 className='text-center'> Your Lists of Products </h3>
    }

    handleIsEdit = () => {
        this.setState({ isEdit: true })
    }

    handleAfterEdit = () => {
        this.setState({ isEdit: false })
    }
    
    handleDeactivateProduct = () => {
        const confirm = window.confirm('Are you sure to deactivate this product')
        if (!confirm) return

        const product_id = JSON.parse(localStorage.getItem('product_id'))
        const { user : { login_id }} = JSON.parse(localStorage.getItem('state'))
        this.props.dispatch(DEACTIVATE_PRODUCT_ACTION({ seller_id: login_id, product_id }))
        this.setState({
            openFullDialog: false, isEdit: false
        }, ()=> {
            swal({
                title: "Confirmation!",
                text: `Product has been successfully deactivated!`,
                icon: "success"
            })
            history.push('/seller')
        })
    }

    handleOnChange = e => {
        const { name, value } = e.target
        const { user : { login_id }} = JSON.parse(localStorage.getItem('state'))
        this.setState({
          [name]: value
        }, ()=> {
          this.props.dispatch(SEARCH_PRODUCT_NAME_ACTION({ seller_id: login_id, advance_search:value }))   
        })
    }
    
    render() {
        const { openFullDialog } = this.state
        return(
            // <div className='container-fluid productDetailsContainer'>
            <div className='container-fluid'>
                { this.renderTitle() }
                <input  
                    name="advance_search" 
                    value={this.state.advance_search}
                    onChange={this.handleOnChange}
                    className='col-lg-12 form-control mt-3'
                    placeholder='Search Item here'
                    autoFocus
                />
                <div className='products'>
                    { this.renderProductOrLists() }
                </div>
                <FullDialog 
                    openFullDialog={openFullDialog}
                    closeFullDialog={this.handleCloseFullDialog}
                >   
                    <ProductDialog
                        onEdit={this.handleIsEdit}
                        afterEdit={this.handleAfterEdit}
                        closeFullDialog={this.handleCloseFullDialog}
                        deactivateProduct={this.handleDeactivateProduct}
                        {...this.state}
                        {...this.props}
                    />
                </FullDialog>
            </div>  
        )
    }
}

const enhance = compose (
    connect(productSelector)
)

export default enhance(ProductLists)