import React from 'react';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Table, Input, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import '../../components/style.css';
import './Shop.css';
import Select from 'react-select';
import jstz from 'jstz';
import { connect } from "react-redux";
import { InitalState } from './InitialState.js';
import { number_format } from "../../core/utils";
import { enterDecimal } from "../../core/utils";
import { Visibility } from "@material-ui/icons";
import { openSnackbars, openConfirmDialog } from "../../actions/aplicantionActions";
import {
    cleanQuantityProductsTransferAction,
    searchProduct,
    searchOneSuppplie,
    setQuantityTranferAction,
    deleteProductsTransferFunction,
    setSwitchTableRequestReceived,
    addProductRequestFunction,
    filterStockProductsAction,
    actionProps
} from "../../actions/TransferActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import { PlaylistAdd, Edit } from "@material-ui/icons";
import classnames from "classnames";
import ProductsRequest from "./ProductsRequest.js";
import ListStockProducts from "./ListStockProducts.js";
import jwt_decode from 'jwt-decode';

class ModalTransferencias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...InitalState
        };
    }

    componentDidMount() {
        const token = window.localStorage.getItem('id_token');
        var decoded = jwt_decode(token);
        let sucursal_center = '';
        Object.keys(decoded.profile[0]).map((i) => {
            sucursal_center = decoded.profile[0].medical_center[0].branch_office[0].center;
        })
        this.setState({
            sucursal_central_token: sucursal_center
        });

        if (this.props.option === 1) {
            this.setState({
                loading: 'hide',
            })
        }
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
            // let set = ""
            // this.props.search(set)
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleChangeInputTable = (pos, cantidad) => e => {
        const { name, value } = e.target;
        let valor = 0;
        if (value === "0") {
            valor = 0;
            var elemento = document.getElementById("divQuantity_" + pos);
            elemento.className += " borderColorInputTable";
        }
        else if (value === "") {
            valor = 0;
            var elemento = document.getElementById("divQuantity_" + pos);
            elemento.className += " borderColorInputTable";
        } else if (parseFloat(value) > cantidad) {
            valor = cantidad;
            var elemento = document.getElementById("divQuantity_" + pos);
            elemento.className += " borderColorInputTable";
            this.props.alert("warning", "¡La cantidad a transferir no puede ser mayor a la cantidad de la compra!");
        } else {
            valor = parseFloat(value);
            var elemento = document.getElementById("divQuantity_" + pos);
            elemento.className += " borderColorInputTableWhite";
        }
        this.props.setCantidadTableTransferencias(pos, valor, this.props.option)

    }

    componentWillReceiveProps = (props) => {
        console.log("componentWillReceiveProps modal transferencias", props.transfer);
        if (props.transfer.productsToTransfer.length > 0) {

            this.setState({
                divAviso: ''
            });
        }
    }

    testOnclick = () => { }

    handlekeyObservacion = event => {
        this.setState({
            divObservacion: "",
            divObservacionError: "",
        })
    }

    handleChangeTipoTransfer = (arrayTipoTransfer) => {
        this.setState({
            arrayOptionOne: null,
            arrayOptionTwo: null,
            arrayTipoTransfer,
            arraySelectOptionOne: arrayTipoTransfer.others,
            divTipoTransfer: '',
            divTipoTransferError: '',
            divOptionOne: '',
            divOptionOneError: '',
            divOptionTwo: '',
            divOptionTwoError: '',
        });
    }

    handleChangeArrayOrdenTransfer = (arrayOrdenTransfer) => {
        this.setState({
            arrayOrdenTransfer,
            divOrdenTransfer: '',
            divOrdenTransferError: '',
        });
    }

    handleChangeArrayOrigenOrden = (arrayOrigenOrden) => {
        this.setState({
            arrayOrigenOrden,
            divOrigenOrden: '',
            divOrigenOrdenError: '',
        });
        if (this.state.arrayDestinoOrden) {
            this.setState({
                divDestinoOrden: '',
                divDestinoOrdenError: '',
            });
        }
    }

    handleChangeArrayDestinoOrden = (arrayDestinoOrden) => {
        this.setState({
            arrayDestinoOrden,
            divDestinoOrden: '',
            divDestinoOrdenError: '',
        });
        if (this.state.arrayOrigenOrden) {
            this.setState({
                divOrigenOrden: '',
                divOrigenOrdenError: '',
            });
        }
    }

    handleChangeOptionOne = (arrayOptionOne) => {
        this.setState({
            arrayOptionOne,
            arraySelectOptionTwo: arrayOptionOne.others,
            divOptionOne: '',
            divOptionOneError: ''
        });
    }

    handleChangeOptionTwo = (arrayOptionTwo) => {
        this.setState({
            arrayOptionTwo,
            divOptionTwo: '',
            divOptionTwoError: ''
        });
    }

    closeModal = () => {
        this.setState({
            ...InitalState,
            loading: 'show'
        });
        this.props.cleanQuantityProductsTransferAction();
        this.props.valorCloseModal(false);
    }

    validate = () => {
        let divOrdenTransfer = '';
        let divOrdenTransferError = '';
        let divOrigenOrden = '';
        let divOrigenOrdenError = '';
        let divDestinoOrden = '';
        let divDestinoOrdenError = '';
        let divTipoTransfer = '';
        let divTipoTransferError = '';
        let divOptionOne = '';
        let divOptionOneError = '';
        let divOptionTwo = '';
        let divOptionTwoError = '';
        let acumCantidadTransfer = 0;
        let divAviso = '';
        let sinProductos = 0;
        const cantidadCero = this.props.transfer.productsToTransfer.find(product => product.quantity_transfer !== 0);
        const cantidadVacia = this.props.transfer.productsToTransfer.find(product => product.quantity_transfer === "");

        if (!this.state.arrayOrdenTransfer) {
            divOrdenTransferError = "¡Seleccione el tipo de operacion!";
            divOrdenTransfer = "borderColor";
        } else {
            if (this.state.arrayOrdenTransfer.value === "Orden") {
                if (!this.state.arrayOrigenOrden) {
                    divOrigenOrdenError = "¡Seleccione el origen de la transferencia!";
                    divOrigenOrden = "borderColor";
                }
                if (!this.state.arrayDestinoOrden) {
                    divDestinoOrdenError = "¡Seleccione el destino de la transferencia!";
                    divDestinoOrden = "borderColor";
                }
                if (this.state.arrayOrigenOrden && this.state.arrayDestinoOrden) {
                    if (this.state.arrayOrigenOrden.value === this.state.arrayDestinoOrden.value) {
                        divOrigenOrdenError = "¡El origen no puede ser igual al destino!";
                        divOrigenOrden = "borderColor";

                        divDestinoOrdenError = "¡El destino no puede ser igual al origen!";
                        divDestinoOrden = "borderColor";
                    }
                }
            } else {
                if (!this.state.arrayTipoTransfer) {
                    divTipoTransferError = "¡Seleccione el destino de la transferencia!";
                    divTipoTransfer = "borderColor";
                } else {
                    if (this.state.arrayTipoTransfer.value === "5d1776e3b0d4a50b23939988") {
                        if (!this.state.arrayOptionOne) {
                            divOptionOneError = "¡Selecione el almacen!";
                            divOptionOne = "borderColor";
                        }
                    } else if (this.state.arrayTipoTransfer.value === "5d1776e3b0d4a50b23939977") {
                        if (!this.state.arrayOptionOne) {
                            divOptionOneError = "¡Selecione la sucursal!";
                            divOptionOne = "borderColor";
                        }
                    } else if (this.state.arrayTipoTransfer.value === "5d780fde6a5e8f0d1b38d68e") {
                        if (!this.state.arrayOptionOne) {
                            divOptionOneError = "¡Selecione el departamento!";
                            divOptionOne = "borderColor";
                        }
                        if (!this.state.arrayOptionTwo) {
                            divOptionTwoError = "¡Selecione oficina/consultorio!";
                            divOptionTwo = "borderColor";
                        }
                    }
                    if (this.props.transfer.productsToTransfer.length === 0) {
                        sinProductos++;
                        divAviso = "¡Debe agregar al menos un producto!";
                    } else if (!cantidadCero) {
                        acumCantidadTransfer++;
                        //this.props.alert("warning", "¡Las cantidades de los productos no pueden ser 0!");
                        divAviso = "¡Las cantidades de los productos a transferir no pueden ser 0!";
                    } else if (cantidadVacia) {
                        acumCantidadTransfer++;
                        //this.props.alert("warning", "¡Las cantidades de los productos no pueden estar vacias!");
                        divAviso = "¡Los porcentajes de ganancia no pueden estar vacios!";
                    }
                }
            }
        }

        if (divTipoTransferError || divOptionOneError || divOptionTwoError || divAviso || divOrdenTransferError ||
            divOrigenOrdenError || divDestinoOrdenError
        ) {
            this.setState({
                divOrdenTransfer,
                divOrdenTransferError,
                divOrigenOrden,
                divOrigenOrdenError,
                divDestinoOrden,
                divDestinoOrdenError,
                divTipoTransferError,
                divTipoTransfer,
                divOptionOneError,
                divOptionOne,
                divOptionTwoError,
                divOptionTwo,
                divAviso
            });
            return false;
        } else if (sinProductos === 1) {
            return false;
        } else if (acumCantidadTransfer === 1) {
            return false;
        } else {
            return true;
        }
    };

    handleAction = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            if (this.props.option === 1) {
                alert("exito");
                // this.setState({ loading: 'show' })
                // this.props.saveTransferRequestAction(
                //     {
                //         receiver: received,
                //         description: this.state.observacion,
                //         products: this.props.transfer.productsToTransfer,
                //     },
                //     () => {
                //         this.closeModal();
                //     }
                // )
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
        var found_internal = this.props.permitsTransfer.find(function (element) {
            return element === "Create_request_internal";
        });
        var found_external = this.props.permitsTransfer.find(function (element) {
            return element === "Create_request_external";
        });

        let arrayOptions = [];
        let arrayBranchOfficcesOrden = [];

        if (this.props.transfer.selectTransfers) {
            if (found_internal && found_external) {
                arrayOptions = this.props.transfer.selectTransfers
            }
            if (found_internal && !found_external) {
                arrayOptions = this.props.transfer.selectTransfers.filter(
                    selectTransfer => selectTransfer.value !== "5d1776e3b0d4a50b23939977"
                );
            }
            if (!found_internal && found_external) {
                arrayOptions = this.props.transfer.selectTransfers.filter(
                    selectTransfer => selectTransfer.value === "5d1776e3b0d4a50b23939977"
                );
            }

            const arrayFilterBranchOfficcesOrden = this.props.transfer.selectTransfers.filter(
                selectTransfer => selectTransfer.value === "5d1776e3b0d4a50b23939977"
            );

            arrayBranchOfficcesOrden = arrayFilterBranchOfficcesOrden[0]['others'];
        }

        let label = '';
        let label_children = '';
        if (this.state.arrayTipoTransfer) {
            if (this.state.arrayTipoTransfer.value === '5d1776e3b0d4a50b23939988') {
                label = 'Almacen';
                label_children = 'Estante';
            } else if (this.state.arrayTipoTransfer.value === '5d1776e3b0d4a50b23939977') {
                label = 'Sucursal';
            } else if (this.state.arrayTipoTransfer.value === '5d780fde6a5e8f0d1b38d68e') {
                label = 'Departamento';
                label_children = 'Oficina/consultorio';
            }
        }

        let ordenTransfer = [];
        if (this.state.sucursal_central_token) {
            ordenTransfer =
                [
                    {
                        label: "Orden",
                        value: "Orden"
                    },
                    {
                        label: "Transferencia",
                        value: "Transferencia"
                    }
                ];
        } else {
            ordenTransfer =
                [
                    {
                        label: "Transferencia",
                        value: "Transferencia"
                    }
                ];
        }

        return (
            <span>
                <Modal isOpen={this.props.modal} toggle={this.closeModal} className="ModalTransfer">
                    {
                        this.state.loading === 'hide' ?
                            <div className={this.state.divContainer}>
                                <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                                <ModalBody className="Scroll">
                                    <form className="formCodeConfirm" onSubmit={this.handleAction.bind(this)}>
                                        <div className="row">
                                            <FormGroup className="top form-group col-sm-6">
                                                <Label for="arrayOrdenTransfer">Tipo:</Label>
                                                <div className={this.state.divOrdenTransfer}>
                                                    <Select
                                                        isSearchable="true"
                                                        isDisabled={this.props.disabled}
                                                        name="arrayOrdenTransfer"
                                                        id="arrayOrdenTransfer"
                                                        value={this.state.arrayOrdenTransfer}
                                                        onChange={this.handleChangeArrayOrdenTransfer}
                                                        options={ordenTransfer}
                                                    />
                                                </div>
                                                <div className="errorSelect">{this.state.divOrdenTransferError}</div>
                                            </FormGroup>
                                            {
                                                this.state.arrayOrdenTransfer !== null &&
                                                this.state.arrayOrdenTransfer.value === "Orden" &&
                                                <FormGroup className="top form-group col-sm-6">
                                                    <Label for="arrayOrigenOrden">Origen:</Label>
                                                    <div className={this.state.divOrigenOrden}>
                                                        <Select
                                                            isSearchable="true"
                                                            isDisabled={this.props.disabled}
                                                            name="arrayOrigenOrden"
                                                            value={this.state.arrayOrigenOrden}
                                                            onChange={this.handleChangeArrayOrigenOrden}
                                                            options={arrayBranchOfficcesOrden}
                                                        />
                                                    </div>
                                                    <div className="errorSelect">{this.state.divOrigenOrdenError}</div>
                                                </FormGroup>
                                            }
                                            {
                                                this.state.arrayOrdenTransfer !== null &&
                                                this.state.arrayOrdenTransfer.value === "Orden" &&
                                                <FormGroup className="top form-group col-sm-6">
                                                    <Label for="arrayDestinoOrden">Destino:</Label>
                                                    <div className={this.state.divDestinoOrden}>
                                                        <Select
                                                            isSearchable="true"
                                                            isDisabled={this.props.disabled}
                                                            name="arrayDestinoOrden"
                                                            value={this.state.arrayDestinoOrden}
                                                            onChange={this.handleChangeArrayDestinoOrden}
                                                            options={arrayBranchOfficcesOrden}
                                                        />
                                                    </div>
                                                    <div className="errorSelect">{this.state.divDestinoOrdenError}</div>
                                                </FormGroup>
                                            }
                                            {
                                                this.state.arrayOrdenTransfer &&
                                                this.state.arrayOrdenTransfer.value !== "Orden" &&
                                                <FormGroup className="top form-group col-sm-6">
                                                    <Label for="tipoTransfer">Transferir a:</Label>
                                                    <div className={this.state.divTipoTransfer}>
                                                        <Select
                                                            isSearchable="true"
                                                            isDisabled={this.props.disabled}
                                                            name="tipoTransfer"
                                                            value={this.state.arrayTipoTransfer}
                                                            onChange={this.handleChangeTipoTransfer}
                                                            options={arrayOptions}
                                                        />
                                                    </div>
                                                    <div className="errorSelect">{this.state.divTipoTransferError}</div>
                                                </FormGroup>
                                            }

                                            {
                                                this.state.arrayTipoTransfer &&
                                                <FormGroup className="top form-group col-sm-6">
                                                    <Label for="optionOne">{label}</Label>
                                                    <div className={this.state.divOptionOne}>
                                                        <Select
                                                            isSearchable="true"
                                                            isDisabled={this.props.disabled}
                                                            name="optionOne"
                                                            value={this.state.arrayOptionOne}
                                                            onChange={this.handleChangeOptionOne}
                                                            options={this.state.arraySelectOptionOne}
                                                        />
                                                    </div>
                                                    <div className="errorSelect">{this.state.divOptionOneError}</div>
                                                </FormGroup>
                                            }
                                            {
                                                (this.state.arrayTipoTransfer &&
                                                    (this.state.arrayTipoTransfer.value === '5d1776e3b0d4a50b23939988' ||
                                                        this.state.arrayTipoTransfer.value === '5d780fde6a5e8f0d1b38d68e')) &&
                                                <FormGroup className="top form-group col-sm-6">
                                                    <Label for="optionTwo">{label_children}</Label>
                                                    <div className={this.state.divOptionTwo}>
                                                        <Select
                                                            isSearchable="true"
                                                            isDisabled={this.props.disabled}
                                                            name="optionTwo"
                                                            value={this.state.arrayOptionTwo}
                                                            onChange={this.handleChangeOptionTwo}
                                                            options={this.state.arraySelectOptionTwo}
                                                        />
                                                    </div>
                                                    <div className="errorSelect">{this.state.divOptionTwoError}</div>
                                                </FormGroup>
                                            }
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
                                        {
                                            this.props.option !== 4 &&
                                            <div>
                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggleTab('1'); }} >
                                                            Transferir Productos
                                                    </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggleTab('2'); }} >
                                                            Lista de Productos
                                                    </NavLink>
                                                    </NavItem>
                                                </Nav>
                                                <TabContent activeTab={this.state.activeTab}>
                                                    <TabPane tabId="1">
                                                        <ProductsRequest
                                                            option={this.props.option}
                                                            searchProduct={this.props.searchProduct}
                                                            dataAllProducts={this.props.dataAllProducts}
                                                            searchOneSuppplie={this.props.searchOneSuppplie}
                                                            productsToTransfer={this.props.transfer.productsToTransfer}
                                                            setQuantityTranferAction={this.props.setQuantityTranferAction}
                                                            deleteProductsTransferFunction={this.props.deleteProductsTransferFunction}
                                                            setSwitchTableRequestReceived={this.props.setSwitchTableRequestReceived}
                                                            confirm={this.props.confirm}
                                                            alert={this.props.alert}
                                                            divAviso={this.state.divAviso}
                                                            disabled={this.props.disabled}
                                                        />
                                                    </TabPane>
                                                    <TabPane tabId="2">
                                                        <ListStockProducts
                                                            option={this.props.option}
                                                            data={this.props.transfer.allProducts}
                                                            productsToTransfer={this.props.transfer.productsToTransfer}
                                                            search={this.props.searchData}
                                                            permitsTransfer={this.props.permitsTransfer}
                                                            disabled={this.props.disabled}
                                                            addProductRequestFunction={this.props.addProductRequestFunction}
                                                            alert={this.props.alert}
                                                            filterStockProductsAction={this.props.filterStockProductsAction}
                                                        />
                                                    </TabPane>
                                                </TabContent>
                                            </div>
                                        }
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
                            <div style={{ height: "55vh" }}>
                                <CircularProgress style={{ position: " absolute", height: 40, top: "45%", right: "50%", zIndex: 2 }} />
                            </div>
                    }
                </Modal>
            </span>
        );
    }
}

const mapStateToProps = state => ({
    transfer: state.transfer.toJS(),
    dataAllProducts: state.transfer.get('dataAllProducts'),
    authData: state.auth,
    output_supplie: state.global.dataGeneral.dataGeneral.output_supplie,
    aplication: state.global,
});

const mapDispatchToProps = dispatch => ({
    alert: (type, message) => dispatch(openSnackbars(type, message)),
    confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
    cleanQuantityProductsTransferAction: () => dispatch(cleanQuantityProductsTransferAction()),
    searchProduct: (data) => dispatch(searchProduct(data)),
    searchOneSuppplie: (data, arrayProductsTransfer) => dispatch(searchOneSuppplie(data, arrayProductsTransfer)),
    setQuantityTranferAction: (_id, value) => dispatch(setQuantityTranferAction(_id, value)),
    deleteProductsTransferFunction: (key) => dispatch(deleteProductsTransferFunction(key)),
    setSwitchTableRequestReceived: (id, value) => dispatch(setSwitchTableRequestReceived(id, value)),
    addProductRequestFunction: (obj) => dispatch(addProductRequestFunction(obj)),
    filterStockProductsAction: (value) => dispatch(filterStockProductsAction(value)),
    actionProps: (value) => dispatch(actionProps(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalTransferencias);