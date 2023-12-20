import axios from "axios";
import { internshipTransport } from "../../config/http/transport";


const user = {
    getUser: async (data) => {
        console.log(data);
        const url = '/api/auth/login'; 

        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // };
        // const response = await axios.post(
        //     "https://supermarketbe-production.up.railway.app/api/auth/login",
        //     JSON.stringify(data),
        //     config
        // );

        // return response.data;
        return internshipTransport.post(url, data);


    },
}
export default user
