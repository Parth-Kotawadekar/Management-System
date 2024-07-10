import './App.css';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import { Route, Routes } from 'react-router-dom';
import Employee from './Component/Employee';
import Menu from './Component/Menu';
import EditEmployee from './Component/EditEmployee';
import AddEmployee from './Component/AddEmployee';
import GaugeMaster from './Component/GaugeMaster';
import AddGaugeMaster from './Component/AddGaugeMaster'
import EditGauge from './Component/EditGauge';
import CombinedMaster1 from './Component/CombinedMaster1'
import CombinedMaster2 from './Component/CombinedMaster2';
import AddCombinedMaster2 from './Component/AddCombinedMaster2'
import AddCombineMaster1 from './Component/AddCombineMaster1';
import EditCombineMaster1 from './Component/EditCombineMaster1'
import Customer from './Component/Customer';
import AddCustomer from './Component/AddCustomer'
import EditCombinedMaster2 from './Component/EditCombineMaster2';
import DataSheet from './Component/DataSheet';
import AddDatasheet from './Component/AddDatasheet';
import CreateCertificate from './Component/CreateCertificate'
import CertificateGrid from './Component/CertificateGrid.jsx'
import EditCustomer from './Component/EditCustomer.jsx';
import Certtificate_Ulr_Details from './Component/Certtificate_Ulr_Details.jsx';

function App() {

return(
  <>
  <Navbar/>
    <Routes>
          
          <Route path='/menu' element={<Menu/>}></Route>

          <Route path='/employee' element={<Employee/>}></Route>
          <Route path='/addEmployee' element={<AddEmployee/>}></Route>
          <Route path='/editEmployee/:id' element={<EditEmployee/>}></Route>

          <Route path='/gaugeMaster' element={<GaugeMaster/>}></Route>
          <Route path='/addGauge' element={<AddGaugeMaster/>}></Route>
          <Route path='/updateGauge/:id' element={<EditGauge/>}></Route>

          <Route path='/master1' element={<CombinedMaster1/>}></Route>
          <Route path='/addMaster1' element={<AddCombineMaster1/>}></Route>
          <Route path='/editMaster1/:id' element={<EditCombineMaster1/>}></Route>

          <Route path='/master2' element={<CombinedMaster2/>}></Route>
          <Route path='/addCombinedMaster2' element={<AddCombinedMaster2/>}></Route>
          <Route path='/editCombinedMaster2/:id' element={<EditCombinedMaster2/>}></Route>

          <Route path='/customer' element={<Customer/>}></Route>
          <Route path='/addCustomer' element={<AddCustomer/>}></Route>
          <Route path='/updateCustomer/:id' element={<EditCustomer/>}></Route>

          <Route path='/datasheet' element={<DataSheet/>}></Route>
          <Route path='/addDatasheet/:id' element={<AddDatasheet/>}></Route>

          <Route path='/certificateulrdetails' element={<Certtificate_Ulr_Details/>}></Route>
          

          <Route path='/certificate' element={<CertificateGrid/>}></Route>
          <Route path='/createCertificate/:datasheet_id' element={<CreateCertificate/>}></Route>
          {/* <Route path='/createCertificate/:datasheet_id' element={<Dumm/>}></Route> */}

          
  </Routes>
  <Footer/>
  </>
);

}

export default App;