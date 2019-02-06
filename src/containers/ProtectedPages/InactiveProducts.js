import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { productSelector } from '../../redux/selectors'
import Search from '../Search'
import { GET_DEACTIVATED_PRODUCTS_ACTION, ACTIVATE_PRODUCT_ACTION, CLEAR_STATE_ACTION } from '../../redux/actions/product'
import PasalubongTable from '../../components/PasalubongTable'
import ImageLoader from '../../components/ImageLoader'
import { productImgURL } from '../../redux/api/api'
import {
  TableCell,
  TableRow,  
  Button
} from '@material-ui/core'
import swal from 'sweetalert'

class InactiveProducts extends React.PureComponent {
  componentDidMount() {
    const { user: { login_id } } = JSON.parse(localStorage.getItem('state'))
    this.props.dispatch(GET_DEACTIVATED_PRODUCTS_ACTION({seller_id : login_id}))
  } 

  componentWillReceiveProps({ resStatus }) {
    if (resStatus === 200) {
      setTimeout(()=> {
        this.props.dispatch(CLEAR_STATE_ACTION())
        swal({
            title: "Confirmation!",
            text: `Product has been successfully activated!`,
            icon: "success"
        })
      })
    }
  }

  handleActivate = product_id => {
    const confirm = window.confirm('Are you sure to activate this product?')
    if (!confirm) return
    const { user: { login_id } } = JSON.parse(localStorage.getItem('state'))
    this.props.dispatch(ACTIVATE_PRODUCT_ACTION({ seller_id: login_id, product_id }))
  }

  render() {
    const {
      deactivatedProducts
    } = this.props
    const tableCell = ['Image', 'Product Name', '# of Orders', 'Action']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    return(
      <React.Fragment>
        <Search 
            placeholder='Search Item here'
        />
        <PasalubongTable tableCell={tableCell}>
          {
            deactivatedProducts.map(({
              product_id, title, image, name, orderCounter
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
              { bodyCell(orderCounter) }
              <TableCell>
                <Button raised='raised' color='primary' variant='contained' onClick={()=>this.handleActivate(product_id)}>
                  <i className='fa fa-activate'></i> Activate
                </Button>
              </TableCell>
            </TableRow>
            ))
          }
        </PasalubongTable>
      </React.Fragment>
    )
  }
}

const enhance = compose (
  connect(productSelector)
)

export default enhance(InactiveProducts)