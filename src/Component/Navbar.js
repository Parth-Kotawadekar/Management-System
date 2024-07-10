import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './assets/versus.png'
import aqslogo from './assets/aqslogo.jpg'
import './CSS/Global.css'

const Navbar = () => {
  return (
    <>
      <div>
      <nav className="sidebar">
      <img class='logo' src={Logo} alt="Logo" />
        <div className="sidebar-header">
        
          <Link to="/dashboard" className="sidebar-brand">
            Lab Certificate Management System
          </Link>
        </div>
        <ul className="list-unstyled components">
          <li>
            <Link to='/menu' className="nav-link">
              MENU
            </Link>
          </li>
          <li>
            <Link to='#' className="nav-link">
              Dropdown
                <option value="">Hello</option>
            </Link>
          </li>
          <li>
            <Link to='/dashboard' className="nav-link">
              DASHBOARD
            </Link>
          </li>
          <li>
            <Link to='/login' className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </nav>
      <div className='aqs_logo'>
        <img src={aqslogo} alt="image" />
      </div>
      </div>
    </>
  )
}

export default Navbar;
