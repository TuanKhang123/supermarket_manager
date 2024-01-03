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
        let url = `/api/accounts/create-staff-account`;
        return internshipTransport.post(url, data)
    },

    updateAccount: async (data) => {
        let url = `/api/accounts/update/${data?.id}`;
        return internshipTransport.put(url, data?.dataSend);
    },

    blockAccount: async (data) => {
        let url = `/api/accounts/block/${data?.id}`;
        return internshipTransport.post(url);
    },

    unblockAccount: async (data) => {
        let url = `/api/accounts/unblock/${data?.id}`;
        return internshipTransport.post(url);
    },

}
export default account