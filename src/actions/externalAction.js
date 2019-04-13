import { url, getDataToken } from "../core/connection";
import axios from 'axios'

const queryAllBranchOfficesExternalStaff = `${url}/api/queryAllBranchOfficesExternalStaff`;
const allExternalStaffUrl = `${url}/api/querySubscribeExternalStaff`

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
         data:res.data
        },
      })
    });
  });
};


export const  allExternalStaff=() => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "post",
      url: allExternalStaffUrl,
      data: {},
      ...data
    }).then(res => {
      dispatch({
        type:'ALL_EXTERNAL_STAFF',
        payload:{
         loading:true,
         data:res.data
        },
      })
    });
  });

}



