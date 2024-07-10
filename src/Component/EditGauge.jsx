import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import Service from '../Service/Service';
import { useEffect } from 'react';
import './CSS/Global.css'

const EditGauge = () => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(null)
  const [gauge, setGauge] = useState({
          gauge_id : "",
          gauge_name: "",
          gauge_sr_no: "",
          gauge_type: "",
          manufacture_id: "",
          size:"",
          gauge_range:"",
          make: "",
          go_were_limit: "",
          instrument_type: "",
          lower_size: "",
          higher_size: "",
          tolerance_type: "",
          go_tolerance_plus: "",
          go_tolerance_minus: "",
          nogo_tolerance_pus: "",
          nogo_tolerance_minus: "",
          cust_id:"",
          emp_id:""
  });

  const {id} = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    Service
    .getGaugeById(id)
    .then((res)=>{
      setGauge(res.data);
    }).catch((error)=>{
      console.log(error.message);
    })
  }, [id]);

  //handleChange is used to gett all cell data
  const handleGaugeChange = (e) => {
    const value = e.target.value;
    setGauge({ ...gauge,[e.target.name]: value});
  };

  //When to add new entry in cell it is call in form tag
  const GaugeUpdate = (e) => {
    e.preventDefault();
    console.log(gauge);
    Service.editGauge(gauge)
    .then((res)=>{
      navigate("/gaugeMaster")
      alert("Gauge with id " + id + " Updated Successfully...")
    }).catch((error) => {
      console.log(error);
    })
  }

  const returnPage = (e) => {
    e.preventDefault();

    navigate("/gaugeMaster")
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
            <div className='card-header fs-3 text-center'>
              <h2>Edit Gauge Master</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={(e) => GaugeUpdate(e)}>
              <div className='row'>
                  {/* Left Side - Main Inputs */}
                  <div className='col-md-6'>
                    <div className='text_fields mb-3'>
                    <label>Gauge Id:</label>
                      <input
                        type="text"
                        name="gauge_id"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.gauge_id}
                      />
                      <label>Gauge Name:</label>
                      <input
                        type="text"
                        name="gauge_name"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.gauge_name}
                      />
                      <label>Gauge Sr. No.:</label>
                      <input
                        type="text"
                        name="gauge_sr_no"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.gauge_sr_no}
                      />
                      <label>Gauge Type:</label>
                      <input
                        type="text"
                        name="gauge_type"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.gauge_type}
                      />
                      <label>Manufacture Id:</label>
                      <input
                        type="text"
                        name="manufacture_id"
                        className='form-control'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.manufacture_id}
                      />
                      <label>Size:</label>
                      <input
                        type="text"
                        name="size"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.size}
                      />
                      <label>Range:</label>
                      <input
                        type="text"
                        name="gauge_range"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.gauge_range}
                      />
                      <label>Make:</label>
                      <input
                        type="text"
                        name="make"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.make}
                      />
                      <label>Go Were Limit:</label>
                      <input
                        type="text"
                        name="go_were_limit"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.go_were_limit}
                      />
                      <label>Employee:</label>
                      <input
                        type="text"
                        name="emp_id"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.emp_id}
                      />
                    </div>
                  </div>
                  {/* Right Side - Additional Inputs */}
                  <div className='col-md-6'>
                    <div className='text_fields mb-3'>
                      <label>Instrument Type:</label>
                      <input
                        type="text"
                        name="instrument_type"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.instrument_type}
                      />
                      <label>Lower Size:</label>
                      <input
                        type="text"
                        name="lower_size"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.lower_size}
                      />
                      <label>Higher Size:</label>
                      <input
                        type="text"
                        name="higher_size"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.higher_size}
                      />
                      <label>Tolerance type:</label>
                      <input
                        type="text"
                        name="tolerance_type"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.tolerance_type}
                      />
                      <label>Go Tolerance +:</label>
                      <input
                        type="text"
                        name="go_tolerance_plus"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.go_tolerance_plus}
                      />
                      <label>Go Tolerance -:</label>
                      <input
                        type="text"
                        name="go_tolerance_minus"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.go_tolerance_minus}
                      />
                      <label>NoGo Tolerance +:</label>
                      <input
                        type="text"
                        name="nogo_tolerance_plus"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.nogo_tolerance_pus}
                      />
                      <label>NoGo Tolerance -:</label>
                      <input
                        type="text"
                        name="nogo_tolerance_minus"
                        className='form-control custom-border'
                        onChange={(e) => handleGaugeChange(e)}
                        value={gauge.nogo_tolerance_minus}
                      />
                    </div>
                  </div>
                </div>
                {/* File Input and Buttons */}
                <div className='row mt-3'>
                  <div className='col-md-12'>
                    <label>File:</label>
                    <input
                      type="file"
                      name="signature"
                      className='form-control custom-border'
                      onChange={(e) => handleGaugeChange(e)}
                      value={gauge.signature}
                    />
                  </div>
                </div>
                <div className='buttoms'>
                    <button className='btn btn-primary'>Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="button" value="Close" onClick={returnPage} className='btn btn-primary'></input>
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

export default EditGauge