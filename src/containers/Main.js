import React from 'react'
import Header from '../components/Layouts/Header'
import Routes from '../components/Routes/Routes'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { userSelector } from '../redux/selectors'
import { createBrowserHistory } from 'history'
import { Login } from './index';
import '../css/Main.css'  
import {
  Switch,
  Router
} from 'react-router-dom'
import {
  SHOW_LOGIN_DIALOG_ACTION,
  CLEAR_USER_ACTION,
} from '../redux/actions/user'
import {
  CLEAR_CART_ACTION
} from '../redux/actions/cart'
import { GET_ALL_SELLERS_PRODUCT_ACTION } from '../redux/actions/product';
const history = createBrowserHistory()

class Index extends React.PureComponent {

  state = {
    logoutState: false
  }
  
  componentDidMount() {
    const user  = JSON.parse(localStorage.getItem('state'))
    if (user && user.login_id) {
      // history.push('/')
    }
  }

  handleVisibleLogin = () => {
    const { dispatch } = this.props
    dispatch(SHOW_LOGIN_DIALOG_ACTION())
  }

  handleLogout = data => {
    if (data) {
      this.setState({
        logoutState: true
      }, ()=> {
        localStorage.clear()
        this.props.dispatch(CLEAR_USER_ACTION())
        this.props.dispatch(CLEAR_CART_ACTION())
        setTimeout(()=> {
          this.props.dispatch(GET_ALL_SELLERS_PRODUCT_ACTION())
          history.push('/')
        }, 500)
      })
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const {  login_id, user_type } = nextProps
    const hasRouteInLocal = localStorage.getItem('route') 

    if (login_id || hasRouteInLocal) {
      if (user_type === 'seller') {
        history.push('/seller')
      } else if (user_type === 'buyer' && !hasRouteInLocal) {
        history.push('/')
      } else if (user_type === 'admin') {
        history.push('/admin')
      } else {
        history.push(hasRouteInLocal) 
      }
    } 
    return null
  }

  filterListsByCategory = e => {
    // const { name } = e.target


  }

  render() {
    const {
      login_id,
      isLoginModalVisible,
    } = this.props
    const renderLogin = isLoginModalVisible && <Login />

    return(
      <Router history={history}>
        <div className='container-fluid'>
          <Header 
            login_id={login_id}   
            loginHasClick={this.handleVisibleLogin} 
            isLogout={this.handleLogout}
            {...this.props}
          />
          { renderLogin }
          <Switch>
            <Routes login_id={login_id} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const enhance = compose(
  connect(userSelector)
)

export default enhance(Index)