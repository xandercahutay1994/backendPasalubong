import React from 'react'
import {connect} from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors/index'
import '../../css/Admin.css'
import { withStyles } from '@material-ui/core/styles'
import ImageLoader from '../../components/ImageLoader'
import { sellerDtiURL } from '../../redux/api/api'
import PasalubongTable from '../../components/PasalubongTable'
import swal from 'sweetalert'
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
  GET_ALL_SELLERS_ACTION,
  ACTIVATE_SELLER_ACTION,
  DEACTIVATE_SELLER_ACTION,
  CLEAR_SELLER_STATE_ACTION,
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
})

class AllSellers extends React.PureComponent {

  state = {
    image: '',
    open: false,
    openSnackbar: false,
    status: '',
    spin: false,
    vertical: 'top',
    horizontal: 'center',
    advance_search: ''
  }

  componentDidMount() {
    this.props.dispatch(GET_ALL_SELLERS_ACTION())
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.state
    if (nextProps.resStatus === 200) {
      swal({
          title: "Confirmation!",
          text: `Seller has been successfully ${status === 1 ? 'de-ac' : 'ac' }tivated!`,
          icon: "success"
      })
      this.setState({ openSnackbar: false })
      this.props.dispatch(CLEAR_SELLER_STATE_ACTION())
    }
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
    
  activateSeller = (seller_id, status) => {
    const confirm = window.confirm('Are you sure to Activate this Account?')
    if (!confirm) return
    this.props.dispatch(ACTIVATE_SELLER_ACTION({seller_id}))
    this.setState({
      status,
      openSnackbar: true
    })
  }

  deactivateSeller = (seller_id, status) => {
    const confirm = window.confirm('Are you sure to De-Activate this Asccount?')
    if (!confirm) return
    this.props.dispatch(DEACTIVATE_SELLER_ACTION({seller_id}))
    this.setState({
      status,
      openSnackbar: true
    })
  }

  handleInputChange = e => {
    this.setState({
      advance_search: e.target.value
    }, ()=> {
      this.props.dispatch(SEARCH_PAID_UNPAID_SELLER_ACTION({ 
        advance_search: this.state.advance_search, 
        type: 'paid'
      }))
    })
  }

  render() {
    const {
      allSellers
    } = this.props
    const {
      openSnackbar,
      vertical,
      horizontal,
      advance_search
    } = this.state
    const tableCell = ['DTI Permit Image', 'Name', 'Address', 'Status', 'Action']
    const bodyCell = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
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
            <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '15px', marginRight: '5px' }}></i>Processing...
          </span>}
        />
        <div className='mb-3'>
          <input  
            name="advance_search" 
            value={advance_search}
            onChange={this.handleInputChange}
            className='col-lg-12 form-control'
            placeholder='Search Paid Seller Here...'
            autoFocus
          />
        </div>
        <PasalubongTable tableCell={tableCell}>
          {
            allSellers.map(({
              seller_id, image, title, shopName, shopAddress, status
            }, i) => (
              <TableRow key={i} className='card'>
                <TableCell component="th" scope="row"> 
                  <Button raised='raised' variant="outlined" color="primary" onClick={()=>this.callRenderDialog(image)}>
                    { this.displayImage(image, 80, 80)}
                  </Button>
                </TableCell>
                { bodyCell(shopName) }
                { bodyCell(shopAddress) }
                { bodyCell(status === 0 ? 'In-Active' : 'Active') }
                <TableCell>
                  {
                    status === 0 ?
                      <Button
                        raised='raised'
                        color='primary' 
                        variant='contained'
                        disabled={openSnackbar}
                        onClick={()=>this.activateSeller(seller_id, status)}
                      > 
                        <i className='fa fa-check text-success' style={{ fontSize: '20px', marginRight: '5px' }}></i>
                        Activate
                      </Button>
                      :
                      <Button
                        raised='raised'
                        color='secondary' 
                        variant='outlined'
                        disabled={openSnackbar} 
                        onClick={()=>this.deactivateSeller(seller_id, status)}
                      > 
                        <i className='fa fa-ban text-danger' style={{ fontSize: '20px', marginRight: '5px' }}></i>
                        Deactivate
                      </Button>
                  }
                </TableCell>
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

export default enhance(withStyles(styles)(AllSellers))