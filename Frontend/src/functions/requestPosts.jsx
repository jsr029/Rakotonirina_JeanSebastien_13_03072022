import axios from "axios";
const API_URL = "http://127.0.0.1:3001/api/v1";

async function httpGetAllPosts() {
  const response = await axios({
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    url: API_URL + '/login',
  });
  console.log(response.data)
  return response.data;
}

export { httpGetAllPosts};
