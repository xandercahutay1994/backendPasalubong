import React from 'react'
import {connect} from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors/index'
import '../../css/Admin.css'
import MenuTabs from '../../components/Tabs/MenuTabs'


class Admin extends React.PureComponent {
  render() {
    const menuTabs = [ 'PAID / VERIFIED SELLERS', 'UNPAID SELLERS / SUBSCRIBERS']
    return(
      <React.Fragment>
        {/* <div className='breadcumb_area bg-img' >
            <div className='container h-100'>
                <div className='row h-100 align-items-center'>
                    <div className='col-12'>
                        <div className='page-title text-center'>
                            <h4>Admin Dashboard</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        <div className='container-fluid productDetailsContainer'>
            <MenuTabs menuTabs={menuTabs}/>
        </div>
      </React.Fragment>
    )
  }
}

const enhance = compose(
  connect(sellerSelector)
)

export default enhance(Admin)