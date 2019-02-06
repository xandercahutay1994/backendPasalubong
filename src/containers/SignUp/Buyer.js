import React from 'react'
import '../../css/SignUp.css'
import { connect } from 'react-redux'
import ButtonSpinner from '../../components/ButtonSpinner'
import { compose } from 'recompose'
import { buyerSelector } from '../../redux/selectors'
import swal from 'sweetalert'
import {
  CREATE_BUYER_ACTION,
  CLEAR_BUYER_STATE_ACTION
} from '../../redux/actions/buyer'

class Buyer extends React.PureComponent {
    constructor(){
        super()
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            issubmit: false
        }
    }

    componentDidMount() {
    //   localStorage.clear()
    }

    componentWillReceiveProps(props){
      if (props.buyerRegistered) {
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          phone: '',
          issubmit: false
        }, ()=> {
          props.dispatch(CLEAR_BUYER_STATE_ACTION())
          this.successMessage()
        }, 2000)
        return
      }

      this.setState({
        issubmit: false
      })
    }

    successMessage = () => {
      swal({
          title: "Congratulations!",
          text: `Account successfully registered!`,
          icon: "success"
      })
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({
            [name] : value
        })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        const { firstname, lastname, email, password, phone} = this.state
        if(firstname || lastname || email || password || phone){
            this.setState({ issubmit: true })
            const postData = {
                firstname,
                lastname,
                email,
                password,
                phone
            }
            this.props.dispatch(CREATE_BUYER_ACTION(postData))
        }
    }

    render(){
        const { firstname, lastname, email, password, phone, issubmit} = this.state
        const { message } = this.props 

        return(
            <div className='signUpBuyer'>
                <h2 className='text-center buyer'> BUYER SIGN UP</h2>
                <form className='col-lg-6 mt-4' onSubmit={this.handleFormSubmit}>
                    <div className='form-group'>
                        <label>Phone # *</label>
                        <input 
                            type='number' 
                            name='phone'
                            className='form-control col-lg-6 col-md-6' 
                            placeholder='Enter Phone #'
                            onChange={this.handleInputChange}
                            value={phone}/>
                    </div>
                    <div className='form-group'>
                        <label>Firstname *</label>
                        <input 
                            type='text' 
                            name='firstname'
                            className='form-control' 
                            placeholder='Enter Firstname'
                            onChange={this.handleInputChange}
                            value={firstname}
                            required/>
                    </div>
                    <div className='form-group'>
                        <label>Lastname *</label>
                        <input 
                            type='text' 
                            name='lastname'
                            className='form-control' 
                            placeholder='Enter Lastname'
                            onChange={this.handleInputChange}
                            value={lastname}
                            required/>
                    </div>
                    <div className='form-group'>
                        <label>Email address *</label>
                        <input 
                            type='email' 
                            name='email'
                            className='form-control' 
                            placeholder='Enter Email'
                            onChange={this.handleInputChange}
                            value={email}
                            required/>
                        <small 
                            id='emailHelp' 
                            className='form-text text-muted'>
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className='form-group'>
                        <label>Password *</label>
                        <input 
                            type='password' 
                            name='password'
                            className='form-control' 
                            placeholder='Enter Password'
                            onChange={this.handleInputChange}
                            value={password}
                            required/>
                    </div>
                    <h5 className='text-center'>{message}</h5>
                    <ButtonSpinner
                        type='submit'
                        name={'SIGN UP'}
                        raised='raised'
                        color='primary'
                        variant='contained'
                        fullWidth
                        isspinning={issubmit}
                        disabled={issubmit}
                    />
                </form>
            </div>
        )
    
    }
}

const enhance = compose(
  connect(buyerSelector)
)

export default enhance(Buyer)
