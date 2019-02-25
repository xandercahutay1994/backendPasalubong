import React from 'react'
import {connect} from 'react-redux'
import { compose } from 'recompose'
import { sellerSelector } from '../../redux/selectors/index'
import '../../css/Admin.css'
import MenuTabs from '../../components/Tabs/MenuTabs'
import FullDialog from '../../components/FullDialog'
import { CLOSE_UPDATE_ACCOUNT_ACTION, GET_ALL_SELLERS_WHO_PAID_ACTION } from '../../redux/actions/seller'
import PasalubongTable from '../../components/PasalubongTable'
import TableRow from '@material-ui/core/TableRow/TableRow'
import TableCell from '@material-ui/core/TableCell/TableCell'
import ImageLoader from '../../components/ImageLoader'
import { sellerDtiURL } from '../../redux/api/api'
import moment from 'moment'
class Admin extends React.PureComponent {

    componentDidMount() {
        const { login_id } = this.props
        const user = JSON.parse(localStorage.getItem('state'))
        const user_type = user ? user.user.user_type : ''
        // this.props.dispatch(GET_ALL_SELLERS_WHO_PAID_ACTION({ user_type, login_id }))
    }

    handleCloseFullDialog = () => {
        this.props.dispatch(CLOSE_UPDATE_ACCOUNT_ACTION())
    }

    renderDetails = () => {
        const { notifications } = this.props
        const tableCellDetails = ['Seller Image', 'Shop Name', 'Shop Address', 'Email', 'Phone', 'Date Paid']
        const bodyCellDetails = (row, i) => ( <TableCell key={i}> { row } </TableCell> )
    
        return (
            <div className='mt-5'>
              <span className='d-flex mb-2'>
                <h5> Lists of Sellers that paid the subscriptions payment </h5>
                <h4 className='ml-2 text-primary'> 
                  {/* { filterLists && filterLists.length && `${filterLists[0].firstname} ${filterLists[0].lastname}` } */}
                </h4>
              </span>
              <PasalubongTable tableCell={tableCellDetails}>
                {
                  notifications && notifications.map((e, i) => (
                    <TableRow key={e.seller_id}>
                      <TableCell component='th' scope='row'> 
                        <ImageLoader 
                          src={`${sellerDtiURL}${e.image}`}
                          width='60'
                          height='60'
                          alt={e.title}
                        />
                      </TableCell>
                      { bodyCellDetails(e.shopName) }
                      { bodyCellDetails(e.shopAddress) }
                      { bodyCellDetails(e.email) }
                      { bodyCellDetails(e.phone) }
                      { bodyCellDetails(moment(e.paid_at).format('MM/DD/YYYY HH:mm A')) }
                    </TableRow>
                  ))
                }
              </PasalubongTable>
            </div>
          )
    }

    render() {
        const menuTabs = [ 'PAID / VERIFIED SELLERS', 'UNPAID SELLERS / SUBSCRIBERS']
        const {
            isUpdateAccount: openNotification
        } = this.props
        return(
        <React.Fragment>
            <div className='container-fluid productDetailsContainer'>
                <MenuTabs menuTabs={menuTabs}/>
            </div>
            <FullDialog
                openFullDialog={openNotification }
                closeFullDialog={this.handleCloseFullDialog}
            >
                { this.renderDetails() }
            </FullDialog>
        </React.Fragment>
        )
    }
}

const enhance = compose(
  connect(sellerSelector)
)

export default enhance(Admin)