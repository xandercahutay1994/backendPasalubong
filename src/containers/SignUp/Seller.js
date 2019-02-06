import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { userSelector } from '../../redux/selectors'
import '../../css/SignUp.css'
import Registration from './Registration';

class Seller extends React.PureComponent {

    componentWillReceiveProps(props){
        props.isRegistered && 
            this.setState({
                image: '',
                img_url: '',
                shopName: '',
                shopAddress: '',
                password: '',
                phone: '',
                issubmit: false
            }, ()=> {
                setTimeout(()=>{
                    props.clearState()
                },2000)
            })
    }

    render() {
        return <Registration />
    }
}

const enhance = compose(
  connect(userSelector)
)

export default enhance(Seller)