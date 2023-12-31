import { useCallback, useEffect, useState } from "react"
import { internshipTransport } from "../config/http/transport";

const useFetch = (url) => {
    const [loading, setLoading] = useState();
    const [data, setData] = useState();

    const getData = useCallback(async () => {
        setLoading(_ => true);
        const res = await internshipTransport.get(url);
        setData(res.data);
        setLoading(_ => false);
    }, [url]);

    useEffect(_ => {
        getData();
    }, [getData]);

    return { data, loading };
}

export default useFetch;