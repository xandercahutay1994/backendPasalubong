import React from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import '../../css/Seller.css'
import { ListsTab } from '../../components/Layouts/index'
import { compose } from 'recompose'
import { userSelector } from '../../redux/selectors/index'
import { CLEAR_USER_ACTION } from '../../redux/actions/user'
import { CLEAR_SELLER_ACTION, CLOSE_UPDATE_ACCOUNT_ACTION, GET_SELLER_DETAILS_ACTION, UPDATE_SELLER_DETAILS_ACTION, CLEAR_STATUS_ACTION } from '../../redux/actions/seller'
import FullDialog from '../../components/FullDialog'
import ButtonSpinner from '../../components/ButtonSpinner'
import {
    Snackbar
} from '@material-ui/core'
import Button from '@material-ui/core/Button/Button';

class Seller extends React.PureComponent {
    constructor() {
        super()
        this.fields = {
            shopAddress: '',
            phone: '',
            shopName: '',
            shipping_fee: ''
        }
        this.state = {
            fieldValues: { ...this.fields },
            issubmit: false,
            vertical: 'top',
            horizontal: 'center'
        }
    }

    componentDidMount() {
        const { login_id } = this.props 
        this.props.dispatch(GET_SELLER_DETAILS_ACTION({ seller_id: login_id}))
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
            fieldValues: {...prevState.fieldValues, ...nextProps.sellerDetails}
        }))

        if (nextProps.status === 200) {
            this.setState({ isUpdated: true }, ()=> {
                setTimeout(()=> {
                    this.setState({
                        isUpdated: false,
                        issubmit: false
                    }, ()=> {
                        nextProps.dispatch(CLEAR_STATUS_ACTION())
                    })
                }, 1500)
            })
        }
    }

    componentWillUnmount() {
        this.props.dispatch(CLEAR_SELLER_ACTION())
        this.props.dispatch(CLEAR_USER_ACTION())
    }

    handleCloseFullDialog = () => {
        this.props.dispatch(CLOSE_UPDATE_ACCOUNT_ACTION())
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({
            fieldValues: {
                ...this.state.fieldValues,
                [name]: value
            }
        })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        const { shopName, shopAddress, phone, shipping_fee } = this.state.fieldValues
        const postData = {
            shopAddress,
            shopName,
            phone,
            shipping_fee,
            seller_id: this.props.login_id
        }
        this.setState({
            issubmit: true
        }, ()=> {
            this.props.dispatch(UPDATE_SELLER_DETAILS_ACTION(postData))
        })
    }

    renderUpdateAccount = () => {
        const {
            shopName, shopAddress, phone, shipping_fee
        } = this.state.fieldValues
        const { issubmit, vertical, horizontal, isUpdated } = this.state
        
        return (<div className='update-account'>
            <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={issubmit}
            onClose={()=>{}}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">
                {
                    isUpdated ?
                        <i className='fa fa-check text-success' style={{ fontSize: '20px', marginRight: '5px' }}></i>
                    :
                    <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '15px', marginRight: '5px' }}></i>
                }
                {
                    isUpdated ?
                        'Successfully updated'
                    :
                        'Processing...'
                }
            </span>}
            />
            <h5 className='update-font text-center'> Update Account </h5>
            <form className='col-lg-6 mt-4' onSubmit={this.handleFormSubmit}>
                <div className='form-group'>
                    <label>Shipping Fee *</label>
                    <input 
                        type='number' 
                        name='shipping_fee'
                        className='form-control col-lg-6 col-md-6' 
                        onChange={this.handleInputChange}
                        value={shipping_fee}
                    />
                </div>
                <div className='form-group'>
                    <label>Phone # *</label>
                    <input 
                        type='number' 
                        name='phone'
                        className='form-control col-lg-6 col-md-6' 
                        onChange={this.handleInputChange}
                        value={phone}
                    />
                </div>
                <div className='form-group'>
                    <label>Shop Name *</label>
                    <input 
                        type='text' 
                        name='shopName'
                        className='form-control' 
                        onChange={this.handleInputChange}
                        value={shopName}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Shop Address *</label>
                    <input 
                        type='text' 
                        name='shopAddress'
                        className='form-control' 
                        onChange={this.handleInputChange}
                        value={shopAddress}
                        required
                    />
                </div>
                <div className='row'>
                    <div className='col-lg-6'>
                        <ButtonSpinner
                            type='submit'
                            name={'UPDATE ACCOUNT'}
                            raised='raised'
                            color='primary'
                            variant='contained'
                            fullWidth
                            isspinning={issubmit}
                            disabled={issubmit}
                        />                    
                    </div>
                    <div className='col-lg-6'>
                        <Button
                            raised='raised'
                            color='secondary'
                            variant='outlined'
                            fullWidth
                            onClick={this.handleCloseFullDialog}
                        >
                            <i className='fa fa-close' style={{ fontSize: '15px', marginRight: '5px' }} ></i>Close
                        </Button>                    
                    </div>
                </div>
            </form>
        </div>)
    }

    render() {
        const {
            isUpdateAccount,
            activeIndex
        } = this.props

        const listsTab = [ 'ACTIVE PRODUCTS', 'INACTIVE PRODUCTS', 'ADD PRODUCT', 'RESERVATIONS',
            'ORDERS', 'PENDING DELIVERIES', 'INVENTORY REPORT/SUMMARY']
        
        return (
            <Router>
                <div className='container-fluid productDetailsContainer'>
                    <ListsTab listsTab={listsTab} activeIndex={activeIndex}/>
                    <FullDialog 
                        openFullDialog={isUpdateAccount}
                        closeFullDialog={this.handleCloseFullDialog}
                    >   
                        { this.renderUpdateAccount() }
                    </FullDialog>
                </div>
            </Router>
        )
    }
}

const enhance = compose(
  connect(userSelector)
)

export default enhance(Seller)