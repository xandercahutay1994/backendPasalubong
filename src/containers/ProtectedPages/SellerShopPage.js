import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { productSelector } from '../../redux/selectors' 
import '../../css/Seller.css'
import '../../css/Product.css'
import { GET_CURRENT_ROUTE_ACTION } from '../../redux/actions/route'
import { GET_PRODUCTS_ACTION, LISTS_OF_SELLERS_ACTION, SEARCH_PRODUCT_NAME_ACTION } from '../../redux/actions/product'
import Loader from '../../components/Loader'
import ImageLoader from '../../components/ImageLoader'
import { productImgURL } from '../../redux/api/api'
import { NavLink as Link } from 'react-router-dom'
import { Card } from 'react-md'
import Button from '@material-ui/core/Button/Button';
class SellerShopPage extends React.PureComponent {

  state = {
    advance_search: ''
  }

  componentDidMount() {
    const { dispatch, location, match } = this.props
    dispatch(GET_PRODUCTS_ACTION(match.params.id))
    dispatch(GET_CURRENT_ROUTE_ACTION(location.pathname))
    dispatch(LISTS_OF_SELLERS_ACTION())
    localStorage.setItem('route', location.pathname)
    localStorage.setItem('sellerPageId', match.params.id)
  }

  sellersProductLists = () => {
    const { isFetching, products } = this.props
    return isFetching  ?
      <Loader />
      :
      this.renderDetails(products)
  }

  renderDetails = lists => {
    const { user_type, login_id } = this.props
    
    return lists && 
      lists.map((product, i) => (
        <Card className="card cardLists" key={i}>
          <Link 
            to={ login_id ? user_type === 'buyer' ?
                `/product-details/${product.product_id}`
                :
                `/seller/${product.product_id}`
              :
                `/product-details/${product.product_id}`
            }
            // onClick={()=> user_type === 'seller' && onShowFullDialog(product.product_id)}
          > 
            <div className="card-body">
                <ImageLoader
                    src={`${productImgURL}${product.image}`}
                    className={'card-img-top'}
                    width={200}
                    height={120}
                    alt={product.title}
                />
                <div className='mt-1'>
                  <span className='mt-3 prodName'> {product.name} </span>
                </div>
                <div className='footer'>
                  <span className='text-primary priceList category'> {product.category} | ₱ {product.price } </span>
                </div>
            </div>
          </Link>
        </Card>
      ))
  }

  handleOnChange = e => {
    const { name, value } = e.target
    const { history: { location } } = this.props
    const splitHis = location.pathname.split('/')
    // const { user : { login_id }} = JSON.parse(localStorage.getItem('state'))
    this.setState({
      [name]: value
    }, ()=> {
      this.props.dispatch(SEARCH_PRODUCT_NAME_ACTION({ seller_id: splitHis[2], advance_search:value }))   
    })
  }

  handleBack  = () => {
    this.props.history.goBack()
  }

  render() {
    const { listSellers, match } = this.props
    const filterSeller = listSellers && listSellers.find(e => e.seller_id === JSON.parse(match.params.id))

    return (
      <div className='sellerPage'>
        <div className='shopName-section'>
          <h3 className='text-center shopName'> { filterSeller ? filterSeller.shopName : '' } </h3>
        </div>
        <Button
          raised='true'
          color='secondary'
          variant='outlined'
          onClick={this.handleBack}
          style={{ marginTop: '-2rem'}}
        >
          Go Back
        </Button>
        <Link
          to={`/sellerMap/${match.params.id}`}
          className='nav-link'
          style={{ marginTop: '-1rem', marginLeft: '-4.3rem'}}
        >
          <span className='view-map' style={{background: 'green'}}> View Map </span>
        </Link>
        <input  
            name="advance_search" 
            value={this.state.advance_search}
            onChange={this.handleOnChange}
            className='col-lg-12 form-control mt-3 sellerPageSearch'
            placeholder='Search Item here...'
            autoFocus
        />
        {
          this.props.products.length > 0 ?
            <div className='products'>
              { this.sellersProductLists() }
            </div>
          :
            <h4 className='mt-5 text-center text-danger'> No Products Found </h4>
        }
      </div>
    )
  }
}

const enhance = compose (
  connect(productSelector)
)

export default enhance(SellerShopPage)