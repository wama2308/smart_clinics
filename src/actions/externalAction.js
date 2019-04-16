import { url, getDataToken } from "../core/connection";
import axios from "axios";
import { openSnackbars } from "./aplicantionActions";

const queryAllBranchOfficesExternalStaff = `${url}/api/queryAllBranchOfficesExternalStaff`;
const allExternalStaffUrl = `${url}/api/querySubscribeExternalStaff`;
const allBranchsInformationUrl = `${url}/api/queryOneBranchOfficesExternalStaff`;
const subscribeExternalStaff = `${url}/api/subscribeExternalStaff`;

export const AllMedicalOffices = obj => dispatch => {
  const normalice = {
    province: obj.province.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    country: obj.country.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  };

  getDataToken().then(data => {
    axios({
      method: "post",
      url: queryAllBranchOfficesExternalStaff,
      data: {
        country_name: normalice.country,
        province_name: normalice.province
      },
      ...data
    }).then(res => {
      dispatch({
        type: "GET_ALL_BRANCHS",
        payload: {
          loading: "hide",
          data: res.data
        }
      });
    });
  });
};

export const allExternalStaff = () => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "post",
      url: allExternalStaffUrl,
      data: {},
      ...data
    }).then(res => {
      dispatch({
        type: "ALL_EXTERNAL_STAFF",
        payload: {
          loading: true,
          data: res.data
        }
      });
    });
  });
};

export const allBranchsInformation = (obj, callback) => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "POST",
      url: allBranchsInformationUrl,
      data: { ...obj },
      ...data
    }).then(res => {
      callback();
      dispatch({
        type: "SELECTED_BRANCH_OFFICE",
        payload: res.data
      });
    });
  });
};

export const subcriptionRequest = (obj, callback) => dispatch => {
  console.log('obj', obj)
  getDataToken().then(data => {
    axios({
      method: "POST",
      url: subscribeExternalStaff,
      data: {
        external_id: obj.id,
        medical_id: obj.medical_id,
        branch_id: obj.branch_id,
      },
      ...data
    })
      .then(res => {
        callback()
        dispatch(openSnackbars("success", "Operacion Exitosa"));
      })
      .catch(error => {
        dispatch(openSnackbars("error", error.toString()));
      });
  });
};
