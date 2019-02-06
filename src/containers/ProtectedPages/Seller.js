import React from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import '../../css/Seller.css'
import { ListsTab } from '../../components/Layouts/index'
import { compose } from 'recompose'
import { userSelector } from '../../redux/selectors/index'
import { CLEAR_USER_ACTION } from '../../redux/actions/user'
import { CLEAR_SELLER_ACTION } from '../../redux/actions/seller'

class Seller extends React.PureComponent {

    componentWillUnmount() {
        this.props.dispatch(CLEAR_SELLER_ACTION())
        this.props.dispatch(CLEAR_USER_ACTION())
    }

    render() {
        const listsTab = [ 'ACTIVE PRODUCTS', 'INACTIVE PRODUCTS', 'ADD PRODUCT', 'ORDERS', 'PENDING DELIVERIES', 'INVENTORY REPORT/SUMMARY']
        return (
            <Router>
                <div className='container-fluid productDetailsContainer'>
                    <ListsTab listsTab={listsTab}/>
                </div>
            </Router>
        )
    }
}

const enhance = compose(
  connect(userSelector)
)

export default enhance(Seller)