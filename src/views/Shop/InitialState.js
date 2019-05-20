const selectExento = 
[
  { value: 'NO', label: 'NO' },
  { value: 'SI', label: 'SI' },

];  

export const InitalState = {
    
    divTipoCompra: '',
    arrayTipoCompraSelect: null,
    divTipoCompraError: '',
    divProveedor: '',
    arrayProveedorSelect: null,
    divProveedorError: '',
    divNroCompra: '',
    nroCompra: '',
    divNroCompraError: '',
    divNroControl: '',
    nroControl: '',
    divNroControlError: '',
    divObservacion: '',
    observacion: '',
    divObservacionError: '',
    divCompra: '',
    compraDate: new Date(),
    divCompraError: '',
    divProducto: '',
    producto: '',
    divProductoError: '',
    divTipo: '',
    arrayTipoSelect: null,
    divTipoError: '',
    divCodigo: '',
    codigo: '',
    divCodigoError: '',
    divCantidad: '',
    cantidad: '0',
    divCantidadError: '',
    divPrecio: '',
    precio: '0.00',
    divPrecioError: '',
    divPrecioVenta: '',
    precioVenta: '0.00',
    divPrecioVentaError: '',
    divDescuento: '',
    descuento: '0',
    divDescuentoError: '',
    divLimiteStock: '',
    limiteStock: '0',
    divLimiteStockError: '',
    divDescripcion: '',
    descripcion: '',
    divDescripcionError: '',
    fotoInvalid: false,
    fotoError: '',            
    foto: null,
    divExento:'',
    arrayExentoSelect: null,
    arrayExento: selectExento,
    divExentoError: '',
    divDireccionPartida:'',
    direccionPartida:'',
    divDireccionPartidaError:'',
    divDireccionLlegada:'',
    direccionLlegada:'',
    divDireccionLlegadaError:'',
    divBuscarProducto: '',
    arrayBuscarProductoSelect: null,
    divBuscarProductoError: '', 
    subTotal: 0.00,
    impuesto: 0.00,
    total: 0.00,
    acumSubTotal: 0.00,
    acumImp: 0.00,
    acumTotal: 0.00,
    action:0,    
    collapse: false,
    loading:'show',   

}