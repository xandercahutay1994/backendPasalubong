import React from 'react'
import ImageLoader from './ImageLoader'
import { productImgURL } from '../redux/api/api'
import { Card } from 'react-md'
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty'
import '../css/ProductDetail.css'
import ButtonSpinner from './ButtonSpinner'
import {
    Typography,
    Button
} from '@material-ui/core'

const Detail = ({
    image, 
    name, 
    price, 
    orderCounter, 
    description, 
    discount, 
    quantity, 
    category,
    onIncrement,
    onDecrement,
    orderQuantity,
    handleFormSubmit,
    cartCounter,
    onBack,
    shopAddress
}) => (
    <div className='details text-center row mb-5'>
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
                <h3> {name} </h3>
            </Card>
            <hr/>
            <Card>
                <Typography className='text-primary' variant='h5'> ₱ { price }</Typography>
                <div className='product_detail'>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Description</label>
                        <div className='col-lg-8 col-md-9'>    
                            <span className='span'> {description} </span>
                        </div>
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Category</label>
                        <div className='col-lg-8 col-md-9'>
                            <span className='span'> { category }</span>
                        </div>  
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Address</label>
                        <div className='col-lg-8 col-md-9'>
                            <span className='span'> { shopAddress }</span>
                        </div>  
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'>Quantity</label>
                        <div className='col-lg-8 col-md-9'>
                            <span className='span'> { quantity }</span>
                        </div>  
                    </div>
                    <div className='row mB'>
                        <label className='label control-label col-sm-3'># of Orders</label>
                        <div className='col-lg-8 col-md-9'>
                            <span className='span'> { orderCounter }</span>
                        </div>  
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className='row mB'>
                            <label className='label control-label col-sm-3'>Quantity</label>
                            <Button onClick={onDecrement}>
                                <i className="fa fa-minus span"></i>    
                            </Button>                            
                            <input

                            />
                            <span className='span quantity'> { cartCounter }</span>
                            <Button onClick={onIncrement}>
                                <i className="fa fa-plus"></i>    
                            </Button>                            
                        </div>
                        <div className='row mB mt-5'>
                            <label className='label control-label col-sm-2'></label>
                            <ButtonSpinner 
                                type='submit'
                                name={'ADD TO CART'} 
                                raised 
                                color='primary' 
                                variant='contained'
                            />
                            <Button 
                                raised='raised'
                                variant='outlined'
                                color='default' 
                                className='ml-3'
                                onClick={onBack}
                            >
                                <ThreeSixtyIcon/>Go Back
                            </Button>
                        </div>  
                    </form>
                </div>
            </Card>
        </Card>
    </div>
)

export default Detail