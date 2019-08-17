import { Map } from 'immutable'


const loadDataMessage = (state, payload) =>{
  let estado = state.toJS();

  estado = payload
  return Map(estado)
}

const  setStoreChatSavePusher = (state, payload) =>{
  let estado = state.toJS();
  estado.dataMessage.push(payload);
  return Map(estado);
}

const setMessage =  (state, payload) =>{
  let estado = state.toJS();
  estado.message = payload;
  return Map(estado);
} 

const setCleanMessage = (state, payload) =>{
   let estado = state.toJS();
  estado.message = payload;
  return Map(estado);
}

const ChatReducer = (state = Map(), action) => {

switch (action.type) {
  case "LOAD_MESSAGE":{
    return loadDataMessage(state, action.payload)
  }
    break;
    
    case "SAVE_PUSHER":
      return setStoreChatSavePusher(state, action.payload)
    break;

    case "MESSAGE":
      return setMessage(state, action.payload)
      break;

     case "MESSAGE_CLEAN":
     return setCleanMessage(state, action.payload)

  default:
    return state

}
}

export default ChatReducer
