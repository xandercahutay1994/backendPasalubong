import React from 'react'
import '../../css/Header.css'
import Links from '../Links/Links'
import { NavLink as Link } from 'react-router-dom'

const Header = props => {
  return (
    // <nav id='navbar' className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
    <nav id='navbar' className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
      <Link to='/' className='nav-link text-danger'><h2><b>iPasalubongPH</b></h2></Link>
      <button 
        className='navbar-toggler ml-auto' 
        type='button' 
        data-toggle='collapse' 
        data-target='#navbarSupportedContent' 
        aria-controls='navbarSupportedContent' 
        aria-expanded='false' 
        aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav ml-auto'>
          <Links {...props}/>
          {
            !props.login_id &&
            <li className='nav-item'>
                <button className='nav-link' 
                    onClick={props.loginHasClick} 
                    style={{ border:'none',background:'none' }}
                >LOGIN 
                </button>
            </li>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Header