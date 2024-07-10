import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import Service from '../Service/Service';
import { useEffect } from 'react';
import './CSS/Global.css'

const EditCombinedMaster2 = () => {
        const [master2, setMaster2] = useState({
                id:'',
                type_sr_no:'',
                gauge_type: '',
                size_range: '',
                point_of_measurement: '',
                least_count: '',
              });

        const [point_of_measurement] = useState({
                point_of_measurement:''
        })

  const {id} = useParams();
  const navigate = useNavigate();
  console.log(id);

  const [inputValue, setInputValue] = useState('');
  const [measurements, setMeasurements] = useState([]);


  useEffect(() => {
    Service
    .getCombinedMaster2ById(id)
    .then((res)=>{
        setMaster2(res.data);
    }).catch((error)=>{
      console.log(error);
    })
  }, [id])

  //handleChange is used to gett all cell data
  const handleChange = (e) => {
    const value = e.target.value;
    setMaster2({ ...master2,[e.target.name]: value});
  };

  const handleMeasurementChange = (e) => {
        setInputValue(e.target.value);
      };
    
      const handleAddMeasurement = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
          setMeasurements([...measurements, inputValue.trim()]);
          setInputValue(''); // Clear the input field
        }
      };
    
      const handleDeleteMeasurement = (indexToDelete) => {
        setMeasurements(measurements.filter((_, index) => index !== indexToDelete));
      };

  //When to add new entry in cell it is call in form tag
  const Master2Update = (e) => {
    e.preventDefault();
    console.log(master2);

    Service.editCombinedMaster2(master2)
    .then((res)=>{
      navigate("/master2")
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
            <div className="card-header fs-3 text-center">
              <h2>Edit Combined Master 2</h2>
            </div>
            <div className="card-body">
              <form onSubmit={Master2Update}>
                <div className="mb-3">
                  <label>Gauge Type:</label>
                  <input
                    type="text"
                    name="gauge_type"
                    className="form-control"
                    onChange={handleChange}
                    value={master2.gauge_type}
                  />
                  <label>Type Sr. No:</label>
                  <input
                    type="text"
                    name="type_sr_no"
                    className="form-control"
                    onChange={handleChange}
                    value={master2.type_sr_no}
                  />
                  <label>Size Range:</label>
                  <input
                    type="text"
                    name="size_range"
                    className="form-control"
                    onChange={handleChange}
                    value={master2.size_range}
                  />
                  <label>Point of Measurement:</label>
                  <input
                    type="text"
                    name="point_of_measurement"
                    className="form-control"
                    onChange={handleMeasurementChange}
                    value={inputValue}
                    placeholder='already added checkpoints'
                    readOnly
                  />
                  {/* <button className="btn btn-success col-md-5 mt-1" onClick={handleAddMeasurement}>Add</button>

                  <table>
                    <thead>
                      <tr>
                        <th>Measurements</th>
                      </tr>
                    </thead>
                    <tbody>
                      {measurements.map((measurement, index) => (
                        <tr key={index}>
                          <td>{measurement}</td>
                          <td>
                            <button className="btn btn-danger mt-1" onClick={() => handleDeleteMeasurement(index)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}

                  <label>Least Count:</label>
                  <input
                    type="text"
                    name="least_count"
                    className="form-control"
                    onChange={handleChange}
                    value={master2.least_count}
                  />
                </div>
                <button className="btn btn-primary col-md-12 mt-3">Submit</button>
                <input
                  type="button"
                  value="Reset"
                  className="btn btn-primary col-md-12 mt-3"
                  onClick={() => {
                    setMaster2({
                      gauge_type: '',
                      size_range: '',
                      point_of_measurement: '',
                      least_count: '',
                    });
                    setMeasurements([]);
                  }}
                />
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditCombinedMaster2