import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import PasalubongTable from '../../components/PasalubongTable'
import TableCell from '@material-ui/core/TableCell/TableCell'
import TableRow from '@material-ui/core/TableRow/TableRow'
import ImageLoader from '../../components/ImageLoader'
import { productImgURL } from '../../redux/api/api'
import {
  productSelector
} from '../../redux/selectors'
import { UPDATE_NOTIFICATION_STATUS_ACTION } from '../../redux/actions/seller';

class BuyerNotification extends React.PureComponent {
  
  componentDidMount() {
    localStorage.setItem('route', this.props.location.pathname)
  }

  componentWillUnmount() {
    this.props.dispatch(UPDATE_NOTIFICATION_STATUS_ACTION({ buyer_id: this.props.login_id }))
  }

  render() {
    const {
      buyerNotification
    } = this.props

    const tableCellDetails = ['Product Image', 'Name', 'Category', 'Order Quantity', 'Status']
    const bodyCellDetails = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
   
    return (
      <div style={{ marginTop: '7rem' }}>
        <span className='text-center d-flex mb-2'>
          <h5 className='mb-2'> Notifications of your Orders : </h5>
        </span>
        <PasalubongTable tableCell={tableCellDetails}>
          {
            buyerNotification &&
            buyerNotification.length > 0 ?
              buyerNotification.map((e, i) => (
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
                  { bodyCellDetails('Paid') }
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
}

const enhance = compose(
  connect(productSelector)
)

export default enhance(BuyerNotification)