import React, { useState, useEffect } from 'react';
import Service from '../Service/Service';
import { Link } from 'react-router-dom';
import './CSS/Global.css'

const CombinedMaster1 = () => {
  const [master1, setMaster1] = useState([]);
  const [searchReportingMaster, setSearchReportingMaster] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    Service
      .getCombinedMaster1()
      .then((res) => {
        setMaster1(res.data);
        setSearchReportingMaster(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteReportingMaster = (id) => {
    Service
      .deleteCombinedMaster1(id)
      .then(() => {
        console.log("Item Deleted Successfully");
        // Remove the deleted item from the state
        setMaster1((prevMaster1) => prevMaster1.filter((item) => item.id !== id));
        setSearchReportingMaster((prevSearchReportingMaster) => prevSearchReportingMaster.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery.length > 0) {
      const filteredMaster = searchReportingMaster.filter((item) =>
        item.rep_sr_no.toLowerCase().includes(searchQuery)
      );
      setMaster1(filteredMaster);
    } else {
      setMaster1(searchReportingMaster);
    }
  };

  return (
    <>
      <div className='container col-md-12'>
        <div className='row'>
          <div>
            <div className='card col-md-12'>
              <h1>
                <div className='card-header fs-1 mt-5 text-center'>Reporting Master</div>
              </h1>
              <div className='card-body'>
                <div className="d-flex justify-content-between mb-3">
                  <Link to="/addMaster1" className='btn mb-3 btn-primary'>Add New</Link>
                  <div className="searchbox">
                    <input 
                      type="text" 
                      placeholder='Search'
                      className='form-control'
                      value={query}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Report Serial No.</th>
                        <th scope="col">Condition Description</th>
                        <th scope="col">Test Purpose</th>
                        <th scope="col">Method Number</th>
                        <th scope="col">Method Description</th>
                        <th scope="col">Gauge Type</th>
                        <th scope="col">Size</th>
                        <th scope="col">Equipment Description</th>
                        <th scope="col">Equipment Serial No.</th>
                        <th scope="col">Calibration Date</th>
                        <th scope="col">Validity Date</th>
                        <th scope="col">&nbsp;&nbsp;Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        master1.map((mast1, num) => (
                          <tr key={mast1.id}>                  
                            <td>{num + 1}</td>
                            <td>{mast1.rep_sr_no}</td>
                            <td>{mast1.condition_description}</td>
                            <td>{mast1.test_purpose}</td>
                            <td>{mast1.method_number}</td>
                            <td>{mast1.method_description}</td>
                            <td>{mast1.gauge_type}</td>                      
                            <td>{mast1.size}</td>
                            <td>{mast1.equipment_description}</td>
                            <td>{mast1.equipment_sr_no}</td>
                            <td>{mast1.calibration_date}</td>
                            <td>{mast1.validity_date}</td>
                            <td className="d-flex align-items-center">
                              <Link to={'/editMaster1/' + mast1.id} className='btn btn-sm btn-primary me-2'>Edit</Link>
                              <button onClick={() => deleteReportingMaster(mast1.id)} className='btn btn-sm btn-danger'>Delete</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CombinedMaster1;
