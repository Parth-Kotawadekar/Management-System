import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../Service/Service';
import './CSS/Global.css'

const AddCombinedMaster2 = () => {
  const [master2, setMaster2] = useState({
    type_sr_no: "",
    gauge_type: '',
    size_range: '',
    point_of_measurement: '',
    least_count: '',
  });

  const [inputValue, setInputValue] = useState('');
  const [measurements, setMeasurements] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaster2({ ...master2, [name]: value });
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

  const CombinedMaster2Register = (e) => {
    e.preventDefault();
    const measurementString = measurements.join(', ');
    const updatedMaster2 = { ...master2, point_of_measurement: measurementString };

    Service.addNewCombinedMaster2(updatedMaster2)
      .then((res) => {
        navigate('/master2');
        setMaster2({
          gauge_type: '',
          size_range: '',
          point_of_measurement: '',
          least_count: '',
        });
        setMeasurements([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const returnPage = (e) => {
    navigate("/master2");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header fs-3 text-center">
              <h2>Add Checkpoint Master 2</h2>
            </div>
            <div className="card-body">
              <form onSubmit={CombinedMaster2Register}>
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
                  />
                  <button className="btn btn-success col-md-1 mt-1" onClick={handleAddMeasurement}>Add</button>

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
                  </table>

                  <label>Least Count:</label>
                  <input
                    type="text"
                    name="least_count"
                    className="form-control"
                    onChange={handleChange}
                    value={master2.least_count}
                  />
                </div>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <button className='btn btn-primary col-md-1 mt-3'>Submit</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" value="Close" className='btn btn-secondary col-md-1 mt-3' onClick={returnPage}></input>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCombinedMaster2;
