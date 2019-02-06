import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
// import 'react-md/src/scss/_react-md.scss'
// import 'react-md/dist/react-md.deep_purple-deep_orange.min.css'
// import 'react-md/dist/react-md.indigo-pink.min.css'
// import 'react-md/dist/react-md.js'
// import 'react-md/dist/react-md.min.js'
import 'bootstrap/dist/js/bootstrap.js'
import 'material-design-icons/iconfont/material-icons.css'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
