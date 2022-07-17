import {
  useState, useEffect
} from "react";

function useFetchUser() {
  const [data, setdata] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/user`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      mode: 'no-cors'
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setdata(data);
        setisLoading(false)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])
  return { data, isLoading, error }
}
export default useFetchUser;