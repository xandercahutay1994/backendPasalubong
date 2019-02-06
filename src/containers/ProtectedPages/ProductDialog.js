import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { productSelector } from '../../redux/selectors'
import { productImgURL } from '../../redux/api/api'
import { Card } from 'react-md'
import '../../css/ProductDetail.css'
import ImageLoader from '../../components/ImageLoader'
import { UPDATE_PRODUCT_ACTION, CLEAR_STATE_ACTION, GET_ALL_COMMENTS_BY_PRODUCT_ACTION } from '../../redux/actions/product'
// import swal from 'sweetalert'
import {
    Typography,
    Button,
    Snackbar,
    Paper
} from '@material-ui/core'

class ProductDialog extends React.PureComponent {
  constructor() {
    super()
    this.categoryRef = React.createRef()
    this.descriptionRef = React.createRef()
    this.quantityRef = React.createRef()
    this.priceRef = React.createRef()
    this.productNameRef = React.createRef()
    this.state = {
      openSnackbar: false,
      vertical: 'top',
      horizontal: 'center',
      isProcessing: false
    }
  }

  componentDidMount() {
    const product_id = JSON.parse(localStorage.getItem('product_id'))
    this.props.dispatch(GET_ALL_COMMENTS_BY_PRODUCT_ACTION({ product_id }))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.resStatus === 200) {  
      nextProps.afterEdit()
      this.setState({ isProcessing: false }, ()=>{
        setTimeout(()=>{
          // swal({
          //   title: "Confirmation!",
          //   text: `Product has been successfully updated!`,
          //   icon: "success"
          // })
          this.setState({ openSnackbar : false })
          nextProps.dispatch(CLEAR_STATE_ACTION())
        },2500)
      })
    }
  }

  handleUpdate = e => {
    e.preventDefault()
    const product_id = JSON.parse(localStorage.getItem('product_id'))
    const { user : { login_id } } = JSON.parse(localStorage.getItem('state'))

    const postData = {
      product_id,
      seller_id: login_id,
      category: this.categoryRef.current.value,
      description: this.descriptionRef.current.value,
      quantity: this.quantityRef.current.value,
      price: this.priceRef.current.value,
      name: this.productNameRef.current.value  
    }
    this.setState({ isProcessing: true, openSnackbar: true }, ()=>{
      this.props.dispatch(UPDATE_PRODUCT_ACTION(postData))
    })
  }

  renderComments = () => {
    const { email, comments, buyerHasOrdered } = this.props
    const product_id = JSON.parse(localStorage.getItem('product_id'))
    const filteredProducts = this.props.products.filter(product => product.product_id === product_id)
    const { rate } = this.state
    return (
        <div className='container mb-3 mt-5'>
            <h5> Reviews of { filteredProducts[0].name } </h5>
            {
                comments && comments.length > 0 ?
                comments.map(({ feedback, rate, firstname, lastname }, i) => (
                    <Paper key={i} className='m-3 p-3 d-flex comments'>
                        <div>
                            {
                              Array.from({length: rate}, (e, i) => (
                                <span key={i} className={`fa fa-star checked`}></span>
                              ))
                            }
                        </div>
                        <div>
                          by: {` ${firstname} ${lastname}`}
                        </div>
                        <span className='mt-3'> { feedback } </span>
                        <hr/>
                    </Paper>
                ))
                :
                <Paper className='m-3 p-3 d-flex comments'>
                    <span className='text-danger'> No comment posted yet on this product </span>
                </Paper>
            }
            {
                buyerHasOrdered.length > 0 &&
                <Paper className='m-3 p-3 mt-1 d-flex comments'>
                    <span> { email } </span>
                    <div className='row'>
                        <span className='ml-3'> Ratings : </span>
                        <div className='col-lg-10'>
                        {
                            Array.from({ length: 5}, (e, i) => {
                            return (
                                <button className='btnRate' onClick={()=>this.handleRatings(i)} key={i}>
                                    <span className={`fa fa-star ${ rate === i ? 'checked' : '' } `}></span>
                                </button>
                            )})
                        }
                        </div>
                    </div>
                </Paper>
              }
        </div>
    )
  }
  render() {
    const product_id = JSON.parse(localStorage.getItem('product_id'))
    const filteredProducts = this.props.products.filter(product => product.product_id === product_id)
    const {
      image, 
      name, 
      price, 
      orderCounter, 
      description, 
      // discount, 
      quantity, 
      category,
    } = filteredProducts[0]
    const {
      isEdit,
      onEdit,
      closeFullDialog,
      onChange,
      deactivateProduct
    } = this.props
    const {
      openSnackbar,
      vertical,
      horizontal,
      isProcessing
    } = this.state

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnackbar}
          onClose={()=>{}}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">
            {
              isProcessing ?
                <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: '15px', marginRight: '5px' }}></i>
              :
                <i className='fa fa-check text-success' style={{ fontSize: '20px', marginRight: '5px' }}></i>
            }
            { isProcessing ? 'Updating...' : 'Product has been successfully updated!'}
          </span>}
        />
        <div className='details text-center row'>
          <Card className='col-lg-5 card-details card_detail'>
              <ImageLoader 
                  src={`${productImgURL}${image}`}
                  width='500'
                  height='400'
                  alt={name}
                  className='card-img-top'
              />  
          </Card>
          <Card className='col-lg-7 col-md-9 card_detail'>
            <Card>
              {
                isEdit ?
                  <textarea 
                    name='productNameRef' 
                    className='span form-control' 
                    defaultValue={name} 
                    ref={this.productNameRef}
                    onChange={onChange}>
                  </textarea>
                :    
                <h4> {name} </h4>
              }
            </Card>
            <hr/>
            <Card>
                  {
                    isEdit ?
                      <input 
                        type='number' 
                        name='priceRef'
                        className='form-control col-lg-3' 
                        defaultValue={price}
                        ref={this.priceRef}
                        onChange={onChange}
                      />
                    :    
                    <Typography className='text-primary' variant='h5'> 
                      ₱ { price }
                    </Typography>
                  } 
                <div className='product_detail'>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Description</label>
                        <div className='col-lg-8 col-md-9'>    
                          {
                            isEdit ?
                              <textarea 
                                name='descriptionRef' 
                                className='span form-control' 
                                defaultValue={description} 
                                ref={this.descriptionRef}
                                onChange={onChange}>
                              </textarea>
                            :    
                            <span className='span'> {description} </span>
                          }
                        </div>
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Category</label>
                        <div className='col-lg-8 col-md-9'>
                          {
                            isEdit ?
                              <select name='categoryRef' defaultValue={category} ref={this.categoryRef} className='form-control'>
                                <option> Souvenirs </option>
                                <option> Delicacies </option>
                              </select>
                            :
                            <span className='span'> { category }</span>
                          }
                        </div>  
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Quantity Left</label>
                        <div className='col-lg-8 col-md-9'>
                          {
                            isEdit ?
                              <input 
                                type='number' 
                                name='quantityState'
                                className='form-control col-lg-3' 
                                defaultValue={quantity}
                                ref={this.quantityRef}
                                onChange={onChange}
                              />
                            :
                            <span className='span'> { quantity }</span>
                          }
                        </div>  
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'># of Orders</label>
                        <div className='col-lg-8 col-md-9'>
                          <span className='span'> { orderCounter }</span>
                        </div>  
                    </div>
                    <div className='row mB mt-5'>
                      <div className='col-lg-3'> </div>
                      {
                        isEdit ?
                          <Button type='submit' raised='raised' className='mr-2' color='primary' variant='contained' onClick={this.handleUpdate}>
                            <i className='fa fa-check mr-2'></i> Update
                          </Button>
                        :
                          <Button raised='raised' className='mr-2' color='primary' variant='outlined' onClick={onEdit}>
                            <i className='fa fa-edit mr-2'></i> Edit
                          </Button>
                      }
                      <Button raised='raised' color='secondary' className='mr-2' variant='outlined' onClick={closeFullDialog}>
                        <i className='fa fa-close mr-2'></i> Close
                      </Button>
                      <Button raised='raised' color='secondary' className='mr-2' variant='contained' onClick={deactivateProduct}>
                        <i className='fa fa-disabled mr-2'></i> Deactivate
                      </Button>
                    </div>
                </div>
            </Card>
          </Card>
        </div>
        { this.renderComments() }
      </div>
    )
  }
}


const enhance = compose (
  connect(productSelector)
)

export default enhance(ProductDialog)
