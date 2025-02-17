import { Map } from 'immutable'
const setData = (state, node, payload) => state.set(node, payload)

const searchOneSuppplie = (state, payload) => {
	let estado = state.toJS();
	estado.productsToTransfer.push(payload);
	return Map(estado);
}

const setQuantityTranferAction = (state, payload) => {
	let estado = state.toJS();
	const key = estado.productsToTransfer.findIndex(product => product._id === payload.id);
	estado.productsToTransfer[key].quantity_transfer = payload.value;
	estado.action = 1;
	return Map(estado);
}

const deleteProductsTransferFunction = (state, payload) => {
	let estado = state.toJS();
	var listProducts = estado.productsToTransfer;
	listProducts.splice(payload.key, 1);
	estado.productsToTransfer = listProducts;
	estado.action = 1;
	return Map(estado);
}

const cleanQuantityProductsTransferAction = (state, payload) => {
	let estado = state.toJS();	
	estado.productsToTransfer = payload;		
	estado.action = 0;	
	return Map(estado);
}

const TransferReducer = (state = Map(), action) => {
	switch (action.type) {

		case 'LOAD_TRANSFERS_ALL': {
			return Map(action.payload)
		}

		case "SEARCH_PRODUCT_TRANSFER":
			return setData(state, "dataAllProducts", action.payload);

		case "SEARCH_ONE_PRODUCTS_TRANSFER":
			return searchOneSuppplie(state, action.payload);

		case "LOAD_SELECT_TRANSFERS":
			return setData(state, "selectTransfers", action.payload);

		case "SET_QUANTITY_TRANFSER":
			return setQuantityTranferAction(state, action.payload);

		case "DELETE_PRODUCT_TRANSFER":
			return deleteProductsTransferFunction(state, action.payload);

		case "CLEAN_TRANSFER_QUANTYTI_PRODUCT":
			return cleanQuantityProductsTransferAction(state, action.payload);

		default:
			return state;
	}
};

export default TransferReducer;