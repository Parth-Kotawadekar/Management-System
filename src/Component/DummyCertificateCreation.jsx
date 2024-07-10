import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Service from '../Service/Service'

const DummyCertificateCreation = () => {

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const {datasheet_id, gauge_id} = useParams();

    const [certificate, setCertificate] = useState({
        r1:"",
        r2:"",
        r3:"",
        nominal_size:"",
        observed_size:"",
        error_size:"",
        gauge_id:"",
        datasheet_id:""
    })

    const [gauges, setGauges] = useState({
        gauge_id:"",
        gauge_name:"",
        gauge_sr_no:"",
        manufacture_id:"",
        make:"",
        size:"",
        range:"",
    })
    
    const [datasheet, setDatasheet] = useState({
        datasheet_id:"",
        calibration_date:"",
        next_calibration_date:"",
        issue_date:"",
        date_of_receipt:"",
        frequency_type:"",
        calibration_frequency:"",
        identification_marked_by:"",
        calibration_place:"",
        certificate_no:"",
        gauge_id:""
    })

    const [checkpts, setCheckpts] = useState({
        check_id: "", 
        type_sr_no: "", 
        gauge_type: "", 
        size_range: "", 
        point_of_measurement: "", 
        least_count: ""
    });

    useEffect(() => {
        if(datasheet_id){
            Service.getDatasheetById(datasheet_id)
                .then((res) => {
                    setDatasheet(res.data);

                })
                .catch((error) => {
                    console.log((error))
                })
        }
    })

    const handleGaugeChange = (e) => {
        const { name, value } = e.target;
        setDatasheet({ ...datasheet, [name]: value });
    };
    
    const CertificateRegister = (e) => {
        e.preventDefault()
    
        Service.createCertificate(certificate)
            .then((res) => {
                MySwal.fire({
                    title: 'Success!',
                    text: `Certificate of ${gauges.gauge_name} created successfully`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate("/datasheet");
                });
            }).catch((error) => {
                console.log(error);
                MySwal.fire({
                    title: 'Error!',
                    text: 'Failed to create certificate',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    const returnPage = (e) => {
        navigate("/certificate");
    }

  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header fs-3 text-center'>
                            <h2>Create Certificate</h2>
                        </div>
                            {/* Calibration Results Table */}
                            <div className='card-body'>
                            <form onSubmit={CertificateRegister}>
                                    <div className="table-heading fs-3 text-center mt-3"><h3>Calibration Results in mm</h3></div>
                                    {/* <div className="observation_table">
                                        <div className="col-md-8 mt-3 d-flex justify-content-center">
                                            <div className="table-responsive">
                                                <table className='table table-bordered table-striped text-center'>
                                                    <thead>
                                                        <tr>
                                                            <th>Sr. No</th>
                                                            <th>Nominal Size</th>
                                                            <th>R1</th>
                                                            <th>R2</th>
                                                            <th>R3</th>
                                                            <th>Observed</th>
                                                            <th>Error</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {results.map((result, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{result.point_of_measurement}</td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        value={result.r1}
                                                                        onChange={(e) => handleInputChange(index, 'r1', e.target.value)}
                                                                        className='form-control'
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        value={result.r2}
                                                                        className='form-control'
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        value={result.r3}
                                                                        className='form-control'
                                                                        readOnly
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        value={result.observed_size}
                                                                        className='form-control'
                                                                        readOnly
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        placeholder='Error'
                                                                        value={result.error_size}
                                                                        className='form-control'
                                                                        readOnly
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div> */}

                                <div className='row'>
                                    {/* Gauge details on the left side */}
                                    <div className='col-md-6'>
                                        <div className="heading text-align-center"><h2>Gauge Details</h2></div>
                                        <div className='mb-4'>
                                            <label>Gauge Id:</label>
                                            <input
                                                type="text"
                                                name="gauge_id"
                                                className='form-control read-only-field'
                                                value={gauges.gauge_id}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Gauge Name:</label>
                                            <input
                                                type="text"
                                                name="gauge_name"
                                                className='form-control read-only-field'
                                                value={gauges.gauge_name}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Gauge Serial No:</label>
                                            <input
                                                type="text"
                                                name="gauge_sr_no"
                                                className='form-control read-only-field'
                                                value={gauges.gauge_sr_no}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Gauge Type</label>
                                            <input
                                                type="text"
                                                name="gauge_sr_no"
                                                className='form-control read-only-field'
                                                value={gauges.gauge_type}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Manufacture Id:</label>
                                            <input
                                                type="text"
                                                name="gauge_sr_no"
                                                className='form-control read-only-field'
                                                value={gauges.manufacture_id}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Size:</label>
                                            <input
                                                type="text"
                                                name="gauge_sr_no"
                                                className='form-control read-only-field'
                                                value={gauges.size}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Range:</label>
                                            <input
                                                type="text"
                                                name="gauge_sr_no"
                                                className='form-control read-only-field'
                                                value={gauges.gauge_range}
                                                readOnly
                                            />
                                        </div>
                                        
                                        <h2 className='checkpoint_heading mt-5'>Checkpoint Details</h2>
                                        <label>Checkpoint Sr. No:</label>
                                        <input
                                            type="text"
                                            name="gauge_id"
                                            className='form-control read-only-field'
                                            value={checkpts.type_sr_no}
                                            readOnly
                                        />
                                        <label>Checkpoint Name:</label>
                                        <input
                                            type="text"
                                            name="gauge_id"
                                            className='form-control read-only-field'
                                            value={checkpts.gauge_type}
                                            readOnly
                                        />
                                    </div>
                                    {/* Datasheet details on the right side */}
                                    <div className='col-md-6'>
                                        <div className="heading"><h2>Datasheet Details</h2></div>
                                        <div className='mb-3'>
                                        <label>Datasheet ID:</label>
                                            <input
                                                type="text"
                                                name="datasheet_id"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.datasheet_id}
                                                readOnly
                                            />
                                            <label>Datasheet ID:</label>
                                            <input
                                                type="text"
                                                name="gauge_id"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.gauge_id}
                                                readOnly
                                            />
                                            <label>Calibration Date:</label>
                                            <input
                                                type="text"
                                                name="calibration_date"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.calibration_date}
                                                readOnly
                                            />
                                            <label>Next Due:</label>
                                            <input
                                                type="text"
                                                name="next_calibration_date"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.next_calibration_date}
                                                readOnly
                                            />
                                            <label className='check_mast mt-3'>Frequency:</label>
                                            <input
                                                type="text"
                                                name="calibration_frequency"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.calibration_frequency}
                                                readOnly
                                            />
                                            <label>Frequency Type:</label>
                                            <input
                                                type='text'
                                                name="frequency_type"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.frequency_type}
                                                readOnly
                                            />
                                            <label>Receipt Date:</label>
                                            <input
                                                type="text"
                                                name="date_of_receipt"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.date_of_receipt}
                                                readOnly
                                            />
                                            <label>Ref Dc. No.:</label>
                                            <input
                                                type="text"
                                                name="ref_dc_no"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.ref_dc_no}
                                                readOnly
                                            />
                                            <label>Issue Date:</label>
                                            <input
                                                type="text"
                                                name="issue_date"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.issue_date}
                                                readOnly
                                            />
                                            <label>Identified by:</label>
                                            <input
                                                type="text"
                                                name="identification_marked_by"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.identification_marked_by}
                                                readOnly
                                            />
                                            <label>Certificate no:</label>
                                            <input
                                                type="text"
                                                name="certificate_no"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.certificate_no}
                                                readOnly
                                            />
                                            <label>Calibration Place:</label>
                                            <input
                                                type="text"
                                                name="calibration_place"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.calibration_place}
                                                readOnly
                                            />
                                        </div>
                                    </div>
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
    
    </>
  )
}

export default DummyCertificateCreation