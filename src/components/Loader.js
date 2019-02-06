import React from 'react'
import '../css/Loader.css'

const Loader = () => {
    return (
        <div className='loader'>
            <i className="fa fa-circle-o-notch fa-spin loadingSpinner"></i> Loading ...
        </div>
    )
}

export default Loader