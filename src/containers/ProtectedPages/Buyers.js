import React, { Fragment } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import CardLists from '../../components/CardLists'
import Deli from '../../components/Deli'
import { Button } from '@material-ui/core'
import Cart from '../../components/Cart'
import { Carousel } from 'react-responsive-carousel'
import { NavLink as Link } from 'react-router-dom'
import '../../css/Buyer.css'
import {
  productSelector
} from '../../redux/selectors'
import {
  GET_ALL_SELLERS_PRODUCT_ACTION, 
  FILTER_BY_PLACES_ACTION, 
  CLEAR_PRODUCTS_IF_LOGOUT_ACTION, 
  LISTS_OF_SELLERS_ACTION,
  GET_DELICACIES_BEST_ACTION, 
  GET_SOUVENIRS_BEST_ACTION,
  CLEAR_MATCH_SEARCH_ACTION
} from '../../redux/actions/product'
import { createBrowserHistory } from 'history'
import { GET_BUYERS_NOTICATION_ACTION } from '../../redux/actions/seller'
const history = createBrowserHistory()

class Buyers extends React.PureComponent {
  state = {
    sellersProducts: [],
    advance_search: '',
    type: '',
    searchType: '',
    showCategories: false,
    displayMenu: false
  }

  componentDidMount() {
    const { dispatch, login_id } = this.props
    localStorage.removeItem('route')
    localStorage.removeItem('sellerPageId')
    dispatch(CLEAR_PRODUCTS_IF_LOGOUT_ACTION())
    dispatch(GET_ALL_SELLERS_PRODUCT_ACTION())
    dispatch(LISTS_OF_SELLERS_ACTION())
    dispatch(GET_DELICACIES_BEST_ACTION())
    dispatch(GET_SOUVENIRS_BEST_ACTION())
    // dispatch(GET_BUYERS_NOTICATION_ACTION({ buyer_id: login_id }))
  }

  componentWillReceiveProps(nextProps) {
    this.sellersProductLists()
    if (nextProps.products.length > 0) {
      this.props.dispatch(CLEAR_PRODUCTS_IF_LOGOUT_ACTION())
      return
    }
  }

  componentWillUnmount() {
    this.setState({
      sellersProducts: [],
      advance_search: '',
      type: '',
      searchType: '',
      showCategories: false
    }, ()=> {
      this.props.dispatch(CLEAR_MATCH_SEARCH_ACTION())  
    })
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
      searchType: name
      // sellersProducts: this.props.sellersProduct.filter(e => (e.category.toLowerCase() === name))
    }, ()=> {
      this.props.dispatch(FILTER_BY_PLACES_ACTION({ searchType: name }))
    })
  }

  filterListsByPlaceOrAddress = e => {
    const { name } = e.target
    this.setState({ searchType: name }, ()=> {
      this.props.dispatch(FILTER_BY_PLACES_ACTION({ searchType: name }))
    })
  }

  handleClearSearchType = () => {
    this.setState({ searchType: '' })
  }

  renderListsOfSellers = () => {
    const { sellers } = this.props

    return (
      <div className='d-flex justify-content-center renderListsOfSellers'>
        { 
          sellers && sellers.map(({ shopName, seller_id }, i) => (
            <Link key={seller_id} to={`/sellerPage/${seller_id}`} className='nav-link'>
              <span className='mr-2 text-center sellerRow' key={i}>  
                {shopName}
              </span> 
            </Link>
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
          <p className='legend'> Delicious Products </p>
        </div>
        <div className='welcome_area'>
          <img alt='' src='../img/bg-4.jpg' />
          <p className='legend'>Order Now</p>
        </div>
      </Carousel>
    )
  }

  delicaciesBest = () => {
    const { isFetching, delicacies } = this.props

    return isFetching  ?
      <Loader />
      :
      <Deli
        productLists={delicacies}
        {...this.props}
      />
  }

  souvenirBest = () => {
    const { isFetching, souvenirs } = this.props

    return isFetching  ?
      <Loader />
      :
      <Deli
        productLists={souvenirs}
        {...this.props}
      />
  }

  handleClearField = () => {
    this.props.dispatch(CLEAR_MATCH_SEARCH_ACTION())  
  }

  stopPropagate = e => {
    e.stopPropagation()
  }

  shopCategories = e => {
    // e.stopPropagation()
    this.setState({ showCategories: true, displayMenu: true })
    // const open = document.getElementsByClassName('.category-items')

  }

  handleShowMenu = e => {
    this.setState({ displayMenu: true })
  }

  handleHideMenu = e => {
    this.setState({ displayMenu: false, searchType: '' }, ()=> {
      this.props.dispatch(CLEAR_MATCH_SEARCH_ACTION())
    })
  }

  render() {
    const {
      user_type,
      matchSearch
    } = this.props
    const { searchType, showCategories, displayMenu } = this.state
    const totalOrder = localStorage.getItem('cartOrderTotal')
    
    return(
      <div className='container-fluid productDetailsContainer'>
        <div className='row container-fluid'>
          <div className='homeForm col-lg-12 searchBar fixed-top'>
            <div className='try mt-1' style={{ background: `${displayMenu ? 'white': ''}`  }}>
              <Button
                className='nav-link dropdown-toggle mt-2'
                color='primary' 
                variant='outlined'
                style={{ border:'none',background:'none' }}
                id='dropdownMenuLink' 
                aria-haspopup='true' 
                aria-expanded='false'
                onClick={
                  displayMenu ? this.handleHideMenu : this.handleShowMenu
                }
              >Filter By </Button>
              {
                displayMenu &&
                <div className='dropdown menu' aria-labelledby='dropdownMenuLinkTwo'>
                  <button name='shop' className='dropdown-item' onClick={this.filterListsByPlaceOrAddress}> 
                    Shop
                  </button>
                  <button name='category' className='dropdown-item dropdown-toggle' 
                    onClick={
                      showCategories ? ()=>this.setState({ showCategories: false}) 
                      : this.shopCategories
                    }
                  > 
                    Category
                  </button> 
                  {
                    showCategories &&
                    <div className='category-items'>
                      <button name='souvenirs' className='dropdown-item category-itemsOne' onClick={this.filterListsByCategory}> 
                        Souvenirs
                      </button>
                      <button name='delicacies' className='dropdown-item category-items2' onClick={this.filterListsByCategory}> 
                        Delicacies
                      </button>
                    </div>
                  }
                  <button name='place' className='dropdown-item' onClick={this.filterListsByPlaceOrAddress}> 
                    Place
                  </button>
                </div>
              }
            </div>
            <span 
              className='filter-selected mt-3 ml-4'
              style={{ background: `${searchType ? 'khaki': ''}`, marginRight: `${searchType ? '1.7rem': ''}`  }}
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
            {
              (user_type !== 'admin' || user_type !== 'seller') &&
              <Fragment>
                <div className='col-lg-6'>
                  <div className='dropdown dropdown-search mb-3 mt-3'>
                    <div id='myDropdown' className='dropdown-content'>
                      <input  
                        name='advance_search' 
                        value={this.state.advance_search}
                        onChange={this.handleOnChange}
                        className='col-lg-12 col-md-6 form-control'
                        placeholder='Search souvenirs or delicacies here...'
                        onBlur={this.handleClearField}
                        autoFocus
                      />
                      {
                        // this.state.advance_search ? 
                          (matchSearch || this.state.advance_search) &&
                          matchSearch.length > 0 ?
                            matchSearch.map((e, i) => (
                              (searchType === 'shop' || searchType === 'place') ?
                                  <Link to={`sellerPage/${e.seller_id}`} className='linkTo' key={i} shopname={e.shopName}>
                                    { searchType === 'shop' ? e.shopName : e.shopAddress }
                                  </Link>
                              :
                                  <Link to={`product-details/${e.product_id}`} className='linkTo' key={i}>
                                    { e.name }
                                  </Link>
                            ))
                          :
                            this.state.advance_search ?
                            <h5 className='text-danger p-2'> No Result Found </h5>
                            :
                            ''                            
                      }
                    </div>
                  </div>
                </div>
                <div className='mt-3 carts'>
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
          <h5 className='text-center shops-section'><b> Shops </b> </h5>
          { this.renderListsOfSellers() }
        </div>
        <h5 className='ml-3 products-section text-center'><b> Our Products </b> </h5>
        <div className='products'>
          { this.sellersProductLists() }
        </div>
        <h5 className='ml-3 products-section text-center'><b> Featured Delicacies </b> </h5>
        <div className='delicacies products'>
          { this.delicaciesBest() }
        </div>
        <h5 className='ml-3 products-section text-center'><b> Featured Souvenirs </b> </h5>
        <div className='souvenir products'>
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