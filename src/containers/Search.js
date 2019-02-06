import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { userSelector } from '../redux/selectors'
import { 
  SEARCH_PRODUCT_NAME_ACTION
} from '../redux/actions/seller'

class Search extends React.PureComponent {

  state = {
    advance_search: ''
  }

  handleOnChange = e => {
    const {name, value} = e.target
    const { user : { login_id }} = JSON.parse(localStorage.getItem('state'))
    this.setState({
      [name]: value
    }, ()=> {
      this.props.dispatch(SEARCH_PRODUCT_NAME_ACTION({ seller_id: login_id, advance_search:value }))   
    })
  }

  render() {
    const {
      advance_search
    } = this.state
    const {
      placeholder
    } = this.props

    return(
      <div className='mb-3 mt-3'>
        {/* <div className='col-sm-3'>
          <button 
            className='nav-link dropdown-toggle btn btn-primary btn-sm' 
            id='dropdownMenuLink' 
            data-toggle='dropdown' 
            aria-haspopup='true' 
            aria-expanded='false'
          >Filter</button>
          <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
            <button className='dropdown-item'> 
              Delicacies
            </button>
            <button className='dropdown-item'> 
              Souvenir
            </button>
          </div>
      </div> */}
        {/* <form onSubmit={this.handleOnSubmit}> */}
          <input  
            name="advance_search" 
            value={advance_search}
            onChange={this.handleOnChange}
            className='col-lg-12 form-control'
            // placeholder='Search souvenirs or delicacies here...'
            placeholder={placeholder}
            autoFocus
          />
        {/* </form> */}
      </div>
    )
  }
}

const enhance = compose(
  connect(userSelector)
)

export default enhance(Search)