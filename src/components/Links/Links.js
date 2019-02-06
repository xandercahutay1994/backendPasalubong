import React from 'react'
import PublicLinks from './publicLinks'
import PrivateLinks from './privateLinks'

export default(props)=> {
    const renderLinks = () => (
        props.login_id ?
            <PrivateLinks {...props}/>
        :
            <PublicLinks {...props}/>
    )
    return renderLinks()
}
