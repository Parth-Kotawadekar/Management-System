import React, { useState, useEffect } from 'react';
import Service from '../Service/Service';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './CSS/Global.css'

const CombinedMaster2 = () => {
  const [master2, setMaster2] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    Service.getCombinedMaster2()
      .then((res) => {
        setMaster2(res.data);
        setSearchItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const getSearch = e.target.value.toLowerCase();

    if (getSearch.length > 0) {
      const searchResults = searchItems.filter((item) =>
        item.type_sr_no && item.type_sr_no.toLowerCase().includes(getSearch)
      );
      setMaster2(searchResults);
    } else {
      setMaster2(searchItems);
    }

    setQuery(getSearch);
  };

  const deleteCheckPointMaster = (id) => {
    Service.deleteCombinedMaster2(id)
      .then(() => {
        console.log("Record Deleted Successfully");
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const exportToExcel = () => {
    const fileName = 'CheckpointDetails.xlsx';
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const ws = XLSX.utils.json_to_sheet(master2);
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
  };

  return (
    <div className='container col-md-12'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <h1>
              <div className='card-header fs-1 mt-5 text-center'>Checkpoint Master</div>
            </h1>
            <div className='card-body'>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <Link to="/addCombinedMaster2" className='btn btn-primary'>Add New</Link>
                </div>
                <div className="searchBox">
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
                <table className="table table-bordered">
                  <thead className='table-$indigo-800'>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Serial Number</th>
                      <th scope="col">Gauge Type</th>
                      <th scope="col">Size Range</th>
                      <th scope="col">Point of Measurement</th>
                      <th scope="col">Least Count</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {master2.map((mast, num) => (
                      <tr key={mast.id}>
                        <td>{num + 1}</td>
                        <td>{mast.type_sr_no}</td>
                        <td>{mast.gauge_type}</td>
                        <td>{mast.size_range}</td>
                        <td>{mast.point_of_measurement}</td>
                        <td>{mast.least_count}</td>
                        <td className="d-flex align-items-center">
                          <Link to={'/editCombinedMaster2/' + mast.id} className='btn btn-sm btn-primary'>Edit</Link>
                          <button onClick={() => deleteCheckPointMaster(mast.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="export-button-container">
                  <button className="btn btn-success ms-2" onClick={exportToExcel}>Export to Excel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedMaster2;
