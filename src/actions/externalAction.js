import { url, getDataToken } from "../core/connection";
import axios from "axios";
import { openSnackbars } from "./aplicantionActions";

const queryAllBranchOfficesExternalStaff = `${url}/api/queryAllBranchOfficesExternalStaff`;
const allExternalStaffUrl = `${url}/api/querySubscribeExternalStaff`;
const allBranchsInformationUrl = `${url}/api/queryOneBranchOfficesExternalStaff`;
const subscribeExternalStaff = `${url}/api/subscribeExternalStaff`;
const getOnlySternalData = `${url}/api/queryOneBranchOfficesPetitionExternalStaff`;
const saveOrCancelledUrl = `${url}/api/statusExternalStaff`;
const deleteExternalURL = `${url}/api/disableExternalStaff`;

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
  getDataToken().then(data => {
    axios({
      method: "POST",
      url: subscribeExternalStaff,
      data: {
        external_id: obj.medical_id,
        branchoffices_id: obj.branch_id
      },
      ...data
    })
      .then(res => {
        callback();
        dispatch(openSnackbars("success", "Operacion Exitosa"));
      })
      .catch(error => {
        dispatch(openSnackbars("error", error.toString()));
      });
  });
};

export const viewDataExternal = obj => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "POST",
      url: getOnlySternalData,
      data: {
        id_medical: obj.id_medical_center,
        branchoffices_id: obj.id_branchoffices
      },
      ...data
    }).then(resp => {
      dispatch({
        type: "VIEW_EXTERNAL_DATA_SELECTED",
        payload: {
          loading: "hide",
          ...resp.data
        }
      });
    });
  });
};

export const saveOrCancelledExternal = (obj, callback) => dispatch => {
  console.log("action", obj);
  getDataToken().then(data => {
    axios({
      method: "POST",
      url: saveOrCancelledUrl,
      data: {
        ...obj
      },
      ...data
    })
      .then(() => {
        callback();
        dispatch(openSnackbars("success", "Operacion Exitosa"));
      })
      .catch(() => {
        dispatch(openSnackbars("error", "Error"));
        callback();
      });
  });
};

export const deleteRequest = obj => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "POST",
      url: deleteExternalURL,
      data: {
        ...obj
      },
      ...data
    })
      .then(() => {
        dispatch(openSnackbars("success", "Operacion Exitosa"));
      })
      .catch(err => {
        dispatch(openSnackbars("error", "Error"));
      });
  });
};
