import React, { useState, useEffect } from 'react';
import Service from '../Service/Service';
import { Link } from 'react-router-dom';
import pdf from './assets/pdf.png';
import with_data from './assets/with_data.png';
import blank_report from './assets/verify_report.png';
import verify_report from './assets/blank_report.png'
import delete_report from './assets/delete.png'
// import excel from './assets/excel_icon.png'

const CertificateGrid = () => {
  const [certificates, setCertificates] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchText, setSearchText] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [certId, setCertId] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);
  
  const fetchCertificates = () => {
    Service.getAllCertificates()
      .then((res) => {
        console.log('Fetched certificates:', res.data);
        setCertificates(res.data);
      })
      .catch((error) => {
        console.error('Error fetching certificates:', error);
      });
  };

  const handleSearchCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    console.log('Search criteria:', searchCriteria);
    console.log('Search text:', searchText);
  };

  const handleApprove = (certId) => {
    const password = prompt('Enter password for approval:');
    if (password === 'admin') {
      setAuthenticated(true);
      setCertId(certId);
    } else {
      alert('Incorrect password. Approval denied.');
    }
  };

  const downloadWithDataReport = (cert_id) => {
    Service.downloadWithDataReport(cert_id)
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Report${cert_id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  // Clean up the link element
        URL.revokeObjectURL(url);  // Clean up the object URL
      })
      .catch((error) => {
        console.error('Error downloading report:', error);
      });
  };

  const downloadBlankReport = (cert_id) => {
    Service.downloadBlankReport(cert_id)
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Report${cert_id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  // Clean up the link element
        URL.revokeObjectURL(url);  // Clean up the object URL
      })
      .catch((error) => {
        console.error('Error downloading report:', error);
      });
  };

  const downloadVerifyReport = (cert_id) => {
    Service.downloadVerifyReport(cert_id)
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Report${cert_id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  // Clean up the link element
        URL.revokeObjectURL(url);  // Clean up the object URL
      })
      .catch((error) => {
        console.error('Error downloading report:', error);
      });
  };

  const downloadReport = (cert_id) => {
    Service.downloadReport(cert_id)
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Report${cert_id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  // Clean up the link element
        URL.revokeObjectURL(url);  // Clean up the object URL
      })
      .catch((error) => {
        console.error('Error downloading report:', error);
      });
  };

  const deleteCertificate = (id) => {
    Service.deleteCertificate(id)
      .then((res) => {
        console.log('Certificate deleted successfully');
        fetchCertificates(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error('Error deleting certificate:', error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <h1 className="card-header fs-1 mt-5 text-center">Certificate Details</h1>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Link to="/addCertificate" className="btn btn-primary">
                    Add New
                  </Link>
                </div>
                <div className="d-flex align-items-center">
                  <select
                    className="form-select me-2"
                    value={searchCriteria}
                    onChange={handleSearchCriteriaChange}
                  >
                    <option value="">Select Search Criteria</option>
                    <option value="gauge_name">Gauge Name</option>
                    <option value="gauge_sr_no">Gauge Sr No</option>
                    <option value="calibration_date">Calibration Date</option>
                    <option value="certificate_no">Certificate No.</option>
                    <option value="calibration_place">Calibration Place</option>
                  </select>
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Enter search text"
                    value={searchText}
                    onChange={handleSearchTextChange}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                    disabled={!searchCriteria || !searchText}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Gauge Name</th>
                      <th scope="col">Gauge Sr No</th>
                      <th scope="col">Gauge Type</th>
                      <th scope="col">Calibration Date</th>
                      <th scope="col">Next Due Date</th>
                      <th scope="col">Frequency</th>
                      <th scope="col">Frequency Type</th>
                      <th scope="col">Date of Reciept</th>
                      <th scope="col">issue Date</th>
                      <th scope="col">Identification Marked By</th>
                      <th scope="col">Certificate No.</th>
                      <th scope="col">Calibration Place</th>
                      <th scope="col">Blank Report</th>
                      <th scope="col">With Data Report</th>
                      <th scope="col">Verify Report</th>
                      <th scope="col">Approve</th>
                      <th scope="col">Final Report</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((certificate, index) => (
                      <tr key={certificate.id}>
                        <td>{index + 1}</td>
                        <td>{certificate.gaugeMaster ? certificate.gaugeMaster.gauge_name : 'N/A'}</td>
                        <td>{certificate.gaugeMaster ? certificate.gaugeMaster.gauge_sr_no : 'N/A'}</td>
                        <td>{certificate.gaugeMaster ? certificate.gaugeMaster.gauge_type : 'N/A'}</td>
                        <td>{certificate.datasheet ? certificate.datasheet.calibration_date : 'N/A'}</td>
                        <td>{certificate.datasheet ? certificate.datasheet.next_calibration_date : 'N/A'}</td>
                        <td>{certificate.datasheet ? certificate.datasheet.calibration_frequency : 'N/A'}</td>
                        <td>{certificate.datasheet ? certificate.datasheet.frequency_type : 'N/A'}</td>
                        <td>{certificate.datasheet ? certificate.datasheet.date_of_reciept : 'N/A'}</td>
                        <td>{certificate.datasheet ? certificate.datasheet.issue_date : 'N/A'}</td>
                        <td>{certificate.datasheet ? certificate.datasheet.identification_marked_by : 'N/A'}</td>
                        <td>{certificate.datasheet ? certificate.datasheet.certificate_no : 'N/A'}</td>
                        <td>{certificate.datasheet ? certificate.datasheet.calibration_place: 'N/A'}</td>
                        <td className='align-items-center'>
                          <button
                            onClick={() => downloadVerifyReport(certificate.cert_id)}
                            className="btn btn-sm"
                          >
                            <img src={verify_report} alt="Image" style={{width: '25px', height:'25px'}}/>
                            Download
                          </button>  
                        </td>
                        <td className='align-items-center'>
                          <button
                            onClick={() => downloadWithDataReport(certificate.cert_id)}
                            className="btn btn-sm"
                          >
                            <img src={with_data} alt="Image" style={{width: '25px', height:'25px'}}/>
                            Download
                          </button>  
                        </td>
                        <td className='align-items-center'>
                          <button
                            onClick={() => downloadBlankReport(certificate.cert_id)}
                            className="btn btn-sm"
                          >
                            <img src={blank_report} alt="Image" style={{width: '25px', height:'25px'}}/>
                            Download
                          </button>  
                        </td>
                        <td className='align-items-center'>
                          <button className='btn align-items-center font-bold'
                            onClick={() => handleApprove(certId)}>
                            Approve
                          </button>
                        </td>
                        <td className='align-items-center'>
                          <button
                            onClick={() => downloadReport(certificate.cert_id)}
                            className="btn "
                          >
                            <img src={pdf} alt="Image" style={{width: '25px', height:'25px'}}/>
                            Download
                          </button>                       
                        </td>
                        <td className='align-items-center'>
                          <button
                            onClick={() => deleteCertificate(certificate.id)}
                            className="btn"
                          >
                            <img src={delete_report} alt="Delete" style={{width: '25px', height:'25px'}}/>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGrid;
