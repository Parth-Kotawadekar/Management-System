import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Service from '../Service/Service';

const Certtificate_Ulr_Details = () => {

    const [Certificate, setCertificate] = useState([]);

    useEffect(() => {
        init();
      }, []);

    const init = () => {
        Service.getALLCERTULR()
          .then((res) => {
            setCertificate(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
    };

  return (
    <>
        <div class='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <h2><div className='heading text-center'>Certificate ULR Details</div></h2>
              <div className='card_body card-body'>
                <div className="d-flex justify-content-between mb-3">
                  <Link to="/addEmployee" className='btn mb-3 btn-primary'>Add New</Link>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Certificate No.</th>
                        <th scope="col">Ulr No.</th>
                        <th scope="col">Created On</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Certificate.map((cert, index) => (
                        <tr key={cert.id}>
                          <td>{index + 1}</td>
                          <td>{cert.certificate_no}</td>
                          <td>{cert.ulr_no}</td>
                          <td>{cert.created_on_date}</td>
                          <td className="d-flex align-items-center">
                            {/* <Link to={'/editEmployee/' + emp.id} className='btn btn-sm btn-primary'>Edit</Link> */}
                            {/* <button onClick={() => deleteEmployee(emp.id)} className='btn btn-sm btn-danger ms-2'>Delete</button> */}
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
  )
}

export default Certtificate_Ulr_Details