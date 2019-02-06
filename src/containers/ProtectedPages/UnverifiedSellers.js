import React from 'react'
import {connect} from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors/index'
import '../../css/Admin.css'
import { withStyles } from '@material-ui/core/styles'
import ImageLoader from '../../components/ImageLoader'
import { sellerDtiURL } from '../../redux/api/api'
import PasalubongTable from '../../components/PasalubongTable'
import {
  Button,
  TableCell,
  TableRow,  
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar
} from '@material-ui/core'
import { 
  GET_UNVERIFIED_SELLERS_ACTION, 
  // VERIFY_SELLER_ACTION, 
  CLEAR_TOAST_ACTION,
  COINS_PH_PAYMENT_ACTION,
  UPDATE_SELLER_TOKEN_ACTION,
  SEARCH_PAID_UNPAID_SELLER_ACTION
} from '../../redux/actions/seller'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
class UnverifiedSellers extends React.Component {

  state = {
    image: '',
    open: false,
    activate: false,
    openSnackbar: false,
    vertical: 'top',
    horizontal: 'center',
    advance_search: ''
  }

  componentDidMount() {
    this.props.dispatch(GET_UNVERIFIED_SELLERS_ACTION())
    this.props.dispatch(COINS_PH_PAYMENT_ACTION())
    this.interval = setInterval(()=> this.handleCheckIfPaid(), 5000)
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, resStatus } = nextProps
    if (resStatus === 200) {
      setTimeout(()=> {
        this.setState({ openSnackbar: false})
      }, 3000)
      dispatch(CLEAR_TOAST_ACTION())
    }
  }

  componentWillUnmount() {
    this.setState({ 
      open: false,
      activate: false,
      shopName: '',
      openSnackbar: false
    })
    clearInterval(this.interval)
  }

  handleClose = () => {
    this.setState({ image: '', open: false })
  }

  renderDialog = () => (
    <Paper elevation={1}>
      <Dialog
        open={this.state.open}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              { this.displayImage(this.state.image, 400, 300)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary" variant='outlined' className='mr-auto'>
              <i className='fa fa-close'></i> Close
            </Button>
            <Button onClick={this.handleClose} color="primary" variant='contained'>
              <i className='fa fa-download'></i> Download
            </Button>
          </DialogActions>
      </Dialog>
    </Paper>
  )

  displayImage = (image, width, height) => (
    <ImageLoader 
      src={`${sellerDtiURL}${image}`}
      width={width}
      height={height}
    />
  )

  callRenderDialog = image => {
    this.setState({
      image,
      open: true
    })
  }

  handleCheckIfPaid = shopName => {
    const { coinsPayment, unVerifiedSellers }  = this.props
    const crypto = coinsPayment['crypto-payments'] || []
    const unver = unVerifiedSellers || []
    const sellers = unver.map(sellers => sellers.shopName)
    const paid = crypto.filter(crypt => crypt.currency === 'PBTC' && crypt.entry_type === 'incoming')
      .filter(crypt => sellers.includes(crypt.message) && crypt.amount === '20')

    if (paid && paid.length > 0) {
      this.setState(()=> ({
        shopName: paid[0]['message'],
        openSnackbar: true
      }))
      this.props.dispatch(UPDATE_SELLER_TOKEN_ACTION({ shopName: paid[0]['message'] }))
    }
  }

  handleInputChange = e => {
    this.setState({
      advance_search: e.target.value
    }, ()=> {
      this.props.dispatch(SEARCH_PAID_UNPAID_SELLER_ACTION({ 
        advance_search: this.state.advance_search, 
        type: 'unpaid'
      }))
    })
  }

  render() {
    const {
      unVerifiedSellers,
    } = this.props
    const {
      openSnackbar,
      vertical,
      horizontal,
      advance_search
    } = this.state
    const tableCell = ['DTI Permit Image', 'Name', 'Email', 'Address', 'Phone', 'Paid']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    const unverified = unVerifiedSellers || []
    return( 
      <React.Fragment>
        { this.renderDialog() }
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnackbar}
          onClose={()=>{}}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">
            <i className='fa fa-check text-success' style={{ fontSize: '20px', marginRight: '5px' }}></i>
            { this.state.shopName } has already been paid and will be moving to Paid Sellers Section
          </span>}
        />
        <div className='mb-3'>
          <input  
            name="advance_search" 
            value={advance_search}
            onChange={this.handleInputChange}
            className='col-lg-12 form-control'
            placeholder='Search Unpaid Seller Here...'
            autoFocus
          />
        </div>
        <PasalubongTable tableCell={tableCell}>
          {
            unverified.map(({
              seller_id, image, title, shopName, email, shopAddress, phone, token
            }, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row"> 
                  <Button raised='raised' variant="outlined" color="primary" onClick={()=>this.callRenderDialog(image)}>
                    { this.displayImage(image, 80, 80)}
                  </Button>
                </TableCell>
                { bodyCell(shopName) }
                { bodyCell(email) }
                { bodyCell(shopAddress) }
                { bodyCell(phone) }
                <TableCell>
                  {
                    token ?
                    <i className='fa fa-close text-danger' style={{ fontSize: '20px' }}> </i> 
                    :
                    <i className='fa fa-check text-success' style={{ fontSize: '20px' }}> </i>
                  }
                </TableCell>
                {/* <TableCell>
                  {
                    token ?
                    <span>No Action Yet</span>
                    :
                    <Checkbox
                      id='activate'
                      name='activate'
                      label='Activate'
                      value='activate'
                      onClick={()=>this.handleCheck(activate)}
                      checked={activate}
                    />
                  }
                </TableCell> */}
                </TableRow>
            ))
          }
        </PasalubongTable>
      </React.Fragment>
    )
  }
}

const enhance = compose(
  connect(sellerSelector)
)

export default enhance(withStyles(styles)(UnverifiedSellers))