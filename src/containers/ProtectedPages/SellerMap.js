import React from 'react'
import '../../css/Seller.css'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { productSelector } from '../../redux/selectors' 
import { GET_PRODUCT_DETAILS_ACTION, LISTS_OF_SELLERS_ACTION } from '../../redux/actions/product';
import { NavLink as Link } from 'react-router-dom'
import {
  Button
} from '@material-ui/core'
class SellerMap extends React.PureComponent {

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(GET_PRODUCT_DETAILS_ACTION(match.params.id))
    dispatch(LISTS_OF_SELLERS_ACTION())
    localStorage.setItem('route', this.props.location.pathname)
  }

  renderMap = () => {
    // const { productDetails } = this.props
    const { match, listSellers } = this.props
    const filterSeller = listSellers && listSellers.find(e => e.seller_id === JSON.parse(match.params.id))

    const splitAddress = filterSeller && filterSeller.shopAddress && filterSeller.shopAddress.split(' ').join('+') 

    return <iframe 
      title='map' width='700' height='500' frameBorder='0' 
      style={{border:0}} 
      className='seller-map-view'
      // src='https://www.google.com/maps/embed/v1/place?q=Jy+Square+Mall&key=AIzaSyB1RoJtM8ENjAe4u75CQa9FPug-GRIYrfc' 
      // src='https://www.google.com/maps/embed/v1/place?q=Space+Needle,Seattle+WA&key=AIzaSyB1RoJtM8ENjAe4u75CQa9FPug-GRIYrfc' 
      src={`https://www.google.com/maps/embed/v1/place?q=${splitAddress}&key=AIzaSyB1RoJtM8ENjAe4u75CQa9FPug-GRIYrfc`}
      allowFullScreen>
    </iframe>
  }


  render() {
    const { match, listSellers } = this.props
    const filterSeller = listSellers && listSellers.find(e => e.seller_id === JSON.parse(match.params.id))

    return (
      <React.Fragment>
        <Link to={`/sellerPage/${match.params.id}`} className='text-primary nav-link shopName-map text-center'> 
          <h3> { filterSeller ? filterSeller.shopName : '' }  </h3>
        </Link>
        <Button
          raised='raised'
          color='secondary'
          variant='outlined'
          onClick={()=>{
            this.props.history.goBack()
          }}
          style={{ display: 'flex', justifyContent: 'center'}}
        > Go Back </Button>
        <div className='sellerPageMap'>
          { this.renderMap() }
        </div>
      </React.Fragment>
    )
  }
}

const enhance = compose (
  connect(productSelector)
)

export default enhance(SellerMap)