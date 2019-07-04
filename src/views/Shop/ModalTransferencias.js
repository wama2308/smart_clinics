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
import { cleanProducts, setCantidadTableTransferencias, setSwitchTableTransferencias, setSelectAllSwitchTransferencias, productTransferAction, editTransferAction } from "../../actions/ShopActions";
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

    handleChangeInputTable = (pos, cantidad) => e => {
        const { name, value } = e.target;
        let valor = 0;
        if(value === "0"){
            valor = 0;
            var elemento = document.getElementById("divQuantity_"+pos);
            elemento.className += " borderColorInputTable";            
        }
        else if(value === ""){
            valor = 0;            
            var elemento = document.getElementById("divQuantity_"+pos);
            elemento.className += " borderColorInputTable";            
        }else if (parseFloat(value) > cantidad){
            valor = cantidad;
            var elemento = document.getElementById("divQuantity_"+pos);
            elemento.className += " borderColorInputTable";            
            this.props.alert("warning", "¡La cantidad a transferir no puede ser mayor a la cantidad de la compra!");
        }else{
            valor = parseFloat(value);
            var elemento = document.getElementById("divQuantity_"+pos);
            elemento.className += " borderColorInputTableWhite";             
        }
        this.props.setCantidadTableTransferencias(pos, valor, this.props.option)  
             
    }

    componentWillReceiveProps=(props)=>{
        //console.log("modal transferencias ", props.shop)        
        if(props.option === 4){
            if(props.shop.dataShopId){
                if(props.shop.dataShopId.sucursal_id){
                    this.setState({
                        arraySucursalEnviaSelect: props.shop.dataShopId.sucursal_id,                    
                        loading: props.shop.loading,
                    })                  
                }
            }    
        }
        if(props.option === 5 || props.option === 6 || props.option === 7){
            if(props.shop.transferId){
                if(props.shop.transferId.distribuidor_id && props.aplication.confirm.message === "" && props.shop.action === 0){
                    const productConfirm = props.shop.transferId.products.find(product => product.confirm === false);
                    let selectAll = false;
                    if(!productConfirm){
                        selectAll = true;
                    }
                    this.setState({
                        arraySucursalEnviaSelect: props.shop.transferId.distribuidor_id,                    
                        arraySucursalRecibeSelect: props.shop.transferId.sucursal_id,       
                        observacion: props.shop.transferId.observation,
                        checked: selectAll,
                        loading: 'hide',
                    })
                }                                  
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
            ...InitalState,                   
            loading: 'show'
        });   
        this.props.cleanProducts();
        this.props.valorCloseModal(false);       
    }     

    validate = () => {
        let divSucursalRecibe = '';        
        let divSucursalRecibeError = '';                
        let acumCantidades = 0;
        let acumConfirm = 0;
        let arrayProducts = [];
        this.props.option === 4 ? arrayProducts = this.props.shop.products : arrayProducts = this.props.shop.transferId.products;
        const productConfirm = arrayProducts.find(product => product.confirm === true);
        const productFind = arrayProducts.find(product => product.quantity_edit === 0);     
        const productFindKey = arrayProducts.findIndex(productKey => productKey.quantity_edit === 0);            
        
        if (!this.state.arraySucursalRecibeSelect) {                    
            divSucursalRecibeError = "¡Seleccione la sucursal que recibe!";
            divSucursalRecibe  = "borderColor";
        }else if (this.state.arraySucursalRecibeSelect === this.state.arraySucursalEnviaSelect) {                    
            divSucursalRecibeError = "¡La sucursal que recibe no puede ser la misma que envia!";
            divSucursalRecibe  = "borderColor";
        }else if(!productConfirm){
            acumConfirm++;
            this.props.alert("warning", "¡Debe seleccionar al menos un producto para la transferencia!");
        }else if(productFind){
            acumCantidades++;            
            var elemento = document.getElementById("divQuantity_"+productFindKey);
            elemento.className += " borderColorInputTable";
            this.props.alert("warning", "¡La cantidad de los productos a transferir no puede ser 0!");
        }

        if (divSucursalRecibeError) {            
            this.setState({ 
                divSucursalRecibeError,
                divSucursalRecibe,                
            });  
            return false;
        }else if(acumCantidades === 1){
            return false;
        }else if(acumConfirm === 1){
            return false;
        }else{
            return true;
        }    
                
    };

    handleAction = event => {
        event.preventDefault();
        const isValid = this.validate();   
        if (isValid) {             
            let sucursalEnvia = "";
            let sucursalRecibe = "";
            if (this.state.arraySucursalEnviaSelect) {                           
                sucursalEnvia = this.state.arraySucursalEnviaSelect.value;
            }                 
            if (this.state.arraySucursalRecibeSelect) {                           
                sucursalRecibe = this.state.arraySucursalRecibeSelect.value;                
            }
            if(this.props.option === 4)
            {
                this.setState({loading:'show'})                                    
                this.props.productTransferAction(
                  {
                    sucursal_envia: sucursalEnvia,
                    sucursal_recibe: sucursalRecibe,
                    observacion: this.state.observacion,
                    products: this.props.shop.products,                    
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            }            
            if(this.props.option === 6)
            {
                if(this.props.status === "Pendiente"){
                    this.setState({loading:'show'})                                    
                    this.props.editTransferAction(
                      {
                        id: this.props.transfer_id,
                        sucursal_envia: sucursalEnvia,
                        sucursal_recibe: sucursalRecibe,
                        observacion: this.state.observacion,
                        products: this.props.shop.transferId.products,                    
                      },
                      () => {
                        this.closeModal();                    
                      }
                    )    
                }else{
                    this.props.alert("warning", "¡No puede editar la transferencia, su estatus es: "+this.props.status+"!");
                }
                
            }
        }
    }   

    handleChangeSwitch = pos => event => {
        this.props.setSwitchTableTransferencias(pos, event.target.checked, this.props.option);        
    };

    handleChangeSwitchAll = name => event => {        
        this.setState({ 
            [name]: event.target.checked 
        });
        this.props.setSelectAllSwitchTransferencias(event.target.checked, this.props.option);
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
                                                    disabled={this.props.disabled} 
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
                                                this.props.option === 4 ?

                                                this.props.shop.products ? this.props.shop.products.map((list, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{i+1}</td>
                                                            <td>{list.name}</td>
                                                            <td>{list.code}</td>
                                                            <td style={{width: "17vh"}}>
                                                                <div id={`divQuantity_${i}`} className="">
                                                                    <Input 
                                                                        name={`inputQuantity_${i}`}
                                                                        id={`inputQuantity_${i}`}
                                                                        type="number"                                                                    
                                                                        value={list.quantity_edit}
                                                                        onChange={this.handleChangeInputTable(i, list.quantity_stock)}
                                                                        style={{width: "100%"}}
                                                                        disabled={this.props.disabled} 
                                                                    />
                                                                </div>
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
                                                                    disabled={this.props.disabled} 
                                                                />                                                                 
                                                            </td>                                                           
                                                        </tr>
                                                    )                                                    
                                                })
                                                :
                                                null

                                                :

                                                this.props.shop.transferId.products ? this.props.shop.transferId.products.map((list, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{i+1}</td>
                                                            <td>{list.name}</td>
                                                            <td>{list.code}</td>
                                                            <td style={{width: "17vh"}}>
                                                                <div id={`divQuantity_${i}`} className="">
                                                                    <Input 
                                                                        name={`inputQuantity_${i}`}
                                                                        id={`inputQuantity_${i}`}
                                                                        type="number"                                                                    
                                                                        value={list.quantity_edit}
                                                                        onChange={this.handleChangeInputTable(i, list.quantity)}
                                                                        style={{width: "100%"}}
                                                                    />
                                                                </div>
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
                                                                    disabled={this.props.disabled} 
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
                                          disabled={this.props.disabled} 
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
    productTransferAction: (data, callback) =>dispatch(productTransferAction(data, callback)),
    editTransferAction: (data, callback) =>dispatch(editTransferAction(data, callback)),
    setCantidadTableTransferencias: (pos, value, option) =>dispatch(setCantidadTableTransferencias(pos, value, option)),
    setSwitchTableTransferencias: (pos, value, option) =>dispatch(setSwitchTableTransferencias(pos, value, option)),
    setSelectAllSwitchTransferencias: (value, option) =>dispatch(setSelectAllSwitchTransferencias(value, option)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalTransferencias);