import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Service from '../Service/Service';
import './CSS/Global.css'

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    Service.getAllEmployee()
      .then((res) => {
        setEmployees(res.data);
        setSearchItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEmployee = (id) => {
    Service.deleteEmployee(id)
      .then(() => {
        console.log("Employee Deleted Successfully");
        init(); // Fetch the updated employee list after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const getSearch = e.target.value.toLowerCase();
    setQuery(getSearch);

    if (getSearch.length > 0) {
      const searchResult = searchItems.filter((item) =>
        item.email.toLowerCase().includes(getSearch)
      );
      setEmployees(searchResult);
    } else {
      setEmployees(searchItems);
    }
  };

  return (
    <>
      <div class='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <h2><div className='heading text-center'>Employee Details</div></h2>
              <div className='card_body card-body'>
                <div className="d-flex justify-content-between mb-3">
                  <Link to="/addEmployee" className='btn mb-3 btn-primary'>Add New</Link>
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
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Country</th>
                        <th scope="col">State</th>
                        <th scope="col">City</th>
                        <th scope="col">Pin code</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Department</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp, index) => (
                        <tr key={emp.id}>
                          <td>{index + 1}</td>
                          <td>{emp.first_name + ' ' + emp.last_name}</td>
                          <td>{emp.address}</td>
                          <td>{emp.country}</td>
                          <td>{emp.state}</td>
                          <td>{emp.city}</td>
                          <td>{emp.pincode}</td>
                          <td>{emp.email}</td>
                          <td>{emp.contact}</td>
                          <td>{emp.designation}</td>
                          <td>{emp.department}</td>
                          <td className="d-flex align-items-center">
                            <Link to={'/editEmployee/' + emp.id} className='btn btn-sm btn-primary'>Edit</Link>
                            <button onClick={() => deleteEmployee(emp.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
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
    </>
  );
};

export default Employee;
