import React from 'react';
import { Link } from 'react-router-dom';
import employee from './assets/employee.png'
import datasheet from './assets/datasheet.png'
import certificate from './assets/report.png'
import customer from './assets/customer.png'
import instrument from './assets/instrument.png'
import checkpoint from './assets/checkpoint.png'
import certbtn from './assets/certbtn.jpg'
import './CSS/Global.css'

const Menu = () => {
  return (
    <div className="main_container">
      <div className="container text-center">
        <h1 className="heading">Menu Buttons</h1>
        <div className="menu_buttons">
          <div className="container1">
            <Link 
              to="/employee" 
              className="btn"
              >
              <img src={employee} alt="Employee"/>
              Employee Details
            </Link>

            <Link 
              to="/customer" 
              className="btn">
              <img src={customer} alt="Customer" />
              Customer
            </Link>
          </div>

          <div className="container2">
            <Link 
              to="/gaugeMaster" 
              className="btn"
              >
              <img src={instrument} alt="Gauge" />
              Gauge Master
            </Link>

            <Link 
              to="/master1" 
              className="btn">
              Reporting Master
            </Link>

            <Link 
              to="/master2" 
              className="btn">
              <img src={checkpoint} alt="Checkpoint" />
              Checkpoint Master
            </Link>
          </div>


          <div className="container3">
          <Link 
              to="/certificateulrdetails" 
              className="btn">
              <img src={certbtn} alt="" />
              Certificate Master</Link>

            <Link 
              to="/datasheet" 
              className="btn">
              <img src={datasheet} alt="Datasheet" />
              DataSheet</Link>

            <Link 
              to="/certificate" 
              className="btn">
              <img src={certificate} alt="Certificate" />
              Certificate Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;