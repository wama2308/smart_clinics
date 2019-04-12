import { url, getDataToken } from "../core/connection";
import axios from 'axios'

const queryAllBranchOfficesExternalStaff = `${url}/api/queryAllBranchOfficesExternalStaff`;

export const AllMedicalOffices = data => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "post",
      url: queryAllBranchOfficesExternalStaff,
      data: {
        country_name: "venezuela",
        province_name: "guarico"
      },
      ...data
    }).then(res => {
      dispatch({
        type:'GET_ALL_BRANCHS',
        payload:{
         loading:'hide',
          ...res.data
        },
      })
    });
  });
};
