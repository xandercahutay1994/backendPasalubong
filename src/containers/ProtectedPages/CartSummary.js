import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { cartSelector } from '../../redux/selectors'
import { Button } from '@material-ui/core'
import { Modal } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../css/Cart.css'
import Summary from '../../components/Summary'
import moment from 'moment'
import { 
  GET_ALL_SELLERS_PRODUCT_ACTION,
} from '../../redux/actions/product'
import { 
  GET_ORDERS_SUMMARY_ACTION,
  REMOVE_TO_CART_ACTION,
  RESERVED_BUYER_ACTION,
  RESET_CART_ACTION
} from '../../redux/actions/cart' 
import {
  Snackbar
} from '@material-ui/core'

class CartSummary extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.fields = [{
      orderQuantity: '',
      orderCounter: '',
      price: '',
      quantity: '',
    }]

    this.state = {
      fieldValues: [ ...this.fields ],
      openPicker: false,
      reservation_date: moment().format('YYYY-MM-DD')
    }
  }
  
  componentDidMount() {
    const { dispatch, login_id } = this.props
    dispatch(GET_ALL_SELLERS_PRODUCT_ACTION())
    if (login_id) {
      dispatch(GET_ORDERS_SUMMARY_ACTION({ buyer_id: login_id}))
    }
    localStorage.setItem('route', this.props.location.pathname)
  }

  componentWillReceiveProps(nextProps) {
    const { cartData, message } = nextProps
    let { fieldValues } = this.state
    fieldValues = cartData.map(e => ({ ...fieldValues, ...e}))
    this.setState({ 
      fieldValues
    })

    if (message) {
      this.setState({
        openPicker: false,
        disabled: false,
        reservation_date: moment().format('YYYY-MM-DD'),
        showSnackBar: true
      }, ()=> {
        setTimeout(()=> {
          this.setState(()=> ({
            showSnackBar: false
          }), ()=> {
            this.props.dispatch(RESET_CART_ACTION())
          })
        }, 2000)
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      fieldValues: '',
      openPicker: '',
      reservation_date: ''
    })
  }

  removeToCart = (cart_id, quantity) => {
    this.props.dispatch(REMOVE_TO_CART_ACTION({ cart_id, quantity }))
  }

  zeroCart = () => (
    <Paper 
      elevation={1} 
      className='mb-2 m-5 p-5 container justify-content-center' 
    > 
      <h4 className='text-center text-danger'> Your cart is still empty! </h4>
        <Link to='/' >
          <Button
            raised='raised'
            color='primary'
            variant='contained'
            className='btn-block  mt-5'
          >
            View Products
          </Button> 
        </Link> 
    </Paper>
  )

  handleInputChange = (e, product_id) => {
    const { value } = e.target
    this.setState(prevState => ({
      fieldValues: prevState.fieldValues.map(obj => obj.product_id === product_id ? { ...obj, orderQuantity: value } : obj )
    })) 
  }

  handleSetDate = (product_id, buyer_id) => {
    this.setState({ 
      openPicker: true,
      product_id,
      buyer_id
    })

  }
 
  handleReserve = e => {
    e.preventDefault()
    const { product_id, buyer_id, reservation_date } = this.state

    if (!reservation_date) {
      return
    }

    this.setState(() => ({
      disabled: true
    }), ()=> {
      this.props.dispatch(RESERVED_BUYER_ACTION({
        reservation_date,
        product_id,
        buyer_id
      }))
    }) 
  }
  
  handleReserveDate = e => {
    this.setState({
      reservation_date: e.target.value
    })
  }

  handleClosePicker = () => {
    this.setState({
      openPicker: false
    })
  }

  render () {
    const {
      openPicker,
      reservation_date,
      disabled,
      showSnackBar,
    } = this.state
    const className = 'col-lg-4 col-md-4 col-sm-4 mr-auto'
    const vertical = 'top'
    const horizontal = 'center'
    const { fieldValues } = this.state
    const totalPayment = fieldValues.reduce((acc, curr) => {
      let total = curr.price * curr.orderQuantity
      // let total = JSON.parse(curr.price) * JSON.parse(curr.orderQuantity)
      acc += total  
      return acc 
    }, 0)
    const { login_id, isFetching } = this.props

    return (
      <div className='container cartSummary'>
        {
          login_id && !isFetching ?
            <div className='row '>
              <div className='col-lg-7'>
                {
                  isFetching ?
                    'Loading...'
                  :
                  <Summary 
                    {...this.props}
                    {...this.state}
                    onRemove={this.removeToCart}
                    onInputChange={this.handleInputChange}
                    onReserve={this.handleSetDate}
                  />
                }
              </div>
                <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={showSnackBar}
                onClose={()=>{}}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">
                  <i className='fa fa-check text-success' style={{ fontSize: '20px', marginRight: '5px' }}></i>
                  { this.props.message }
                </span>}
              />
              {
                openPicker &&
                <Modal isOpen={openPicker}>
                  <h5 className='text-center mt-3'> Reservation Date </h5>
                  <div className='text-center mt-5' style={{ fontSize: '13px'}}>
                    <Typography>
                        Please select specific date on up to what day this reservation expires!
                    </Typography>
                  </div>
                  <input 
                    type='date' 
                    required
                    name='reservation_date'
                    value={reservation_date}
                    className='form-control col-lg-6 col-md-6 offset-md-3 mt-3 mb-2'
                    onChange={this.handleReserveDate}
                  />
                  <div className='row m-auto'> 
                    <Button 
                      raised='raised' 
                      color='secondary' 
                      variant='outlined'
                      className='btn btn-primary offset-md-5 mt-2 mb-2'
                      children
                      onClick={this.handleClosePicker}
                    >
                      <i className='fa fa-close mr-1' style={{ fontSize: '18px' }}></i> Close
                    </Button>
                    <Button 
                      raised='raised' 
                      color='primary' 
                      variant='contained'
                      disabled={disabled}
                      children
                      className='btn btn-primary offset-md-5 mt-2 mb-2 ml-3'
                      onClick={this.handleReserve}
                    >
                      {
                        disabled ?
                        <i className='fa fa-circle-o-notch fa-spin mr-1' style={{ fontSize: '18px' }}></i> 
                        : 
                        <i className='fa fa-arrow-right mr-1' style={{ fontSize: '18px' }}></i> 
                      }
                      {
                        disabled ? 'Moving...' : 'Move Now'
                      }
                    </Button>
                  </div>
                </Modal>
              }
              {
                fieldValues.length !== 0 ?
                <div className='col-lg-4 col-md-11 mt-4 orderSummary'>
                  <Paper elevation={2} className='p-2'>
                    <Typography variant='h5' component='h5'>
                      Order Summary
                    </Typography>
                    <hr/>
                    <div className='row'> 
                      <div className={className}>
                        Total Item(s)
                      </div>
                      <div className={className}>
                        { fieldValues.length }
                      </div>
                    </div>
                    <div className='row'>
                      <div className={className}>
                        Shipping Fee
                      </div>
                      <div className={className}>
                        ₱ 2000
                      </div>
                    </div>
                    <div className='row'>
                      <div className={className}>
                        Total
                      </div>
                      <div className={className}>
                        ₱ { totalPayment }
                      </div>
                    </div>
                    <Link to='/checkout' className='nav-link'>
                      <Button 
                        raised='raised' 
                        color='primary' 
                        variant='contained'
                        className='btn btn-primary btn-block mt-3'>
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </Paper>
                </div>
                :
                  this.zeroCart()
                }
            </div>
          :
            this.zeroCart()
        }
      </div>
    )
  } 
}

const enhance = compose(
  connect(cartSelector)
)

export default enhance(CartSummary)