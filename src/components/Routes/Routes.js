import React from 'react'
import PublicRoutes from './publicRoutes'
import PrivateRoutes from './privateRoutes'
import { Switch } from 'react-router-dom'

const Routes = ({ login_id }) => (
    <Switch>
        {
            login_id ?
                <PrivateRoutes />
            :
                <PublicRoutes />
        }
        {/* <PrivateRoutes /> */}
    </Switch>
)

export default Routes
