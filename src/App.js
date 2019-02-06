import React from 'react'
import Main from './containers/Main'
import {Provider} from 'react-redux'
import store from './redux/store/store';

export default()=> (
    <Provider store={store}>
        <Main/>
    </Provider>
)


