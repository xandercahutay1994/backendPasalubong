import React from 'react'
import { connect } from 'react-redux'
import '../../css/Registration.css'
import { Button, Snackbar } from '@material-ui/core'
import Steppers from '../Steppers'
import { compose } from 'recompose'
import ButtonSpinner from '../../components/ButtonSpinner'
import PhotoUpload from '../../components/PhotoUpload'
import swal from 'sweetalert'
import {
    sellerSelector
} from '../../redux/selectors'
import { 
    CHECK_EMAIL_TOKEN_ACTION,
    VERIFY_EMAIL_ACTION,
    CLEAR_SELLER_STATE_ACTION,
    CHECK_CODE_EXIST_ACTION,
    CREATE_SELLER_ACTION,
    GOOGLE_PLACE_ACTION,
    CLEAR_GOOGLE_PLACE_ACTION
} from '../../redux/actions/seller'

class Registration extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            email : '',
            issubmit: false,
            isdisabled: false,
            stepIndex: 0,
            code: '',
            img_url: '',
            image: '',
            shopName: '',
            shopAddress: '',
            password: '',
            phone: '',
            sellerEmail: '',
            permits: [],
            vertical: 'top',
            horizontal: 'center'
        }
    }

    componentDidMount() {
        const { email, dispatch, hasToken } = this.props
        dispatch(CLEAR_SELLER_STATE_ACTION())
        dispatch(CHECK_EMAIL_TOKEN_ACTION({email}))
        
        if (hasToken) {
            this.setState({ stepIndex: 1})
            return
        }
        this.setState({ stepIndex: 0})
    }   
 
    componentWillReceiveProps(nextProps) {
        if (nextProps.hasToken || nextProps.message === 'Code not exist') {
            this.setState({
                sellerEmail: '',
                issubmit: false,
            }, ()=> {
                this.clearState()
            }, 2000)
        }

        if (nextProps.sellerCode) {
            this.setState({
                code: ''
            }, ()=> {
                this.clearState()
            }, 2000)
        }

        if (nextProps.isRegistered)  {
            this.setState({
                img_url: '',
                image: '',
                shopName: '',
                shopAddress: '',
                password: '',
                phone: '',
                sellerEmail: '',
                issubmit: false,
                stepIndex: 0
            }, ()=> {
                this.clearState()
                localStorage.clear()
            }, 2000)
            this.successMessage()
        }
    }

    successMessage = () => {
        swal({
            title: "Congratulations!",
            text: `Hello! We'll validate your business(shop name) first if it has a DTI, Sanitary and Business permit. We'll notify you on your email account 
                    on the outcomes of our validation. Thank you!`,
            icon: "success"
        })
    }

    clearState = () => {
        setTimeout(()=>{
            this.props.dispatch(CLEAR_SELLER_STATE_ACTION())
        },2000)
    }

    handleInputChange = e => {
        const { name, value } = e.target
        
        this.setState({
            [name]: value
        }, ()=> {
            if (name === 'shopAddress') {
                setTimeout(()=> {
                    this.props.dispatch(GOOGLE_PLACE_ACTION(value))
                }, 2000)
            }
        })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        const { name } = e.target[0]
        const { code, img_url, sellerEmail, shopName, shopAddress, password, phone, permits } = this.state
        const { email, dispatch } = this.props


        this.setState({ issubmit: true })
        if (name === 'code') {
            dispatch(CHECK_CODE_EXIST_ACTION({email, code}))
            return
        } else if (name === 'sellerEmail') {
            localStorage.clear()
            dispatch(VERIFY_EMAIL_ACTION({email:sellerEmail}))
            return
        }
        if (permits.length < 2) {
            return
        }
        const postData = {
            // img_url,
            shopName,
            shopAddress,
            email,
            password,
            phone,
            img_url: permits[0],
            sanitary: permits[1],
            business: permits[2]
        }
        dispatch(CREATE_SELLER_ACTION(postData))
    }

    handleStepInc = (key, index) => {
        const { hasToken, sellerCode } = this.props

        if (!hasToken && !sellerCode) {
            this.setState({
                stepIndex: 0
            })
            return 
        }
        if (index === 0 && hasToken) {
            this.setState({ stepIndex: index})
            return
        } 

        if (index === 1 && hasToken ) {
            this.setState({ stepIndex: index})
            return
        }

        if (index === 2 && sellerCode) {
            this.setState({ stepIndex: index})
            return
        }
    }

    handleImgLoad = e => {
        const { permits } = this.state
        if (permits.length > 2) {
            return
        }
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
            if (permits.includes(e.target.result)) {
                return 
            }
            this.setState(prevState => ({
                img_url: e.target.result,
                permits: permits.length === 0 ? [e.target.result] : [...prevState.permits, e.target.result]
            }))
        }
    }

    sentEmail = () => {
        swal({
            title: "Hello!",
            text: `We sent you a code on your Email Account for you to use in the next step `,
            icon: "success"
        })
    }

    formStepOne = () => {
        const { sellerEmail, issubmit } = this.state
        const { resStatus, hasToken } = this.props

        return (
            <form className='col-lg-6 mt-4' onSubmit={this.handleFormSubmit}>
                <div className='form-group'>
                    <label>Email address *</label>
                    <input 
                        type='email' 
                        name='sellerEmail'
                        onChange={this.handleInputChange}
                        className='form-control' 
                        placeholder='Enter Email'
                        value={sellerEmail}
                        required/>
                </div>
                { resStatus === 200 && this.sentEmail() }
                <div className='row loginDiv'>
                    <div className='col-lg-6'>
                        <ButtonSpinner
                            type='submit'
                            name={'Send Verification'}
                            raised='raised'
                            color='secondary'
                            variant='contained'
                            fullWidth
                            isspinning={issubmit}
                            disabled={issubmit}
                        />
                    </div>
                    <div className='col-lg-6 next'>
                        <Button
                            raised='true'
                            variant='contained'
                            color='primary'
                            fullWidth
                            disabled={!hasToken}
                            // onClick={this.handleStepInc.bind(this, 'one')}
                            onClick={this.handleStepInc}
                        >
                            Next
                        </Button>
                    </div>
                </div>   
            </form>
        )
    }

    formStepTwo = () => {
        const { issubmit, code } = this.state
        const { message, sellerCode } = this.props
        const checkHasCode = sellerCode ? true : false
        const codeValue = sellerCode ? sellerCode : code

        return (
            <form className='col-lg-6 mt-4' onSubmit={this.handleFormSubmit}>
                <div className='form-group'>
                    <label>Code *</label>
                    { message && 
                        <i className='fa fa-check text-success ml-3' style={{ fontSize: '30px'}}></i>
                    }
                    <input 
                        type='code' 
                        name='code'
                        onChange={this.handleInputChange}
                        className='form-control' 
                        placeholder='Enter Code'
                        value={codeValue}
                        disabled={checkHasCode}
                        required/>
                </div>
                {/* <h5 className='text-center'>{message}</h5> */}
                <div className='row loginDiv'>
                    <div className='col-lg-6'>
                        <ButtonSpinner
                            type='submit'
                            name={'Check Code'}
                            raised='raised'
                            color='secondary'
                            variant='contained'
                            fullWidth
                            isspinning={issubmit}
                            disabled={checkHasCode}
                        />
                    </div>
                    <div className='col-lg-6 next'>
                        <Button
                            raised='true'
                            variant='contained'
                            color='primary'
                            fullWidth
                            disabled={!checkHasCode}
                            // onClick={this.handleStepInc.bind(this,'two')}
                            onClick={this.handleStepInc}
                        >
                            Next
                        </Button>
                    </div>
                </div>   
            </form>
        )
    }

    setImgUrl = (e, i) => {
        this.setState({
            img_url: e
        })
    }

    formStepThree = () => {
        const { img_url, image, shopName, shopAddress, password, phone, issubmit, permits,
            vertical, horizontal 
        } = this.state
        const { message, email } = this.props

        return (
            <div className='signUpSeller'>  
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={permits && permits.length <= 2}
                    onClose={()=>{}}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">
                    <i className='fa fa-close text-danger' style={{ fontSize: '20px', marginRight: '5px' }}></i>
                    You need to upload 3 images that contain valid DTI,Business and Sanitary Permits!
                    </span>}
                />
                <h2 className='text-center seller'> SELLER SIGN UP</h2>
                <form className='col-lg-6 col-md-8' onSubmit={this.handleFormSubmit}>
                    <PhotoUpload
                        image={image}
                        image_url={img_url}
                        imgLoad={this.handleImgLoad}
                        className='photo'
                    />
                    <span className='dti-image-span text-center'> 
                        {
                            permits.length <= 2 &&
                            <h5 className='dti-image-font '> 
                                Upload the image of your valid 
                                { permits.length === 0 && ' DTI Permit' }  
                                { permits.length === 1 && ' Sanitary Permit' }  
                                { permits.length === 2 && ' Business Permit' }  
                                { permits.length > 2 && ' Business Permit' }  
                            </h5> 
                        }
                    </span>
                    <div className='d-flex justify-content-center mt-5 dti-image-permits '>
                        {
                            permits && permits.length > 0 ?  
                                permits.map((e, i) => (
                                    <div className='permit-div' key={i}>
                                        <img 
                                            src={e}
                                            className='img-permit' 
                                            alt='permits' 
                                            onClick={()=>this.setImgUrl(e, i)}
                                        />
                                        <span className='label-permit'>
                                            {i === 0 && <h5> DTI </h5>}
                                            {i === 1 && <h5> Sanitary </h5>}
                                            {i === 2 && <h5> Business </h5>}
                                        </span>
                                    </div>
                                )) 
                            :
                                ''
                        }
                    </div>
                    <div className='form-group mt-3'>
                        <label>Phone # *</label>
                        <input 
                            type='number' 
                            name='phone'
                            onChange={this.handleInputChange}
                            className='form-control col-lg-6 col-md-6' 
                            placeholder='Enter Phone #'
                            value={phone}/>
                        <small 
                            id='emailHelp' 
                            className='form-text text-muted'>
                            For buyer's purpose
                        </small>
                    </div>
                    <div className='form-group'>
                        <label>Shop Name  *</label>
                        <input 
                            type='text' 
                            name='shopName'
                            onChange={this.handleInputChange}
                            className='form-control' 
                            placeholder='Enter Shop'
                            value={shopName}/>
                    </div>
                    <div className='form-group mb-3 mt-3'>
                        <label>Shop Address  *</label>
                        <input 
                            type='text' 
                            name='shopAddress'
                            onChange={this.handleInputChange}
                            className='form-control' 
                            placeholder='Enter Address'
                            value={shopAddress}
                        />
                        {/* <div id='myDropdown' className='dropdown-content'>
                            <input 
                                type='text' 
                                name='shopAddress'
                                onChange={this.handleInputChange}
                                className='form-control' 
                                placeholder='Enter Address'
                                value={shopAddress}
                            />
                            {
                                shopAddress ?
                                    philPlaces && philPlaces.predictions &&
                                    philPlaces.predictions.length > 0 &&
                                    philPlaces.predictions.map(item => (
                                        <div className='linkTo' 
                                            key={item.id} 
                                            onClick={()=>this.setPlace(item.description)}
                                        >
                                            { item.description }
                                        </div>
                                    ))
                                :
                                ''
                            }
                        </div> */}
                    </div>
                    {/* <div className='form-group'>
                        <label>Shop Address  *</label>
                        <input 
                            type='text' 
                            name='shopAddress'
                            onChange={this.handleInputChange}
                            className='form-control' 
                            placeholder='Enter Address'
                            value={shopAddress}
                        />
                    </div> */}
                    <div className='form-group'>
                        <label>Email address *</label>
                        <input 
                            type='email' 
                            name='email'
                            onChange={this.handleInputChange}
                            className='form-control' 
                            placeholder='Enter Email'
                            value={email}
                            disabled
                            required/>
                    </div>
                    <div className='form-group'>
                        <label>Password *</label>
                        <input 
                            type='password' 
                            name='password'
                            onChange={this.handleInputChange}
                            className='form-control' 
                            placeholder='Enter Password'
                            value={password}
                            required/>
                    </div>
                    <h5 className='text-center'>{message}</h5>
                    <ButtonSpinner 
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

    setPlace = shopAddress => {
        this.setState({
            shopAddress
        }, ()=> {
            this.props.dispatch(CLEAR_GOOGLE_PLACE_ACTION())
        })
    }

    renderRegistrationForm = () => {
        // return this.formStepThree()
        
        const { stepIndex } = this.state
        if (stepIndex === 0) {
            return this.formStepOne()
        } else if (stepIndex === 1) {
            return this.formStepTwo()
        } else if(stepIndex === 2) {
            return this.formStepThree()
        }
        return null
    }

    render() {
        const { stepIndex } = this.state
        
        return(
            <div className='container sellerReg'>
                <Steppers stepIndex={stepIndex} handleStepIndex={this.handleStepInc}/>
                { this.renderRegistrationForm() }
            </div>
        )
    }
}

const enhance = compose(
    connect(sellerSelector)
)


export default enhance(Registration)