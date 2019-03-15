import {Map , List} from 'immutable'

const setState = (state, newState) => state.set(Map(newState));

const configReducer = (state = Map(), action) => {
  switch (action.type) {
  case 'LOAD_MEDICAL_CENTER': {
    return Map(action.payload)
  }
  default:
    return state;
  }
};

export default configReducer;