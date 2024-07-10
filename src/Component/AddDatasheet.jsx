import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../Service/Service';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './CSS/Global.css'

const AddDatasheet = () => {
    const [datasheet, setDatasheet] = useState({
        calibration_date: "",
        next_calibration_date: "",
        calibration_frequency: "",
        frequency_type: "",
        date_of_reciept: "",
        ref_dc_no: "",
        issue_date: "",
        identification_marked_by: "",
        certificate_no: "",
        calibration_place: "",
        gauge_id: ""
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

    const navigate = useNavigate();
    const { id } = useParams();
    const MySwal = withReactContent(Swal);

    const handleGaugeChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name.includes("date") ? formatDateString(value) : value;

        setDatasheet(prevState => ({
            ...prevState,
            [name]: formattedValue,
            ...(name === 'calibration_date' && {
                identification_marked_by: `RML-${formattedValue}`,
                ref_dc_no: `RML-${formattedValue}`,
                date_of_reciept: formattedValue,
                issue_date: formattedValue
            })
        }));

        if (name === 'calibration_date' || name === 'calibration_frequency' || name === 'frequency_type') {
            calculateNextDueDate(name, value);
        }
    };

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const calculateNextDueDate = (changedField, value) => {
        const { calibration_date, calibration_frequency, frequency_type } = datasheet;
        let newCalibrationDate = calibration_date;
        let newCalibrationFrequency = calibration_frequency;
        let newFrequencyType = frequency_type;

        if (changedField === 'calibration_date') {
            newCalibrationDate = value;
        } else if (changedField === 'calibration_frequency') {
            newCalibrationFrequency = value;
        } else if (changedField === 'frequency_type') {
            newFrequencyType = value;
        }

        if (newCalibrationDate && newCalibrationFrequency && newFrequencyType) {
            let nextDate = new Date(newCalibrationDate);
            const frequencyValue = parseInt(newCalibrationFrequency);

            switch (newFrequencyType) {
                case 'Year':
                    nextDate.setFullYear(nextDate.getFullYear() + frequencyValue);
                    break;
                case 'Month':
                    nextDate.setMonth(nextDate.getMonth() + frequencyValue);
                    break;
                case 'Day':
                    nextDate.setDate(nextDate.getDate() + frequencyValue);
                    break;
                default:
                    break;
            }

            setDatasheet(prevState => ({
                ...prevState,
                next_calibration_date: nextDate.toISOString().split('T')[0]
            }));
        }
    };

    useEffect(() => {
        if (id) {
            Service.getGaugeById(id)
                .then((res) => {
                    setGauges(res.data);
                    setDatasheet(prevState => ({
                        ...prevState,
                        gauge_id: res.data.gauge_id
                    }));
                    console.log('Gauge fetched of id: ', id);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log('ID is null or undefined:', id);
        }
    }, [id]);

    const DatasheetRegister = (e) => {
        e.preventDefault();

        Service.createDatasheet(datasheet)
            .then((res) => {
                MySwal.fire({
                    title: 'Success!',
                    text: `Datasheet of ${gauges.gauge_name} created successfully on ${datasheet.calibration_date}`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate("/datasheet");
                });
            }).catch((error) => {
                console.log(error);
                MySwal.fire({
                    title: 'Error!',
                    text: 'Failed to create datasheet',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const returnPage = (e) => {
        e.preventDefault();
        navigate("/gaugeMaster");
        
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header fs-3 text-center'>
                            <h2>Create Datasheet</h2>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={DatasheetRegister}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <h4>Gauge Details</h4>
                                        <div className='mb-3'>
                                            <label>Gauge Id:</label>
                                            <input
                                                type="text"
                                                name="gauge_id"
                                                className='form-control read-only-field'
                                                value={datasheet.gauge_id}
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
                                            <label>Gauge Sr No:</label>
                                            <input
                                                type="text"
                                                name="gauge_sr_no"
                                                className='form-control read-only-field'
                                                value={gauges.gauge_sr_no}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Gauge Type:</label>
                                            <input
                                                type="text"
                                                name="gauge_type"
                                                className='form-control read-only-field'
                                                value={gauges.gauge_type}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Manufacture Id:</label>
                                            <input
                                                type="text"
                                                name="manufacture_id"
                                                className='form-control read-only-field'
                                                value={gauges.manufacture_id}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Make:</label>
                                            <input
                                                type="text"
                                                name="make"
                                                className='form-control read-only-field'
                                                value={gauges.make}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Size:</label>
                                            <input
                                                name="size"
                                                className='form-control read-only-field'
                                                value={gauges.size}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Range:</label>
                                            <input
                                                name="range"
                                                className='form-control read-only-field'
                                                value={gauges.gauge_range}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <h4>Datasheet Details</h4>
                                        <div className='mb-3'>
                                            <label>Calibration Date:</label>
                                            <input
                                                type="date"
                                                name="calibration_date"
                                                className='form-control'
                                                onChange={handleGaugeChange}
                                                value={datasheet.calibration_date}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Frequency Type:</label>
                                            <select
                                                name="frequency_type"
                                                className='form-control'
                                                onChange={handleGaugeChange}
                                                value={datasheet.frequency_type}
                                            >
                                                <option value="">select frequency</option>
                                                <option value="Year">Year</option>
                                                <option value="Month">Month</option>
                                                <option value="Day">Day</option>
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label>Frequency:</label>
                                            <input
                                                name="calibration_frequency"
                                                className='form-control'
                                                onChange={handleGaugeChange}
                                                value={datasheet.calibration_frequency}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Next Due:</label>
                                            <input
                                                type="date"
                                                name="next_calibration_date"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.next_calibration_date}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Reciept Date:</label>
                                            <input
                                                type="date"
                                                name="date_of_reciept"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.date_of_reciept}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Issue Date:</label>
                                            <input
                                                type="date"
                                                name="issue_date"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.issue_date}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Ref Dc. No.:</label>
                                            <input
                                                type="text"
                                                name="ref_dc_no"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.ref_dc_no}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Datasheet Created On:</label>
                                            <input
                                                type="date"
                                                name="date_of_reciept"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.date_of_reciept}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Identification Marked By:</label>
                                            <input
                                                type="text"
                                                name="identification_marked_by"
                                                className='form-control read-only-field'
                                                onChange={handleGaugeChange}
                                                value={datasheet.identification_marked_by}
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Certificate No.:</label>
                                            <input
                                                type="text"
                                                name="certificate_no"
                                                className='form-control'
                                                onChange={handleGaugeChange}
                                                value={datasheet.certificate_no}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Certificate Place:</label>
                                            <select
                                                name="calibration_place"
                                                className='form-control'
                                                onChange={handleGaugeChange}
                                                value={datasheet.calibration_place}
                                            >
                                                <option value="">--select--</option>
                                                <option value="At Permanent Lab">At Lab</option>
                                                <option value="At Mobile">At Mobile</option>
                                                <option value="At Site">At Site</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12 text-center'>
                                        <button className='btn btn-primary col-md-3 mt-3'>Submit</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="button" value="Close" className='btn btn-secondary col-md-3 mt-3' onClick={returnPage}></input>
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

export default AddDatasheet;
