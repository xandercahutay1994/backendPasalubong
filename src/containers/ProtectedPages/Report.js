import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors'
import ImageLoader from '../../components/ImageLoader'
import { productImgURL } from '../../redux/api/api'
import Search from '../Search'
import PasalubongTable from '../../components/PasalubongTable'
import { 
  GET_SELLER_INVENTORY_REPORT_ACTION 
} from '../../redux/actions/seller'
import {
  TableCell,
  TableRow,  
} from '@material-ui/core'

class Report extends React.PureComponent {
  componentDidMount() {
    const { login_id, dispatch } = this.props
    dispatch(GET_SELLER_INVENTORY_REPORT_ACTION(login_id))
  }

  render() {
    const {
      inventoryReport
    } = this.props
    const tableCell = ['Image', 'Product Name', 'Total Quantity', '# of Orders', 'Feedbacks']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    return(
      <React.Fragment>
        <Search
          placeholder='Search Item here...'
        />
        <PasalubongTable tableCell={tableCell}>
          {
            inventoryReport.map(({
              seller_id, title, image, name, quantity, email, orderCounter, phone
            }, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row"> 
                <ImageLoader 
                  src={`${productImgURL}${image}`}
                  width='60'
                  height='60'
                  alt={title}
                />
              </TableCell>
              { bodyCell(name) }
              { bodyCell(quantity) }
              { bodyCell(orderCounter) }
              { bodyCell(orderCounter) }
            </TableRow>
            ))
          }
        </PasalubongTable>
      </React.Fragment>
    )
  }
}


const enhance = compose (
  connect(sellerSelector)
)

export default enhance(Report)
