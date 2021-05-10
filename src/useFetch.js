import React, { useEffect, useState } from "react"
import axios from "axios"

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  //fetch data using fetch
  // useEffect(() => {
  //   const abortCont = new AbortController()
  //   setTimeout(() => {
  //     fetch(url, { signal: abortCont.signal })
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw Error("could not fetch data for that result")
  //         }
  //         return res.json()
  //       })
  //       .then((data) => {
  //         setData(data)
  //         setIsPending(false)
  //         setError(null)
  //       })
  //       .catch((err) => {
  //         if (err.name === "AbortError") {
  //           console.log("fetch aborted")
  //         } else {
  //           setError(err.message)
  //           setIsPending(false)
  //         }
  //       })
  //   }, 1000)
  //   return () => abortCont.abort()
  // }, [url])
  // return { data, isPending, error }

  // fetch data using axios
  useEffect(() => {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    setTimeout(() => {
      const fetchData = async () => {
        setError(null)
        setIsPending(true)
        try {
          const res = await axios.get(url, { cancelToken: source.token })
          setData(res.data)
          setIsPending(false)
          setError(null)
        } catch (error) {
          if (axios.isCancel(error)) {
            return "axios request cancelled"
          } else {
            setError(error)
            setIsPending(false)
          }
        }
      }
      fetchData()
    }, 1000)
    return () => source.cancel("axios request cancelled")
  }, [url])
  return { data, isPending, error }
}

export default useFetch
