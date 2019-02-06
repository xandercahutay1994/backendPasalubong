import React, { Fragment } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import CardLists from '../../components/CardLists'
import { Button } from '@material-ui/core'
import Cart from '../../components/Cart'
import { Carousel } from "react-responsive-carousel"
import '../../css/Buyer.css'
import {
  productSelector
} from '../../redux/selectors'
import {
  GET_ALL_SELLERS_PRODUCT_ACTION, FILTER_BY_PLACES_ACTION, CLEAR_PRODUCTS_IF_LOGOUT_ACTION, LISTS_OF_SELLERS_ACTION
} from '../../redux/actions/product'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

class Buyers extends React.PureComponent {
  state ={
    sellersProducts: [],
    advance_search: '',
    type: '',
    searchType: ''
  }

  componentDidMount() {
    const { dispatch } = this.props
    localStorage.removeItem('route')
    dispatch(CLEAR_PRODUCTS_IF_LOGOUT_ACTION())
    dispatch(GET_ALL_SELLERS_PRODUCT_ACTION())
    dispatch(LISTS_OF_SELLERS_ACTION())
  }

  componentWillReceiveProps(nextProps) {
    this.sellersProductLists()
    if (nextProps.products.length > 0) {
      this.props.dispatch(CLEAR_PRODUCTS_IF_LOGOUT_ACTION())
      return
    }
  }
  
  sellersProductLists = () => {
    const { isFetching, sellersProduct } = this.props
    return isFetching  ?
      <Loader />
      :
      <CardLists
        sellersProduct={sellersProduct}
        {...this.props}
      />
  }

  handleOnChange = e => {
    const { searchType } = this.state
    const { name, value } = e.target

    this.setState({ 
      [name]: value,
    }, ()=> {
      if (searchType) {
        this.props.dispatch(FILTER_BY_PLACES_ACTION({ searchType,  advance_search: value }))
      } else {
        this.props.dispatch(FILTER_BY_PLACES_ACTION({ searchType: 'product',  advance_search: value }))
      }
    })

  }

  filterListsByCategory = e => {
    const { name } = e.target
    this.setState({
      type: name,
      sellersProducts: this.props.sellersProduct.filter(e => (e.category.toLowerCase() === name))
    })
  }

  filterListsByPlaceOrAddress = e => {
    const { name } = e.target
    this.setState({ searchType: name })
  }

  handleClearSearchType = () => {
    this.setState({ searchType: '' })
  }

  renderListsOfSellers = () => {
    const { sellers } = this.props

    return (
      <div className='d-flex justify-content-center'>
        { 
          sellers && sellers.map(({ shopName }, i) => (
            <span className='mr-2 text-center sellerRow' key={i}>  
              {shopName}
            </span> 
        ))}
      </div>        
    )
  }

  renderFooter = () => {
    return (
      <React.Fragment>
        <div className='brands-area d-flex align-items-center justify-content-between mt-5'>
            <div className='single-brands-logo'>
              <img src={'../img/brand1.png'} alt='' />
            </div>
            <div className='single-brands-logo'>
              <img src={'../img/brand2.png'} alt='' />
            </div>
            <div className='single-brands-logo'>
              <img src={'../img/brand3.png'} alt='' />
            </div>
            <div className='single-brands-logo'>
              <img src={'../img/brand4.png'} alt='' />
            </div>
            <div className='single-brands-logo'>
              <img src={'../img/brand5.png'} alt='' />
            </div>
            <div className='single-brands-logo'>
              <img src={'../img/brand6.png'} alt='' />
            </div>
        </div>
        <footer>
          <div className='row mt-5' >
            <div className='col-md-12 text-center'>
              <p>
              All rights reserved | IpasalubongPH <i className='fa fa-heart-o' aria-hidden='true'></i> by <a href='facebook.com/rbbonje' target='_blank'> JS Community</a>
              </p>
            </div>
          </div>
        </footer> 
      </React.Fragment>
    )
  }

  renderCarousel = () => {
    return (
      <Carousel showThumbs={false} onChange={()=>{}} cancelable='true' onClickItem={()=>{}} onClickThumb={()=>{}} className='welcome_area'>
        <div className='welcome_area'>
          <img alt='' src='../img/background.png' className='welcome_area'/>
          <p className="legend"> Delicious Products </p>
        </div>
        <div className='welcome_area'>
          <img alt='' src='../img/bg-4.jpg' />
          <p className="legend">Order Now</p>
        </div>
      </Carousel>
    )
  }

  delicaciesBest = () => {
    return (
      <div>
        <h5> Delicacies Best Sellers </h5>
      </div>
    )
  }

  souvenirBest = () => {
    return (
      <div>
        <h5> Souvenir Best Sellers </h5>
      </div>
    )
  }

  render() {
    const {
      user_type
    } = this.props
    const { searchType } = this.state
    const totalOrder = localStorage.getItem('cartOrderTotal')

    return(
      <div className='container-fluid productDetailsContainer'>
        <div className='row container-fluid'>
          <div className='homeForm container searchBar'>
            <div className='dropdown show mt-3'>
                <Button
                  className='nav-link dropdown-toggle'
                  color='primary' 
                  variant='outlined'
                  style={{ border:'none',background:'none' }}
                  id='dropdownMenuLink' 
                  data-toggle='dropdown' 
                  aria-haspopup='true' 
                  aria-expanded='false'
                >
                Filter By
                </Button>
                <span 
                  style={{ fontSize: '13px', margin: '2px 2px', background: `${searchType ? 'khaki': ''}` }}
                  className='text-primary p-1'
                > 
                  {
                    searchType &&
                    <i 
                      className='fa fa-close text-danger mr-1' 
                      style={{ cursor: 'pointer' }}
                      onClick={this.handleClearSearchType}
                    > </i>
                  }
                  { 
                    searchType.toUpperCase() 
                  }
                </span>
                <div className='dropdown-menu' aria-labelledby='dropdownMenuLinkTwo'>
                  <button name='shop' className='dropdown-item' onClick={this.filterListsByPlaceOrAddress}> 
                    Shop
                  </button>
                  <button name='category' className='dropdown-item' onClick={this.filterListsByPlaceOrAddress}> 
                    Category
                  </button>
                  <button name='place' className='dropdown-item' onClick={this.filterListsByPlaceOrAddress}> 
                    Place
                  </button>
                  <button name='price' className='dropdown-item' onClick={this.filterListsByPlaceOrAddress}> 
                    Price
                  </button>
                </div>
            </div>
            {
              (user_type !== 'seller' && user_type !== 'admin') &&
              <Fragment>
                <div className='col-lg-6'>
                  <div className='mb-3 mt-3'>
                    <input  
                      name='advance_search' 
                      value={this.state.advance_search}
                      onChange={this.handleOnChange}
                      className='col-lg-12 col-md-6 form-control'
                      placeholder='Search souvenirs or delicacies here...'
                      autoFocus
                    />
                  </div>
                </div>
                <div className='mt-3'>
                  <Cart {...this.props} {...history} totalOrder={totalOrder}/>
                </div>
              </Fragment>
            }
          </div>
        </div>
        <div className='renderCarousel'>
          { this.renderCarousel() }
        </div>
        <div className='sellerLists'>
          <h5 className='text-center'> Shops </h5>
          { this.renderListsOfSellers() }
        </div>
        <h5 className='mt-5 ml-3'> All Products </h5>
        <div className='products'>
          { this.sellersProductLists() }
        </div>
        <div className='delicacies'>
          { this.delicaciesBest() }
        </div>
        <div className='souvenir'>
          { this.souvenirBest() }
        </div>
        { this.renderFooter() }
      </div>
    )
  }
}

const enhance = compose(
  connect(productSelector)
)

export default enhance(Buyers)