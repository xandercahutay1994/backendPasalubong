import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors'
import ImageLoader from '../../components/ImageLoader'
import { productImgURL } from '../../redux/api/api'
import Search from '../Search'
import PasalubongTable from '../../components/PasalubongTable'
import FullDialog from '../../components/FullDialog'
import { 
  GET_SELLER_INVENTORY_REPORT_ACTION, GET_BUYERS_ORDERED_BY_PRODUCT_ACTION 
} from '../../redux/actions/seller'
import {
  TableCell,
  TableRow,  
} from '@material-ui/core'

class Report extends React.PureComponent {

  state = {
    openFullDialog : false,
    vertical: 'top',
    horizontal: 'center'
  }

  componentDidMount() {
    document.title = 'Inventory/Reports'
    const { login_id, dispatch } = this.props
    dispatch(GET_SELLER_INVENTORY_REPORT_ACTION(login_id))
  }

  getDetails = (seller_id, product_id) => {
    this.setState({ openFullDialog: true, product_id }, ()=> {
      this.props.dispatch(GET_BUYERS_ORDERED_BY_PRODUCT_ACTION({ seller_id, product_id }))
    })
  }

  handleCloseFullDialog = () => {
    this.setState({ openFullDialog : false })
  }

  renderOrderDetails = () => {
    const { product_id } = this.state
    const { orderedBuyers } = this.props
    const tableCellDetails = ['Fullname', 'Email', 'Order Quantity']
    const bodyCellDetails = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    const data = orderedBuyers && orderedBuyers.filter(e=> Number(e.product_id) === product_id)

    return (
      <div className='mt-5'>
        <span className='d-flex mb-2'>
          <h4 className='ml-2 text-primary'> 
            { data && data.length ? `${data[0].name}` : 
            <span className='text-danger'>No Record Found</span> }
          </h4>
        </span>
        <PasalubongTable tableCell={tableCellDetails}>
          {
            orderedBuyers &&
            orderedBuyers.length > 0 ?
              orderedBuyers.map((e, i) => (
                <TableRow key={e.product_id}>
                  { bodyCellDetails(`${e.firstname} ${e.lastname}`) }
                  { bodyCellDetails(e.email) }
                  { bodyCellDetails(e.orderQuantity) }
                  {/* { bodyCellDetails(`${e.address} ${e.province} ${e.city}`) } */}
                </TableRow>
              ))
              :
              <TableRow>
                { bodyCellDetails('') }
                { bodyCellDetails('') }
                <TableCell>
                  <span className='text-danger'>No Record Found</span>
                </TableCell>
              </TableRow>
          }
        </PasalubongTable>
      </div>
    )
  }

  render() {
    const {
      openFullDialog
    } = this.state
    const {
      inventoryReport
    } = this.props

    const tableCell = ['Image', 'Product Name', 'Total Quantity', 'Quantity Left', '# of Orders', 'Price', 'Total Payment']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    return(
      <React.Fragment>
        <Search
          placeholder='Search Item here...'
        />
        <PasalubongTable tableCell={tableCell}>
          {
            inventoryReport.map(({
              seller_id, title, image, name, quantity, email, orderCounter, phone,
              total_quantity, price, product_id, date
            }, i) => (
            <TableRow 
              key={i} 
              style={{ cursor: 'pointer'}}
              onClick={()=>this.getDetails(seller_id, product_id)}>
              <TableCell component="th" scope="row"> 
                <ImageLoader 
                  src={`${productImgURL}${image}`}
                  width='60'
                  height='60'
                  alt={title}
                />
              </TableCell>
              { bodyCell(name) }
              { bodyCell(total_quantity) }
              { bodyCell(quantity) }
              { bodyCell(orderCounter) }
              { bodyCell(price) }
              { bodyCell(Number(orderCounter) * price) }
              {/* { bodyCell(moment(date).format('MM/DD/YYYY')) } */}
            </TableRow>
            ))
          }
        </PasalubongTable>
        <FullDialog
          openFullDialog={openFullDialog}
          closeFullDialog={this.handleCloseFullDialog}
        >
          { this.renderOrderDetails() }
        </FullDialog>
      </React.Fragment>
    )
  }
}


const enhance = compose (
  connect(sellerSelector)
)

export default enhance(Report)
