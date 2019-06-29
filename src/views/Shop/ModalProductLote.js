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
import { LoadProductPriceFunction, editSupplieLotAction, defectiveSupplieAction } from "../../actions/ShopActions";
import CircularProgress from "@material-ui/core/CircularProgress";

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
        if(props.loteId){
    		this.setState({
    			productoId: props.productoId,
                loteId: props.loteId,
	            codigo: props.nroLote,
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

    handlekeyNuevaCantidad = event =>{
        const { name, value } = event.target;
        this.setState({
            divNuevaCantidad: "",
            divNuevaCantidadError: "",
        })
        let cantidadNueva = parseFloat(value);
        let cantidad = parseFloat(this.state.cantidadAvailable);
        let cantidadRestante = cantidad - cantidadNueva;
        if(value){
            if(cantidadNueva > cantidad){
                this.props.alert("warning", "¡La cantidad de salida no puede mayor a la cantidad disponible!");
                this.setState({
                    nuevaCantidad: '0',
                    cantidadRestante: '0'
                })
            }else{
                this.setState({
                    cantidadRestante: cantidadRestante
                })
            }
        }else{
            this.setState({
                cantidadRestante: '0'
            })
        }

    }

    handlekeyEspecifique = event =>{
        this.setState({
            divEspecifique: "",
            divEspecifiqueError: "",
        })
    }

    eventoBlur = (e) => {
        if(this.state.precio === '' || this.state.precio === '0.0'){
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
        if(this.state.precioVenta === '' || this.state.precioVenta === '0.0'){
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

    eventoBlurNuevaCantidad = (e) => {
        if(this.state.nuevaCantidad === ''){
            this.setState({
                nuevaCantidad: '0'
            });
        }
    }

    eventoFocusNuevaCantidad = (e) => {
        if(this.state.nuevaCantidad === '0'){
            this.setState({
                nuevaCantidad: ''
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

    handleChangeMotivoSalida = (arrayMotivoSalidaSelect) => {
        let valueMotivoSalida = "";
        let arrayMotivoSalida = Object.values(arrayMotivoSalidaSelect);
        arrayMotivoSalida.forEach(function (elemento, indice) {
            if(indice === 1){
                valueMotivoSalida = elemento;
            }
        });
        if(valueMotivoSalida === "5d07a44fa65dd90b0646af97"){
            this.setState({
                arrayMotivoSalidaSelect,
                divMotivoSalida: '',
                divMotivoSalidaError: '',
                disabledEspecifique: false
            });
        }else{
            this.setState({
                arrayMotivoSalidaSelect,
                divMotivoSalida: '',
                divMotivoSalidaError: '',
                disabledEspecifique: true,
                especifique: '',
                divEspecifique:'',
                divEspecifiqueError:''
            });
        }
    }

   	closeModal = () => {
        this.setState({
            ...InitalState,
            loading: 'show'
        });
        this.props.closeModalProductLote(false);
    }

    togglePopover = () => {
        this.setState({popoverOpen: !this.state.popoverOpen})
        this.props.LoadProductPriceFunction(this.props.productoId)
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
            let valueMotivo = "";
            if (this.state.arrayExentoSelect) {
                let arrayExento = Object.values(this.state.arrayExentoSelect);
                arrayExento.forEach(function (elemento, indice, array) {
                    if(indice === 0){
                        labelExento = elemento;
                    }
                });
            }
            if (this.state.arrayMotivoSalidaSelect) {
                let arrayMotivo = Object.values(this.state.arrayMotivoSalidaSelect);
                arrayMotivo.forEach(function (elemento, indice, array) {
                    if(indice === 1){
                        valueMotivo = elemento;
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
                this.setState({loading:'show'})
                this.props.defectiveSupplieAction(
                  {
                    id: this.props.productoId,
                    lote_id: this.props.loteId,
                    quantity: this.state.nuevaCantidad,
                    quantity_rest: this.state.cantidadRestante,
                    reason: valueMotivo,
                    description: this.state.especifique,
                  },
                  () => {
                    this.closeModal();
                  }
                )
            }
        }
    }

    render() {
        return (
            <span>
            	 <Modal isOpen={this.props.modal} toggle={this.closeModal} className="ModalShop">
            	 	{
                    	this.props.shop.loading === "hide" ?
                    	<div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">
	                            <form className="formCodeConfirm" onSubmit={this.handleAction.bind(this)}>
	                                <div className="row">
	                                	<FormGroup className= {`top form-group col-sm-6`}>
			                                <Label for="codigo">Nro Lote:</Label>
			                                <div className={this.state.divCodigo}>
			                                    <Input
                                                    disabled={true}
                                                    name="codigo"
                                                    id="codigo"
                                                    onKeyUp={this.handlekeyCodigo}
                                                    onChange={this.handleChange}
                                                    value={this.state.codigo}
                                                    onBlur={this.codigoOnBlur}
                                                    type="text"
                                                    placeholder="Codigo"
                                                />
			                                </div>
			                                <div className="errorSelect">{this.state.divCodigoError}</div>
			                            </FormGroup>
			                            <FormGroup className="top form-group col-sm-6">
			                                <Label for="cantidad">Cantidad</Label>
			                                <div className={this.state.divCantidad}>
			                                    <Input
                                                    disabled={true}
                                                    name="cantidad"
                                                    id="cantidad"
                                                    onKeyUp={this.handlekeyCantidad}
                                                    onChange={this.handleChange}
                                                    value={this.state.cantidad}
                                                    type="number"
                                                    placeholder="Cantidad"
                                                    onBlur ={this.eventoBlurCantidad}
                                                    onFocus = {this.eventoFocusCantidad}
                                                />
			                                </div>
			                                <div className="errorSelect">{this.state.divCantidadError}</div>
			                            </FormGroup>
                                        <FormGroup className="top form-group col-sm-6">
                                            <Label for="cantidadAvailable">Stock Disponible:</Label>
                                            <div className={this.state.divCantidadAvailable}>
                                                <Input
                                                    disabled={true}
                                                    name="cantidadAvailable"
                                                    id="cantidadAvailable"
                                                    onKeyUp={this.handlekeyCantidadDisponible}
                                                    onChange={this.handleChange}
                                                    value={this.state.cantidadAvailable}
                                                    type="text"
                                                    placeholder="Stock Disponible"
                                                />
                                            </div>
                                            <div className="errorSelect">{this.state.divCantidadAvailableError}</div>
                                        </FormGroup>
                                        <FormGroup className={`top form-group col-sm-6 ${this.props.showHideEditar}`}>
                                            <Label for="nuevaCantidad">Cantidad de Salida</Label>
                                            <div className={this.state.divNuevaCantidad}>
                                                <Input
                                                    disabled={false}
                                                    name="nuevaCantidad"
                                                    id="nuevaCantidad"
                                                    onKeyUp={this.handlekeyNuevaCantidad}
                                                    onChange={this.handleChange}
                                                    value={this.state.nuevaCantidad}
                                                    type="number"
                                                    placeholder="Nueva Cantidad"
                                                    onBlur ={this.eventoBlurNuevaCantidad}
                                                    onFocus = {this.eventoFocusNuevaCantidad}
                                                />
                                            </div>
                                            <div className="errorSelect">{this.state.divNuevaCantidadError}</div>
                                        </FormGroup>
                                        <FormGroup className={`top form-group col-sm-6 ${this.props.showHideEditar}`}>
                                            <Label for="cantidad">Cantidad Restante</Label>
                                            <div className={this.state.divCantidadRestante}>
                                                <Input
                                                    disabled={true}
                                                    name="cantidadRestante"
                                                    id="cantidadRestante"
                                                    onChange={this.handleChange}
                                                    value={this.state.cantidadRestante}
                                                    type="number"
                                                    placeholder="Cantidad Restante"
                                                />
                                            </div>
                                            <div className="errorSelect">{this.state.divCantidadRestanteError}</div>
                                        </FormGroup>
                                        <FormGroup className={`top form-group col-sm-6 ${this.props.showHideEditar}`}>
                                            <Label for="exento">Motivo:</Label>
                                            <div className={this.state.divMotivoSalida}>
                                                <Select
                                                    isSearchable="true"
                                                    isDisabled={this.props.disabled}
                                                    name="motivoSalida"
                                                    value={this.state.arrayMotivoSalidaSelect}
                                                    onChange={this.handleChangeMotivoSalida}
                                                    options={this.props.output_supplie}
                                                />
                                            </div>
                                            <div className="errorSelect">{this.state.divMotivoSalidaError}</div>
                                        </FormGroup>
                                        <FormGroup className={`top form-group col-sm-6 ${this.props.showHideEditar}`}>
                                            <Label for="especifique">Especifique:</Label>
                                            <div className={this.state.divEspecifique}>
                                                <Input
                                                    disabled={this.state.disabledEspecifique}
                                                    name="especifique"
                                                    id="especifique"
                                                    onKeyUp={this.handlekeyEspecifique}
                                                    onChange={this.handleChange}
                                                    value={this.state.especifique}
                                                    type="textarea"
                                                    placeholder="Especifique"
                                                />
                                            </div>
                                            <div className="errorSelect">{this.state.divEspecifiqueError}</div>
                                        </FormGroup>
			                            <FormGroup className={`top form-group col-sm-6 ${this.props.showHide}`}>
			                                <Label for="precio">Precio de Compra:</Label>
			                                <div className={this.state.divPrecio}>
			                                    <Input
                                                    disabled={this.props.disabled}
                                                    name="precio" id="precio"
                                                    onKeyUp={this.handlekeyPrecio}
                                                    onChange={this.handleChange}
                                                    value={this.state.precio}
                                                    type="text"
                                                    placeholder="Precio de Compra"
                                                    onKeyPress={ enterDecimal }
                                                    onBlur ={this.eventoBlur}
                                                    onFocus = {this.eventoFocus}
                                                />
			                                </div>
			                                <div className="errorSelect">{this.state.divPrecioError}</div>
			                            </FormGroup>
			                            <FormGroup className={`top form-group col-sm-6 ${this.props.showHide}`}>
			                                <Label for="descuento">Descuento %:</Label>
			                                <div className={this.state.divDescuento}>
			                                    <Input
                                                    disabled={this.props.disabled}
                                                    name="descuento"
                                                    id="descuento"
                                                    onKeyUp={this.handlekeyDescuento}
                                                    onChange={this.handleChange}
                                                    value={this.state.descuento}
                                                    type="number"
                                                    placeholder="Descuento"
                                                    onBlur ={this.eventoBlurDescuento}
                                                    onFocus = {this.eventoFocusDescuento}
                                                />
			                                </div>
			                                <div className="errorSelect">{this.state.divDescuentoError}</div>
			                            </FormGroup>
			                            <FormGroup className={`top form-group col-sm-6 ${this.props.showHide}`}>
			                                <Label for="precioVenta">Precio de Venta:</Label>
			                                <div className={this.state.divPrecioVenta}>
			                                    <InputGroup>
			                                        <Input
                                                        disabled={this.props.disabled}
                                                        name="precioVenta"
                                                        id="precioVenta"
                                                        onKeyUp={this.handlekeyPrecioVenta}
                                                        onChange={this.handleChange}
                                                        value={this.state.precioVenta}
                                                        type="text"
                                                        placeholder="Precio de Venta"
                                                        onKeyPress={enterDecimal}
                                                        onBlur={this.eventoBlurPrecioVenta}
                                                        onFocus={this.eventoFocusPrecioVenta}
                                                    />
			                                        <InputGroupAddon addonType="append">
			                                            <Button
                                                            id="popoverPrecios"
                                                            disabled={this.props.disabled}
                                                            className={this.state.buttonView}
                                                            title="Ver Precios"
                                                            onClick={this.togglePopover}>
                                                            <Visibility className="iconTable" />
                                                        </Button>
			                                        </InputGroupAddon>
			                                    </InputGroup>
			                                </div>
			                                <div className="errorSelect">{this.state.divPrecioVentaError}</div>
			                            </FormGroup>
			                            <FormGroup className={`top form-group col-sm-6 ${this.props.showHide}`}>
			                                <Label for="limiteStock">Limite Stock:</Label>
			                                <div className={this.state.divLimiteStock}>
			                                    <Input
                                                    disabled={this.props.disabled}
                                                    name="limiteStock"
                                                    id="limiteStock"
                                                    onKeyUp={this.handlekeyLimiteStock}
                                                    onChange={this.handleChange}
                                                    value={this.state.limiteStock}
                                                    type="number"
                                                    placeholder="Limite Stock"
                                                    onBlur ={this.eventoBlurLimiteStock}
                                                    onFocus = {this.eventoFocusLimiteStock}
                                                />
			                                </div>
			                                <div className="errorSelect">{this.state.divLimiteStockError}</div>
			                            </FormGroup>
			                            <FormGroup className={`top form-group col-sm-6 ${this.props.showHide}`}>
			                                <Label for="exento">Exento:</Label>
			                                <div className={this.state.divExento}>
			                                    <Select
                                                    isSearchable="true"
                                                    isDisabled={this.props.disabled}
                                                    name="exento"
                                                    value={this.state.arrayExentoSelect}
                                                    onChange={this.handleChangeExento}
                                                    options={this.state.arrayExento}
                                                />
			                                </div>
			                                <div className="errorSelect">{this.state.divExentoError}</div>
			                            </FormGroup>
			                            <Popover
                                            placement="bottom"
                                            isOpen={this.state.popoverOpen}
                                            target="popoverPrecios"
                                            toggle={this.togglePopover}
                                        >
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
			                                        <div style={{height: "10vh", "width": "20vh"}}>
                                                      <CircularProgress
                                                        style={{
                                                            position:
                                                            "absolute",
                                                            width: 20,
                                                            height: 10,
                                                            top: "50%",
                                                            right: "45%",
                                                            zIndex: 2
                                                        }} />
                                                    </div>
			                                    }

			                                    </div>
			                                </PopoverBody>
			                            </Popover>
	                                </div>
	                            </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>
                                <Button className={this.props.option === 1 ? `hide` : `show` } color="primary" onClick={this.handleAction}>{this.props.modalFooter}</Button>
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
  output_supplie: state.global.dataGeneral.dataGeneral.output_supplie

});

const mapDispatchToProps = dispatch => ({
	LoadProductPriceFunction: (productoId) =>dispatch(LoadProductPriceFunction(productoId)),
    alert: (type, message) => dispatch(openSnackbars(type, message)),
    editSupplieLotAction: (data, callback) =>dispatch(editSupplieLotAction(data, callback)),
    defectiveSupplieAction: (data, callback) =>dispatch(defectiveSupplieAction(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalProductLote);
