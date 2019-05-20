import {Map , List} from 'immutable'
const setData = (state, node , payload)=> state.set(node, payload)

const setDataShopId = (state, node, payload) => {
	let estado = state.toJS();
	estado.shelfs = payload.storeId.shelf;	
	estado.storeId = payload;		
	return Map(estado);
}

const setStoreAddProducts = (state, payload) => {
	let estado = state.toJS();	
	estado.products.push(payload.objProducts);		
	estado.subTotal = estado.subTotal + payload.subTotal;		
	estado.impuesto = estado.impuesto + payload.impuesto;		
	estado.total = estado.total + payload.total;		
	return Map(estado);
}

const setStoreDeleteProducts = (state, payload) => {
	let estado = state.toJS();
	var listProducts = estado.products;
	estado.subTotal = estado.subTotal - payload.subTotal;		
	estado.impuesto = estado.impuesto - payload.impuesto;		
	estado.total = estado.total - payload.total;		
	listProducts.splice(payload.key, 1);        
	estado.products = listProducts;		
	return Map(estado);
}

const setStoreCleanProducts = (state, payload) => {
	let estado = state.toJS();
	estado.products = payload.products;		
	estado.subTotal = 0;		
	estado.impuesto = 0;		
	estado.total = 0;		
	return Map(estado);
}

const ShopReducer = (state = Map(), action) => {
  switch (action.type) {

	  case 'LOAD_COMPRAS': {
	  	return Map(action.payload)
	  }

	  case 'LOAD_SHOP_ID': {
	  	return setDataShopId(state, 'storeId', action.payload)
	  }

	  case 'ADD_PRODUCTS': {
	  	return setStoreAddProducts(state, action.payload)
	  }

	  case 'DELETE_PRODUCTS': {
	  	return setStoreDeleteProducts(state, action.payload)
	  }

	  case 'CLEAN_PRODUCTS': {
	  	return setStoreCleanProducts(state, action.payload)
	  } 

	  default:
	  	return state;
  }
};

export default ShopReducer;