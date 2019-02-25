import React from 'react'
import {
    AppBar,
    Tab,
    Tabs
} from '@material-ui/core'
import TabContainer from './TabContainer'
import {
    ProductLists,
    ProductAdd,
    Orders,
    Deliveries,
    Report,
    InactiveProducts,
    ReservationTab
} from '../../containers/ProtectedPages'
class ListsTab extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeIndex) {
            this.setState({ tabIndex: nextProps.activeIndex })
        }
    }


    tabs = () => {
        const { tabIndex } = this.state
        if (tabIndex === 0) {
            return <TabContainer><ProductLists /></TabContainer>
        } else if (tabIndex === 1) {
            return <TabContainer><InactiveProducts /></TabContainer>
        } else if (tabIndex === 2) {
            return <TabContainer><ProductAdd /></TabContainer>
        } else if (tabIndex === 3) {
            return <TabContainer><ReservationTab /></TabContainer>
        } else if (tabIndex === 4) {
            return <TabContainer> <Orders /></TabContainer>
        } else if (tabIndex === 5) {
            return <TabContainer> <Deliveries /></TabContainer>
        }
        return <TabContainer> <Report /> </TabContainer>
    }

    handleTabClick = index => {
        this.setState({ tabIndex: index})
    }

    render() {
        // const { handleTabChange, listsTab } = this.props
        const { listsTab } = this.props
        const { tabIndex } = this.state

        return(
            <div>
                <AppBar position="static" className='mt-3'>
                    {/* <Tabs value={tabIndex} onChange={this.handleTabChange}> */}
                    <Tabs value={tabIndex}>
                        {
                            listsTab.map((tab,index) => (
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

export default ListsTab