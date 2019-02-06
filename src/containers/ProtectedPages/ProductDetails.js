import React from 'react'
import { connect } from 'react-redux'
import Detail from '../../components/Detail'
import Loader from '../../components/Loader'
import { compose } from 'recompose'
import { productSelector } from '../../redux/selectors' 
import { GET_CURRENT_ROUTE_ACTION } from '../../redux/actions/route'
import { NavLink as Link } from 'react-router-dom'
import '../../css/ProductDetail.css'
import { 
    GET_PRODUCT_DETAILS_ACTION,
    CLEAR_PRODUCT_ACTION,
    CLEAR_CART_QUANTITY_ACTION,
    GET_ALL_COMMENTS_BY_PRODUCT_ACTION,
    GIVE_FEEDBACK_RATE_ACTION,
    CHECK_IF_BUYER_ORDERED_ACTION,
    CLEAR_PRODUCT_DETAILS_ACTION
} from '../../redux/actions/product'
import { 
    SHOW_LOGIN_DIALOG_ACTION,
} from '../../redux/actions/user'
import { 
    ADD_TO_CART_ACTION
} from '../../redux/actions/cart'
import {
    Badge,
    Paper
}from '@material-ui/core'
import {
    Card,
    Button
} from 'react-md'

class ProductDetails extends React.PureComponent {

    state = {
        orderTotal: null,
        cartCounter: 1,
        feedback: '',
        isEdit: false
    }

    componentDidMount() {
        const { product_id, dispatch, location, login_id } = this.props
        const id = product_id ? product_id : this.props.match.params.id
 
        dispatch(GET_PRODUCT_DETAILS_ACTION(id))
        dispatch(GET_CURRENT_ROUTE_ACTION(location.pathname))
        dispatch(CLEAR_CART_QUANTITY_ACTION())
        dispatch(GET_ALL_COMMENTS_BY_PRODUCT_ACTION({ product_id: id }))
        dispatch(CHECK_IF_BUYER_ORDERED_ACTION({ buyer_id: login_id, product_id: id }))
        localStorage.setItem('route', location.pathname)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.resStatus === 200) {
            this.setState(()=> ({ 
                isSent: true 
            }), ()=> {
                setTimeout(()=> {
                    this.setState({
                        isProcessing: false,
                        isSent: false,
                        rate: '',
                        feedback: '',
                        isEdit: false
                    })
                }, 1500)
            })
        }
    }

    componentWillUnmount() {
        this.setState({ 
            isProcessing: false,
            isSent: false,
            rate: '',
            feedback: '',
            isEdit: false
        }, ()=> {
            this.props.dispatch(CLEAR_PRODUCT_DETAILS_ACTION())
        })
    }

    handleQuantityIncrement = () => {
        this.setState({ cartCounter: this.state.cartCounter + 1})
    }

    handleQuantityDecrement = () => {
        this.setState({ cartCounter: this.state.cartCounter - 1})
    }

    handleFormSubmit = e => {
        e.preventDefault()
        const { dispatch, product_id, login_id } = this.props
        const id = product_id ? product_id : this.props.match.params.id

        const data = { 
            buyer_id: login_id, 
            orderQuantity: this.state.cartCounter, 
            product_id : id 
        }

        if (!login_id) {
            dispatch(SHOW_LOGIN_DIALOG_ACTION())
            return
        }
        dispatch(ADD_TO_CART_ACTION(data))   
        return
    }

    renderProductDetails = () => {
        const { isFetching, productDetails } = this.props

        return (
            isFetching ?
                <Loader />
            :
                <Detail 
                    {...productDetails} 
                    onIncrement={this.handleQuantityIncrement}
                    onDecrement={this.handleQuantityDecrement}
                    handleFormSubmit={this.handleFormSubmit}
                    {...this.props}
                    cartCounter={this.state.cartCounter}
                    onBack={this.backToSellerPage}
                />
        )
    }

    backToSellerPage = () => {
        const { dispatch, history } = this.props
        localStorage.removeItem('route')
        this.setState({ 
            isProcessing: false,
            isSent: false,
            rate: '',
            feedback: '',
            isEdit: false
        }, ()=> {
            dispatch(CLEAR_PRODUCT_ACTION())  
            dispatch(CLEAR_PRODUCT_DETAILS_ACTION())
            history.push('/')
        })  
    }

    handleOnFeedbackChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmitFeedback = () => {
        const { rate, feedback } = this.state
        const { user : { login_id } } = JSON.parse(localStorage.getItem('state'))
        const { comments, productDetails, dispatch } = this.props
        const hasCommented = comments.find(e => e.buyer_id === login_id)

        if (!hasCommented) {
            const postData = {
              buyer_id: login_id,
              product_id: productDetails.product_id,
              feedback,
              rate
            }
            this.setState({
                isProcessing: true
            }, ()=> {
                dispatch(GIVE_FEEDBACK_RATE_ACTION(postData))
            })
        } else {
            const postData = {
                feedback_rating_id: hasCommented.feedback_rating_id,
                buyer_id: login_id,
                product_id: productDetails.product_id,
                feedback,
                rate    
            }
            this.setState({
                isProcessing: true
            }, ()=> {
                dispatch(GIVE_FEEDBACK_RATE_ACTION(postData))
            })
        }
        
    }

    handleRatings = rate => {
        this.setState({ rate })
    }

    handleEditComment = () => {
        this.setState({ isEdit: true })
    }

    postComments = () => {
        const { email } = this.props
        const { feedback, rate, isSent, isProcessing, isEdit } = this.state
        
        return (
            <div className='m-3 p-3 d-flex comments'>
                <span> { !isEdit && email } </span>
                <div className={`row commentsSection ${!isEdit ? 'mt-5' : ''}`}>
                    <span className='ml-3'> Ratings : </span>
                    <div className='col-lg-10'>
                    {
                        rate ?
                            Array.from({ length: rate + 1}, (e,i) => (
                                <span key={i} className={`fa fa-star checked`}></span>
                            ))
                        :
                            Array.from({ length: 5}, (e, i) => (
                                <button className='btnRate' onClick={()=>this.handleRatings(i)} key={i}>
                                    <span className={`fa fa-star`}></span>
                                </button>
                            ))
                    }
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-9'>
                        <textarea
                            name='feedback'
                            className='form-control'
                            placeholder='Enter your feedback here...'
                            value={feedback}
                            onChange={this.handleOnFeedbackChange}
                        >
                        </textarea>
                    </div>
                    <div className='col-lg-3'>
                        <Button
                            raised
                            variant='contained'
                            color='primary'
                            className='btn btn-primary'
                            disabled={isProcessing}
                            onClick={this.handleSubmitFeedback}
                        >
                            {
                                !isSent ?
                                    <i className='fa fa-send mr-1'> </i> 
                                :
                                    <i className='fa fa-check mr-1'> </i> 
                            }
                            { !isSent ? 'Submit' : 'Sent'}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    renderComments = () => {
        const { productDetails, comments, login_id, buyerHasOrdered } = this.props
        const { isEdit } = this.state
        const hasCommented = comments.find(e => e.buyer_id === login_id)

        return (
            <div className='container mb-3'>
                <h5> Reviews of { productDetails.name } </h5>
                {
                    comments && comments.length > 0 ?
                    comments.map(({ feedback, rate, firstname, lastname, buyer_id }, i) => (
                        <Paper key={i} className='m-3 p-3 d-flex comments'>
                            {
                                login_id === buyer_id &&
                                <div className='ml-auto' onClick={this.handleEditComment} style={{ cursor: 'pointer' }}>
                                    <i className='fa fa-edit'></i> Edit Comment
                                </div>
                            }
                            {
                                <React.Fragment>
                                    <div>
                                        <span> 
                                            {
                                                (isEdit && login_id === buyer_id) ?
                                                    ''
                                                :
                                                rate
                                            }
                                        </span>                                    
                                    </div>
                                    <div>
                                        by : 
                                        {
                                            login_id === buyer_id ?
                                            ' You'
                                            :
                                            ` ${firstname} ${lastname}`
                                        }
                                    </div>
                                    <span> 
                                        {
                                            (isEdit && login_id === buyer_id) ?
                                                ''
                                            :
                                                feedback
                                        }
                                    </span>
                                    <hr/>
                                </React.Fragment>
                            }
                            {
                                isEdit && 
                                login_id === buyer_id && this.postComments()
                            }
                        </Paper>
                    ))
                    :
                    <Paper className='m-3 p-3 d-flex comments'>
                        <span className='text-danger'> No comment posted yet on this product </span>
                    </Paper>
                }
                {
                    login_id && !hasCommented && buyerHasOrdered.length > 0 &&
                    <Paper className='m-3 p-3 d-flex comments'>
                        { this.postComments() }
                    </Paper>
                }
             </div>
        )
    }

    render() {
        const totalOrder = localStorage.getItem('cartOrderTotal')
        const badgeColor = typeof totalOrder === 'object' ? 'default' : 'secondary'

        return (
            <div className='container productDetails'>
                { this.props.login_id &&
                    <Card className='mt-5 d-flex justify-content-center'> 
                        <h5 className='text-primary'> Cart Total = </h5>
                        <Link to='/cart' >
                            <Badge color={badgeColor} badgeContent={totalOrder === 'null' ? 0 : (totalOrder || '')} >
                                <i className="fa fa-shopping-bag ml-3" style={{fontSize:'25px'}}>
                                </i> 
                            </Badge>
                        </Link>
                    </Card>
                }
                { this.renderProductDetails() }
                <hr/>
                { this.renderComments() }
            </div>
        )
    }
}

const enhance = compose (
    connect(productSelector)
)

export default enhance(ProductDetails)