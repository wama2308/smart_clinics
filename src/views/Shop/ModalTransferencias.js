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
import { cleanProducts, setCantidadTableTransferencias, setSwitchTableTransferencias, setSelectAllSwitchTransferencias } from "../../actions/ShopActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit } from "@material-ui/icons";
import Switch from '@material-ui/core/Switch';

class ModalTransferencias extends React.Component {
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

    handleChangeInputTable = pos => e => {
        const { name, value } = e.target;
        let valor = 0;
        if(value === ""){
            valor = 0;
        }else{
            valor = parseFloat(value);
        }
        this.props.setCantidadTableTransferencias(pos, valor)        
    }

    componentWillReceiveProps=(props)=>{
        console.log("modal transferencias ", props.shop)
        if(props.shop.dataShopId){
            if(props.shop.dataShopId.sucursal_id){
                this.setState({
                    arraySucursalEnviaSelect: props.shop.dataShopId.sucursal_id,                    
                    loading: props.shop.loading,
                })                  
            }
        }
    }  

    testOnclick=()=>{}

    handlekeyObservacion= event =>{
        this.setState({
            divObservacion: "",
            divObservacionError: "",         
        })
    }

    handleChangeSucursalRecibe = (arraySucursalRecibeSelect) => {
        this.setState({ 
            arraySucursalRecibeSelect,
            divSucursalRecibe: '',
            divSucursalRecibeError: ''                                
        });  
    }  

   	closeModal = () => {
        this.setState({                        
            loading: 'show'
        });   
        this.props.cleanProducts();
        this.props.valorCloseModal(false);       
    }     

    validate = () => {
        let divPrecio= '';        
        let divPrecioError= '';        
        let divDescuento= '';        
        let divDescuentoError= '';        
        let divPrecioVenta= '';        
        let divPrecioVentaError= '';        
        let divLimiteStock= '';        
        let divLimiteStockError= '';        
        let divExento= '';        
        let divExentoError= '';   
        let labelExento = "";
        let divNuevaCantidadError = "";
        let divNuevaCantidad = "";
        let divMotivoSalidaError = "";
        let divMotivoSalida = "";
        let divEspecifiqueError = "";
        let divEspecifique = "";
        let motivoSalida = "";
        if(this.props.option === 2){
            if (this.state.arrayExentoSelect) {                           
                let arrayExento = Object.values(this.state.arrayExentoSelect);
                arrayExento.forEach(function (elemento, indice, array) {
                    if(indice === 0){
                        labelExento = elemento;
                    }            
                });                         
            }     
            
            if (this.state.precio === "" || this.state.precio === "0.00" || this.state.precio === "0.0") {            
                divPrecioError = "¡Ingrese el precio de compra!";
                divPrecio = "borderColor";
            }
            if (this.state.precioVenta === "" || this.state.precioVenta === "0.00" || this.state.precioVenta === "0.0") {            
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
            if (divPrecioError || divPrecioVentaError || divLimiteStockError || divExentoError) {            
                this.setState({ 
                    divPrecioError,
                    divPrecio,
                    divPrecioVentaError,
                    divPrecioVenta,
                    divLimiteStockError,
                    divLimiteStock,                
                    divExentoError,
                    divExento,                
                });  
                return false;
            }    
        }
        if(this.props.option === 3){
            if (this.state.arrayMotivoSalidaSelect) {                           
                let arrayMotivoSalida = Object.values(this.state.arrayMotivoSalidaSelect);
                arrayMotivoSalida.forEach(function (elemento, indice, array) {
                    if(indice === 1){
                        motivoSalida = elemento;
                    }            
                });                         
            }  
            if (this.state.nuevaCantidad === "" || this.state.nuevaCantidad === "0") {            
                divNuevaCantidadError = "¡Ingrese la cantidad de salida!";
                divNuevaCantidad = "borderColor";
            }
            if (!this.state.arrayMotivoSalidaSelect) {                    
                divMotivoSalidaError = "¡Seleccione el motivo de salida!";
                divMotivoSalida  = "borderColor";

            }   
            if(motivoSalida === "5d07a44fa65dd90b0646af97"){
                divEspecifiqueError = "¡Especifique el motivo de salida!";
                divEspecifique = "borderColor";
            }
            if (divNuevaCantidadError || divMotivoSalidaError) {            
                this.setState({ 
                    divNuevaCantidad,
                    divNuevaCantidadError,
                    divMotivoSalida,
                    divMotivoSalidaError,
                    divEspecifique,
                    divEspecifiqueError                                    
                });  
                return false;
            }    
        }
        return true;        
    };

    handleAction = event => {
        event.preventDefault();
        const isValid = this.validate();   
        if (isValid) {             
            let labelExento = "";
            if (this.state.arrayExentoSelect) {                           
                let arrayExento = Object.values(this.state.arrayExentoSelect);
                arrayExento.forEach(function (elemento, indice, array) {
                    if(indice === 0){
                        labelExento = elemento;
                    }            
                });                         
            }                 
            if(this.props.option === 2)
            {
                this.setState({loading:'show'})                                    
                this.props.editSupplieLotAction(
                  {
                    id: this.props.productoId,
                    lote_id: this.props.loteId,
                    limit_stock: this.state.limiteStock,
                    price: this.state.precio,
                    price_sale: this.state.precioVenta,
                    discount: this.state.descuento,
                    exempt: labelExento
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            }
            if(this.props.option === 3){
                alert("guayaaaaa")
            }             
        }
    }   

    handleChangeSwitch = pos => event => {
        this.props.setSwitchTableTransferencias(pos, event.target.checked);        
    };

    handleChangeSwitchAll = name => event => {        
        this.setState({ 
            [name]: event.target.checked 
        });
        this.props.setSelectAllSwitchTransferencias(event.target.checked);
    };

    render() {
        return (
            <span>
            	 <Modal isOpen={this.props.modal} toggle={this.closeModal} className="ModalShop">
            	 	{
                    	this.state.loading === 'hide' ?
                    	<div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">      
	                            <form className="formCodeConfirm" onSubmit={this.handleAction.bind(this)}> 
	                                <div className="row"> 
	                                	<FormGroup className="top form-group col-sm-6">                                                                 
			                                <Label for="sucursalEnvia">Sucursal que Envia:</Label>
			                                <div className={this.state.divSucursalEnvia}>
			                                    <Select 
                                                    isSearchable="true" 
                                                    isDisabled={true} 
                                                    name="sucursalEnvia" 
                                                    value={this.state.arraySucursalEnviaSelect} 
                                                    onChange={this.handleChangeSucursalEnvia} 
                                                    options={this.props.shop.branchOfficces} 
                                                />
			                                </div>                                                                                
			                                <div className="errorSelect">{this.state.divSucursalEnviaError}</div>
			                            </FormGroup>			                           
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="sucursalRecibe">Sucursal que Recibe:</Label>
                                            <div className={this.state.divSucursalRecibe}>
                                                <Select 
                                                    isSearchable="true" 
                                                    isDisabled={this.props.disabled} 
                                                    name="sucursalRecibe" 
                                                    value={this.state.arraySucursalRecibeSelect} 
                                                    onChange={this.handleChangeSucursalRecibe} 
                                                    options={this.props.shop.branchOfficces} 
                                                />
                                            </div>                                            
                                            <div className="errorSelect">{this.state.divSucursalRecibeError}</div>
                                        </FormGroup>
                                        <FormGroup className="top form-group col-sm-6">
                                            <Label for="observacion">Observacion:</Label>
                                            <div className={this.state.divObservacion}>
                                                <Input 
                                                    disabled={this.state.disabled} 
                                                    name="observacion" 
                                                    id="observacion" 
                                                    onKeyUp={this.handlekeyObservacion} 
                                                    onChange={this.handleChange} 
                                                    value={this.state.observacion} 
                                                    type="textarea" 
                                                    placeholder="Observacion" 
                                                />                                                
                                            </div>
                                            <div className="errorSelect">{this.state.divObservacionError}</div>
                                        </FormGroup>                                        
	                                </div>
                                    <Label for="listaProductos"><b><h5>Lista de Productos</h5></b></Label>
                                    <br />
                                    <Table hover responsive borderless>
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="text-left">Nro</th>
                                                <th className="text-left ">Producto</th>
                                                <th className="text-left">Codigo</th>
                                                <th className="text-left" style={{width: "17vh"}}>Cantidad</th>
                                                <th className="text-left">Precio Compra</th>                                                
                                                <th className="text-left">Precio Venta</th>
                                                <th className="text-left">Exento</th>                                                
                                                <th className="text-left">Confirmar</th>                                                
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
                                                            <td style={{width: "17vh"}}>
                                                                <Input 
                                                                    name={`inputQuantity_${i}`}
                                                                    id={`inputQuantity_${i}`}
                                                                    type="number"                                                                    
                                                                    value={list.quantity}
                                                                    onChange={this.handleChangeInputTable(i)}
                                                                    style={{width: "90%"}}
                                                                />
                                                            </td>
                                                            <td>{number_format(list.price, 2)} 
                                                                {this.props.aplication.dataGeneral.dataCountries.current_simbol}
                                                            </td>
                                                            <td>{number_format(list.price_sale, 2)} 
                                                                {this.props.aplication.dataGeneral.dataCountries.current_simbol}
                                                            </td>
                                                            <td>{list.exempt}</td> 
                                                            <td style={{padding: "1px"}}>
                                                                <Switch
                                                                    onChange={this.handleChangeSwitch(i)} 
                                                                    value= {list.confirm}                                             
                                                                    id= {`checked_${i}`}
                                                                    name= {`checked_${i}`}
                                                                    color="primary"
                                                                    checked={list.confirm}
                                                                />                                                                 
                                                            </td>                                                           
                                                        </tr>
                                                    )                                                    
                                                })
                                            :
                                              null
                                            }
                                        </tbody>
                                    </Table>
                                    <div align="right">
                                        <Label for="seleccionarTodos"><b>Seleccionar Todos:</b></Label>
                                        <Switch
                                          checked={this.state.checked?this.state.checked:false}
                                          onChange={this.handleChangeSwitchAll("checked")}
                                          value={this.state.checked}
                                          color="primary"
                                        />
                                    </div>
	                            </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>                                
                                <Button 
                                    className={this.props.option !== 3 ? this.props.showHide : this.props.showHideEditar} 
                                    color="primary" 
                                    onClick={this.handleAction}
                                >
                                    {this.props.modalFooter}
                                </Button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                            </ModalFooter>
                        </div>  
                        :
                        <div style={{height: "55vh"}}>
                            <CircularProgress style={{position: " absolute", height: 40, top: "45%", right: "50%",zIndex: 2}} />
                        </div>
                    }
            	 </Modal>             	
            </span> 
        );
    }
}    

const mapStateToProps = state => ({
  shop: state.shop.toJS(),
  authData: state.auth,
  output_supplie: state.global.dataGeneral.dataGeneral.output_supplie,
  aplication: state.global
  
});

const mapDispatchToProps = dispatch => ({  
	alert: (type, message) => dispatch(openSnackbars(type, message)),     
    cleanProducts: () =>dispatch(cleanProducts()),
    setCantidadTableTransferencias: (pos, value) =>dispatch(setCantidadTableTransferencias(pos, value)),
    setSwitchTableTransferencias: (pos, value) =>dispatch(setSwitchTableTransferencias(pos, value)),
    setSelectAllSwitchTransferencias: (value) =>dispatch(setSelectAllSwitchTransferencias(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalTransferencias);