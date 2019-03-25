import { getDataToken, url } from "./configAction";
import axios from "axios";
import { openSnackbars } from "./aplicantionActions";

const loadService = `${url}/api/LoadServicesPreloaded`;
const loadPlantillasUrl = `${url}/api/LoadTemplates`;
const loadPlantillasTinymceUrl = `${url}/api/LoadTemplatesTinymce`;

export const getDataServices = () => dispatch => {
  getDataToken().then(data => {
    axios
      .get(loadService, data)
      .then(res => {
        loadPlantillas(data, dispatch, result => {
          dispatch({
            type: "GET_DATA_SERVICE",
            payload: {
              loading:true,
              plantillas: result,
              servicios: res.data
            }
          });
        });
      })
      .catch(error => {
        dispatch(openSnackbars("error", error.toString()));
      });
  });
};

const loadPlantillas = (data, action, cb) => {
  axios
    .get(loadPlantillasUrl, data)
    .then(res => {
      loadPlantillasTinymce(data, action, result => {
        cb({
          ...res.data,
          ...result
        });
      });
    })
    .catch(error => {
      action(openSnackbars("error", error.toString()));
    });
};

const loadPlantillasTinymce = (data, action, cb) => {
  axios
    .get(loadPlantillasTinymceUrl, data)
    .then(res => {
      cb(res.data);
    })
    .catch(error => {
      action(openSnackbars("error", error.toString()));
    });
};
