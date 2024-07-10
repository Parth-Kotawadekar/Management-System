import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../Service/Service';

const Customer = () => {
  
        const [customer, setCustomer] = useState({
            customer_name :"",
            adderss : "",
            Country:"",
            state:"",
            city:"",
            owner_name : "",
            owner_email : "",
            contact_no : "",
            phone_no : "",
            pincode : "",
            logo : "",
        });

        const navigate = useNavigate();

        const handleChange = (e) => {
                const value = e.target.value;
                setCustomer({ ...customer, [e.target.name]: value});
        };

        const RegisterCustomer = (e) => {
                e.preventDefault();
                console.log(customer);

                Service.addNewCustomer(customer)
                  .then((res)=>{
                        navigate("/customer");
                        setCustomer({
                              customer_name :"",
                              adderss : "",
                              Country:"",
                              state:"",
                              city:"",
                              owner_name : "",
                              owner_email : "",
                              contact_no : "",
                              phone_no : "",
                              pincode : "",
                              logo : "",
                        })
                }).catch((error)=>{
                        console.log(error);
                })
        }

  return (
    <>
        <div className='container mt-3'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <div className='card'>
            <div className='card-header fs-3 text-center'>
              <h2>Add New Customer</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={(e) => RegisterCustomer(e)}>
                <div className='mb-3'>
                <label>Customer Name:</label>
                  <input 
                        type="text" 
                        name="customer_name" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.customer_name}
                  />
                <label>Address:</label>
                  <input 
                        type="text" 
                        name="adderss" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.adderss}
                  />
                  <label>Country:</label>
                  <input 
                        type="text" 
                        name="Country" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.Country}
                  />
                  <label>State:</label>
                  <input 
                        type="text" 
                        name="state" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.state}
                  />
                  <label>City:</label>
                  <input 
                        type="text" 
                        name="city" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.city}
                  />
                  <label>Owner Name:</label>
                  <input 
                        type="text" 
                        name="owner_name" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.owner_name}
                  />
                  <label>Owner Email:</label>
                  <input 
                        type="text" 
                        name="owner_email" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.owner_email}
                  />
                  <label>Contact No.:</label>
                  <input 
                        type="text" 
                        name="contact_no" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.contact_no}
                  />
                  <label>Phone No:</label>
                  <input 
                        type="text" 
                        name="phone_no" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}   
                        value={customer.phone_no}
                  />
                  <label>Pincode:</label>
                  <input 
                        type="text" 
                        name="pincode" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.pincode}
                  />
                  <label>Company Logo:</label>
                  <input 
                        type="file" 
                        name="logo" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={customer.logo}
                  />
                </div>
                  <button className='btn btn-primary col-md-12 mt-3'>Submit</button>
                  <input type="button" value="Reset" className='btn btn-primary col-md-12 mt-3'></input>
                
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Customer