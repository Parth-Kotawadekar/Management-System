import React, { useState, useEffect } from 'react';
import Service from '../Service/Service';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import certificate from './assets/certificate.png'
import delete_record from './assets/delete.png'
import excel from './assets/excel_icon.png'
import './CSS/Global.css'

const Datasheet = () => {
  const [datasheet, setDatasheet] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDatasheet, setFilteredDatasheet] = useState([]);
  const [gaugeMaster, setGaugeMaster] = useState({
    gauge_name: "",
    gauge_sr_no: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    Service.getAllDatasheets()
      .then((res) => {
        setDatasheet(res.data);
        setFilteredDatasheet(res.data); // Initialize filtered datasheet with all data
        console.log("All Datasheet Data Displayed Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteDatasheet = (id) => {
    Service.deleteDatasheetById(id)
      .then(() => {
        console.log("Datasheet Deleted Successfully");
        setDatasheet(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredData = datasheet.filter((item) => {
      return (
        item.calibration_date.toLowerCase().includes(searchTerm) ||
        item.calibration_place.toLowerCase().includes(searchTerm) ||
        item.certificate_no.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredDatasheet(filteredData);
  };

  const exportToExcel = () => {
    const fileName = 'DatasheetDetails.xlsx';
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const ws = XLSX.utils.json_to_sheet(datasheet);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // Calculate current items based on currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDatasheet.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <h1>
                <div className='card-header fs-1 mt-5 text-center'>Datasheet Details</div>
              </h1>
              <div className='card-body'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <div className='mb-3' style={{width: '400px'}}>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Search by calibration date, place or certificate no.'
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className='export-button-container'>
                    <button 
                      className='export-button' 
                      onClick={exportToExcel}
                      >
                      <img className='excel_buttons' src={excel} alt="Excel" style={{width: '30px', height:'30px'}}/>
                      Export to excel</button>
                  </div>
                </div>

                <div className='table-responsive'>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Gauge Name</th>
                        <th scope="col">Gauge Sr.No.</th>
                        <th scope="col">Calibration Date</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Frequency</th>
                        <th scope="col">Frequency Type</th>
                        <th scope="col">Reciept Date</th>
                        <th scope="col">Ref Dc N</th>
                        <th scope="col">Issue Date</th>
                        <th scope="col">Identification Marked By</th>
                        <th scope="col">Certificate No.</th>
                        <th scope="col">Calibration Place</th>
                        <th scope="col">Create Certificate</th>
                        <th scope="col">Datasheet Created On</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((dtasheet, index) => (
                        <tr key={dtasheet.id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{dtasheet.gaugeMaster ? dtasheet.gaugeMaster.gauge_name : 'N/A'}</td>
                          <td>{dtasheet.gaugeMaster ? dtasheet.gaugeMaster.gauge_sr_no : 'N/A'}</td>
                          <td>{dtasheet.calibration_date}</td>
                          <td>{dtasheet.next_calibration_date}</td>
                          <td>{dtasheet.calibration_frequency}</td>
                          <td>{dtasheet.frequency_type}</td>
                          <td>{dtasheet.date_of_reciept}</td>
                          <td>{dtasheet.ref_dc_no}</td>
                          <td>{dtasheet.issue_date}</td>
                          <td>{dtasheet.identification_marked_by}</td>
                          <td>{dtasheet.certificate_no}</td>
                          <td>{dtasheet.calibration_place}</td>
                          <td>{dtasheet.calibration_date}</td>
                          <td className="align-items-center">
                          <Link to={'/createCertificate/' + dtasheet.datasheet_id} className='btn'>
                            {/* <img src={certificate} alt="Create Cetificate" /> */}
                            <img src={certificate} alt="Image" style={{width: '25px', height:'25px'}}/>
                            Certificate</Link>
                          </td>
                          <td className="align-items-center">
                            <button onClick={() => deleteDatasheet(dtasheet.id)} className='btn'>
                            <img src={delete_record} alt="Delete" style={{width: '25px', height:'25px'}}/>
                            Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="pagination-wrapper mt-3">
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(filteredDatasheet.length / itemsPerPage) }, (_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button onClick={() => paginate(index + 1)} className="page-link">
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Datasheet;
