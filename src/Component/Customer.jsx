import React, { useState } from 'react'
import Service from '../Service/Service';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './CSS/Global.css'

const Customer = () => {

  const [customer, setCustomer] = useState([]);

  useEffect(() => {
        init();
  },[]);

  const init = () => {
        Service
        .getAllCustomers()
        .then((res)=>{
                setCustomer(res.data);
                init();
        }).catch((error)=>{
                console.log(error);
        })
  }

  const deleteCustomer = (id) => {
        Service
        .deleteCustomer(id)
        .then((res)=>{
                console.log("Employee Deleted Successfully");
                setCustomer(res.data);
        }).catch((error)=>{
                console.log(error);
        })
  }

  return (
    <>
        <div className='container'>
                <div className='row'>
                        <div className='col-md-120'>
                                <div className='card md-12'>
                                <h1>
                                        <div className='card header fs-1 mt-5 text-center'>Customer Details</div></h1>
                                        <div className='card-body col-md-120'>
                                                <Link to="/addCustomer" className='btn mb-3 btn-primary'>Add New</Link>
                <div className='table-responsive'>
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Country</th>
                    <th scope="col">State</th>
                    <th scope="col">City</th>
                    <th scope="col">Owner Name</th>
                    <th scope="col">Owner Email</th>
                    <th scope="col">Contact No</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Pin Code</th>
                    <th scope="col">&nbsp;&nbsp;&nbsp;Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                        customer.map((customer, num) => (
                    <tr>                  
                      <td>{num+1}</td>
                      <td>{customer.customer_name}</td>
                      <td>{customer.adderss}</td>
                      <td>{customer.Country}</td>
                      <td>{customer.state}</td>
                      <td>{customer.city}</td>
                      <td>{customer.owner_name}</td>
                      <td>{customer.owner_email}</td>
                      <td>{customer.contact_no}</td>
                      <td>{customer.phone_no}</td>
                      <td>{customer.pincode}</td>
                      <td className="d-flex align-items-center">
                        <Link to={'/updateCustomer/' + customer.id} className='btn btn-sm btn-primary'>Edit</Link>
                        <button onClick={() => deleteCustomer(customer.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>
    </>
  )
}

export default Customer