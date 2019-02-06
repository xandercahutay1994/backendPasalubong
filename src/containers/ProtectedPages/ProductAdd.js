import React from 'react'
import '../../css/Product.css'
import ButtonSpinner from '../../components/ButtonSpinner'
import { 
    CREATE_PRODUCT_ACTION,
    CLEAR_PRODUCT_ACTION
} from '../../redux/actions/product'
import { connect } from 'react-redux'
import PhotoUpload from '../../components/PhotoUpload'
import { compose } from 'recompose'
import { productSelector } from '../../redux/selectors'
import swal from 'sweetalert'

class ProductAdd extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            product_name: '',
            img_url: '',
            image: '',
            quantity: '',
            product_price: '',
            product_category: '',
            product_description: '',
            issubmit: false,
        }
    }

    handleInputChange = e => {
        const { name, value } = e.target 
        this.setState({
            [name]: value
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.resStatus !== 200) {
            this.setState({
                issubmit: false,
                isBtnDisabled: false
            }, ()=> {
                setTimeout(()=>{
                    nextProps.dispatch(CLEAR_PRODUCT_ACTION())
                },2000)
            })
            return
        }

        this.setState({
            product_name: '',
            img_url: '',
            image: '',
            quantity: '',
            product_price: '',
            product_category: '',
            product_description: '',
            issubmit: false,
        }, () => {
            swal({
                title: "Confirmation!",
                text: `Product has been successfully added!`,
                icon: "success"
            })
            setTimeout(()=>{
                nextProps.dispatch(CLEAR_PRODUCT_ACTION())
            },2000)
        })
    }

    handleImgLoad = e => {
        const imageFile = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(imageFile)
        reader.onload = e => {
            this.setState({ 
                img_url: e.target.result
            })
        }
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.setState({ issubmit: true, isBtnDisabled: true })
        const { img_url, product_name, quantity, product_price, product_category, product_description } = this.state
        const { email } = this.props

        const postData = {
            email,
            product_name,
            product_price,
            quantity,
            img_url,
            product_category,
            product_description
        }
        this.props.dispatch(CREATE_PRODUCT_ACTION(postData))
    }
    
    render() {
        const { 
            img_url,
            image,
            product_name, 
            quantity,
            product_price, 
            product_category, 
            product_description ,
            issubmit,
        } = this.state
        const { message } = this.props
        return (
            <div>
                <div className='productAdd'>
                    <h4 className='text-center'> ADD PRODUCT </h4>
                    <form className='col-lg-6 mt-4' onSubmit={this.handleFormSubmit} encType='multipart/form-data'>
                        <PhotoUpload 
                            image={image}
                            image_url={img_url}
                            imgLoad={this.handleImgLoad}
                        />
                        <div className='form-group'>
                            <label>Product Name *</label>
                            <input 
                                type='text' 
                                name='product_name'
                                onChange={this.handleInputChange}
                                value={product_name}
                                className='form-control' 
                                placeholder='Enter Product Name'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Quantity *</label>
                            <input 
                                type='number' 
                                name='quantity'
                                onChange={this.handleInputChange}
                                value={quantity}
                                className='form-control col-lg-6' 
                                placeholder='Enter Quantity'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Price *</label>
                            <input 
                                type='number' 
                                name='product_price'
                                onChange={this.handleInputChange}
                                value={product_price}
                                className='form-control col-lg-6' 
                                placeholder='Enter Price'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Category *</label>
                            <select 
                                name='product_category'
                                onChange={this.handleInputChange}
                                value={product_category}
                                className='form-control col-lg-6'>
                                <option> Select </option>
                                <option> Delicacies </option>
                                <option> Souvenirs </option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Description *</label>
                            <textarea 
                                name='product_description'
                                onChange={this.handleInputChange}
                                value={product_description}
                                className='form-control'>
                            </textarea>
                        </div>
                        <ButtonSpinner
                            type='submit'
                            name={'ADD PRODUCT'}
                            raised='raised'
                            color='primary'
                            variant='contained'
                            fullWidth
                            isspinning={issubmit}
                            disabled={issubmit}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

const enhance = compose(
    connect(productSelector)
)

export default enhance(ProductAdd)
