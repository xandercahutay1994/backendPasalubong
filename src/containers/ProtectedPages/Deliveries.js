import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors'
import PasalubongTable from '../../components/PasalubongTable'
import {
  TableCell,
  TableRow,  
  Snackbar,
  Checkbox
} from '@material-ui/core'
import { 
  GET_DELIVERY_DETAILS_ACTION, UPDATE_PENDING_DELIVERY_ACTION, CLEAR_DELIVERY_STATUS_ACTION
} from '../../redux/actions/seller'
import FullDialog from '../../components/FullDialog'
import ImageLoader from '../../components/ImageLoader'
import { productImgURL } from '../../redux/api/api'

class Deliveries extends React.PureComponent {
  state = {
    openFullDialog: false,
    vertical: 'top',
    horizontal: 'center',
    isDelivered: false,
    action_type: false,
    isProcessing: false
  }

  componentDidMount() {
    document.title = 'Deliveries'
    const { login_id, dispatch } = this.props
    dispatch(GET_DELIVERY_DETAILS_ACTION({seller_id: login_id}))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deliveryStatus === 200) {
      this.setState({ isDelivered: true, isProcessing: false }, ()=> {
        setTimeout(()=> {
          this.setState({ 
            showSnackBar: false,
            isDelivered: false
          }, ()=> {
            nextProps.dispatch(CLEAR_DELIVERY_STATUS_ACTION())
          })
        }, 2000)
      })
    }
  } 

  handleCloseFullDialog = () => {
    this.setState({ openFullDialog : false })
  }

  renderOrderDetails = () => {
    const { deliveryId } = this.state
    const { deliveries } = this.props
    const tableCellDetails = ['Product Image', 'Name', 'Category', 'Order Quantity', 'Total Payment']
    const bodyCellDetails = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    const filterLists = deliveries && deliveries.orders && deliveries.orders.filter(e=> e.delivery_id === deliveryId)

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
                { bodyCellDetails(e.orderQuantity) }
                { bodyCellDetails(Number(e.orderQuantity) * Number(e.price)) }
              </TableRow>
            ))
          }
        </PasalubongTable>
      </div>
    )
  }

  handleShowFullDialog = (delivery_id, action_type) => {
    if (this.state.action_type || action_type) {
      this.setState({ openFullDialog: false })
      return 
    } else {
      this.setState({ openFullDialog : true, deliveryId: delivery_id })
    }
  }

  handleDelivered = delivery_id => {
    this.setState(()=>({
      action_type: delivery_id,
      showSnackBar: true,
      isProcessing: true
    }), ()=> {
      this.props.dispatch(UPDATE_PENDING_DELIVERY_ACTION({ delivery_id, seller_id: this.props.login_id }))
    })
  }

  render() {
    const {
      openFullDialog,
      vertical,
      horizontal,
      showSnackBar,
      isDelivered,
      isProcessing
    } = this.state
    const { deliveries } = this.props
    const tableCell = ['Fullname', 'Email', 'Phone Number', 'Reference Number', 'Delivery Address', 'Action']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={showSnackBar}
          onClose={()=>{}}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">
            {
              isProcessing ?
                <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '15px', marginRight: '5px' }}></i>
              :
                <i className='fa fa-check text-success' style={{ fontSize: '20px', marginRight: '5px' }}></i>
            }
            {
              isProcessing ?
                'Processing...'
              :
                'Report Section has been successfully updated!'
            }
          </span>}
        />
        <PasalubongTable tableCell={tableCell}>
          {
            deliveries.details && deliveries.details.length > 0 ?
              deliveries.details.map(({
                email, category, firstname, lastname, total_payment, reference_number,
                name, quantity, orderQuantity, phone, address, price, delivery_id, province, city
              }, i) => {
                return(
                  <TableRow key={i} onClick={()=>this.handleShowFullDialog(delivery_id, this.state.action_type)} style={{ cursor: 'pointer' }}>
                    { bodyCell(`${firstname} ${lastname}`) }
                    { bodyCell(email) }
                    { bodyCell(phone) }
                    { bodyCell(reference_number) } 
                    { bodyCell(`${address} ${province} ${city}`) }
                    <TableCell>
                      <Checkbox 
                        type='checkbox'
                        name='delivered'
                        className='form-control'
                        // checked={this.state.action_type}
                        checked={delivery_id === this.state.action_type}
                        onClick={()=>this.handleDelivered(delivery_id)}
                      />
                    </TableCell>
                  </TableRow>
                )
              })
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
        {
          !this.state.action_type &&
          <FullDialog
            openFullDialog={openFullDialog}
            closeFullDialog={this.handleCloseFullDialog}
          >
            { this.renderOrderDetails() }
          </FullDialog>
        }
      </React.Fragment>
    )
  }
}

const enhance = compose(
  connect(sellerSelector)
)

export default enhance(Deliveries)