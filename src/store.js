
import {createStore, compose , applyMiddleware} from 'redux';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import ReduxThunk from 'redux-thunk';
import root from './reducers/rootReducers';
import logger from 'redux-logger'

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

//const composedEnhancer = compose( applyMiddleware(logger), ...enhancerList);

const middleWare = applyMiddleware( ReduxThunk,logger)(createStore);

export default middleWare(root);







// import { createStore } from 'redux';

// const reducer = (state, action) => {

// 	if(action.type === "OPEN_MODAL_USER"){
// 		return {
// 			...state,
// 			open: action.valor,
// 			opcion: action.opcion
// 		};

// 	} else if(action.type === "OPEN_MODAL_USER_VIEW"){
// 		return {
// 			...state,
// 			open: action.valor,
// 			opcion: action.opcion, 
// 			userId: action.userId
// 		}
		
// 	} else if(action.type === "OPEN_MODAL_USER_EDIT"){
// 		return {
// 			...state,
// 			open: action.valor,
// 			opcion: action.opcion, 
// 			userId: action.userId
// 		}
// 	}
	
// 	return state;
// };

// export default createStore(reducer, { open: [], opcion: 0, userId: '' });