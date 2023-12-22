import axios from "axios";
import { internshipTransport } from "../../config/http/transport";


const user = {
    getUser: async (data) => {
        
        const url = '/api/auth/login'; 
        return internshipTransport.post(url, data);
    },
}
export default user
