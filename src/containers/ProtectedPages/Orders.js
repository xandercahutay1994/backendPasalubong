import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors'
import PasalubongTable from '../../components/PasalubongTable'
import FullDialog from '../../components/FullDialog'
import { productImgURL } from '../../redux/api/api'
import ImageLoader from '../../components/ImageLoader'
import {
  TableCell,
  TableRow,  
  Snackbar
} from '@material-ui/core'
import { 
  GET_ORDERS_OF_BUYERS_ACTION, 
  COINS_PH_PAYMENT_ACTION, 
  UPDATE_BUYERS_STATUS_IF_PAID_ACTION,
  CLEAR_STATUS_ACTION,
  RESET_ACTIVE_INDEX_ACTION,
  SEARCH_ORDERS_ACTION,
  CLEAR_TOAST_ACTION
} from '../../redux/actions/seller'
class Orders extends React.PureComponent {
  state = {
    openSnackbar: false,
    vertical: 'top',
    horizontal: 'center',
    advance_search: '',
    openFullDialog: false,
    isProcessing: false
  }

  componentDidMount() {
    document.title = 'Orders'
    const { login_id, dispatch } = this.props
    dispatch(GET_ORDERS_OF_BUYERS_ACTION({seller_id: login_id}))
    this.props.dispatch(COINS_PH_PAYMENT_ACTION())
    this.interval = setInterval(()=> this.handleCheckIfPaid(), 8000)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderStatus === 200) {
      // setTimeout(()=> {
        this.setState({
          openSnackbar: false,
          email: '',
          reference_number: '',
          isProcessing: false
        }, ()=> {
          nextProps.dispatch(CLEAR_STATUS_ACTION())
          nextProps.dispatch(CLEAR_TOAST_ACTION())
          clearInterval(this.interval)
        })
      // }, 3000)
    }
  }

  componentWillUnmount() {
    this.setState({ 
      open: false,
      activate: false,
      shopName: '',
      openSnackbar: false,
      openFullDialog: false
    })
    clearInterval(this.interval)
    this.props.dispatch(RESET_ACTIVE_INDEX_ACTION())
  }
  
  handleCheckIfPaid = () => {
    const { coinsPayment, ordersData, login_id }  = this.props
    const crypto = coinsPayment['crypto-payments'] || []
    const buyers = ordersData.unpaid || []
    const copyBuyers = buyers.map(e => e.reference_number)
    
    const paid = crypto.filter(crypt => crypt.currency === 'PBTC' && crypt.entry_type === 'incoming')
    // .filter((crypt,i ) => copyBuyers.includes(crypt.message) && crypt.amount === '80')  
    .filter((crypt,i ) => copyBuyers.includes(crypt.message) && crypt.amount === '20')  
    const filterEmail = paid && paid.length && paid[0] && buyers.find(e => e.reference_number === paid[0]['message'])

    if (paid && paid.length > 0) {
      this.setState(()=> ({
        reference_number: paid[0]['message'],
        openSnackbar: true,
        emailState: filterEmail.email,
        isProcessing: true
      }), ()=> {
        this.props.dispatch(UPDATE_BUYERS_STATUS_IF_PAID_ACTION({ reference_number: paid[0]['message'], seller_id: login_id }))
      })
    }
  }

  handleShowFullDialog = reference_number => {
    this.setState({ openFullDialog : true, deliveryId: reference_number })
  }

  handleCloseFullDialog = () => {
    this.setState({ openFullDialog : false })
  }

  renderOrderDetails = () => {
    const { deliveryId } = this.state
    const { ordersData } = this.props
    
    const tableCellDetails = ['Product Image', 'Name', 'Category', 'Price', 'Order Quantity']
    const bodyCellDetails = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    const filterLists = ordersData && ordersData.orders && ordersData.orders.filter(e=> e.reference_number  === deliveryId)

    return (
      <div className='mt-5'>
        <span className='d-flex mb-2'>
          <h5> Order Details of : </h5>
          <h4 className='ml-2 text-primary'> 
            { filterLists && filterLists.length && `${filterLists[0].firstname} ${filterLists[0].lastname}` }
          </h4>
        </span>
        <PasalubongTable tableCell={tableCellDetails}>
          {
            filterLists && filterLists.map((e, i) => (
              <TableRow key={e.product_id}>
                <TableCell component='th' scope='row'> 
                  <ImageLoader 
                    src={`${productImgURL}${e.image}`}
                    width='60'
                    height='60'
                    alt={e.title}
                  />
                </TableCell>
                { bodyCellDetails(e.name) }
                { bodyCellDetails(e.category) }
                { bodyCellDetails(e.price) }
                { bodyCellDetails(e.orderQuantity) }
              </TableRow>
            ))
          }
        </PasalubongTable>
      </div>
    )
  }

  handleOnChange = e => {
    const { name, value } = e.target
    const { dispatch, login_id } = this.props

    this.setState({ 
      [name]: value
    }, ()=> {
      dispatch(SEARCH_ORDERS_ACTION({
        seller_id: login_id,
        advance_search: this.state.advance_search
      }))
    })
  }

  render() {
    const { ordersData } = this.props
    const {
      openSnackbar,
      vertical,
      horizontal,
      emailState,
      advance_search,
      isProcessing,
      openFullDialog,
      reference_number
    } = this.state
    const tableCell = ['Fullname', 'Email', 'Total Payment', 'Reference Number', 'Address', 'Payment Type', 'Status']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )

    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnackbar}
          onClose={()=>{}}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">
            <i className='fa fa-check text-success' style={{ fontSize: '20px', marginRight: '5px' }}></i>
            <span className='text-primary'> { emailState } </span> with a reference number of 
             <span className='text-primary'> { reference_number } </span> has already been paid and will be moving to Delivery Section
          </span>}
        />
        <input  
          name="advance_search" 
          value={advance_search}
          onChange={this.handleOnChange}
          className='col-lg-12 form-control mt-3 mb-3'
          placeholder='Search Email or Reference # here'
          autoFocus
        />
        <PasalubongTable tableCell={tableCell}>
          {
            ordersData.details && ordersData.details.length > 0 ?
              ordersData.details.map(({
                email, category, firstname, lastname, total_payment, buyer_id, delivery_id, address,
                name, quantity, orderQuantity, phone, payment_type, reference_number, paymentStatus
              }, i) => (
              <TableRow key={reference_number} onClick={()=>this.handleShowFullDialog(reference_number)} style={{ cursor: 'pointer' }}>
                { bodyCell(`${firstname} ${lastname}`) }
                { bodyCell(email) }
                { bodyCell(total_payment) }
                { bodyCell(reference_number) }
                { bodyCell(address) }
                { bodyCell(payment_type.toUpperCase()) }
                <TableCell>
                  {
                    isProcessing && (emailState === email) ?
                      <span className='text-success'>Processing...</span>
                    :
                      payment_type === 'coins' ?
                        paymentStatus ?
                          <span className='text-success'>Paid</span>
                        :
                          <span className='text-danger'>Waiting for Payment</span>
                      :
                        <span className='text-danger'>Order has been processed</span>
                  }
                </TableCell>
              </TableRow>
              ))
              :
              <TableRow>
                { bodyCell('') }
                { bodyCell('') }
                { bodyCell('') }
                <TableCell>
                  <span className='text-danger'>No Record Found</span>
                </TableCell>
              </TableRow>
          }
        </PasalubongTable>
        <FullDialog 
            openFullDialog={openFullDialog}
            closeFullDialog={this.handleCloseFullDialog}
        >   
          { this.state.deliveryId && this.renderOrderDetails() }
        </FullDialog>
      </React.Fragment>
    )
  }
}

const enhance = compose(
  connect(sellerSelector)
)

export default enhance(Orders)