import React from 'react';
import { Button, Table, Input, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, } from 'reactstrap';
import '../../components/style.css';
import './Shop.css';
import Select from 'react-select';
import jstz from 'jstz';
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Products from './Products.js';
import { openConfirmDialog } from "../../actions/aplicantionActions";
import { cleanProducts, saveShopAction, editShopAction, deleteProductsFunction, removeProductAction, actionProps } from "../../actions/ShopActions";
import { InitalState } from './InitialState.js';
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit } from "@material-ui/icons";
import { number_format } from "../../core/utils";
import CircularProgress from "@material-ui/core/CircularProgress";

class ModalShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...InitalState
        };
    }

    componentDidMount(){
        const branchOfficces = this.props.shop.branchOfficces.find(branchData => branchData.is_default === 1);
        if(this.props.option === 1){
            this.setState({
                arraySucursalesSelect:branchOfficces,
                loading: 'hide',
            })
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    testOnclick = () => {}

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
            || divDireccionLlegadaError || divCompraDateError || divSucursalesSelectError || divTableProductos) {
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

            if(this.props.option === 1)
            {
                this.setState({loading:'show'})
                this.props.saveShopAction(
                  {
                    typeshop: this.state.arrayTipoCompraSelect.value,
                    number_invoice: this.state.nroCompra,
                    numero_control: this.state.nroControl,
                    provider_id: this.state.arrayProveedorSelect.value,
                    sucursal_id: this.state.arraySucursalesSelect.value,
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
            else if(this.props.option === 3){
                this.setState({loading:'show'})
                this.props.editShopAction(
                  {
                    shop_id: this.props.shop_id,
                    typeshop: this.state.arrayTipoCompraSelect.value,
                    number_invoice: this.state.nroCompra,
                    numero_control: this.state.nroControl,
                    provider_id: this.state.arrayProveedorSelect.value,
                    sucursal_id: this.state.arraySucursalesSelect.value,
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

    deleteProduct = (key, id, cantidad, precio, exento, descuento, loteId) => {
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
                if(loteId !== ""){
                    this.props.removeProductAction(this.props.shop_id, id, loteId);
                    this.props.deleteProductsFunction(key, precio_cant, precio_imp, total);
                }else{
                    this.props.deleteProductsFunction(key, precio_cant, precio_imp, total);
                }
            }
        });
    };

    componentWillReceiveProps=(props)=>{
        if(this.props.shop.products.length > 0){
            this.setState({divTableProductos:''})
        }
        if(props.option === 1){
            this.setState({
                loading: 'hide',
            })
        }
        if(props.option === 2 || props.option === 3){
            if(props.shop.dataShopId){
                if(props.shop.dataShopId.date_purchase){
                    var date_purchase_split = props.shop.dataShopId.date_purchase.split('-');
                    var date_purchase = new Date(date_purchase_split[0], date_purchase_split[1] - 1, date_purchase_split[2]);
                }
                if(props.shop.dataShopId.observation && props.shop.action === 0){
                    this.setState({
                        arrayTipoCompraSelect: props.shop.dataShopId.type_shop,
                        arraySucursalesSelect: props.shop.dataShopId.sucursal_id,
                        nroCompra: props.shop.dataShopId.number_invoice,
                        nroControl: props.shop.dataShopId.number_control,
                        arrayProveedorSelect: props.shop.dataShopId.distribuidor_id,
                        direccionPartida: props.shop.dataShopId.starting_address,
                        direccionLlegada: props.shop.dataShopId.arrival_address,
                        compraDate: date_purchase,
                        observacion: props.shop.dataShopId.observation,
                        loading: props.shop.loading,
                    })
                    this.props.actionProps();
                }

            }
        }
        if(props.option === 0){
            this.setState({
                ...InitalState
            })
        }


    }

    closeModalEditProductShop = (valor) => {
        this.setState({
            modal: valor,
        });
    }

    render() {
        return (
            <span>
                <Modal isOpen={this.props.modal} toggle={this.closeModal} className="ModalShop">
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
                                            <Select isSearchable="true" isDisabled={true} name="sucursales" value={this.state.arraySucursalesSelect} onChange={this.handleChangeSucursalesSelect} options={this.props.shop.branchOfficces} />
                                        </div>
                                        <div className="errorSelect">{this.state.divSucursalesSelectError}</div>
                                    </FormGroup>
                                    <FormGroup className="top form-group col-sm-6">
                                        <Label for="nroCompra">Nro Compra</Label>
                                        <div className={this.state.divNroCompra}>
                                            <Input disabled={this.props.disabled} name="nroCompra" id="nroCompra" onKeyUp={this.handlekeyNroCompra} onChange={this.handleChange} value={this.state.nroCompra?this.state.nroCompra:''} type="text" placeholder="Nro Compra" />
                                        </div>
                                        <div className="errorSelect">{this.state.divNroCompraError}</div>
                                    </FormGroup>
                                    <FormGroup className="top form-group col-sm-6">
                                        <Label for="nroControl">Nro Control</Label>
                                        <div className={this.state.divNroControl}>
                                            <Input disabled={this.props.disabled} name="nroControl" id="nroControl" onKeyUp={this.handlekeyNroControl} onChange={this.handleChange} value={this.state.nroControl?this.state.nroControl:''} type="text" placeholder="Nro Control" />
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
                                        <div className="errorSelect">{this.state.divObservacionError}</div>
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
                                                        <td>{number_format(list.price, 2)} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>
                                                        <td>{list.discount}</td>
                                                        <td>{number_format(list.price_discount, 2)} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>
                                                        <td>{number_format(list.price_sale, 2)} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>
                                                        <td>{list.exempt}</td>
                                                        <td>
                                                            <div  className="float-left" >
                                                                <IconButton aria-label="Delete" disabled={this.props.option === 2 ? true : false} title="Eliminar Producto" className="iconButtons" onClick={() => { this.deleteProduct(i, list.id, list.quantity, number_format(list.price, 2), list.exempt, list.discount, list.lote_id); }}><Delete className="iconTable" /></IconButton>
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
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveCompras}>{this.props.modalFooter}</Button>
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
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
    confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
    saveShopAction: (data, callback) =>dispatch(saveShopAction(data, callback)),
    editShopAction: (data, callback) =>dispatch(editShopAction(data, callback)),
    deleteProductsFunction: (key, subtotal, impuesto, total) =>dispatch(deleteProductsFunction(key, subtotal, impuesto, total)),
    removeProductAction: (shopId, productId, loteId) =>dispatch(removeProductAction(shopId, productId, loteId)),
    cleanProducts: () =>dispatch(cleanProducts()),
    actionProps: () =>dispatch(actionProps()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalShop);
