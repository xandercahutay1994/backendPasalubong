import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors'
import PasalubongTable from '../../components/PasalubongTable'
import { GET_RESERVATION_TAB_DETAILS_ACTION, SEARCH_RESERVATION_TAB_DETAILS_ACTION } from '../../redux/actions/seller'
import TableCell from '@material-ui/core/TableCell/TableCell'
import TableRow from '@material-ui/core/TableRow/TableRow'
import { productImgURL } from '../../redux/api/api'
import ImageLoader from '../../components/ImageLoader'

class ReservationTab extends React.PureComponent {
  state = {
    advance_search: ''
  }

  componentDidMount() {
    document.title = 'Reservations'
    const { login_id, dispatch } = this.props

    dispatch(GET_RESERVATION_TAB_DETAILS_ACTION({ seller_id: login_id }))
  }

  handleOnChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    }, ()=> {
      this.props.dispatch(SEARCH_RESERVATION_TAB_DETAILS_ACTION({
        seller_id: this.props.login_id,
        advance_search: this.state.advance_search
      }))
    })
  }

  render() {
    const {
      advance_search
    } = this.state
    const {
      reservationDetails
    } = this.props
    const tableCell = ['Image', 'Product Name', 'Fullname', 'Email', 'Order Quantity', 'Category', 'Reservation Until']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )

    return (
      <React.Fragment>
        <input  
          name="advance_search" 
          value={advance_search}
          onChange={this.handleOnChange}
          className='col-lg-12 form-control mt-3 mb-3'
          placeholder='Search here'
          autoFocus
        />
        <PasalubongTable tableCell={tableCell}>
          {
            reservationDetails && reservationDetails.length > 0 ?
            reservationDetails.map(({
              email, category, firstname, lastname, total_payment, buyer_id, delivery_id, reservation_date,
              name, quantity, orderQuantity, phone, payment_type, reference_number, image, title
            }, i) => (
              <TableRow key={i} style={{ cursor: 'pointer' }}>
                <TableCell>
                  <ImageLoader
                      src={`${productImgURL}${image}`}
                      // className={'card-img-top'}
                      width={80}
                      height={80}
                      alt={title}
                  />
                </TableCell>
                { bodyCell(name) }
                { bodyCell(`${firstname} ${lastname}`) }
                { bodyCell(email) }
                { bodyCell(orderQuantity) }
                { bodyCell(category) }
                { bodyCell(reservation_date) }
              </TableRow>
              ))
              :
              <TableRow>
                { bodyCell('') }
                { bodyCell('') }
                <TableCell>
                  <span className='text-danger'>No Record Found</span>
                </TableCell>
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

export default enhance(ReservationTab)