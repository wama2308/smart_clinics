import React from 'react';
import { Collapse, Button, CardBody, Card, Form, FormGroup, Label, Input, FormFeedback, Table, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import classnames from 'classnames';
import '../../components/style.css';
import './Shop.css';
import axios from 'axios';
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import { addProductsFunction,  } from "../../actions/ShopActions";
import { openSnackbars, openConfirmDialog } from "../../actions/aplicantionActions";
import { enterDecimal } from "../../core/utils";
import { InitalState } from './InitialState.js';
import Select from 'react-select';

class Products extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
            ...InitalState
		};
	}

	componentDidMount(){}

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    } 

    test = () => {
        let descuento = 10;
        let precio_replace = this.state.precio.replace(",", "");
        let precio = parseFloat(precio_replace);
        let desc_porc = precio - (precio * (descuento/100));
        console.log(desc_porc)
    }

    cleanState = () => {
        this.setState({ 
            ...InitalState
        })
    }    

    handlekeyProducto = event =>{
        this.setState({
            divProducto: "",
            divProductoError: "",         
        })
    }    

    handlekeyCodigo= event =>{
        this.setState({
            divCodigo: "",
            divCodigoError: "",         
        })
    }        

    handlekeyCantidad= event =>{
        this.setState({
            divCantidad: "",
            divCantidadError: "",         
        })
    }

    handlekeyPrecio= event =>{
        this.setState({
            divPrecio: "",
            divPrecioError: "",         
        })
    }

    handlekeyDescuento = event =>{
        this.setState({
            divDescuento: "",
            divDescuentoError: "",         
        })
    }

    handlekeyPrecioVenta = event =>{
        this.setState({
            divPrecioVenta: "",
            divPrecioVentaError: "",         
        })
    }

    handlekeyLimiteStock = event =>{
        this.setState({
            divLimiteStock: "",
            divLimiteStockError: "",         
        })
    }

    handlekeyDescripcion= event =>{
        this.setState({
            divDescripcion: "",
            divDescripcionError: "",         
        })
    }

    handleChangeTipo = (arrayTipoSelect) => {
        this.setState({ 
            arrayTipoSelect,
            divTipo: '',
            divTipoError: ''                                
        });  
    }

    handleChangeExento = (arrayExentoSelect) => {
        this.setState({ 
            arrayExentoSelect,
            divExento: '',
            divExentoError: ''                                
        });  
    }

    fileHandlerFoto = event =>{ 
      event.preventDefault();
       if(event.target.files[0].size > 25000) {
            this.setState({
                fotoError:'El tamaño de la imagen no esta permitido ',
                fotoInvalid:true,
                collapseFil:true,
            })           
       }  
       else {
            this.setState({
                fotoError:' ',
                fotoInvalid:false,
            })
            let selectedFile = event.target.files;
            let fileName = "";
            let file = null
            if (selectedFile.length > 0) {
                let fileToLoad = selectedFile[0];
                fileName = fileToLoad.name;
                let fileReader = new FileReader();
                fileReader.onload = function(fileLoadedEvent) {
                    file = fileLoadedEvent.target.result;
                    this.setState({
                       foto: file
                    })
                }
                .bind(this)
                fileReader.readAsDataURL(fileToLoad);
            }
       }              
    }

    componentWillReceiveProps=(props)=>{console.log("props shop", this.props.shop);   }    

    validate = () => {
    	let divProducto = '';
        let divProductoError = '';
	    let divTipo = '';
	    let divTipoError = '';
	    let divCodigo = '';
	    let divCodigoError = '';
	    let divCantidad = '';
	    let divCantidadError = '';
	    let divPrecio = '';
	    let divPrecioError = '';
	    let divDescripcion = '';
	    let divDescripcionError = '';
        let divExento = '';
        let divExentoError = '';
	    let fotoInvalid = false;
	    let fotoError = '';
        let labelTipo = "";
        let labelExento = "";
        let divPrecioVenta = '';
        let divPrecioVentaError = '';
        let divDescuento = '';
        let divDescuentoError = '';
        let divLimiteStock = '';     
        let divLimiteStockError = '';
        
        if (this.state.arrayTipoSelect) {                   	    
            let arrayTipo = Object.values(this.state.arrayTipoSelect);
            arrayTipo.forEach(function (elemento, indice, array) {
                if(indice === 0){
                    labelTipo = elemento;
                }            
            });                 	    
        }
        if (this.state.arrayExentoSelect) {                           
            let arrayExento = Object.values(this.state.arrayExentoSelect);
            arrayExento.forEach(function (elemento, indice, array) {
                if(indice === 0){
                    labelExento = elemento;
                }            
            });                         
        }
        if (this.state.producto === "") {            
            divProductoError = "¡Ingrese el producto!";
            divProducto = "borderColor";
        }     
        if (!this.state.arrayTipoSelect) {                    
            divTipoError = "¡Ingrese el tipo de producto!";
            divTipo  = "borderColor";
        }     
        if (this.state.codigo === "") {            
            divCodigoError = "¡Ingrese el codigo del producto!";
            divCodigo = "borderColor";
        }             
        if (this.state.cantidad === "" || this.state.cantidad === "0") {            
            divCantidadError = "¡Ingrese la cantidad!";
            divCantidad = "borderColor";
        }
        if (this.state.precio === "" || this.state.precio === "0.00") {            
            divPrecioError = "¡Ingrese el precio de compra!";
            divPrecio = "borderColor";
        }
        if (this.state.precioVenta === "" || this.state.precioVenta === "0.00") {            
            divPrecioVentaError = "¡Ingrese el precio de venta!";
            divPrecioVenta = "borderColor";
        }
        if (this.state.limiteStock === "" || this.state.limiteStock === "0") {            
            divLimiteStockError = "¡Ingrese el limite de stock!";
            divLimiteStock = "borderColor";
        }
        if (!this.state.arrayExentoSelect) {                    
            divExentoError = "¡Seleccione si es exento!";
            divExento  = "borderColor";
        }
        if(this.props.shop.products.length > 0){
            const resultado = this.props.shop.products.find(products => products.product === this.state.producto);
            if(resultado){
                divProductoError = "¡Este producto ya se encuentra agregado!";
                divProducto = "borderColor";
            }
        }
        if (divProductoError || divTipoError || divCodigoError || divCantidadError || divPrecioError || divExentoError || divPrecioVentaError || divLimiteStockError) {            
            this.setState({ 
                divProducto,
		        divProductoError,
			    divTipo,
			    divTipoError,
			    divCodigo,
			    divCodigoError,
			    divCantidad,
			    divCantidadError,
			    divPrecio,
			    divPrecioError,
			    divDescripcion,
			    divDescripcionError,
                divExento,
                divExentoError,
			    fotoInvalid,
			    fotoError,  
                divPrecioVentaError,
                divPrecioVenta,
                divLimiteStockError,
                divLimiteStock           
            });                           
            return false;
        }        
        let impuesto = 0;
        if(labelExento === 'NO'){
            impuesto = this.props.aplication.dataGeneral.dataCountries.tax_rate;
        }else{
            impuesto = 0;
        }
        let descuento = 0;
        if(this.state.descuento !== "0"){
            descuento = parseFloat(this.state.descuento);
        }else{
            descuento = 0;
        }
        let precio_replace = this.state.precio.replace(",", "");
        let precio = parseFloat(precio_replace);
        let precio_desc = precio - (precio * (descuento/100));
        let cantidad = parseFloat(this.state.cantidad);
        let precio_cant = precio_desc * cantidad;        
        let precio_imp = (precio_cant * (impuesto/100));        
        let total = precio_cant + precio_imp;        

        let productos = { id: "0", product: this.state.producto, code: this.state.codigo, type: this.state.arrayTipoSelect, quantity: this.state.cantidad, price: this.state.precio, discount: this.state.descuento, priceDiscount: precio_desc, priceSale: this.state.precioVenta, limitStock: this.state.limiteStock, exempt: this.state.arrayExentoSelect, description:this.state.descripcion, photo: this.state.foto }                       
        this.props.addProductsFunction(productos, precio_cant, precio_imp, total);              
        this.cleanState();  
        return true; 
    }   

    handleSubmitProductsNew = event => {        
        event.preventDefault();
        const isValid = this.validate();        
        if (isValid) {                  
            console.log("");                 
        }
    } 

    eventoBlur = (e) => {
        if(this.state.precio == ''){
            this.setState({
                precio: '0.00'                      
            }); 
        }        
    }

    eventoFocus = (e) => {        
        if(this.state.precio == '0.00'){
            this.setState({
                precio: ''                      
            }); 
        }        
    }    

    eventoBlurPrecioVenta = (e) => {
        if(this.state.precioVenta == ''){
            this.setState({
                precioVenta: '0.00'                      
            }); 
        }        
    }

    eventoFocusPrecioVenta = (e) => {        
        if(this.state.precioVenta == '0.00'){
            this.setState({
                precioVenta: ''                      
            }); 
        }        
    }        

    eventoBlurDescuento = (e) => {
        if(this.state.descuento == ''){
            this.setState({
                descuento: '0'                      
            }); 
        }        
    }

    eventoFocusDescuento = (e) => {        
        if(this.state.descuento == '0'){
            this.setState({
                descuento: ''                      
            }); 
        }        
    }        

    eventoBlurCantidad = (e) => {
        if(this.state.cantidad == ''){
            this.setState({
                cantidad: '0'                      
            }); 
        }        
    }

    eventoFocusCantidad = (e) => {        
        if(this.state.cantidad == '0'){
            this.setState({
                cantidad: ''                      
            }); 
        }        
    }        

    eventoBlurLimiteStock = (e) => {
        if(this.state.limiteStock == ''){
            this.setState({
                limiteStock: '0'                      
            }); 
        }        
    }

    eventoFocusLimiteStock = (e) => {        
        if(this.state.limiteStock == '0'){
            this.setState({
                limiteStock: ''                      
            }); 
        }        
    }

	render() {           
        return (
            <div>  
                <Collapse isOpen={this.props.collapse}>
                  <Card>
                    <CardBody>                        
                        <div className="row">       
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="producto">Producto:</Label> 
                                <div className={this.state.divProducto}>                               
                                    <Input disabled={this.props.disabled} name="producto" id="producto" onKeyUp={this.handlekeyProducto} onChange={this.handleChange} value={this.state.producto} type="text" placeholder="Producto" />
                                </div>
                                <div className="errorSelect">{this.state.divProductoError}</div>                                                                                                                                                                                         
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="tipo">Tipo:</Label>
                                <div className={this.state.divTipo}>
                                    <Select isSearchable="true" isDisabled={this.props.disabled} name="tipo" value={this.state.arrayTipoSelect} onChange={this.handleChangeTipo} options={this.props.aplication.dataGeneral.dataGeneral.type_supplies} />
                                </div>                                            
                                <div className="errorSelect">{this.state.divTipoError}</div>
                            </FormGroup>
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="codigo">Codigo:</Label> 
                                <div className={this.state.divCodigo}>                               
                                    <Input disabled={this.props.disabled} name="codigo" id="codigo" onKeyUp={this.handlekeyCodigo} onChange={this.handleChange} value={this.state.codigo} type="text" placeholder="Codigo" />
                                </div>
                                <div className="errorSelect">{this.state.divCodigoError}</div>                                                                                                                                                                                         
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="cantidad">Cantidad:</Label> 
                                <div className={this.state.divCantidad}>                               
                                    <Input disabled={this.props.disabled} name="cantidad" id="cantidad" onKeyUp={this.handlekeyCantidad} onChange={this.handleChange} value={this.state.cantidad} type="number" placeholder="Cantidad" onPaste = "false" onBlur ={this.eventoBlurCantidad} onFocus = {this.eventoFocusCantidad}/>
                                </div>
                                <div className="errorSelect">{this.state.divCantidadError}</div>                                                                                                                                                                                         
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="precio">Precio de Compra:</Label> 
                                <div className={this.state.divPrecio}>                               
                                    <Input disabled={this.props.disabled} name="precio" id="precio" onKeyUp={this.handlekeyPrecio} onChange={this.handleChange} value={this.state.precio} type="text" placeholder="Precio" onKeyPress={ enterDecimal } onPaste = "false"  onBlur ={this.eventoBlur} onFocus = {this.eventoFocus} />                                    
                                </div>
                                <div className="errorSelect">{this.state.divPrecioError}</div>                                                                                                                                                                                         
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="descuento">Descuento %:</Label> 
                                <div className={this.state.divDescuento}>                               
                                    <Input disabled={this.props.disabled} name="descuento" id="descuento" onKeyUp={this.handlekeyDescuento} onChange={this.handleChange} value={this.state.descuento} type="number" placeholder="Descuento" onBlur ={this.eventoBlurDescuento} onFocus = {this.eventoFocusDescuento}/>                                    
                                </div>
                                <div className="errorSelect">{this.state.divDescuentoError}</div>                                                                                                                                                                                         
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="precioVenta">Precio de Venta:</Label> 
                                <div className={this.state.divPrecioVenta}>                               
                                    <Input disabled={this.props.disabled} name="precioVenta" id="precioVenta" onKeyUp={this.handlekeyPrecioVenta} onChange={this.handleChange} value={this.state.precioVenta} type="text" placeholder="Precio de Venta" onKeyPress={ enterDecimal } onPaste = "false"  onBlur ={this.eventoBlurPrecioVenta} onFocus = {this.eventoFocusPrecioVenta} />                                    
                                </div>
                                <div className="errorSelect">{this.state.divPrecioVentaError}</div>                                                                                                                                                                                         
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="limiteStock">Limite Stock:</Label> 
                                <div className={this.state.divLimiteStock}>                               
                                    <Input disabled={this.props.disabled} name="limiteStock" id="limiteStock" onKeyUp={this.handlekeyLimiteStock} onChange={this.handleChange} value={this.state.limiteStock} type="number" placeholder="Limite Stock" onBlur ={this.eventoBlurLimiteStock} onFocus = {this.eventoFocusLimiteStock}/>                                    
                                </div>
                                <div className="errorSelect">{this.state.divLimiteStockError}</div>                                                                                                                                                                                         
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="exento">Exento:</Label>
                                <div className={this.state.divExento}>
                                    <Select isSearchable="true" isDisabled={this.props.disabled} name="exento" value={this.state.arrayExentoSelect} onChange={this.handleChangeExento} options={this.state.arrayExento} />
                                </div>                                            
                                <div className="errorSelect">{this.state.divExentoError}</div>
                            </FormGroup>
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="descripcion">Descripcion:</Label>
                                <div className={this.state.divDescripcion}>
                                    <Input disabled={this.props.disabled} name="descripcion" id="descripcion" onKeyUp={this.handlekeyDescripcion} onChange={this.handleChange} value={this.state.descripcion} type="textarea" placeholder="Descripcion" />
                                </div>
                                <div tooltip>{this.state.divDescripcionError}</div>                                                                                                                                                            
                            </FormGroup>
                            <FormGroup className="top form-group col-sm-6">                                                                 
								<Label for="foto">Foto:</Label>
								<br />
								<InputGroup>
								<Input className="top" type="file" accept="image/*" invalid={this.state.fotoInvalid} onChange={this.fileHandlerFoto} />
								<FormFeedback tooltip>{this.state.fotoError}</FormFeedback>  
								<InputGroupAddon addonType="append">
								    <div>
								        {
								            this.state.foto != null && <img style={{width: 100, height: 100}}  className="image"  src={"data:image/jpeg;" + this.state.foto} />
								        }
								    </div>
								</InputGroupAddon>
								</InputGroup>
							</FormGroup>
							<FormGroup className="top form-group col-sm-12">      
                                <Button className={this.state.ocultarBotones} disabled={this.props.disabled} color="primary" onClick={this.handleSubmitProductsNew}>Agregar</Button>
                                &nbsp; 
                                &nbsp;                                 
                                <Button className={this.state.ocultarBotones} disabled={this.props.disabled} color="danger" onClick={this.cleanState}>Limpiar</Button>                                
                            </FormGroup>
                        </div>                        
                    </CardBody>
                  </Card>
                </Collapse>
            </div> 
		);
	}
  }
const mapStateToProps = state => ({
  shop: state.shop.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
    addProductsFunction: (arrayProducts, subtotal, impuesto, total) =>dispatch(addProductsFunction(arrayProducts, subtotal, impuesto, total)),        
    confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);