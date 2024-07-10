import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import Service from '../Service/Service';
import { useEffect } from 'react';
import './CSS/Global.css'

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
          id : "",
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
          department : "",
  });

  const {id} = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    Service
    .getEmployeeById(id)
    .then((res)=>{
      setEmployee(res.data);
    }).catch((error)=>{
      console.log(error);
    })
  }, [id])

  //handleChange is used to gett all cell data
  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee,[e.target.name]: value});
  };

  //When to add new entry in cell it is call in form tag
  const EmployeUpdate = (e) => {
    e.preventDefault();
    console.log(employee);

    Service.editEmployee(employee)
    .then((res)=>{
      navigate("/employee")
    }).catch((error) => {
      console.log(error);
    })
  }

  const onclose = (e) => {
    e.preventDefault()
    navigate('/employee')
}

  return (
    <>
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <div className='card'>
            <div className='card-header fs-3 text-center'>
              <h2>Edit Checkpoint</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={(e) => EmployeUpdate(e)}>
                <div className='mb-3'>
                  <label>First Name:</label>
                  <input 
                        type="text" 
                        name="first_name" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.first_name}
                  />
                  <label>Middle Name:</label>
                  <input 
                        type="text" 
                        name="middle_name" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.middle_name}
                  />
                  <label>Last Name:</label>
                  <input 
                        type="text" 
                        name="last_name" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.last_name}
                  />
                  <label>Address:</label>
                  <input 
                        type="text" 
                        name="address" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.address}
                  />
                  <label>Country:</label>
                  <input 
                        type="text" 
                        name="country" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.country}
                  />
                  <label>State:</label>
                  <input 
                        type="text" 
                        name="state" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.state}
                  />
                  <label>City:</label>
                  <input 
                        type="text" 
                        name="city" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.city}
                  />
                  <label>Pincode:</label>
                  <input 
                        type="text" 
                        name="pincode" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.pincode}
                  />
                  <label>Email:</label>
                  <input 
                        type="text" 
                        name="email" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.email}
                  />
                  <label>Contact:</label>
                  <input 
                        type="text" 
                        name="contact" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.contact}
                  />
                  <label>Designation:</label>
                  <input 
                        type="text" 
                        name="designation" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.designation}
                  />
                  <label>Department:</label>
                  <input 
                        type="text" 
                        name="department" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.department}
                  />
                  <label>Sign:</label>
                  <input 
                        type="file" 
                        name="signature" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={employee.signature}
                  />
                  <button className='btn btn-primary col-md-12 mt-3'>Submit</button>
                  <input type="button" value="Close" onClick={onclose} className='btn btn-primary col-md-12 mt-3'></input>
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

export default EditEmployee