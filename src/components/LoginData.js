import axios from 'axios';

const BASE_URL = 'http://192.168.0.114:8000';

export {getLoginData};


function getLoginData(){
  const url = `${BASE_URL}/apiCheckMaster`;

  return axios.get(url).
  then((res) => {
    return res.data;
    console.log(res.data);
  });
}
