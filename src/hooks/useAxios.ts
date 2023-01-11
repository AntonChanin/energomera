import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_AGRO_URL;

const useAxios = (queryParams: Record<string, string | number>) => {
    const [response, setResponse] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const keys = Object.keys(queryParams);
    const values = Object.values(queryParams);

    const fetchData = () => {
      axios
        .get(`field?${
          values
          .map((value, index) => (`${index !== 0 ? '&': ''}${keys[index]}=${value}`))
          .join('')
        }`)
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
      fetchData();
    }, []);

    return { response, error, loading };
};

export default useAxios;
