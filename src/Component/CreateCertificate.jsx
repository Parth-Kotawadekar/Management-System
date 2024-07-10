import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../Service/Service';
import './CSS/Global.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CreateCertificate = () => {

    const [certificate, setCertificate] = useState({
        gauge_id:"",
        datasheet_id:"",
        value:"", 
        nominal_size:"",
        results: [{ r1: "", r2: "", r3: "" }],
        observed_size:"", 
        error_size:"", 
        mean:""
    }) 

    const [checkpts, setCheckpts] = useState({
        check_id: "", 
        type_sr_no: "", 
        gauge_type: "",
        size_range: "", 
        point_of_measurement: "", 
        least_count: ""
    });

    const [gauges, setGauges] = useState({
        gauge_id: "",
        gauge_name: "",
        gauge_sr_no: "",
        gauge_type: "",
        manufacture_id: "",
        make: "",
        size: "",
        gauge_range: ""
    });

    const [datasheet, setDatasheet] = useState({
        datasheet_id: "",
        calibration_date: "",
        next_calibration_date: "",
        calibration_frequency: "",
        frequency_type: "",
        date_of_receipt: "",
        ref_dc_no: "",
        issue_date: "",
        identification_marked_by: "",
        certificate_no: "",
        calibration_place: "",
        gaugeMaster : {
            gauge_id: ""
        }
    });

    const [results, setResults] = useState([]);

    const { datasheet_id } = useParams();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if (datasheet_id) {
            Service.getDatasheetById(datasheet_id)
                .then((res) => {
                    setDatasheet(res.data);
                    console.log('Fetched datasheet:', res.data);
                    if (res.data.gaugeMaster && res.data.gaugeMaster.gauge_id) {
                        fetchGaugeDetails(res.data.gaugeMaster.gauge_id);
                        setDatasheet(res.data);
                        // console.log(gauge_id)
                    } else {
                        console.error('Gauge ID not found in datasheet');
                    }
                })
                .catch((error) => {
                    console.error('Cannot fetch datasheet:', error);
                });
        }
    }, [datasheet_id]);

    useEffect(() => {
        if (checkpts && checkpts.point_of_measurement) {
            const points = checkpts.point_of_measurement.split(',');
            setResults(points.map((point, index) => ({
                point_of_measurement: point,
                r1: '',
                r2: '',
                r3: '',
                observed_size: '',
                error_size: ''
            })));
        }
    }, [checkpts]);

    const fetchGaugeDetails = (gauge_id) => {
        console.log('Fetching gauge details for gauge_id:', gauge_id);
        Service.getGaugeById(gauge_id)
            .then((res) => {
                setGauges(res.data);
                console.log('Fetched gauge details:', res.data);
                
                if (res.data.chechMaster && res.data.chechMaster.check_id) {
                    fetchCheckpointDetails(res.data.chechMaster.check_id);
                } else {
                    console.error('Cannot fetch checkmaster');
                }
            })
            .catch((error) => {
                console.error('Cannot fetch gauge id:', error);
            });
    };

    const fetchCheckpointDetails = (check_id) => {
        console.log('Fetching checkpoint details for check_id', check_id);
        Service.getCombinedMaster2ById(check_id)
            .then((res) => {
                console.log('Fetched check_id: ', res.data);
                setCheckpts(res.data);
            })
            .catch((error) => {
                console.error('Cannot find check_id', error);
            });
    };

    const handleInputChange = (index, fieldName, value) => {
        const updatedResults = [...results];
        updatedResults[index][fieldName] = value;
        if (fieldName === 'r1') {

            const r1Value = parseFloat(value);
            const r2Value = r1Value;
            const r3Value = r2Value;
            const observedValue = [(r1Value + r2Value + r3Value)]/3;
            updatedResults[index]['r2'] = r2Value.toFixed(4);
            updatedResults[index]['r3'] = r3Value.toFixed(4);
            updatedResults[index]['observed_size'] = observedValue.toFixed(4);

            const pointOfMeasurement = parseFloat(results[index].point_of_measurement);
            const errorSize = pointOfMeasurement - observedValue;
            updatedResults[index]['error_size'] = errorSize.toFixed(4);
        }
        setResults(updatedResults);
    };

    const handleGaugeChange = (e) => {
        const { name, value } = e.target;
        setDatasheet({ ...datasheet, [name]: value }, { ...gauges, [name] : value});
    };

    const CertificateRegister = (e) => {
        e.preventDefault();
        
        Service.createCertificate(certificate)
            .then(() => {
                MySwal.fire({
                    title: 'Success',
                    text: `Successfully created certificate for ${gauges.gauge_name}.`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                })
                .then(() => {
                    navigate('/certificate');
                });
            })
            .catch((error) => {
                console.log(error)
                MySwal.fire({
                    title: 'Error',
                    text: `Failed to create certificate for ${gauges.gauge_name}. Please check the errors.`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };

    const returnPage = () => {
        navigate('/datasheet');
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header fs-3 text-center'>
                            <h2>Create Certificate</h2>
                        </div>
                            {/* Calibration Results Table */}
                            <div className="table-heading fs-3 text-center mt-3"><h3>Calibration Results in mm</h3></div>
                            <div className="observation_table">
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
                        </div>

                        <div className='card-body'>
                            <form onSubmit={CertificateRegister}>
                                <div className='row'>
                                    {/* Gauge details on the left side */}
                                    {/* <div className='col-md-6'>
                                        <div className="heading text-align-center"><h2>Gauge Details</h2></div>
                                        <div className='mb-4'>
                                            <label>Gauge Id:</label>
                                            <input
                                                type="text"
                                                name="gauge_id"
                                                className='form-control read-only-field'
                                                value={datasheet.gaugeMaster.gauge_id}
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
                                    </div> */}
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
    );
};

export default CreateCertificate;
