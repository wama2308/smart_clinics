import {Map , List} from 'immutable'

const setState = (state, newState) => state.mergeDeep(Map(newState));

const configReducer = (state = Map(), action) => {
  switch (action.type) {
  case 'LOAD_MEDICAL_CENTER': {
    return setState(state, action.payload)
  }
  default:
    return state;
  }
};

export default configReducer;