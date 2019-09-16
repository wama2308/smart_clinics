import axios from "axios";
import { url, getDataToken } from "../core/connection";

const loadChat = `${url}/api/queryOneChatClaim`
const registerMessage = `${url}/api/registerChatClaim`
const setStatusMessage = `${url}/api/queryUpdateUnreadMessagesChatClaim`


export const loadMessageFunction = (id_claim_receiver, id_claim_transmitter) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: loadChat,
      data: {
        id_claim_receiver: id_claim_receiver,
        id_claim_transmitter: id_claim_transmitter
      },
      headers: datos.headers
    }).then(data => {
      dispatch({
        type: "LOAD_MESSAGE",
        payload: {
          dataMessage: data.data,
          token: datos
        }
      })
    })
  })
}

export const messageFunction = (data, callback) => dispatch => {
  dispatch({
    type: "MESSAGE",
    payload: data
  })
  callback()
}

export const cleanMessage = () => dispatch => {
  dispatch({
    type: "MESSAGE_CLEAN",
    payload: ""
  })

}

export const registerMessageFunction = (id_claim_receiver, id_claim_transmitter, message, time, option, callback) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: registerMessage,
      data: {
        id_claim_receiver: id_claim_receiver,
        id_claim_transmitter: id_claim_transmitter,
        message: message,
        timeZ: time,
        is_image: option
      },
      headers: datos.headers
    }).then(data => {
      callback();

    })
  })
}

export const registerFotoFunction = (id_claim_receiver, id_claim_transmitter, foto, time, option, callback) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: registerMessage,
      data: {
        id_claim_receiver: id_claim_receiver,
        id_claim_transmitter: id_claim_transmitter,
        message: foto,
        timeZ: time,
        is_image: option
      },
      headers: datos.headers
    }).then(data => {
      callback();

    })
  })
}

export const setStatusMessageFunction = (id_claim_receiver, id_claim_transmitter, time) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: setStatusMessage,
      data: {
        id_claim_receiver: id_claim_receiver,
        id_claim_transmitter: id_claim_transmitter,
        timeZ: time,
      },
      headers: datos.headers
    })
  })
}

export const loadSavePusher = data => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SAVE_PUSHER",
        payload: {
          ...data
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
}
