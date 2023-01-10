// useAxios hook (first draft)

import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_AGRO_URL;

const useAxios = () => {
    const [response, setResponse] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
      axios
        .get('')
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

    // custom hook returns value
    return { response, error, loading };
};

export default useAxios;
