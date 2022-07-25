import axios from "axios";
import {
  useState, useEffect
} from "react";
import { baseUrl } from "../../App";

function useFetchUser() {
  const response = JSON.parse(localStorage.getItem('form-Data'))
  const token = response.token
  const [initialData, setInitialData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect((e) => {
    axios({
      method: 'post',
      headers: { 
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      url: baseUrl + '/profile',
      data: setInitialData(initialData)
    })
      .then(res => {
        console.log(res)
        setInitialData({
          firstName: res.data.body.firstName,
          lastName: res.data.body.lastName,
          email: res.data.body.email,
          password: res.data.body.password
        });
        setisLoading(false)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [token, initialData])
  return { initialData, isLoading, error }
}
export default useFetchUser;