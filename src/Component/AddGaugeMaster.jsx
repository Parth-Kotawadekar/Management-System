import React, { useState, useEffect } from 'react';
import Service from '../Service/Service';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import './CSS/Global.css';

const AddGaugeMaster = () => {
  const [reportingMaster, setReportingMaster] = useState('');
  const [checkpointMaster, setCheckpointMaster] = useState('');
  const [master1, setMaster1] = useState([]);
  const [master2, setMaster2] = useState([]);
  const [employee, setEmployee] = useState({
    emp_id: "",
    first_name: "",
    last_name: "",
  });
  const [gauges, setGauges] = useState({
    gauge_name: '',
    gauge_sr_no: '',
    gauge_type: '',
    manufacture_id: '',
    make: '',
    size: '',
    gauge_range: '',
    go_were_limit: '',
    instrument_type: '',
    lower_size: '',
    higher_size: '',
    tolerance_type: '',
    go_tolerance_plus: '',
    go_tolerance_minus: '',
    nogo_tolerance_plus: '',
    nogo_tolerance_minus: '',
    rep_id: '',
    cust_id: '',
    emp_id:""
  });

  useEffect(() => {
    const fetchMastersAndIds = async () => {
      try {
        const res1 = await Service.getCombinedMaster1();
        const res2 = await Service.getCombinedMaster2();
        setMaster1([...res1.data,  ...res2.data]);
        // setMaster2([ ...res2.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMastersAndIds();
  }, []);

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleGaugeChange = (e) => {
    const { name, value } = e.target;
    setGauges({ ...gauges, [name]: value });
  };

  const handleRepMastChange = (e) => {
    const repId = e.target.value;
    setReportingMaster(repId);
    setGauges({ ...gauges, rep_id: repId });
  };

  const handleCheckMastChange = (e) => {
    const checkId = e.target.value;
    setCheckpointMaster(checkId);
    setGauges({ ...gauges, check_id: checkId });
  };

  const fetchEmployeeById = async (id) => {
    try {
      const response = await Service.getEmployeeById(id);
      setEmployee({
        emp_id: response.data.emp_id,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const GaugeRegister = (e) => {
    e.preventDefault();

    // Validation
    if (
      !gauges.gauge_name ||
      !gauges.gauge_sr_no ||
      !gauges.gauge_type ||
      !gauges.rep_id ||
      !gauges.check_id
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Save gauge data
    Service.addGauge(gauges)
      .then((res) => {
        MySwal.fire({
          title: 'Success',
          text: 'Gauge Saved Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/gaugeMaster');
        });
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          title: 'Error',
          text: 'Failed to save Gauge. Please check the data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const returnPage = () => {
    navigate('/gaugeMaster');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header fs-3 text-center">
              <h2>Add Gauge</h2>
            </div>
            <div className="card-body">
              <form onSubmit={GaugeRegister}>
                <div className="row">
                  {/* Left Side - Main Inputs */}
                  <div className="col-md-6">
                    <div className="text_fields mb-3">
                      <label>
                        Gauge Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="gauge_name"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.gauge_name}
                        required
                      />

                      <label>
                        Gauge Sr. No.<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="gauge_sr_no"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.gauge_sr_no}
                        required
                      />
                      <label>
                        Gauge Type<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="gauge_type"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.gauge_type}
                        required
                      />
                      <label>Manufacture Id</label>
                      <input
                        type="text"
                        name="manufacture_id"
                        className="form-control"
                        onChange={handleGaugeChange}
                        value={gauges.manufacture_id}
                      />
                      <label>Size</label>
                      <input
                        type="text"
                        name="size"
                        className="form-control"
                        onChange={handleGaugeChange}
                        value={gauges.size}
                      />
                      <label>Range</label>
                      <input
                        type="text"
                        name="gauge_range"
                        className="form-control"
                        onChange={handleGaugeChange}
                        value={gauges.gauge_range}
                      />
                      <label>Make</label>
                      <input
                        type="text"
                        name="make"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.make}
                      />
                      <label>Go Were Limit</label>
                      <input
                        type="text"
                        name="go_were_limit"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.go_were_limit}
                      />
                      <label>
                        Reporting Master <span className="text-danger">*</span>
                      </label>
                      <select
                        name="rep_id"
                        className="form-control custom-border"
                        onChange={handleRepMastChange}
                        value={reportingMaster}
                        required
                      >
                        <option value="">Select Reporting Master</option>
                        {master1.map((mast1) => (
                          <option value={mast1.rep_id} key={mast1.rep_id}>
                            {mast1.rep_sr_no}
                          </option>
                        ))}
                      </select>
                      <label className="check_mast">
                        Checkpoint Master<span className="text-danger">*</span>
                      </label>
                      <select
                        name="check_id"
                        className="form-control custom-border"
                        onChange={handleCheckMastChange}
                        value={checkpointMaster}
                        required
                      >
                        <option value="">Select Checkpoint Master</option>
                        {master1.map((checkMast) => (
                          <option value={checkMast.check_id} key={checkMast.check_id}>
                            {checkMast.type_sr_no}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Right Side - Additional Inputs */}
                  <div className="col-md-6">
                    <div className="text_fields mb-3">
                      <label>Instrument Type</label>
                      <input
                        type="text"
                        name="instrument_type"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.instrument_type}
                      />
                      <label>Lower Size</label>
                      <input
                        type="text"
                        name="lower_size"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.lower_size}
                      />
                      <label>Higher Size</label>
                      <input
                        type="text"
                        name="higher_size"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.higher_size}
                      />
                      <label>Tolerance type</label>
                      <input
                        type="text"
                        name="tolerance_type"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.tolerance_type}
                      />
                      <label>Go Tolerance (+)</label>
                      <input
                        type="text"
                        name="go_tolerance_plus"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.go_tolerance_plus}
                      />
                      <label>Go Tolerance (-)</label>
                      <input
                        type="text"
                        name="go_tolerance_minus"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.go_tolerance_minus}
                      />
                      <label>NoGo Tolerance (+)</label>
                      <input
                        type="text"
                        name="nogo_tolerance_plus"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.nogo_tolerance_plus}
                      />
                      <label>NoGo Tolerance (-)</label>
                      <input
                        type="text"
                        name="nogo_tolerance_minus"
                        className="form-control custom-border"
                        onChange={handleGaugeChange}
                        value={gauges.nogo_tolerance_minus}
                      />
                      {/* <label>Employee: </label>
                      <input
                        type="text"
                        name="emp_id"
                        className="form-control custom-border"
                        onChange={fetchEmployeeById}
                        value={gauges.emp_id}
                        readOnly
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="buttoms">
                  <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="reset" value="Reset" className="btn btn-primary" />&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="button" value="Close" onClick={returnPage} className="btn btn-primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGaugeMaster;
