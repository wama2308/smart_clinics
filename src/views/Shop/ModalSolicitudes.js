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
    saveTransferRequestAction,
    editTransferRequestsAction,
    setSwitchTableRequestReceived,
    queryOneSupplieInBranchFunction,
    addProductRequestFunction,
    saveRequestReceivedAction,
    filterStockProductsAction,
    actionProps
} from "../../actions/TransferActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import { PlaylistAdd, Edit } from "@material-ui/icons";
import Switch from '@material-ui/core/Switch';
import classnames from "classnames";
import DefaultSearch from "../../components/DefaultSearch.js";
import jwt_decode from 'jwt-decode';
import ProductsTransfer from "./ProductsTransfer.js";
import ListStockProducts from "./ListStockProducts.js";

class ModalSolicitudes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...InitalState
        };
    }

    componentDidMount() {
        const token = window.localStorage.getItem('id_token');
        var decoded = jwt_decode(token);
        let sucursal_id = '';

        Object.keys(decoded.profile[0]).map((i) => {
            sucursal_id = decoded.profile[0].medical_center[0].branch_office[0].center;
        })
        this.setState({
            sucursal_central_token: sucursal_id
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
        console.log("props transfer modal", props.transfer);
        if (props.transfer.productsToTransfer.length > 0) {
            this.setState({
                divAviso: ''
            });
        }
        if (props.option === 0) {
            this.setState({
                ...InitalState
            })
        }
        if (props.option === 2 || props.option === 3 || props.option === 4) {
            if (props.transfer.requestMadeId.type_shipping && props.transfer.action === 0) {
                let dataOptionsOne = [];
                let selectOptionsOne = [];
                let datatOptionsTwo = [];
                let selectOptionsTwo = [];

                if (props.transfer.requestMadeId.type && props.transfer.selectTransfers) {
                    dataOptionsOne = props.transfer.selectTransfers.filter(
                        selectTransfer => selectTransfer.label === props.transfer.requestMadeId.type_shipping.label
                    );
                    selectOptionsOne = dataOptionsOne[0]['others'];

                    datatOptionsTwo = dataOptionsOne[0]['others'].filter(
                        selectTransfer => selectTransfer.label === props.transfer.requestMadeId.type_department.label
                    );
                    selectOptionsTwo = datatOptionsTwo[0]['others'];
                }
                else {
                    dataOptionsOne = props.transfer.selectTransfers.filter(
                        selectTransfer => selectTransfer.label === props.transfer.requestMadeId.type_shipping.label
                    );
                    selectOptionsOne = dataOptionsOne[0]['others'];
                    selectOptionsTwo = [];
                }

                this.setState({
                    arrayTipoTransfer: props.transfer.requestMadeId.type_shipping,
                    arrayOptionOne: props.transfer.requestMadeId.type ?
                        props.transfer.requestMadeId.type_department :
                        props.transfer.requestMadeId.receiver,
                    arrayOptionTwo: props.transfer.requestMadeId.type ?
                        props.transfer.requestMadeId.sender :
                        props.transfer.requestMadeId.receiver,
                    observacion: props.transfer.requestMadeId.description,
                    arraySelectOptionOne: selectOptionsOne,
                    arraySelectOptionTwo: selectOptionsTwo,
                    loading: 'hide',
                })
                this.props.actionProps(1);
            }
        }
    }

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
        this.props.actionProps(0);
        this.props.valorCloseModal(false);
    }

    ordenTransferencia = () => {
        alert("Modal donde se cargara un form para realizar una orden de transferencia en caso de que la sucursal central no tenga stock");
    }

    validate = () => {
        let divTipoTransfer = '';
        let divTipoTransferError = '';
        let divOptionOne = '';
        let divOptionOneError = '';
        let divOptionTwo = '';
        let divOptionTwoError = '';
        let acumCantidadTransfer = 0;
        let divAviso = '';
        let sinProductos = 0;
        let acumProductosSelected = 0;
        const cantidadCero = this.props.transfer.productsToTransfer.find(product => product.quantity_transfer !== 0);
        const cantidadVacia = this.props.transfer.productsToTransfer.find(product => product.quantity_transfer === "");
        const productSelected = this.props.transfer.productsToTransfer.find(product => product.confirm === true);        

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
            } else if (this.props.option === 4 && !productSelected) {
                acumProductosSelected++;
                divAviso = "¡Debe seleccionar al menos un producto!";
            }
        }
        if (divTipoTransferError || divOptionOneError || divOptionTwoError || divAviso) {
            this.setState({
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
        } else if (this.props.option === 4 &&  acumProductosSelected === 1) {
            return false;
        } else {
            return true;
        }


    };

    handleAction = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let received = "";
            if (this.state.arrayTipoTransfer.value === "5d1776e3b0d4a50b23939977") {
                received = this.state.arrayOptionOne.value;
            } else {
                received = this.state.arrayOptionTwo.value;
            }

            if (this.props.option === 1) {
                this.setState({ loading: 'show' })
                this.props.saveTransferRequestAction(
                    {
                        receiver: received,
                        description: this.state.observacion,
                        products: this.props.transfer.productsToTransfer,
                    },
                    () => {
                        this.closeModal();
                    }
                )
            }
            if (this.props.option === 3) {
                if (this.props.status === "Pendiente") {
                    this.setState({ loading: 'show' })
                    this.props.editTransferRequestsAction(
                        {
                            _id: this.props.request_id,
                            receiver: received,
                            description: this.state.observacion,
                            products: this.props.transfer.productsToTransfer,
                        },
                        () => {
                            this.closeModal();
                        }
                    )
                } else {
                    this.props.alert("warning", "¡La solicitud no puede ser editada, su estatus es: " + this.props.status + "!");
                }


            }
            if (this.props.option === 4) {
                this.setState({ loading: 'show' })
                this.props.saveRequestReceivedAction(
                    {
                        _id: this.props.idRequestReceived,
                        products: this.props.transfer.productsToTransfer,
                    },
                    () => {
                        this.closeModal();
                    }
                )
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
        let var_sucursal_central = '';
        if (this.state.sucursal_central_token) {
            var_sucursal_central = 'Compra';
        } else {
            var_sucursal_central = 'Transferencia';
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
                                                <Label for="tipoTransfer">Tipo de Solicitud:</Label>
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
                                            {
                                                (this.props.option === 4 && this.state.arrayTipoTransfer.value === "5d1776e3b0d4a50b23939977") &&
                                                <FormGroup className="top form-group col-sm-6">
                                                    <Button className="" color="primary" onClick={this.ordenTransferencia}>
                                                        Orden de Transferencia
                                                </Button>
                                                </FormGroup>
                                            }

                                        </div>
                                        {
                                            this.props.option !== 4 ?
                                                <div>
                                                    <Nav tabs>
                                                        <NavItem>
                                                            <NavLink
                                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                                onClick={() => { this.toggleTab('1'); }} >
                                                                Solicitud de Productos
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
                                                            <ProductsTransfer
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
                                                                productsToTransfer={this.props.transfer.productsToTransfer}
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
                                                :
                                                <ProductsTransfer
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
                                                    sucursal_central_token={var_sucursal_central}
                                                    sucursal_central={this.state.sucursal_central_token}                                                    
                                                    queryOneSupplieInBranchFunction={this.props.queryOneSupplieInBranchFunction}
                                                    supplieIdBranchOffice={this.props.transfer.supplieIdBranchOffice}
                                                    search={this.props.searchData}
                                                    permitsTransfer={this.props.permitsTransfer}
                                                //disabled={this.props.disabled}
                                                />
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
    saveTransferRequestAction: (data, callback) => dispatch(saveTransferRequestAction(data, callback)),
    saveRequestReceivedAction: (data, callback) => dispatch(saveRequestReceivedAction(data, callback)),
    editTransferRequestsAction: (data, callback) => dispatch(editTransferRequestsAction(data, callback)),
    setSwitchTableRequestReceived: (id, value) => dispatch(setSwitchTableRequestReceived(id, value)),
    queryOneSupplieInBranchFunction: (id) => dispatch(queryOneSupplieInBranchFunction(id)),
    addProductRequestFunction: (obj) => dispatch(addProductRequestFunction(obj)),
    filterStockProductsAction: (value) => dispatch(filterStockProductsAction(value)),
    actionProps: (value) => dispatch(actionProps(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalSolicitudes);