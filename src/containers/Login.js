import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose' 
import { userSelector } from '../redux/selectors'
import { Modal } from 'reactstrap'
// import LockIcon from '@material-ui/icons/LockOutlined'
import '../css/Login.css'
import ButtonSpinner from '../components/ButtonSpinner'
import { NavLink as Link } from 'react-router-dom'
import {
  LOGIN_USER_ACTION,
  BTN_LOGIN_CLICK_ACTION,
  HIDE_LOGIN_DIALOG_ACTION,
  CLEAR_LOGIN_NOT_AUTH_USER_ACTION
} from '../redux/actions/user'
import {
  Paper,
  Typography,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core'

class Login extends React.PureComponent {
  constructor(){
    super()
    this.state = {
        email: '',
        password: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { resStatus, dispatch } = nextProps

    if (resStatus !== 200) {
      this.setState({
        password: ''
      }, ()=> {
        setTimeout(()=>{
          dispatch(CLEAR_LOGIN_NOT_AUTH_USER_ACTION())
        },2000)
      })
      return 
    }

    this.setState({
      email: '',
      password: '',
    })
  }

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    const { dispatch } = this.props

    if (email && password) {
      dispatch(BTN_LOGIN_CLICK_ACTION())
      const postData = { email, password }
      dispatch(LOGIN_USER_ACTION(postData))
    }
  }

  handleCloseDialog = () => {
    this.props.dispatch(HIDE_LOGIN_DIALOG_ACTION())
  }

  render() {
    const{
      email,
      password,
    } = this.state
    const {
      isLoginModalVisible,
      isBtnSubmit,
      message
    } = this.props
    
    return(
      <Modal isOpen={isLoginModalVisible}>
        <Paper className='modalLogin'>
          <div className='text-center'>
            <Typography component='h1' variant='h5'>
              Log In
            </Typography>
          </div> 
          <form className='p-3 input' onSubmit={this.handleFormSubmit}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Email Address</InputLabel>
              <Input 
                type='email'
                name='email' 
                value={email}
                autoComplete='email' 
                onChange={this.handleOnChange}
                autoFocus 
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input 
                name='password' 
                type='password' 
                value={password}
                onChange={this.handleOnChange}
                autoComplete='current-password' 
              />
            </FormControl>
            <h5 className='text-center'> {message}</h5>
            <div className='row loginDiv'>
              <div className='col-lg-6'>
                <ButtonSpinner
                    type='submit'
                    name={'LOGIN'} 
                    raised='raised'
                    color='primary'
                    variant='contained'
                    fullWidth
                    isspinning={isBtnSubmit}
                    disabled={isBtnSubmit}
                />
              </div>
              <div className='col-lg-6 cancel'>
                <button onClick={this.handleCloseDialog} className='btn btn-danger btn-block cancel'>
                    CANCEL
                </button>
              </div>
            </div>          
            <div className='text-center member'>
                Not a member yet? <br/>
                <Link to='/seller-sign-up' onClick={this.handleCloseDialog}> Create Account  </Link>
            </div>  
          </form>
        </Paper>
      </Modal>
    )
  }
}

const enhance = compose(
  connect(userSelector)
)

export default enhance(Login)