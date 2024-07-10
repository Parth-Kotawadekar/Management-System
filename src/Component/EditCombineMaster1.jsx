import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import Service from '../Service/Service';
import { useEffect } from 'react';
import './CSS/Global.css'

const EditCombineMaster1 = () => {
  const [master1, setMaster1] = useState({
          id : "",
          rep_sr_no:"",
          condition_description :"",
          test_purpose : "",
          method_number:"",
          method_description:"",
          gauge_type:"",
          size : "",
          equipment_description : "",
          equipment_sr_no : "", 
          calibration_date : "",
          validity_date : "",
  });

  const {id} = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    Service
    .getCombinedMasterById(id)
    .then((res)=>{
        setMaster1(res.data);
    }).catch((error)=>{
      console.log(error);
    })
  }, [id])

  //handleChange is used to gett all cell data
  const handleChange = (e) => {
    const value = e.target.value;
    setMaster1({ ...master1,[e.target.name]: value});
  };

  //When to add new entry in cell it is call in form tag
  const Master1Update = (e) => {
    e.preventDefault();
    console.log(master1);

    Service.editCombinedMaster1(master1)
    .then((res)=>{
      navigate("/master1")
    }).catch((error) => {
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
              <h2>Edit Reporting Master</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={(e) => Master1Update(e)}>
                <div className='mb-3'>
                <label>Report Serial No.:</label>
                  <input 
                        type="text" 
                        name="rep_sr_no" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.rep_sr_no}
                  />
                <label>Condition Description:</label>
                  <input 
                        type="text" 
                        name="condition_description" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.condition_description}
                  />
                <label>Test Purpose:</label>
                  <input 
                        type="text" 
                        name="test_purpose" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.test_purpose}
                  />
                  <label>Method Number:</label>
                  <input 
                        type="text" 
                        name="method_number" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.method_number}
                  />
                  <label>Method Description:</label>
                  <input 
                        type="text" 
                        name="method_description" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.method_description}
                  />
                  <label>Gauge Type:</label>
                  <input 
                        type="text" 
                        name="gauge_type" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.gauge_type}
                  />
                  <label>Size:</label>
                  <input 
                        type="text" 
                        name="size" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.size}
                  />
                  <label>Equipment Description:</label>
                  <input 
                        type="text" 
                        name="equipment_description" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.equipment_description}
                  />
                  <label>Equipment No.:</label>
                  <input 
                        type="text" 
                        name="equipment_sr_no" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.equipment_sr_no}
                  />
                  <label>Calibration Date:</label>
                  <input 
                        type="date" 
                        name="calibration_date" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.calibration_date}
                  />
                  <label>Validity Date:</label>
                  <input 
                        type="date" 
                        name="validity_date" 
                        className='form-control' 
                        onChange={(e) => handleChange(e)}
                        value={master1.validity_date}
                  />
                  <button className='btn btn-primary col-md-12 mt-3'>Submit</button>
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

export default EditCombineMaster1