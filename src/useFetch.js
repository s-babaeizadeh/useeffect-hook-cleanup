import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // fetch data using fetch
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   setTimeout(async () => {
  //     try {
  //       const response = await fetch(url, { signal: abortController.signal });
  //       if (response.status >= 200 && response.status < 300) {
  //         const data = await response.json();
  //         setData(data);
  //         setIsPending(false);
  //         setError(null);
  //       } else {
  //         throw new Error(`${response.status}: ${response.statusText}`);
  //       }
  //     } catch (error) {
  //       if (error.name === "AbortError") {
  //         console.log("fetch aborted");
  //       } else {
  //         setError(error.message);
  //         setIsPending(false);
  //       }
  //     } finally {
  //       return () => abortController.abort();
  //     }
  //   }, 1000);
  // }, [url]);

  // fetch data using axios
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    setTimeout(async () => {
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          setIsPending(false);
          setError(null);
        } else {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('axios request cancelled');
        } else {
          setError(error.message);
          setIsPending(false);
        }
      } finally {
        return () => source.cancel('axios request cancelled');
      }
    }, 1000);
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
