import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import {
  productSelector
} from '../../redux/selectors'
import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import ButtonSpinner from '../../components/ButtonSpinner'
import Button from '@material-ui/core/Button/Button'
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty'
import { GET_BUYER_DETAILS_ACTION, CLEAR_STATUS_BUYER_ACTION, UPDATE_BUYER_DETAILS_ACTION } from '../../redux/actions/product'

class BuyerAccount extends React.PureComponent {
  constructor() {
    super()
    this.fields = {
        firstname: '',
        phone: '',
        lastname: ''
    }
    this.state = {
        fieldValues: { ...this.fields },
        issubmit: false,
        vertical: 'top',
        horizontal: 'center'
    }
  }

  componentDidMount() {
    const { login_id } = this.props 
    this.props.dispatch(GET_BUYER_DETAILS_ACTION({ buyer_id: login_id}))
    localStorage.setItem('route', this.props.location.pathname)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({
        fieldValues: {...prevState.fieldValues, ...nextProps.buyerDetails}
    }))

    if (nextProps.resStatus === 200) {
      this.setState({ isUpdated: true }, ()=> {
          setTimeout(()=> {
              this.setState({
                  isUpdated: false,
                  issubmit: false
              }, ()=> {
                  nextProps.dispatch(CLEAR_STATUS_BUYER_ACTION())
              })
          }, 1500)
      })
    }
}

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({
        fieldValues: {
            ...this.state.fieldValues,
            [name]: value
        }
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { firstname, lastname, phone } = this.state.fieldValues
    const postData = {
        lastname,
        firstname,
        phone,
        buyer_id: this.props.login_id
    }
    this.setState({
        issubmit: true
    }, ()=> {
        this.props.dispatch(UPDATE_BUYER_DETAILS_ACTION(postData))
    })
  }
  
  handleBack = () => {
    this.props.history.goBack()
  }

  render() {
    const {
      vertical, horizontal,
      isUpdated, issubmit 
    } = this.state
    const { firstname, lastname, phone } = this.state.fieldValues
    return (
      <div className='update-account'>
            <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={issubmit}
            onClose={()=>{}}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">
                {
                    isUpdated ?
                        <i className='fa fa-check text-success' style={{ fontSize: '20px', marginRight: '5px' }}></i>
                    :
                    <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '15px', marginRight: '5px' }}></i>
                }
                {
                    isUpdated ?
                        'Successfully updated'
                    :
                        'Processing...'
                }
            </span>}
            />
            <h5 className='update-font text-center'> Update Account </h5>
            <form className='col-lg-6 mt-4' onSubmit={this.handleFormSubmit}>
                <div className='form-group'>
                  <label>Phone # *</label>
                  <input 
                      type='number' 
                      name='phone'
                      className='form-control col-lg-6 col-md-6' 
                      onChange={this.handleInputChange}
                      value={phone}
                  />
                </div>
                <div className='form-group'>
                  <label>Firstname *</label>
                  <input 
                      type='text' 
                      name='firstname'
                      className='form-control' 
                      onChange={this.handleInputChange}
                      value={firstname}
                      required
                  />
                </div>
                <div className='form-group'>
                  <label>Lastname *</label>
                  <input 
                      type='text' 
                      name='lastname'
                      className='form-control' 
                      onChange={this.handleInputChange}
                      value={lastname}
                      required
                  />
                </div>
                <div className='row'>
                  <div className='col-lg-6'>
                    <ButtonSpinner
                        type='submit'
                        name={'UPDATE ACCOUNT'}
                        raised='raised'
                        color='primary'
                        variant='contained'
                        fullWidth
                        isspinning={issubmit}
                        disabled={issubmit}
                    />                    
                  </div>
                  <div className='col-lg-6'>
                    <Button
                        raised='raised'
                        color='secondary'
                        variant='outlined'
                        fullWidth
                        onClick={this.handleBack}
                    >
                      <ThreeSixtyIcon/>Go Back
                    </Button>                    
                  </div>
                </div>
            </form>
        </div>
    )
  }
}

const enhance = compose(
  connect(productSelector)
)

export default enhance(BuyerAccount)