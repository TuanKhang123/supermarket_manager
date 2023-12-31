import axios from "axios";
import { internshipTransport } from "../../config/http/transport";

const account = {
    getAllAccount: async (data) => {
        let url = `/api/accounts?${data?.search ? `&search=${data?.search}` : ''}${data?.status ? `&status=${data?.status - 1}` : ''}`;
        return internshipTransport.get(url);
    },

    getAccountById: async (data) => {
        let url = `/api/accounts/${data?.id}`;
        return internshipTransport.get(url)
    },

    createAccount: async (data) => {
        console.log(data);
        let url = `/api/accounts/create-staff-account`;
        return internshipTransport.post(url, data)
    },

    updateAccount: async (data) => {
        let url = `/api/accounts/update/${data?.id}`;
        console.log(data?.dataSend);
        return internshipTransport.put(url, data?.dataSend)
    },

    deleteAccount: async (data) => {
        // let url = `/api/accounts/update/${data?.id}`;
        // console.log(data?.dataSend);
        // return internshipTransport.put(url, data?.dataSend)
    },







}
export default account