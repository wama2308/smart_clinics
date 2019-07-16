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

const setStoreProductoDefectuosoLote = (state, payload) => {
	let estado = state.toJS();
	const key = estado.ProductLoteId.lote.findIndex(lote => lote._id === payload.lote_id);
	estado.ProductLoteId.lote[key].quantity_stock = payload.quantity_rest;	
	
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

const setActionProps = (state, payload) => {
	let estado = state.toJS();
	estado.action = payload;		
	return Map(estado);
}

const setStoreNewProviderSelect = (state, payload) => {
	let estado = state.toJS();
	estado.newProvider = payload.provider;	
	return Map(estado);
}

const setStoreShopSavePusher = (state, payload) => {
	let estado = state.toJS();
	estado.data.push(payload);	
	return Map(estado);
}

const setStoreShopEditPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.data.findIndex(shop => shop._id === payload._id);
	estado.data[key].number_controll = payload.number_controll;
	estado.data[key].subtotal = payload.subtotal;	
	estado.data[key].igv = payload.igv;			
	estado.data[key].total = payload.total;				
	estado.data[key].number_invoice = payload.number_invoice;				
	estado.data[key].type_shop = payload.type_shop;				
	estado.data[key].observation = payload.observation;				
	estado.data[key].medical_center = payload.medical_center;				
	estado.data[key].sucursal = payload.sucursal;				
	estado.data[key].provider = payload.provider;				
	estado.data[key].date = payload.date;				
	return Map(estado);
}

const setStoreShopDisabledPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.data.findIndex(shop => shop._id === payload._id);
	estado.data.splice(key, 1);		
	return Map(estado);
}

const setStoreTransferSavePusher = (state, payload) => {
	let estado = state.toJS();
	estado.allTransfer.push(payload);	
	return Map(estado);
}

const setStoreTransferEditPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.allTransfer.findIndex(transfer => transfer._id === payload._id);
	estado.allTransfer[key].number_controll = payload.number_controll;
	estado.allTransfer[key].number_invoice = payload.number_invoice;	
	estado.allTransfer[key].subtotal = payload.subtotal;			
	estado.allTransfer[key].igv = payload.igv;				
	estado.allTransfer[key].total = payload.total;				
	estado.allTransfer[key].transmitter = payload.transmitter;				
	estado.allTransfer[key].status = payload.status;					
	return Map(estado);
}

const setStoreTransferDisabledPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.allTransfer.findIndex(transfer => transfer._id === payload._id);
	estado.allTransfer.splice(key, 1);		
	return Map(estado);
}

const setStoreTransferAcceptPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.allTransfer.findIndex(transfer => transfer._id === payload._id);
	estado.allTransfer[key].status = payload.status;		
	return Map(estado);
}

const setStoreTransferRejectPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.allTransfer.findIndex(transfer => transfer._id === payload._id);
	estado.allTransfer[key].status = payload.status;		
	return Map(estado);
}

const setStoreTransferReceivedSavePusher = (state, payload) => {
	let estado = state.toJS();
	estado.allTransferRecibidas.push(payload);	
	return Map(estado);
}

const setStoreTransferReceivedEditPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.allTransferRecibidas.findIndex(transfer => transfer._id === payload._id);
	estado.allTransferRecibidas[key].number_controll = payload.number_controll;
	estado.allTransferRecibidas[key].number_invoice = payload.number_invoice;	
	estado.allTransferRecibidas[key].subtotal = payload.subtotal;			
	estado.allTransferRecibidas[key].igv = payload.igv;				
	estado.allTransferRecibidas[key].total = payload.total;				
	estado.allTransferRecibidas[key].receiver = payload.receiver;				
	estado.allTransferRecibidas[key].status = payload.status;					
	return Map(estado);
}

const setStoreTransferReceivedDisabledPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.allTransferRecibidas.findIndex(transfer => transfer._id === payload._id);
	estado.allTransferRecibidas.splice(key, 1);		
	return Map(estado);
}

const setStoreTransferReceivedAcceptPusher = (state, payload) => {
	let estado = state.toJS();
	const key_received = estado.allTransferRecibidas.findIndex(transferReceived => transferReceived._id === payload._id);
	estado.allTransferRecibidas[key_received].status = payload.status;						
	return Map(estado);
}

const setStoreTransferReceivedRejectPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.allTransferRecibidas.findIndex(transfer => transfer._id === payload._id);
	estado.allTransferRecibidas[key].status = payload.status;						
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

		case "LOAD_LOTE_PRODUCTO":
	  		return setStoreProductoLote(state, action.payload);				

  		case "LOAD_LOTE_PRODUCTO_DEFECTUOSO":
	  		return setStoreProductoDefectuosoLote(state, action.payload);				

  		case "SET_CANTIDAD_TRANSFERENCIAS":
	  		return setCantidadTableTransferencias(state, action.payload);			

  		case "SET_SWITCH_TRANSFERENCIAS":
	  		return setSwitchTableTransferencias(state, action.payload);			

  		case "SET_SELECT_ALL_SWITCH_TRANSFERENCIAS":
	  		return setSelectAllSwitchTransferencias(state, action.payload);			

  		case "LOAD_TRANSFER_ID":
	  		return setStoreTransferId(state, action.payload);			

  		case 'ACTION_PROPS': 
	  		return setActionProps(state, action.payload)  

	  	case 'ADD_NEW_PROVIDER_SELECT': 
	  		return setStoreNewProviderSelect(state, action.payload)
	  		
	  	/*PUSHER*/		

  		case 'LOAD_SHOP_NEW_PUSHER': 
	  		return setStoreShopSavePusher(state, action.payload)	  

	  	case 'LOAD_SHOP_EDIT_PUSHER': 
	  		return setStoreShopEditPusher(state, action.payload)
	  
		case 'LOAD_SHOP_DISABLED_PUSHER': 
	  		return setStoreShopDisabledPusher(state, action.payload)

  		case 'LOAD_TRANSFER_NEW_PUSHER': 
	  		return setStoreTransferSavePusher(state, action.payload)	  

	  	case 'LOAD_TRANSFER_EDIT_PUSHER': 
	  		return setStoreTransferEditPusher(state, action.payload)
	  
		case 'LOAD_TRANSFER_DISABLED_PUSHER': 
	  		return setStoreTransferDisabledPusher(state, action.payload)

  		case 'LOAD_TRANSFER_ACCEPT_PUSHER': 
	  		return setStoreTransferAcceptPusher(state, action.payload)

  		case 'LOAD_TRANSFER_REJECT_PUSHER': 
	  		return setStoreTransferRejectPusher(state, action.payload)

  		case 'LOAD_TRANSFER_RECEIVED_SAVE_PUSHER': 
	  		return setStoreTransferReceivedSavePusher(state, action.payload)	  

	  	case 'LOAD_TRANSFER_RECEIVED_EDIT_PUSHER': 
	  		return setStoreTransferReceivedEditPusher(state, action.payload)
	  
		case 'LOAD_TRANSFER_RECEIVED_DISABLED_PUSHER': 
	  		return setStoreTransferReceivedDisabledPusher(state, action.payload)

  		case 'LOAD_TRANSFER_RECEIVED_ACCEPT_PUSHER': 
	  		return setStoreTransferReceivedAcceptPusher(state, action.payload)
	  
		case 'LOAD_TRANSFER_RECEIVED_REJECT_PUSHER': 
	  		return setStoreTransferReceivedRejectPusher(state, action.payload)

		default:
			return state;
  }
};

export default ShopReducer;