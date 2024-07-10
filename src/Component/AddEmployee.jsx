import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Service from '../Service/Service';
import './CSS/Global.css'

const AddEmployee = () => {
  
        const [employee, setEmployee] = useState({
                first_name :"",
                middle_name : "",
                last_name:"",
                address:"",
                department:"",
                country : "",
                state : "",
                city : "",
                pincode : "",
                email : "",
                contact : "",
                designation : "",
                signature:""
        });

        const navigate = useNavigate();
        const MySwal = withReactContent(Swal);

        const handleChange = (e) => {
                const value = e.target.value;
                setEmployee({ ...employee, [e.target.name]: value});
        };

        const EmployeeRegister = (e) => {
                e.preventDefault();
                console.log(employee);

                Service.addEmployee(employee)
                  .then((res)=>{
                        MySwal.fire({
                              title : 'Success',
                              text : 'Employee Saved Successfully',
                              icon : 'Success',
                              confirmButtonText : 'OK'
                        }).then(() => {
                              navigate("/employee");
                        })
                }).catch((error)=>{
                        console.log(error);
                        MySwal.fire({
                              title : 'Error',
                              text : 'Failed to save Employee. Please check data',
                              confirmButtonText: 'OK'
                        })
                })
        }

        const onclose = (e) => {
            e.preventDefault()
            navigate('/employee')
        }

  return (
    <>
        <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card'>
            <div className='card-header fs-3 text-center'>
              <h2>Add Employee</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={(e) => EmployeeRegister(e)}>
                <div className='mb-3'>
                <label>First Name: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="first_name" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.first_name}
                        required
                  />
                  <label>Middle Name:</label>
                  <input 
                        type="text" 
                        name="middle_name" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.middle_name}
                  />
                  <label>Last Name: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="last_name" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.last_name}
                  />
                  <label>Address: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="address" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.address}
                  />
                  <label>Country: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="country" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.country}
                  />
                  <label>State: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="state" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.state}
                  />
                  <label>City: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="city" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.city}
                  />
                  <label>Pincode: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="pincode"
                        placeholder='123456'
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.pincode}
                  />
                  <label>Email: <span className='text-danger'>*</span></label>
                  <input 
                        type="email" 
                        name="email"
                        placeholder='abc@anymail.com'
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.email}
                  />
                  <label>Contact: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="contact"
                        placeholder='mobile number'
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.contact}
                  />
                  <label>Designation: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="designation" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.designation}
                  />
                  <label>Department: <span className='text-danger'>*</span></label>
                  <input 
                        type="text" 
                        name="department" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.department}
                  />
                  <label>Signature: <span className='text-danger'>*</span></label>
                  <input
                        type="file" 
                        placeholder='upload your signature'
                        name="signature"
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.signature}
                  />
                </div>
                  <div className='buttoms'>
                  <button className='btn btn-primary'>Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="button" value="Close" onClick={onclose} className='btn btn-primary'></input>
                  </div>
                
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEmployee