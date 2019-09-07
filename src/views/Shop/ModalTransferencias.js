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
import { openSnackbars } from "../../actions/aplicantionActions";
import { cleanProducts, setCantidadTableTransferencias, setSwitchTableTransferencias, setSelectAllSwitchTransferencias, productTransferAction, editTransferAction, actionProps } from "../../actions/ShopActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import { PlaylistAdd, Edit } from "@material-ui/icons";
import Switch from '@material-ui/core/Switch';
import classnames from "classnames";

class ModalTransferencias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...InitalState
        };
    }

    componentDidMount() {
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
        //console.log("modal transferencias ", props.shop)                
        if (props.option === 2 || props.option === 3 || props.option === 7) {
            if (props.shop.transferId) {
                if (props.shop.transferId.distribuidor_id && props.shop.action === 0) {
                    const productConfirm = props.shop.transferId.products.find(product => product.confirm === false);
                    let selectAll = false;
                    if (!productConfirm) {
                        selectAll = true;
                    }
                    this.setState({
                        arraySucursalEnviaSelect: props.shop.transferId.distribuidor_id,
                        arraySucursalRecibeSelect: props.shop.transferId.sucursal_id,
                        observacion: props.shop.transferId.observation,
                        checked: selectAll,
                        loading: 'hide',
                    })
                    this.props.actionProps();
                }
            }
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
            arrayTipoTransfer,
            divTipoTransfer: '',
            divTipoTransferError: ''
        });
    }

    handleChangeSucursalRecibe = (arraySucursalRecibeSelect) => {
        this.setState({
            arraySucursalRecibeSelect,
            divSucursalRecibe: '',
            divSucursalRecibeError: ''
        });
    }

    handleChangeAlmacenRecibe = (arrayAlmacenRecibe) => {
        this.setState({
            arrayAlmacenRecibe,
            arrayOptionsShelfs: arrayAlmacenRecibe.shelf,
            divAlmacenRecibe: '',
            divAlmacenRecibeError: ''
        });
    }

    handleChangeEstanteRecibe = (arrayEstanteRecibe) => {
        this.setState({
            arrayEstanteRecibe,
            divEstanteRecibe: '',
            divEstanteRecibeError: ''
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
            divSucursalRecibe = "borderColor";
        } else if (this.state.arraySucursalRecibeSelect === this.state.arraySucursalEnviaSelect) {
            divSucursalRecibeError = "¡La sucursal que recibe no puede ser la misma que envia!";
            divSucursalRecibe = "borderColor";
        } else if (!productConfirm) {
            acumConfirm++;
            this.props.alert("warning", "¡Debe seleccionar al menos un producto para la transferencia!");
        } else if (productFind) {
            acumCantidades++;
            var elemento = document.getElementById("divQuantity_" + productFindKey);
            elemento.className += " borderColorInputTable";
            this.props.alert("warning", "¡La cantidad de los productos a transferir no puede ser 0!");
        }

        if (divSucursalRecibeError) {
            this.setState({
                divSucursalRecibeError,
                divSucursalRecibe,
            });
            return false;
        } else if (acumCantidades === 1) {
            return false;
        } else if (acumConfirm === 1) {
            return false;
        } else {
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
            if (this.props.option === 4) {
                this.setState({ loading: 'show' })
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
            if (this.props.option === 6) {
                if (this.props.status === "Pendiente") {
                    this.setState({ loading: 'show' })
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
                } else {
                    this.props.alert("warning", "¡No puede editar la transferencia, su estatus es: " + this.props.status + "!");
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
                <Modal isOpen={this.props.modal} toggle={this.closeModal} className="ModalTransfer">
                    {
                        this.state.loading === 'hide' ?
                            <div className={this.state.divContainer}>
                                <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                                <ModalBody className="Scroll">
                                    <form className="formCodeConfirm" onSubmit={this.handleAction.bind(this)}>
                                        <div>
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                                                        Datos
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                                                        Productos a Transferir
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab}>
                                                <TabPane tabId="1">
                                                    <div className="row">
                                                        <FormGroup className="top form-group col-sm-6">
                                                            <Label for="tipoTransfer">Transferir a:</Label>
                                                            <div className={this.state.divTipoTransfer}>
                                                                <Select
                                                                    isSearchable="true"
                                                                    isDisabled={this.props.disabled}
                                                                    name="tipoTransfer"
                                                                    value={this.state.arrayTipoTransfer}
                                                                    onChange={this.handleChangeTipoTransfer}
                                                                    options={this.props.type_tranfer}
                                                                />
                                                            </div>
                                                            <div className="errorSelect">{this.state.divTipoTransferError}</div>
                                                        </FormGroup>
                                                        {
                                                            this.state.arrayTipoTransfer &&
                                                            this.state.arrayTipoTransfer.value === "5d1776e3b0d4a50b23939977" &&
                                                            <FormGroup className="top form-group col-sm-6">
                                                                <Label for="sucursalRecibe">Sucursal que Recibe:</Label>
                                                                <div className={this.state.divSucursalRecibe}>
                                                                    <Select
                                                                        isSearchable="true"
                                                                        isDisabled={this.props.disabled}
                                                                        name="sucursalRecibe"
                                                                        value={this.state.arraySucursalRecibeSelect}
                                                                        onChange={this.handleChangeSucursalRecibe}
                                                                        options={this.props.transfer.branchOfficces}
                                                                    />
                                                                </div>
                                                                <div className="errorSelect">{this.state.divSucursalRecibeError}</div>
                                                            </FormGroup>

                                                        }
                                                        {
                                                            this.state.arrayTipoTransfer &&
                                                            this.state.arrayTipoTransfer.value === "5d1776e3b0d4a50b23939988" &&
                                                            <FormGroup className="top form-group col-sm-6">
                                                                <Label for="arrayAlmacenRecibe">Almacen que Recibe:</Label>
                                                                <div className={this.state.divAlmacenRecibe}>
                                                                    <Select
                                                                        isSearchable="true"
                                                                        isDisabled={this.props.disabled}
                                                                        name="arrayAlmacenRecibe"
                                                                        value={this.state.arrayAlmacenRecibe}
                                                                        onChange={this.handleChangeAlmacenRecibe}
                                                                        options={this.props.transfer.storeShelfs}
                                                                    />
                                                                </div>
                                                                <div className="errorSelect">{this.state.divAlmacenRecibeError}</div>
                                                            </FormGroup>
                                                        }
                                                        {
                                                            this.state.arrayTipoTransfer &&
                                                            this.state.arrayTipoTransfer.value === "5d1776e3b0d4a50b23939988" &&
                                                            <FormGroup className="top form-group col-sm-6">
                                                                <Label for="arrayEstanteRecibe">Estante:</Label>
                                                                <div className={this.state.divEstanteRecibe}>
                                                                    <Select
                                                                        isSearchable="true"
                                                                        isDisabled={this.props.disabled}
                                                                        name="arrayEstanteRecibe"
                                                                        value={this.state.arrayEstanteRecibe}
                                                                        onChange={this.handleChangeEstanteRecibe}
                                                                        options={this.state.arrayOptionsShelfs}
                                                                    />
                                                                </div>
                                                                <div className="errorSelect">{this.state.divEstanteRecibeError}</div>
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
                                                    <div align="center">
                                                        <FormGroup className={`top form-group col-sm-6`}>
                                                            <Input
                                                                disabled={this.props.disabled}
                                                                name="searchService"
                                                                id="searchService"
                                                                onKeyUp={this.handlekeySearchService}
                                                                onChange={this.handleChange}
                                                                value={this.state.searchService}
                                                                type="text"
                                                                placeholder="Buscar Producto..."
                                                                style={{ borderRadius: "1.25rem" }}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <Table hover responsive borderless>
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th className="text-left">Nro</th>
                                                                <th className="text-left ">Producto</th>
                                                                <th className="text-left">Codigo</th>
                                                                <th className="text-left">Tipo</th>
                                                                <th className="text-left">Disponible</th>
                                                                <th className="text-left">Agregar</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.props.transfer.allProducts ? this.props.transfer.allProducts.map((list, i) => {
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td>{i + 1}</td>
                                                                            <td>{list.name}</td>
                                                                            <td>{list.code}</td>
                                                                            <td>{list.type}</td>
                                                                            <td>{list.quantity_stock}</td>
                                                                            <td>
                                                                                <IconButton aria-label="Delete"
                                                                                    title="Agregar Producto"
                                                                                    className="iconButtons"
                                                                                    // onClick={() => { this.openModal(3, data.number, data._id, data.status); }}
                                                                                    disabled={this.props.disabled}>
                                                                                    <PlaylistAdd className="iconTable" />
                                                                                </IconButton>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                    :
                                                                    null
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <div>
                                                        <Table hover responsive borderless>
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th className="text-left">Nro</th>
                                                                    <th className="text-left ">Producto</th>
                                                                    <th className="text-left">Codigo</th>
                                                                    <th className="text-left">Tipo</th>
                                                                    <th className="text-left">Disponible</th>
                                                                    <th className="text-left">Cant/transferir</th>
                                                                    <th className="text-left">Accion</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </TabPane>
                                            </TabContent>
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
    authData: state.auth,
    output_supplie: state.global.dataGeneral.dataGeneral.output_supplie,
    aplication: state.global,
    type_tranfer: state.global.dataGeneral.dataGeneral.type_transfer
});

const mapDispatchToProps = dispatch => ({
    alert: (type, message) => dispatch(openSnackbars(type, message)),
    cleanProducts: () => dispatch(cleanProducts()),
    productTransferAction: (data, callback) => dispatch(productTransferAction(data, callback)),
    editTransferAction: (data, callback) => dispatch(editTransferAction(data, callback)),
    setCantidadTableTransferencias: (pos, value, option) => dispatch(setCantidadTableTransferencias(pos, value, option)),
    setSwitchTableTransferencias: (pos, value, option) => dispatch(setSwitchTableTransferencias(pos, value, option)),
    setSelectAllSwitchTransferencias: (value, option) => dispatch(setSelectAllSwitchTransferencias(value, option)),
    actionProps: () => dispatch(actionProps()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalTransferencias);