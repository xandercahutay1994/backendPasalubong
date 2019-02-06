import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import '../../css/Reservation.css'
import PasalubongTable from '../../components/PasalubongTable'
import { cartSelector } from '../../redux/selectors'
import { GET_RESERVATION_DETAILS_ACTION, DELETE_RESERVATION_ACTION, SEARCH_RESERVATION_ACTION, ADD_TO_CART_ACTION, MOVE_TO_CART_ACTION, RESET_CART_ACTION } from '../../redux/actions/cart'
import ImageLoader from '../../components/ImageLoader'
import { productImgURL } from '../../redux/api/api'
import {
  TableCell,
  TableRow,
  Button,
  Snackbar
} from '@material-ui/core'
import Link from 'react-router-dom/Link';

class Reservation extends React.PureComponent {

  state = {
    image: '',
    open: false,
    advance_search: '',
    vertical: 'top',
    horizontal: 'center'
  }

  componentDidMount() {
    document.title = 'Reservations'
    localStorage.setItem('route', this.props.location.pathname)
    this.props.dispatch(GET_RESERVATION_DETAILS_ACTION({ buyer_id: this.props.login_id}))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resStatus === 200) {
      setTimeout(()=> {
        this.setState({
          isProcessing: false
        })
      },2000)
      setTimeout(()=> {
        this.setState({
          isDeleting: false,
          isMoving: false
        }, ()=> {
          this.props.dispatch(RESET_CART_ACTION())
        })
      },5000)
    }
  }

  callRenderDialog = image => {
    this.setState({
      image,
      open: true
    })
  }

  displayImage = (image, width, height) => (
    <ImageLoader 
      src={`${productImgURL}${image}`}
      width={width}
      height={height}
    />
  )

  handleInputChange = e => {
    this.setState({
      advance_search: e.target.value
    }, ()=> {
      this.props.dispatch(SEARCH_RESERVATION_ACTION({
        advance_search: this.state.advance_search,
        buyer_id: this.props.login_id
      }))
    })
  }

  handleDelete = (buyer_id, product_id) => {
    this.props.dispatch(DELETE_RESERVATION_ACTION({ buyer_id, product_id }))
    this.setState({ isDeleting: true, isProcessing: true })
  }

  moveToCart = (orderQuantity, product_id, reservation_id) => {
    const { login_id, dispatch } = this.props

    dispatch(MOVE_TO_CART_ACTION({
      buyer_id: login_id,
      orderQuantity,
      product_id,
      reservation_id
    }))
    this.setState({ isMoving: true, isProcessing: true })
  }

  render() {
    const {
      reservations,
      advance_search
    } = this.props
    const {
      isDeleting,
      isProcessing,
      vertical,
      horizontal
    } = this.state
    
    // const reserve = reservations.reduce((acc, curr) => acc.concat(curr), [])
    const tableCell = ['Image', 'Product Name', 'Category', 'Total Orders', 'Date Expires', 'Action']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    return (
      <React.Fragment>
        <div className='reservation' style={{ marginTop: '7rem' }}>
          <div>
            <Link to='/cart' className='goTo nav-link'>
              <Button className='btnGoTo' raised='raised' variant='outlined' color='primary'>
              <i className='fa fa-arrow-left mr-2' style={{ fontSize: '15px' }}></i> Go To Cart
              </Button>
            </Link>
          </div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={isProcessing}
            onClose={()=>{}}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">
              {
                isProcessing ?
                  <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '15px', marginRight: '5px' }}></i>
                :
                  <i className="fa fa-check text-success" style={{ fontSize: '15px', marginRight: '5px' }}></i>
              }
              {
                isProcessing ? 
                'Processing' 
                :
                isDeleting ? 'Deleted successfully' : 'Moved To Cart Successfully'
              }
            </span>}
          />
          <h5 className='text-center pageTitle'> Your Reservations </h5>
          <div className='mb-3 mt-4'>
            <input  
              name="advance_search" 
              value={advance_search}
              onChange={this.handleInputChange}
              className='col-lg-12 form-control'
              placeholder='Search Product Here...'
              autoFocus
            />
          </div>
          <PasalubongTable tableCell={tableCell}>
            {
              reservations.map(({
                image, name, reservation_date, product_id, buyer_id, category,
                orderQuantity, reservation_id
              }, i)=> (
                <TableRow key={i}>
                  <TableCell scope='row'> 
                    <Button raised='raised' variant='outlined' color='primary' onClick={()=>this.callRenderDialog(image)}>
                      { this.displayImage(image, 80, 80)}
                    </Button>
                  </TableCell>
                  { bodyCell(name) }               
                  { bodyCell(category) }                
                  { bodyCell(orderQuantity) }                
                  { bodyCell(reservation_date) }
                  <TableCell scope='row'> 
                    <div className='d-flex'>
                      <Button 
                        raised='raised' 
                        color='secondary' 
                        variant='outlined'
                        className='btn-sm'
                        disabled={isProcessing}
                        onClick={()=>this.handleDelete(buyer_id, product_id)}
                      >
                        <i className='fa fa-close mr-1' style={{ fontSize: '18px' }}></i>  Delete
                      </Button>
                      <Button 
                        raised='raised' 
                        color='primary' 
                        variant='contained'
                        disabled={isProcessing}
                        className='btn-sm btn-primary ml-3'
                        onClick={()=>this.moveToCart(orderQuantity, product_id, reservation_id)}
                      >
                        <i className='fa fa-arrow-right' style={{ fontSize: '15px' }}></i>  Move To Cart
                      </Button>
                    </div>
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

const enhance = compose(
  connect(cartSelector)
)

export default enhance(Reservation)