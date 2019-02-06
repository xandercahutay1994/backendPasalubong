import React from 'react'
import {
    AppBar,
    Tab,
    Tabs
} from '@material-ui/core'
import TabContainer from '../Layouts/TabContainer'
import UnverifiedSellers from '../../containers/ProtectedPages/UnverifiedSellers'
import AllSellers from '../../containers/ProtectedPages/AllSellers'

class MenuTabs extends React.PureComponent {
    state = {
        tabIndex: 0
    }

    tabs = () => {
        const { tabIndex } = this.state
        if (tabIndex === 0) {
            return <TabContainer><AllSellers/></TabContainer>
        } else if (tabIndex === 1) {
            return <TabContainer><UnverifiedSellers /></TabContainer>
        } 

        // return <TabContainer> <Deliveries /></TabContainer>
    }

    handleTabClick = index => {
        this.setState({ tabIndex: index})
    }

    render() {
        // const { handleTabChange, listsTab } = this.props
        const { menuTabs } = this.props
        const { tabIndex } = this.state

        return(
            <div>
                <AppBar position="static">
                    {/* <Tabs value={tabIndex} onChange={this.handleTabChange}> */}
                    <Tabs value={tabIndex}>
                        {
                            menuTabs.map((tab,index) => (
                                <Tab label={tab} key={index} onClick={()=>this.handleTabClick(index)}/>
                            ))
                        }
                    </Tabs>
                </AppBar>
                { this.tabs() }
            </div>
        )
    }
}

export default MenuTabs