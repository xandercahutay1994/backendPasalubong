import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { cartSelector } from '../../redux/selectors'
import swal from 'sweetalert'
import {
  Radio,
  FormControlLabel,
  FormControl,
} from '@material-ui/core'
import ButtonSpinner from '../../components/ButtonSpinner'
import DatePicker from 'react-datepicker'
import {
  cities,
  provinces
} from 'philippines'
import { 
  GET_ORDERS_SUMMARY_ACTION,
  CHECKOUT_ACTION,
  CLEAR_CART_ACTION
} from '../../redux/actions/cart'

class Checkout extends React.PureComponent {

  constructor(props) {
    super(props)
    
    this.state = {
      selectedDate: new Date(),
      name: '',
      address: '',
      city: '',
      province: '',
      zip_code: '',
      date: '',
      payment_type: '',
    }
  }

  componentDidMount() {
    const { login_id, dispatch } = this.props
    dispatch(GET_ORDERS_SUMMARY_ACTION({ buyer_id: login_id}))
    localStorage.setItem('route', this.props.location.pathname)
  }

  componentWillReceiveProps(nextProps) {
    const { isCheckout, history, dispatch } = nextProps
    if (isCheckout) {
      this.setState({
        address: '',
        city: '',
        province: '',
        zip_code: '',
        date: '',
        payment_type: '',
      }, ()=> {
        dispatch(CLEAR_CART_ACTION())
        setTimeout(()=> {
          history.push('/')
        },1000)
      })
    }
  }
 
  handleSelectedDate = date => {
    this.setState({ selectedDate: date})
  }

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      [name] : value
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const {
      address,
      city,
      province,
      zip_code,
      date,
      payment_type
    } = this.state
    const { totalPayment, dispatch, login_id, cartData } = this.props
    const details = cartData.map(data => ({ product_id: data.product_id, orderQuantity: data.orderQuantity, seller_id: data.seller_id }))
    const postData = {
      buyer_id: login_id,
      totalPayment,
      city,
      province,
      address,
      date,
      zip_code,
      payment_type,
      details,
    }
    
    dispatch(CHECKOUT_ACTION(postData))
  }

  renderCityLists = () => {
    return cities.filter(cities => cities.city === true).map(({ name }, i) => (
      <option key={i} value={name}>
        { name }
      </option>
    ))
  }

  renderProvinceLists = () => {
    return provinces.map(({ name }, i) => (
      <option key={i} value={name}>
        { name }
      </option>
    ))
  }

  checkoutMessage = () => {
    swal({
        title: "Thank you!",
        text: `Details has been successfully saved!We send you details on your Gmail on how you pay us for your order to be process immediately!`,
        icon: "success"
    })
  }

  render() {
    const { 
      address,
      zip_code,
      date,
      payment_type,
    } = this.state
    const {
      totalPayment,
      buyerDetails: {
        phone,
        firstname,
        lastname
      },
      isCheckout
    } = this.props

    return(
      <form className='col-lg-10 mt-4' onSubmit={this.handleFormSubmit}>
      <DatePicker
          selected={this.state.startDate}
          onChange={()=>{}}
        />
        <h2 className='text-center buyer'> Checkout Details </h2>
          <div className='row'>
            <div className='col-md'>
              <label>Full Name </label>
              <input 
                type='text' 
                name='name'
                className='form-control col-lg-8 col-md-8' 
                value={`${firstname} ${lastname}`}
                disabled
                // onChange={this.handleOnChange}
              />
            </div>
            <div className='col-md-3'>
              <label> Total Payment </label>
              <input 
                type='text' 
                name='total_payment'
                className='form-control col-lg-6 col-md-6' 
                value={totalPayment}
                disabled
                // onChange={this.handleOnChange}
              />
            </div>
            <div className='col-md-3'>
              <label> Phone # </label>
              <input 
                type='text' 
                name='phone'
                disabled
                className='form-control col-lg-8 col-md-8' 
                value={`${phone}`}
                // onChange={this.handleOnChange}
              />
            </div>
          </div>
          <hr className='mt-5'/>
          <div className='form-group mt-5'>
            <label>Full Address *</label>
            <input 
                type='text' 
                name='address'
                className='form-control col-lg-12 col-md-12' 
                placeholder='Enter Full Address(ex. house #, street)'
                onChange={this.handleOnChange}
                value={address}
              />
          </div>
          <div className='row mt-3'>
            <div className='col-md'>
              <label>City *</label>
              <select 
                required
                name='city' 
                className='form-control' 
                onChange={this.handleOnChange}
              >
                <option> Select City </option>
                { this.renderCityLists() }
              </select>
            </div>
            <div className='col-md'>
              <label>Province *</label>
              <select 
                required
                name='province' 
                className='form-control' 
                onChange={this.handleOnChange}
              >
                <option> Select Province </option>
                { this.renderProvinceLists() }
              </select>
            </div>
            <div className='col-md'>
              <label>Zip Code *</label>
              <input 
                  type='number' 
                  name='zip_code'
                  className='form-control col-lg-12 col-md-12' 
                  onChange={this.handleOnChange}
                  placeholder='Enter Zip Code'
                  value={zip_code}
                />
            </div>
          </div>
          <div className='form-group mt-3'>
            <label>Date *</label>
            <input 
                type='date' 
                name='date'
                className='form-control col-lg-6 col-md-6'
                onChange={this.handleOnChange} 
                value={date}
              />
          </div>
          <FormControl component="fieldset">
            <label> Payment Type * </label>
              <FormControlLabel 
                name='payment_type'
                value='cod'
                control={
                  <Radio 
                    color="primary"
                    checked={payment_type === 'cod'}
                  />
                }
                label="Cash on Delivery"
                onChange={this.handleOnChange}
                labelPlacement="end"
              />
              <FormControlLabel
                name='payment_type'
                value='coins'
                control={
                  <Radio 
                    color="primary" 
                    checked={payment_type === 'coins'}
                  />
                }
                label="Coins.ph"
                labelPlacement="end"
                onChange={this.handleOnChange}
              />
          </FormControl>
          <ButtonSpinner
            name={'FINISH CHECKOUT'}
            raised='raised'
            color='primary'
            variant='contained'
            className='btn-block mt-3 mb-5'
          />
          { isCheckout && this.checkoutMessage() }
      </form>
    )
  }
}

const enhance = compose(
  connect(cartSelector)
)

export default enhance(Checkout)