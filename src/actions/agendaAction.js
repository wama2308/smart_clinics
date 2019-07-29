import { agenda } from "../core/firebaseConfig";
import decode from "jwt-decode";

const token = localStorage.getItem("id_token");

const getInitialBranchs = async decode => {
  const is_default = await decode.other_profiles[0].branch_office.find(
    branch => branch.is_default === 1
  );

  const idMedicalCenter = await decode.profile[0].medical_center[0]._id;

  return { idBranch: is_default._id, idMedicalCenter };
};

export const setAgent = (obj, cb) => async dispatch => {
  const decoded = await decode(token);
  const ids = await getInitialBranchs(decoded);

  agenda
    .add({
      ...ids,
      idUser: decoded.id,
      events: obj
    })
    .then(() => {
      cb();
    });
};

export const getAgent = () => async dispatch => {
  const decoded = await decode(token);
  const ids = await getInitialBranchs(decoded);

  agenda
    .where("idBranch", "==", ids.idBranch)
    .where("idMedicalCenter", "==", ids.idMedicalCenter)
    .where("idUser", "==", decoded.id)
    .onSnapshot(querySnaphot => {
      let event = "";
      querySnaphot.forEach(values => {
        if (values.data().events) {
          console.log("data", values.data().events);
          if (event === "") {
            event = values.data().events;
          } else {
            event.push(...values.data().events);
          }
        }
      });

      dispatch({
        type: "GET_AGENDA",
        payload: event
      });
    });
};
