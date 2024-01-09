import { internshipTransport } from "../../config/http/transport";

const statistic = {
    getStatistic: async (month, year) => {
        const url = `/api/dashboard?month=${month}&year=${year}`; 
        return internshipTransport.get(url);
    },
}
export default statistic
