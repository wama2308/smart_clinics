import React from 'react';
import { Button, Table, Input, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import '../../components/style.css';
import './Shop.css';
import Select from 'react-select';
import jstz from 'jstz';
import { connect } from "react-redux";
import { InitalState } from './InitialState.js';
import { number_format } from "../../core/utils";
import { enterDecimal } from "../../core/utils";
import { Visibility } from "@material-ui/icons";
import { openSnackbars } from "../../actions/aplicantionActions";
import { LoadProductPriceFunction } from "../../actions/ShopActions";

class ModalProductLote extends React.Component {
    constructor(props) {
        super(props);               
        this.state = {
            ...InitalState                              
        };
    }

    componentDidMount(){
        
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }    

    componentWillReceiveProps=(props)=>{
    	console.log("modal edit prod ", props)
    	console.log("", props)
    	console.log(" ", props)
    	if(props.productoId){
    		this.setState({
    			productoId: props.productoId,
	            nroLote: props.nroLote,
	            cantidadAvailable: props.cantidadAvailable,
	            cantidad: props.cantidad,
	            precio: number_format(props.precio, 2),
	            descuento: props.descuento,
	            precioVenta: number_format(props.precioVenta, 2),
	            limiteStock: props.limiteStock,
	            arrayExentoSelect: props.arrayExentoSelect
    		})
    	}   	

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

    eventoBlur = (e) => {
        if(this.state.precio === ''){
            this.setState({
                precio: '0.00'                      
            }); 
        }        
    }

    eventoFocus = (e) => {        
        if(this.state.precio === '0.00'){
            this.setState({
                precio: ''                      
            }); 
        }        
    }    

    eventoBlurPrecioVenta = (e) => {
        if(this.state.precioVenta === ''){
            this.setState({
                precioVenta: '0.00'                      
            }); 
        }        
    }

    eventoFocusPrecioVenta = (e) => {        
        if(this.state.precioVenta === '0.00'){
            this.setState({
                precioVenta: ''                      
            }); 
        }        
    }        

    eventoBlurDescuento = (e) => {
        if(this.state.descuento === ''){
            this.setState({
                descuento: '0'                      
            }); 
        }        
    }

    eventoFocusDescuento = (e) => {        
        if(this.state.descuento === '0'){
            this.setState({
                descuento: ''                      
            }); 
        }        
    }        

    eventoBlurCantidad = (e) => {
        if(this.state.cantidad === ''){
            this.setState({
                cantidad: '0'                      
            }); 
        }        
    }

    eventoFocusCantidad = (e) => {        
        if(this.state.cantidad === '0'){
            this.setState({
                cantidad: ''                      
            }); 
        }        
    }        

    eventoBlurLimiteStock = (e) => {
        if(this.state.limiteStock === ''){
            this.setState({
                limiteStock: '0'                      
            }); 
        }        
    }

    eventoFocusLimiteStock = (e) => {        
        if(this.state.limiteStock === '0'){
            this.setState({
                limiteStock: ''                      
            }); 
        }        
    }

    handleChangeExento = (arrayExentoSelect) => {
        this.setState({ 
            arrayExentoSelect,
            divExento: '',
            divExentoError: ''                                
        });  
    }

   	closeModal = () => {
        this.setState({                        
            loading: 'show'
        });   
        this.props.closeModalProductLote(false);       
    } 

    togglePopover = () => {
        this.setState({popoverOpen: !this.state.popoverOpen})
        this.props.LoadProductPriceFunction(this.props.productoId)        
    }    

    render() {         
        return (
            <span>
            	 <Modal isOpen={this.props.modal} className="ModalShop">
            	 	{
                    	this.props.shop.loading === "hide" ?
                    	<div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">      
	                            <form className="formCodeConfirm" onSubmit=""> 
	                                <div className="row"> 
	                                	<FormGroup className="top form-group col-sm-6">                                                                 
			                                <Label for="codigo">Nro Lote:</Label> 
			                                <div className={this.state.divCodigo}>                               
			                                    <Input disabled={true} name="codigo" id="codigo" onKeyUp={this.handlekeyCodigo} onChange={this.handleChange} value={this.state.codigo} onBlur={this.codigoOnBlur} type="text" placeholder="Codigo" />
			                                </div>
			                                <div className="errorSelect">{this.state.divCodigoError}</div>                                                                                                                                                                                         
			                            </FormGroup> 
			                            <FormGroup className="top form-group col-sm-6">                                                                 
			                                <Label for="cantidadAvailable">Stock Disponible:</Label> 
			                                <div className={this.state.divCantidadAvailable}>                               
			                                    <Input disabled={true} name="cantidadAvailable" id="cantidadAvailable" onKeyUp={this.handlekeyCantidadDisponible} onChange={this.handleChange} value={this.state.cantidadAvailable} type="text" placeholder="Stock Disponible" />
			                                </div>
			                                <div className="errorSelect">{this.state.divCantidadAvailableError}</div>                                                                                                                                                                                         
			                            </FormGroup> 
			                            <FormGroup className="top form-group col-sm-6">                                                                 
			                                <Label for="cantidad">Cantidad:</Label> 
			                                <div className={this.state.divCantidad}>                               
			                                    <Input disabled={true} name="cantidad" id="cantidad" onKeyUp={this.handlekeyCantidad} onChange={this.handleChange} value={this.state.cantidad} type="number" placeholder="Cantidad" onBlur ={this.eventoBlurCantidad} onFocus = {this.eventoFocusCantidad}/> 
			                                </div>
			                                <div className="errorSelect">{this.state.divCantidadError}</div>                                                                                                                                                                                         
			                            </FormGroup> 
			                            <FormGroup className="top form-group col-sm-6">                                                                 
			                                <Label for="precio">Precio de Compra:</Label> 
			                                <div className={this.state.divPrecio}>                               
			                                    <Input disabled={this.props.disabled} name="precio" id="precio" onKeyUp={this.handlekeyPrecio} onChange={this.handleChange} value={this.state.precio} type="text" placeholder="Precio de Compra" onKeyPress={ enterDecimal } onBlur ={this.eventoBlur} onFocus = {this.eventoFocus} />                                    
			                                </div>
			                                <div className="errorSelect">{this.state.divPrecioError}</div>                                                                                                                                                                                         
			                            </FormGroup> 
			                            <FormGroup className="top form-group col-sm-6">                                                                 
			                                <Label for="descuento">Descuento %:</Label> 
			                                <div className={this.state.divDescuento}>                               
			                                    <Input disabled={this.props.disabled} name="descuento" id="descuento" onKeyUp={this.handlekeyDescuento} onChange={this.handleChange} value={this.state.descuento} type="number" placeholder="Descuento" onBlur ={this.eventoBlurDescuento} onFocus = {this.eventoFocusDescuento} />                                    
			                                </div>
			                                <div className="errorSelect">{this.state.divDescuentoError}</div>
			                            </FormGroup>
			                            <FormGroup className="top form-group col-sm-6">                                                                 
			                                <Label for="precioVenta">Precio de Venta:</Label> 
			                                <div className={this.state.divPrecioVenta}>
			                                    <InputGroup>                               
			                                        <Input disabled={this.props.disabled} name="precioVenta" id="precioVenta" onKeyUp={this.handlekeyPrecioVenta} onChange={this.handleChange} value={this.state.precioVenta} type="text" placeholder="Precio de Venta" onKeyPress={enterDecimal} onBlur={this.eventoBlurPrecioVenta} onFocus={this.eventoFocusPrecioVenta}/>
			                                        <InputGroupAddon addonType="append">
			                                            <Button id="popoverPrecios" disabled={this.props.disabled} className={this.state.buttonView} title="Ver Precios" onClick={this.togglePopover}><Visibility className="iconTable" /></Button>
			                                        </InputGroupAddon>
			                                    </InputGroup>
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
			                            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="popoverPrecios" toggle={this.togglePopover}>
			                                <PopoverHeader>Precios por Lote</PopoverHeader>
			                                <PopoverBody>                                    
			                                    <div className="form-group col-sm-12">
			                                    {
			                                        this.props.shop.dataProductPrice.length > 0 ?
			                                        <Table hover responsive borderless>
			                                            <thead className="thead-light">
			                                                <tr>
			                                                    <th className="text-left">Nro</th>
			                                                    <th className="text-left">Lote</th>                  
			                                                    <th className="text-left">Precio</th>                  
			                                                </tr>
			                                            </thead>
			                                            <tbody>
			                                            {
			                                                this.props.shop.dataProductPrice? this.props.shop.dataProductPrice.map((data, i) => {
			                                                    return (
			                                                      <tr key={i} className="text-left">
			                                                        <td>{ i + 1 }</td>
			                                                        <td>{ data.lote }</td>                                                        
			                                                        <td>{ number_format(data.price, 2) }</td>                                                        
			                                                      </tr>
			                                                    );
			                                                })  
			                                                :
			                                                null                                              
			                                            }
			                                            </tbody>
			                                        </Table>
			                                        :
			                                        <div align="center" className="" style={{padding:"1%"}}><img alt="loading" src="assets/loader.gif" width="40%"  /></div>
			                                    }
			                                       
			                                    </div>                                    
			                                </PopoverBody>
			                            </Popover>
	                                </div>
	                            </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveCompras}>{this.props.modalFooter}</Button>
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                            </ModalFooter>
                        </div>  
                        :
                        <div align="center" className={this.state.divLoading} style={{padding:"1%"}}><img alt="loading" src="assets/loader.gif" width="30%" /></div>  
                    }
            	 </Modal>             	
            </span> 
        );
    }
}    

const mapStateToProps = state => ({
  shop: state.shop.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
	LoadProductPriceFunction: (productoId) =>dispatch(LoadProductPriceFunction(productoId)),
    alert: (type, message) => dispatch(openSnackbars(type, message)), 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalProductLote);