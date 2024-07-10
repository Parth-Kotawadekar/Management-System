import axios from "axios";

const baseUrl = "http://localhost:8091/api";

class Service{

        //EMPLOYEE SERVICES
        static async getAllEmployee(){
                return axios.get(baseUrl + '/all');
        }

        static async addEmployee(employee){
                const response = await fetch(baseUrl + '/addNew',{
                        method:'POST',
                        headers:{
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(employee)
                });
                return response.json();
        }

        static async editEmployee(employee){
                return axios.put(baseUrl + '/editEmployee/' + employee.id, employee, {
                        headers:{
                                'Content-Type' : 'application/json',
                        },body: JSON.stringify(employee)
                });
        }

        static async deleteEmployee(gauge_id){
                const response = await fetch((baseUrl + '/deleteEmployee/' + gauge_id),{
                        method:'DELETE',
                        headers:{
                                'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify(gauge_id)
                });
                return response.json();
        
        }

        static async getEmployeeById(id){
                return axios.get(baseUrl + "/emp/" + id);
        }

        // CUSTOMER SERVICES
        static async getAllCustomers(){
                return axios.get(baseUrl + '/showAllCustomer');
        }

        static async addNewCustomer(customer){
                const response = await fetch(baseUrl + '/addcustomer',{
                        method:'POST',
                        headers:{
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(customer)
                });
                return response.json();
        }

        static async editCustomer(customer){
                return axios.put(baseUrl + '/editCust/' + customer.id, customer, {
                        headers:{
                                'Content-Type' : 'application/json',
                        },body: JSON.stringify(customer)
                });
        }

        static async deleteCustomer(id){
                const response = await fetch((baseUrl + '/deletecust/' + id),{
                        method:'DELETE',
                        headers:{
                                'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify(id)
                });
                return response.json();
        
        }

        static async getCustomerById(id){
                return axios.get(baseUrl + "/getcust/" + id);
        }

        // Methods for Gauge
        static async getAllGauge(){
                return axios.get(baseUrl + '/allGauges');
        }

        static async addGauge(gauge){
                const response = await fetch(baseUrl + '/addNewGauge',{
                        method:'POST',
                        headers:{
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(gauge)
                });
                return response.json();
        }

        static async editGauge(gauge){
                return axios.put(baseUrl + '/editGauge/' + gauge.gauge_id, gauge, {
                        headers:{
                                'Content-Type' : 'application/json',
                        },body: JSON.stringify(gauge)
                });
        }

        static async deleteGauge(gauge_id){
                const response = await fetch((baseUrl + '/deleteGauge/' + gauge_id),{
                        method:'DELETE',
                        headers:{
                                'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify(gauge_id)
                });
                return response.json();
        
        }

        static async getGaugeById(gauge_id){
                return axios.get(baseUrl + "/gauge/" + gauge_id);
        }

        // Methods for Combined Master 1
        static async getCombinedMaster1(){
                return axios.get(baseUrl + '/showAllmaster1');
        }

        static async addNewCombinedMaster1(master1){
                const response = await fetch(baseUrl + '/addNewmaster1',{
                        method:'POST',
                        headers:{
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(master1)
                });
                return response.json();
        }

        static async editCombinedMaster1(master1){
                return axios.put(baseUrl + '/editmaster1/' + master1.id, master1, {
                        headers:{
                                'Content-Type' : 'application/json',
                        },body: JSON.stringify(master1)
                });
        }

        static async deleteCombinedMaster1(id){
                const response = await fetch((baseUrl + '/deletemaster1/' + id),{
                        method:'DELETE',
                        headers:{
                                'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify(id)
                });
                return response.json();
        
        }

        static async getCombinedMasterById(id){
                return axios.get(baseUrl + "/master1/" + id);
        }

        // Methods for combined master 2
        static async getCombinedMaster2(){
                return axios.get(baseUrl + '/showAllmaster2');
        }

        static async addNewCombinedMaster2(master2){
                const response = await fetch(baseUrl + '/addNewmaster2',{
                        method:'POST',
                        headers:{
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(master2)
                });
                return response.json();
        }

        static async editCombinedMaster2(master2){
                return axios.put(baseUrl + '/editmaster2/' + master2.id, master2, {
                        headers:{
                                'Content-Type' : 'application/json',
                        },body: JSON.stringify(master2)
                });
        }

        static async deleteCombinedMaster2(id){
                const response = await fetch((baseUrl + '/deletemaster2/' + id),{
                        method:'DELETE',
                        headers:{
                                'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify(id)
                });
                return response.json();
        
        }

        static async getCombinedMaster2ById(check_id){
                return axios.get(baseUrl + "/master2/" + check_id);
        }

        // Methods for Datasheets
        static async getAllDatasheets(){
                return axios.get(baseUrl + '/showdatasheets');
        }

        static async editCombinedMaster2(master2){
                return axios.put(baseUrl + '/editmaster2/' + master2.id, master2, {
                        headers:{
                                'Content-Type' : 'application/json',
                        },body: JSON.stringify(master2)
                });
        }

        static async deleteCombinedMaster2(id){
                const response = await fetch((baseUrl + '/deleteDatasheet/' + id),{
                        method:'DELETE',
                        headers:{
                                'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify(id)
                });
                return response.json();
        
        }

        static async getCombinedMaster2ById(id){
                return axios.get(baseUrl + "/master2/" + id);
        }

        static async getGaugeMasterById(id){
                return axios.get(baseUrl + "/datasheet/" + id);
        }

        static async createDatasheet(datasheet){
                const response = await fetch(baseUrl + '/save_datasheet',{
                        method:'POST',
                        headers:{
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datasheet)
                });
                return response.json();
        }

        static async deleteDatasheetById(id){
                const response = await fetch((baseUrl + '/deletedatasheet/' + id),{
                        method:'DELETE',
                        headers:{
                                'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify(id)
                });
                return response.json();
        
        }

        //Services for creating certificates
        static async getDatasheetById(id){
                return axios.get(baseUrl + '/datasheet/' + id);
        }


        // Methods for Combined Master 1
        static async getAllCertificates(){
                return axios.get(baseUrl + '/all_certificates');
        }

        static async createCertificate(certificate){
                const response = await fetch(baseUrl + '/save_certificate',{
                        method:'POST',
                        headers:{
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(certificate)
                });
                return response.json();
        }

        static async getCertificateById(id){
                return axios.get(baseUrl + '/certificate/' + id);
        }

        // Download Report by id
        static async downloadReport(cert_id){
                return axios.get(baseUrl + '/downloadfinalreport/' + cert_id, { responseType: 'blob' });
        }

        static async downloadBlankReport(cert_id){
                return axios.get(baseUrl + '/downloadverifyeport/' + cert_id, { responseType: 'blob' });
        }

        static async downloadVerifyReport(cert_id){
                return axios.get(baseUrl + '/downloadblankreport/' + cert_id, { responseType: 'blob' });
        }

        static async downloadWithDataReport(cert_id){
                return axios.get(baseUrl + '/downloadwithdatareport/' + cert_id, { responseType: 'blob' });
        }

        // Services for Cert ULR No
        static async getALLCERTULR(){
                return axios.get(baseUrl + '/allcert');
        }


}

export default Service

