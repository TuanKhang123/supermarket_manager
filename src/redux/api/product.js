import axios from "axios";
import { internshipTransport } from "../../config/http/transport";

const product = {
    // For example
    // http://localhost:8000/product/getcategory
    // GET
    // getCart: (data) => {
    //     let url = '';
    //     if (data[0] != undefined && data[1] != undefined) {
    //         url = `/api/carts?no=${data[0]}&limit=${data[1]}`;
    //     } else {
    //         url = `/api/carts`;
    //     }
    //     return internshipTransport.get(url);
    // },

    // POST
    // addProductToCart: (data) => {
    //     const url = `/api/carts`;
    //     return internshipTransport.post(url, data);
    // },

    // DELETE
    // deleteProductFromCart: (id) => {
    //     const url = `/api/carts?product_id=${id}`;
    //     return internshipTransport.delete(url);
    // },

    // PUT
    // updateQuantity: (data) => {
    //     const url = `/api/carts`;
    //     return internshipTransport.put(url, data);
    // },

    getAllProduct: async (data) => {
        console.log(data);
        let url = `/api/products/all?${data?.search ? `search=${data?.search}` : ''}`;
        return internshipTransport.get(url);
    },

}
export default product