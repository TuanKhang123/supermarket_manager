import axios from "axios";
import { internshipTransport } from "../../config/http/transport";

const Category = {
    getAllCategory: async (data) => {
        let url = `/api/categories/all`;
        return internshipTransport.get(url);
    },

    getCategoryById: async (data) => {
        let url = `/api/accounts/${data?.id}`;
        // return internshipTransport.get(url)
    },

    createCategory: async (data) => {
        let url = `/api/categories/create`;
        return internshipTransport.post(url, data)
    },

    updateCategory: async (data) => {
        let url = `/api/categories/update/${data?.id}`;
        return internshipTransport.put(url, data)
    },

    deleteCategory: async (data) => {
        let url = `/api/categories/delete/${data?.id}`;
        return internshipTransport.put(url)
    },

}
export default Category