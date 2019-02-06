import React, { PureComponent } from 'react'
import PasalubongTable from '../../components/PasalubongTable'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { buyerSelector } from '../../redux/selectors'
import ImageLoader from '../../components/ImageLoader'
import { GET_ALL_ORDERS_OF_BUYERS_ACTION } from '../../redux/actions/buyer'
import { productImgURL } from '../../redux/api/api'
import '../../css/Buyer.css'
import {
  TableCell,
  TableRow,  
} from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import Link from 'react-router-dom/Link'

class BuyerOrders extends PureComponent {
  state = {
    openFullDialog: false,
    feedback: '',
    rate: '',
    vertical: 'top',
    horizontal: 'center',
    isProcessing: false
  }

  componentDidMount() {
    const { user : { login_id }} = JSON.parse(localStorage.getItem('state'))
    this.props.dispatch(GET_ALL_ORDERS_OF_BUYERS_ACTION({login_id}))
    localStorage.setItem('route', this.props.location.pathname)
  }

  render() {
    const tableCell = ['Image', 'Product Name', 'Seller', 'Quantity', 'Price', 'Status']
    const bodyCell = (row, i) => ( <TableCell key={i} > { row } </TableCell> )
    const {
      orderHistory,
      isFetching
    } = this.props

    return(
      <React.Fragment>
        <div className='buyerOrders'>
          <Link to='/'> 
            <Button children raised='raised' className='mt-3 mb-3' color='primary' variant='outlined'> 
              Back
            </Button>
          </Link>
          <PasalubongTable tableCell={tableCell}>
          {
            isFetching ?
              <TableRow>
                { bodyCell('') }
                { bodyCell('') }
                <TableCell>
                  <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '20px', marginBottom: '15px', marginTop: '30px' }}></i> Loading...
                </TableCell>
              </TableRow>
            :
              orderHistory.map(({
                seller_id, title, image, name, orderQuantity, shopName, orderCounter, price, status,
                product_id
              }, i) => (
              <TableRow key={i}>
                <TableCell component='th' scope='row'> 
                  <ImageLoader 
                    src={`${productImgURL}${image}`}
                    width='60'
                    height='60'
                    alt={title}
                  />
                </TableCell>
                { bodyCell(name) }
                { bodyCell(shopName) }
                { bodyCell(orderQuantity) }
                { bodyCell(price) }
                <TableCell component='th' scope='row'>  
                  {
                    status === 2 ?
                      <span className='text-primary'>Pending</span>
                    : 
                    <span className='text-success'>Received</span>
                  }
                </TableCell>
              </TableRow>
              ))
          }
          </PasalubongTable>
        </div>
      </React.Fragment>
    )
  }
}

const enhance = compose (
  connect(buyerSelector)
)

export default enhance(BuyerOrders)
