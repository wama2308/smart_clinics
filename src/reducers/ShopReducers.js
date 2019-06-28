import {Map } from 'immutable'
const setData = (state, node , payload)=> state.set(node, payload)

const setDataShopId = (state, payload) => {
	let estado = state.toJS();
	estado.dataShopId = payload.dataShopId;	
	estado.products = payload.dataShopId.products;		
	estado.loading = payload.loading;		
	estado.subTotal = payload.dataShopId.subtotal;		
	estado.impuesto = payload.dataShopId.igv;		
	estado.total = payload.dataShopId.total;		
	return Map(estado);
}

const setStoreTransferId = (state, payload) => {
	let estado = state.toJS();
	estado.transferId = payload.dataTransferId;		
	return Map(estado);
}

const setStoreAddProducts = (state, payload) => {
	let estado = state.toJS();	
	estado.products.push(payload.objProducts);		
	estado.subTotal = estado.subTotal + payload.subTotal;		
	estado.impuesto = estado.impuesto + payload.impuesto;		
	estado.total = estado.total + payload.total;		
	estado.dataProductId = {};			
	estado.searchProduct = 0;	
	estado.action = 1;	
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
	estado.action = 1;	
	return Map(estado);
}

const setStoreCleanProducts = (state, payload) => {
	let estado = state.toJS();
	estado.products = payload.products;		
	estado.transferId.products = payload.products;		
	estado.subTotal = 0;		
	estado.impuesto = 0;		
	estado.total = 0;	
	estado.dataProductId = {};			
	estado.searchProduct = 0;		
	estado.dataProductPrice = [];		
	estado.ProductLoteId = {};		
	estado.dataShopId = {};		
	estado.action = 0;	
	return Map(estado);
}

const setDataProductIdSearch = (state, payload) => {
	let estado = state.toJS();
	estado.dataProductId = payload;			
	estado.searchProduct = 1;			
	return Map(estado);
}

const setCleanInfoProductId = (state, payload) => {
	let estado = state.toJS();
	estado.dataProductId = payload;			
	estado.dataProductPrice = [];			
	estado.searchProduct = 0;			
	return Map(estado);
}

const setProductIdPrice = (state, payload) => {
	let estado = state.toJS();
	estado.dataProductPrice = payload.data;					
	return Map(estado);
}

const setDataProductLoteId = (state, payload) => {
	let estado = state.toJS();
	estado.ProductLoteId = payload;			
	return Map(estado);
}

const setStoreProductoLote = (state, payload) => {
	let estado = state.toJS();
	const key = estado.ProductLoteId.lote.findIndex(lote => lote._id === payload.lote_id);
	estado.ProductLoteId.lote[key].price = payload.price;
	estado.ProductLoteId.lote[key].discount = payload.discount;
	estado.ProductLoteId.lote[key].price_sale = payload.price_sale;
	estado.ProductLoteId.lote[key].limit_stock = payload.limit_stock;
	estado.ProductLoteId.lote[key].exempt = payload.exempt;
	
	return Map(estado);
}

const setCantidadTableTransferencias = (state, payload) => {
	let estado = state.toJS();	
	if(payload.option === 4){
		estado.products[payload.pos].quantity_edit = payload.value;	
		estado.action = 1;
	}else{
		estado.transferId.products[payload.pos].quantity_edit = payload.value;	
		estado.action = 1;
	}	
	
	return Map(estado);
}

const setSwitchTableTransferencias = (state, payload) => {
	let estado = state.toJS();
	if(payload.option === 4){
		estado.products[payload.pos].confirm = payload.value;		
		estado.action = 1;
	}else{
		estado.transferId.products[payload.pos].confirm = payload.value;	
		estado.action = 1;
	}
	
	return Map(estado);
}

const setSelectAllSwitchTransferencias = (state, payload) => {
	let estado = state.toJS();
	if(payload.option === 4){
		estado.products.map((product, i) => {
			product.confirm = payload.value;
			estado.action = 1;
		})	
	}else{
		estado.transferId.products.map((product, i) => {
			product.confirm = payload.value;
			estado.action = 1;
		})	
	}
	
	
	return Map(estado);
}

const ShopReducer = (state = Map(), action) => {
  	switch (action.type) {

		case 'LOAD_COMPRAS': {
		  	return Map(action.payload)
		  }

		case 'LOAD_SHOP_ID': {
		  	return setDataShopId(state, action.payload)
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

		case "SEARCH_PRODUCT_SHOP":
	      	return setData(state, "dataProducts", action.payload);

		case "SEARCH_ONE_PRODUCTS_SHOP":
	  		return setDataProductIdSearch(state, action.payload);		

  		case "CLEAN_INFO_PRODUCT_ID":
	  		return setCleanInfoProductId(state, action.payload);		

  		case "LOAD_PRODUCT_PRICE":
	  		return setProductIdPrice(state, action.payload);		

	  	case "LOAD_PRODUCT_LOTE_ID":
	  		return setDataProductLoteId(state, action.payload);			

  		case "SET_CANTIDAD_TRANSFERENCIAS":
	  		return setCantidadTableTransferencias(state, action.payload);			

  		case "SET_SWITCH_TRANSFERENCIAS":
	  		return setSwitchTableTransferencias(state, action.payload);			

  		case "SET_SELECT_ALL_SWITCH_TRANSFERENCIAS":
	  		return setSelectAllSwitchTransferencias(state, action.payload);			

  		case "LOAD_TRANSFER_ID":
	  		return setStoreTransferId(state, action.payload);			



		default:
			return state;
  }
};

export default ShopReducer;