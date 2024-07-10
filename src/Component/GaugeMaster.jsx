import React, { useState, useEffect } from 'react';
import Service from '../Service/Service';
import { Link } from 'react-router-dom';
import './CSS/Global.css';

const GaugeMaster = () => {
  const [gauges, setGauges] = useState([]);
  const [query, setQuery] = useState('');
  const [searchGaugeItems, setSearchGaugeItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchCriteria, setSearchCriteria] = useState(''); // Default search criteria

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    Service.getAllGauge()
      .then((res) => {
        setGauges(res.data.reverse()); // Reverse the array to show latest entries first
        setSearchGaugeItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteGauge = (gauge_id) => {
    Service.deleteGauge(gauge_id)
      .then(() => {
        console.log("Gauge Deleted Successfully");
        // Refresh gauges list after deletion
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    let filteredGauges = [...searchGaugeItems];

    if (query && searchCriteria) {
      if (searchCriteria === 'gauge_range') {
        // Special case for searching by size range
        filteredGauges = filteredGauges.filter((gauge) => {
          const range = gauge[searchCriteria].toString().toLowerCase();
          const searchTerm = query.toLowerCase();
          
          // Check if range contains the search term (regardless of format)
          return range.includes(searchTerm);
        });
      } else {
        filteredGauges = filteredGauges.filter((gauge) =>
          gauge[searchCriteria].toString().toLowerCase().includes(query.toLowerCase())
        );
      }
    }

    setGauges(filteredGauges.reverse()); // Reverse to maintain order after search
  };

  const handleCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
    setQuery('');
    setGauges(searchGaugeItems.reverse()); // Reset and reverse gauges list when criteria changes
  };

  const handleReset = () => {
    setQuery('');
    setGauges(searchGaugeItems.reverse());
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gauges.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <h1>
                <div className='card-header fs-1 mt-5 text-center'>Gauge Details</div>
              </h1>
              <div className='card-body'>
                <div className="d-flex justify-content-between mb-3">
                  <Link to="/addGauge" className='btn mb-3 btn-primary'>Add New</Link>
                  <div className="d-flex align-items-center">
                    <div className="me-2">
                      <select
                        className="form-select"
                        value={searchCriteria}
                        onChange={handleCriteriaChange}
                      >
                        <option value="">--select--</option>
                        <option value="gauge_sr_no">Serial No.</option>
                        <option value="gauge_name">Gauge Name</option>
                        <option value="manufacture_id">Manufacturer ID</option>
                        <option value="gauge_range">Size Range</option>
                      </select>
                    </div>
                    <div className="me-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Search by ${searchCriteria}`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={!searchCriteria} // Disable input if no criteria selected
                      />
                    </div>
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    <button className="btn btn-secondary ms-2" onClick={handleReset}>Reset</button>
                  </div>
                </div>
                <div className='table-responsive'>
                  <table className="table table-striped">
                    <thead className='table_header'>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Gauge Name</th>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Gauge Type</th>
                        <th scope="col">Manufacturer Id</th>
                        <th scope="col">Size</th>
                        <th scope="col">Range</th>
                        <th scope="col">Make</th>
                        <th scope="col">Go-Were Limit</th>
                        <th scope="col">Instrument Type</th>
                        <th scope="col">Lower Size</th>
                        <th scope="col">Higher Size</th>
                        <th scope="col">Tolerance Type</th>
                        <th scope="col">Go Tolerance +</th>
                        <th scope="col">Go Tolerance -</th>
                        <th scope="col">NoGo Tolerance +</th>
                        <th scope="col">NoGo Tolerance -</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((gauge, index) => (
                        <tr key={gauge.gauge_id}>
                          <td>{index + indexOfFirstItem + 1}</td>
                          <td>{gauge.gauge_name}</td>
                          <td>{gauge.gauge_sr_no}</td>
                          <td>{gauge.gauge_type}</td>
                          <td>{gauge.manufacture_id}</td>
                          <td>{gauge.size}</td>
                          <td>{gauge.gauge_range}</td>
                          <td>{gauge.make}</td>
                          <td>{gauge.go_were_limit}</td>
                          <td>{gauge.instrument_type}</td>
                          <td>{gauge.lower_size}</td>
                          <td>{gauge.higher_size}</td>
                          <td>{gauge.tolerance_type}</td>
                          <td>{gauge.go_tolerance_plus}</td>
                          <td>{gauge.go_tolerance_minus}</td>
                          <td>{gauge.nogo_tolerance_plus}</td>
                          <td>{gauge.nogo_tolerance_minus}</td>
                          <td className="d-flex align-items-center">
                            <Link to={'/updateGauge/' + gauge.gauge_id} className='btn btn-sm btn-primary'>Edit</Link>
                            <Link to={'/addDatasheet/' + gauge.gauge_id} className='btn btn-sm btn-dark ms-2'>Datasheet</Link>
                            <button onClick={() => deleteGauge(gauge.gauge_id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="pagination-wrapper">
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(gauges.length / itemsPerPage) }, (_, index) => (
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

export default GaugeMaster;
