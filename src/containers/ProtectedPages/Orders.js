import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors'
import PasalubongTable from '../../components/PasalubongTable'
import Search from '../Search'
import {
  TableCell,
  TableRow,  
} from '@material-ui/core'
import { GET_ORDERS_OF_BUYERS_ACTION, COINS_PH_PAYMENT_ACTION } from '../../redux/actions/seller'

class Orders extends React.PureComponent {
  componentDidMount() {
    const { login_id, dispatch } = this.props
    dispatch(GET_ORDERS_OF_BUYERS_ACTION({seller_id: login_id}))
    this.props.dispatch(COINS_PH_PAYMENT_ACTION())
    this.interval = setInterval(()=> this.handleCheckIfPaid(), 5000)
  }

  handleCheckIfPaid = () => {
    const { coinsPayment, ordersData }  = this.props
    const crypto = coinsPayment['crypto-payments'] || []
    const buyers = ordersData.details || []
    const copyBuyers = buyers.map(e => e.reference_number)

    const paid = crypto.filter(crypt => crypt.currency === 'PBTC' && crypt.entry_type === 'incoming')
    .filter((crypt,i ) => copyBuyers.includes(crypt.message) && crypt.amount === '20')  
  
    if (paid && paid.length > 0) {
      this.setState(()=> ({
        reference_number: paid[0]['message'],
        openSnackbar: true
      }))
      // this.props.dispatch(UPDATE_SELLER_TOKEN_ACTION({ shopName: paid[0]['message'] }))
    }
  }
  render() {
    const { ordersData } = this.props
    const tableCell = ['Fullname', 'Email', 'Total Payment', 'Reference Number', 'Payment Type']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    
    return(
      <React.Fragment>
        <Search
          placeholder='Search Item here...'
        />
        <PasalubongTable tableCell={tableCell}>
          {
            ordersData.details && ordersData.details.length > 0 ?
              ordersData.details.map(({
                email, category, firstname, lastname, total_payment,
                name, quantity, orderQuantity, phone, payment_type, reference_number
              }, i) => (
              <TableRow key={i}>
                { bodyCell(`${firstname} ${lastname}`) }
                { bodyCell(email) }
                { bodyCell(total_payment) }
                { bodyCell(reference_number) }
                { bodyCell(payment_type) }
              </TableRow>
              ))
              :
              <TableRow>
                { bodyCell('') }
                { bodyCell('') }
                { bodyCell('No record found') }
              </TableRow>
          }
        </PasalubongTable>
      </React.Fragment>
    )
  }
}

const enhance = compose(
  connect(sellerSelector)
)

export default enhance(Orders)