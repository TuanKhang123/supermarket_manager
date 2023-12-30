import axios from "axios";
import { internshipTransport } from "../../config/http/transport";


const user = {
    login: async (data) => {
        
        const url = '/api/auth/login'; 
        return internshipTransport.post(url, data);
    },
    getUser: async () => {
        const url = "api/accounts/token";
        return internshipTransport.get(url); 
    }
}
export default user
