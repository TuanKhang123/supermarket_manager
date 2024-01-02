import axios from "axios";
import { internshipTransport } from "../../config/http/transport";

const audit = {
    getAllAudit: async (data) => {
        let url = `/api/inventories/list?${data?.search ? `search=${data?.search}` : ''}${data?.date ? `&from=${data?.date[0]}&to=${data?.date[1]}` : ''}`
        return internshipTransport.get(url);
    },

    getAuditById: async (data) => {
        // let url = `/api/accounts?${data?.search ? `&search=${data?.search}` : ''}${data?.status ? `&status=${data?.status - 1}` : ''}`;
        // return internshipTransport.get(url);
    },

    createAudit: async (data) => {
        console.log(data);
        let url = `/api/inventories/create`;
        return internshipTransport.post(url, data);
    },


    // getAccountById: async (data) => {
    //     let url = `/api/accounts/${data?.id}`;
    //     return internshipTransport.get(url)
    // },

    // createAccount: async (data) => {
    //     console.log(data);
    //     let url = `/api/accounts/create-staff-account`;
    //     return internshipTransport.post(url, data)
    // },





}
export default audit