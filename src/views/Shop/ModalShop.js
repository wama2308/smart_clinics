import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { Button, Col, Row, Table, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, FormFeedback, Tooltip, } from 'reactstrap';
import classnames from 'classnames';
import '../../components/style.css';
import './Shop.css';
import axios from 'axios';
import Select from 'react-select';
import { FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar} from 'react-icons/fa';
import jstz from 'jstz';
import { connect } from "react-redux";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import Products from './Products.js';
import { openSnackbars, openConfirmDialog } from "../../actions/aplicantionActions";
import { cleanProducts, saveShopAction, editShopAction, deleteProductsFunction } from "../../actions/ShopActions";
import { InitalState } from './InitialState.js';
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import { number_format } from "../../core/utils";

class ModalShop extends React.Component {
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

    testOnclick = () => {
        console.log(this.props.shop.products)
    }

    toggle = () => {
        this.setState({ 
            collapse: !this.state.collapse 
        });
    }

    closeModal = () => {
        this.setState({                        
            ...InitalState,
            loading: 'show'
        });   
        this.props.cleanProducts();
        this.props.valorCloseModal(false);       
    }       

    validate = () => {
        let divTipoCompra= '';        
        let divTipoCompraError= '';
        let divProveedor= '';        
        let divProveedorError= '';
        let divNroCompra= '';        
        let divNroCompraError= '';
        let divNroControl= '';        
        let divNroControlError= '';
        let divObservacion= '';        
        let divObservacionError= '';
        let divCompraDate= '';        
        let divCompraDateError= '';
        let divDireccionPartida='';        
        let divDireccionPartidaError='';
        let divDireccionLlegada='';        
        let divDireccionLlegadaError='';
        let divTableProductos='';
        let divSucursalesSelect='';
        let divSucursalesSelectError='';

        
        if (!this.state.arrayTipoCompraSelect) {            
            divTipoCompraError = "¡Seleccione el tipo de compra!";
            divTipoCompra ="borderColor";
        }
        if (!this.state.arrayProveedorSelect) {            
            divProveedorError = "¡Seleccione el proveedor!";
            divProveedor = "borderColor";
        }
        if (!this.state.arraySucursalesSelect) {            
            divSucursalesSelectError = "¡Seleccione la sucursal!";
            divSucursalesSelect = "borderColor";
        }
        if (this.state.nroCompra === "") {            
            divNroCompraError = "¡Ingrese el numero de la compra!";
            divNroCompra = "borderColor";
        }                
        if (this.state.nroControl === "") {            
            divNroControlError = "¡Ingrese el numero de control!";
            divNroControl = "borderColor";
        }
        if (this.state.direccionPartida === "") {            
            divDireccionPartidaError = "¡Ingrese la direccion de partida!";
            divDireccionPartida = "borderColor";
        }
        if (this.state.direccionLlegada === "") {            
            divDireccionLlegadaError = "¡Ingrese la direccion de llegada!";
            divDireccionLlegada = "borderColor";
        }
        if (!this.state.compraDate) {                  
            divCompraDateError = "¡Ingrese la fecha de compra!";
            divCompraDate = "borderColor";
        }
        if (this.props.shop.products.length === 0) {                  
            divTableProductos = "¡Debe ingresar el o los productos de la compra!";            
        }
        if (divTipoCompraError || divProveedorError || divNroCompraError || divNroControlError || divDireccionPartidaError 
            || divDireccionLlegadaError || divCompraDateError || divSucursalesSelectError) {            
            this.setState({ 
                divTipoCompraError,
                divTipoCompra,
                divProveedorError,
                divProveedor,
                divNroCompraError,
                divNroCompra,
                divNroControlError,
                divNroControl,
                divDireccionPartidaError,
                divDireccionPartida,
                divDireccionLlegadaError,
                divDireccionLlegada,  
                divCompraDate,                        
                divCompraDateError,   
                divTableProductos,
                divSucursalesSelect,
                divSucursalesSelectError                     
            });  
            return false;
        }
        return true;        
    };

    handleSaveCompras = event => {
        event.preventDefault();
        const isValid = this.validate();   
        if (isValid) {             
            let compraDate = new Date(this.state.compraDate).toISOString().slice(0,10);
            let valueTipoCompra = "";
            let arrayTipoCompra = Object.values(this.state.arrayTipoCompraSelect);
            arrayTipoCompra.forEach(function (elemento, indice) {
                if(indice === 1){
                    valueTipoCompra = elemento;
                }            
            });
            let valueProveedor = "";
            let arrayProveedor = Object.values(this.state.arrayProveedorSelect);
            arrayProveedor.forEach(function (elemento, indice) {
                if(indice === 1){
                    valueProveedor = elemento;
                }            
            });            
            let valueSucursal = "";
            let arraySucursal = Object.values(this.state.arraySucursalesSelect);
            arraySucursal.forEach(function (elemento, indice) {
                if(indice === 1){
                    valueSucursal = elemento;
                }            
            });            
            
            if(this.props.option === 1)
            {
                console.log(valueTipoCompra)
                console.log(valueSucursal)
                console.log(this.state.nroCompra)
                console.log(this.state.nroControl)
                console.log(valueProveedor)
                console.log(this.state.direccionPartida)
                console.log(this.state.direccionLlegada)
                console.log(compraDate)
                console.log(this.state.observacion)
                console.log(this.props.shop.subTotal)
                console.log(this.props.shop.impuesto)
                console.log(this.props.shop.total)
                console.log(this.props.shop.products)
                this.setState({loading:'show'})                                    
                this.props.saveShopAction(
                  {
                    typeshop: valueTipoCompra,
                    number_invoice: this.state.nroCompra,
                    numero_control: this.state.nroControl,
                    provider_id: valueProveedor,
                    sucursal_id: valueSucursal,
                    starting_address: this.state.direccionPartida,
                    arrival_address: this.state.direccionLlegada,
                    date_purchase: compraDate,
                    observacion: this.state.observacion,
                    subtotal: this.props.shop.subTotal,
                    igv: this.props.shop.impuesto,
                    total: this.props.shop.total,
                    products: this.props.shop.products,
                    timeZ: jstz.determine().name()
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            } 
            /*else if(this.props.option === 3){
                this.setState({loading:'show'})   
                this.props.editDistributorAction(
                  {
                    id: this.props.userId,
                    name:this.state.name,
                    type_identity:this.state.arrayTypeIdentitySelect,
                    tin:this.state.dni,
                    email:this.state.tagsEmails,
                    phone:this.state.tagsTelefonos,
                    country:valuePais,
                    province:valueProvince,
                    district:valueDistrict,
                    address:this.state.direccion,
                    contact:this.props.distributor.contacs,                    
                    timeZ: jstz.determine().name()
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            }*/
        }
    }

    handleChangeTipoCompra = (arrayTipoCompraSelect) => {
        this.setState({ 
            arrayTipoCompraSelect,
            divTipoCompra: '',
            divTipoCompraError: ''                                
        });  
    }

    handlekeyNroCompra = event =>{
        this.setState({
            divNroCompra: "",
            divNroCompraError: "",         
        })
    }    

    handlekeyNroControl = event =>{
        this.setState({
            divNroControl: "",
            divNroControlError: "",         
        })
    }

    handleChangeProvider = (arrayProveedorSelect) => {
        this.setState({ 
            arrayProveedorSelect,
            divProveedor: '',
            divProveedorError: ''                                
        });  
    }

    handleChangeCompraDate = (date) => {
        this.setState({
          compraDate: date,
          divCompraDateError: "",
          divCompraDate: ""
        });
    }

    handlekeyDireccionPartida = event =>{
        this.setState({
            divDireccionPartida: '',
            divDireccionPartidaError: ''
        })
    }

    handlekeyDireccionLLegada = event =>{
        this.setState({
            divDireccionLlegada: '',
            divDireccionLlegadaError: ''
        })
    }

    handlekeyObservacion = event =>{
        this.setState({
            divObservacion: '',
            divObservacionError: ''
        })
    }    

    handleChangeSucursalesSelect = (arraySucursalesSelect) => {
        this.setState({ 
            arraySucursalesSelect,
            divSucursalesSelect: '',
            divSucursalesSelectError: ''                                
        });  
    }

    deleteProduct = (key, cantidad, precio, exento, descuento) => {
        let impuesto = 0;
        if(exento === 'NO'){
            impuesto = this.props.aplication.dataGeneral.dataCountries.tax_rate;
        }else{
            impuesto = 0;
        }
        let precio_replace = precio.replace(",", "");
        let precio_float = parseFloat(precio_replace);
        let precio_desc = precio_float - (precio_float * (descuento/100));
        let cantidad_float = parseFloat(cantidad);
        let precio_cant = precio_desc * cantidad_float;
        let precio_imp = (precio_cant * (impuesto/100));        
        let total = precio_cant + precio_imp;        
        const message = {
          title: "Eliminar Producto",
          info: "¿Esta seguro que desea eliminar este producto?"
        };
        this.props.confirm(message, res => {
            if (res) {                
                this.props.deleteProductsFunction(key, precio_cant, precio_imp, total);        
            }
        });        
    };   

    componentWillReceiveProps=(props)=>{        
        console.log("props modal shop", this.props.shop);  
        if(this.props.shop.products.length > 0){
            this.setState({divTableProductos:''})
        } 
        if(props.option === 1){
            this.setState({
                loading: 'hide',
            })
        }
        if(props.option === 0){
            this.setState({
                ...InitalState
            })   
        }
        
                
    }       

    render() {         
        return (
            <span>                            
                <Modal isOpen={this.props.modal} className="ModalShop">
                    {
                        this.state.loading === "hide" ?
                            <div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">      
                            <form className="formCodeConfirm" onSubmit={this.handleSaveCompras.bind(this)}> 
                                <div className="row"> 
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="tipoCompra">Tipo de Compra:</Label>
                                        <div className={this.state.divTipoCompra}>
                                            <Select isSearchable="true" isDisabled={this.props.disabled} name="tipoCompra" value={this.state.arrayTipoCompraSelect} onChange={this.handleChangeTipoCompra} options={this.props.aplication.dataGeneral.dataGeneral.type_shop} />
                                        </div>                                            
                                        <div className="errorSelect">{this.state.divTipoCompraError}</div>
                                    </FormGroup>
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="sucursales">Sucursales</Label>
                                        <div className={this.state.divSucursalesSelect}>
                                            <Select isSearchable="true" isDisabled={this.props.disabled} name="sucursales" value={this.state.arraySucursalesSelect} onChange={this.handleChangeSucursalesSelect} options={this.props.shop.branchOfficces} />
                                        </div>
                                        <div className="errorSelect">{this.state.divSucursalesSelectError}</div>
                                    </FormGroup>
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="nroCompra">Nro Compra</Label>
                                        <div className={this.state.divNroCompra}>
                                            <Input disabled={this.props.disabled} name="nroCompra" id="nroCompra" onKeyUp={this.handlekeyNroCompra} onChange={this.handleChange} value={this.state.nroCompra} type="text" placeholder="Nro Compra" />
                                        </div>
                                        <div className="errorSelect">{this.state.divNroCompraError}</div>
                                    </FormGroup>
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="nroControl">Nro Control</Label>
                                        <div className={this.state.divNroControl}>
                                            <Input disabled={this.props.disabled} name="nroControl" id="nroControl" onKeyUp={this.handlekeyNroControl} onChange={this.handleChange} value={this.state.nroControl} type="text" placeholder="Nro Control" />
                                        </div>
                                        <div className="errorSelect">{this.state.divNroControlError}</div>
                                    </FormGroup>
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="proveedor">Proveedor:</Label>
                                        <div className={this.state.divProveedor}>
                                            <Select isSearchable="true" isDisabled={this.props.disabled} name="proveedor" value={this.state.arrayProveedorSelect} onChange={this.handleChangeProvider} options={this.props.aplication.dataGeneral.dataCountries.provider} />
                                        </div>                                            
                                        <div className="errorSelect">{this.state.divProveedorError}</div>
                                    </FormGroup>    
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="direccionPartida">Direccion de Partida:</Label>
                                        <div className={this.state.divDireccionPartida}>
                                            <Input disabled={this.props.disabled} name="direccionPartida" id="direccionPartida" onKeyUp={this.handlekeyDireccionPartida} onChange={this.handleChange} value={this.state.direccionPartida} type="textarea" placeholder="Direccion de Partida" />
                                        </div>
                                        <div className="errorSelect">{this.state.divDireccionPartidaError}</div>                                                                                                                                                            
                                    </FormGroup>                                
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="direccionLlegada">Direccion de LLegada:</Label>
                                        <div className={this.state.divDireccionLlegada}>
                                            <Input disabled={this.props.disabled} name="direccionLlegada" id="direccionLlegada" onKeyUp={this.handlekeyDireccionLLegada} onChange={this.handleChange} value={this.state.direccionLlegada} type="textarea" placeholder="Direccion de Llegada" />
                                        </div>
                                        <div className="errorSelect">{this.state.divDireccionLlegadaError}</div>
                                    </FormGroup>
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="emails">Fecha de Compra</Label>
                                        <div className={this.state.divCompraDate} style={{width:"45%"}}>
                                            <DatePicker
                                                selected={this.state.compraDate}
                                                onChange={this.handleChangeCompraDate}
                                                dateFormat="dd-MM-yyyy"       
                                                isClearable={this.props.isClearable}    
                                                showYearDropdown
                                                dateFormatCalendar="MMMM"
                                                className="form-control"
                                                disabled={this.props.disabled}
                                            />
                                        </div>
                                        <div className="errorSelect">{this.state.divCompraDateError}</div>                                                                
                                    </FormGroup>
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="observacion">Observacion:</Label>
                                        <div className={this.state.divObservacion}>
                                            <Input disabled={this.props.disabled} name="observacion" id="observacion" onKeyUp={this.handlekeyObservacion} onChange={this.handleChange} value={this.state.observacion} type="textarea" placeholder="Observacion" />
                                        </div>
                                        <div tooltip>{this.state.divObservacionError}</div>                                                                                                                                                            
                                    </FormGroup>                                                                 
                                </div>            
                                <Button disabled={this.props.disabled} color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Productos</Button>                                                                                            
                                <br />
                                <br />
                                <Products 
                                    collapse={this.state.collapse}
                                />
                                <div className="errorSelect" style={{width:"100%"}}>{this.state.divTableProductos}</div>
                                <Table hover responsive borderless>
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="text-left">Nro</th>
                                            <th className="text-left ">Producto</th>                                                        
                                            <th className="text-left">Codigo</th>                                                        
                                            <th className="text-left">Cantidad</th>                                                        
                                            <th className="text-left">Precio Compra</th>                                                        
                                            <th className="text-left">Desc %</th>                                                        
                                            <th className="text-left">Precio Desc</th>                                                        
                                            <th className="text-left">Precio Venta</th>                                                        
                                            <th className="text-left">Exento</th>                                                        
                                            <th className="text-left">Acciones</th>                                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.shop.products ? this.props.shop.products.map((list, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{list.name}</td>                                                                                                                                                    
                                                        <td>{list.code}</td>                                                                                                                                                                                                            
                                                        <td>{list.quantity}</td>                                                                                                                                                    
                                                        <td>{list.price} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>                                                                                                                                                                                                            
                                                        <td>{list.discount}</td>                                                                                                                                                                                                            
                                                        <td>{number_format(list.price_discount, 2)} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>                                                                                                                                                                                                            
                                                        <td>{list.price_sale} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>                                                                                                                                                                                                            
                                                        <td>{list.exempt}</td>                                                                                                                                                                                                                                                                    
                                                        <td>
                                                            <div  className="float-left" >
                                                                <IconButton aria-label="Delete" disabled={this.props.option === 2 ? true : false} title="Ver Rol" className="iconButtons" onClick={() => { this.deleteProduct(i, list.quantity, list.price, list.exempt, list.discount); }}><Delete className="iconTable" /></IconButton>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        :
                                          null
                                        }
                                    </tbody>
                                </Table>
                                <hr />
                                <br />
                                <div className="divFlexRight">
                                    <div style={{width:"60%"}}>
                                        <FormGroup className="labelFlexRight">
                                            <div style={{width:"90%"}}>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend" style={{width:"79px"}}>Subtotal</InputGroupAddon>
                                                        <Input type="text" disabled={true} name="subtotal" id="subtotal" placeholder="Subtotal" value={number_format(this.props.shop.subTotal, 2)}/>
                                                    <InputGroupAddon addonType="append">{this.props.aplication.dataGeneral.dataCountries.current_simbol}</InputGroupAddon>
                                                  </InputGroup>
                                            </div>                                            
                                        </FormGroup>
                                        <FormGroup className="labelFlexRight">
                                            <div style={{width:"90%"}}>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend" style={{width:"79px"}}>Impuesto</InputGroupAddon>
                                                        <Input type="text" disabled={true} name="impuesto" id="impuesto" placeholder="Impuesto" value={number_format(this.props.shop.impuesto, 2)}/>
                                                    <InputGroupAddon addonType="append">{this.props.aplication.dataGeneral.dataCountries.current_simbol}</InputGroupAddon>
                                                  </InputGroup>
                                            </div>                                            
                                        </FormGroup>
                                        <FormGroup className="labelFlexRight">
                                            <div style={{width:"90%"}}>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend" style={{width:"79px"}}>Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputGroupAddon>
                                                        <Input type="text" disabled={true} name="Total" id="Total" placeholder="Total" value={number_format(this.props.shop.total, 2)}/>
                                                    <InputGroupAddon addonType="append">{this.props.aplication.dataGeneral.dataCountries.current_simbol}</InputGroupAddon>
                                                </InputGroup>
                                            </div>                                            
                                        </FormGroup>
                                    </div>
                                </div>
                                <br />                                
                            </form>                                                                    
                            </ModalBody>
                            <ModalFooter>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveCompras}>{this.props.modalFooter}</Button>
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                            </ModalFooter>
                            </div>
                        :
                            <div align="center" className={this.state.divLoading} style={{padding:"1%"}}><img src="assets/loader.gif" width="30%" /></div>
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
    confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
    saveShopAction: (data, callback) =>dispatch(saveShopAction(data, callback)),
    deleteProductsFunction: (key, subtotal, impuesto, total) =>dispatch(deleteProductsFunction(key, subtotal, impuesto, total)),
    cleanProducts: (key) =>dispatch(cleanProducts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalShop);