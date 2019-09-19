import React from 'react';
import { Collapse, Button, CardBody, Card, FormGroup, Label, Input, FormFeedback, Table, InputGroup, InputGroupAddon, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import '../../components/style.css';
import './Shop.css';
import { connect } from "react-redux";
import { Visibility } from "@material-ui/icons";
import {
    addProductsFunction,
    verificationSuppliesAction,
    searchProduct,
    searchOneSuppplie,
    cleanInfoProductId,
    LoadProductPriceFunction,
    querySelectTransferAction
} from "../../actions/ShopActions";
import DefaultSearch from "../../components/DefaultSearch.js";
import { openSnackbars, openConfirmDialog } from "../../actions/aplicantionActions";
import { enterDecimal } from "../../core/utils";
import { InitalState } from './InitialState.js';
import Select from 'react-select';
import { number_format } from "../../core/utils";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...InitalState
        };
    }

    componentDidMount() {
        this.props.querySelectTransferAction();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    test = () => {
        console.log(this.props.shop.products)
    }

    cleanState = () => {
        this.setState({
            ...InitalState
        })
        this.props.cleanInfoProductId();
    }

    handlekeyProducto = event => {
        this.setState({
            divProducto: "",
            divProductoError: "",
        })
    }

    handlekeyCodigo = event => {
        this.setState({
            divCodigo: "",
            divCodigoError: "",
        })
    }

    handlekeyCantidad = event => {
        this.setState({
            divCantidad: "",
            divCantidadError: "",
        })
    }

    handlekeyPrecio = event => {
        this.setState({
            divPrecio: "",
            divPrecioError: "",
        })
    }

    handlekeyDescuento = event => {
        this.setState({
            divDescuento: "",
            divDescuentoError: "",
        })
    }

    handlekeyPrecioVenta = event => {
        this.setState({
            divPrecioVenta: "",
            divPrecioVentaError: "",
        })
    }

    handlekeyLimiteStock = event => {
        this.setState({
            divLimiteStock: "",
            divLimiteStockError: "",
        })
    }

    handlekeyDescripcion = event => {
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

    handleChangeAlmacen = (arrayAlmacen) => {
        this.setState({
            arrayAlmacen,
            arrayEstanteSelect: arrayAlmacen.shelf,
            divAlmacen: '',
            divAlmacenError: ''
        });
    }

    handleChangeEstante = (arrayEstante) => {
        this.setState({
            arrayEstante,
            divEstante: '',
            divEstanteError: ''
        });
    }

    fileHandlerFoto = event => {
        event.preventDefault();
        if (event.target.files[0].size > 25000) {
            this.setState({
                fotoError: 'El tamaño de la imagen no esta permitido ',
                fotoInvalid: true,
                collapseFil: true,
            })
        }
        else {
            this.setState({
                fotoError: ' ',
                fotoInvalid: false,
            })
            let selectedFile = event.target.files;
            let fileName = "";
            let file = null
            if (selectedFile.length > 0) {
                let fileToLoad = selectedFile[0];
                fileName = fileToLoad.name;
                let fileReader = new FileReader();
                fileReader.onload = function (fileLoadedEvent) {
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

    componentWillReceiveProps = (props) => {        
        if (props.shop.searchProduct === 1) {
            let photo = '';
            let stock_disponible = number_format(props.shop.dataProductId.quantity_stock, 2)
            let exento = { label: props.shop.dataProductId.exempt, value: props.shop.dataProductId.exempt }
            if (props.shop.dataProductId.photo === "") {
                photo = null
            } else {
                photo = props.shop.dataProductId.photo;
            }

            this.setState({
                productoId: props.shop.dataProductId._id,
                producto: props.shop.dataProductId.name,
                arrayTipoSelect: props.shop.dataProductId.type_select,
                codigo: props.shop.dataProductId.code,
                cantidadAvailable: stock_disponible,
                arrayExentoSelect: exento,
                foto: photo,
                descripcion: props.shop.dataProductId.description,
            })
        }

    }

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
        let valueTipo = "";
        let labelExento = "";
        let divPrecioVenta = '';
        let divPrecioVentaError = '';
        let divLimiteStock = '';
        let divLimiteStockError = '';
        let divAlmacen = '';
        let divAlmacenError = '';
        let cantidad_ingresar = parseFloat(this.state.cantidad);
        let limite_stock = parseFloat(this.state.limiteStock);
        let precio_compra = parseFloat(this.state.precio.replace(",", ""));
        let precio_venta = parseFloat(this.state.precioVenta.replace(",", ""));

        if (this.state.arrayTipoSelect) {
            let arrayTipo = Object.values(this.state.arrayTipoSelect);
            arrayTipo.forEach(function (elemento, indice, array) {
                if (indice === 1) {
                    valueTipo = elemento;
                }
            });
        }
        if (this.state.arrayExentoSelect) {
            let arrayExento = Object.values(this.state.arrayExentoSelect);
            arrayExento.forEach(function (elemento, indice, array) {
                if (indice === 0) {
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
            divTipo = "borderColor";
        }
        if (this.state.codigo === "") {
            divCodigoError = "¡Ingrese el codigo del producto!";
            divCodigo = "borderColor";
        }
        if (this.state.cantidad === "" || this.state.cantidad === "0") {
            divCantidadError = "¡Ingrese la cantidad!";
            divCantidad = "borderColor";
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
            divExento = "borderColor";
        }
        if (!this.state.arrayAlmacen) {
            divAlmacenError = "¡Seleccione el almacen!";
            divAlmacen = "borderColor";
        }
        if (this.props.shop.products.length > 0) {
            const resultado = this.props.shop.products.find(products => products.name === this.state.producto);
            if (resultado) {
                divProductoError = "¡Este producto ya se encuentra agregado!";
                divProducto = "borderColor";
            }
        }
        if (cantidad_ingresar < limite_stock) {
            divCantidadError = "¡La cantidad no puede ser menor al limite de stock!";
            divCantidad = "borderColor";
            divLimiteStockError = "¡el limite de stock no puede ser mayor a la cantidad!";
            divLimiteStock = "borderColor";
        }
        if (precio_venta < precio_compra) {
            divPrecioError = "¡El precio de compra no puede ser mayor al precio de venta!";
            divPrecio = "borderColor";
            divPrecioVentaError = "¡El precio de venta no puede ser menor al precio de compra!";
            divPrecioVenta = "borderColor";
        }
        if (divProductoError || divTipoError || divCodigoError || divCantidadError || divPrecioError || divExentoError || divPrecioVentaError || divLimiteStockError || divAlmacenError) {
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
                divLimiteStock,
                divAlmacen,
                divAlmacenError,
            });
            return false;
        }
        let impuesto = 0;
        if (labelExento === 'NO') {
            impuesto = this.props.aplication.dataGeneral.dataCountries.tax_rate;
        } else {
            impuesto = 0;
        }
        let descuento = 0;
        if (this.state.descuento !== "0") {
            descuento = parseFloat(this.state.descuento);
        } else {
            descuento = 0;
        }
        let precio_replace = this.state.precio.replace(",", "");
        let precio = parseFloat(precio_replace);
        let precio_desc = precio - (precio * (descuento / 100));
        let cantidad = parseFloat(this.state.cantidad);
        let precio_cant = precio_desc * cantidad;
        let precio_imp = (precio_cant * (impuesto / 100));
        let total = precio_cant + precio_imp;
        
        let estanteValue = "";
        if(this.state.arrayEstante){
            estanteValue = this.state.arrayEstante.value;
        }

        let productos = {
            id: this.state.productoId,
            shop_id: "0",
            lote_id: "0",
            name: this.state.producto,
            code: this.state.codigo,
            type_id: valueTipo,
            type: this.state.arrayTipoSelect,
            quantity: this.state.cantidad,
            price: this.state.precio,
            discount: this.state.descuento,
            price_discount: precio_desc,
            price_sale: this.state.precioVenta,
            limit_stock: this.state.limiteStock,
            exempt: labelExento,
            store: this.state.arrayAlmacen.value,
            shelf: estanteValue,
            description: this.state.descripcion,
            photo: this.state.foto
        }
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
        if (this.state.precio === '' || this.state.precio === '0.0') {
            this.setState({
                precio: '0.00'
            });
        }
    }

    eventoFocus = (e) => {
        if (this.state.precio === '0.00') {
            this.setState({
                precio: ''
            });
        }
    }

    eventoBlurPrecioVenta = (e) => {
        if (this.state.precioVenta === '' || this.state.precioVenta === '0.0') {
            this.setState({
                precioVenta: '0.00'
            });
        }
    }

    eventoFocusPrecioVenta = (e) => {
        if (this.state.precioVenta === '0.00') {
            this.setState({
                precioVenta: ''
            });
        }
    }

    eventoBlurDescuento = (e) => {
        if (this.state.descuento === '') {
            this.setState({
                descuento: '0'
            });
        }
    }

    eventoFocusDescuento = (e) => {
        if (this.state.descuento === '0') {
            this.setState({
                descuento: ''
            });
        }
    }

    eventoBlurCantidad = (e) => {
        if (this.state.cantidad === '') {
            this.setState({
                cantidad: '0'
            });
        }
    }

    eventoFocusCantidad = (e) => {
        if (this.state.cantidad === '0') {
            this.setState({
                cantidad: ''
            });
        }
    }

    eventoBlurLimiteStock = (e) => {
        if (this.state.limiteStock === '') {
            this.setState({
                limiteStock: '0'
            });
        }
    }

    eventoFocusLimiteStock = (e) => {
        if (this.state.limiteStock === '0') {
            this.setState({
                limiteStock: ''
            });
        }
    }

    productoOnBlur = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
        if (value !== "") {
            this.props.verificationSuppliesAction(
                {
                    name: value,
                    code: ''
                },
                () => {
                    this.setState({
                        producto: ''
                    })
                }
            );
        }
    }

    codigoOnBlur = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
        if (value !== "") {
            this.props.verificationSuppliesAction(
                {
                    name: '',
                    code: value
                },
                () => {
                    this.setState({
                        codigo: ''
                    })
                }
            );
        }
    }

    optionsProducts = (options) => {
        if (!options) {
            return [];
        }
        const data = [];
        options.map(option => {
            data.push({
                label: `${option.name}`,
                value: option._id
            });
        });
        return data;
    };

    togglePopover = () => {
        if (this.props.shop.searchProduct === 1) {
            this.setState({ popoverOpen: !this.state.popoverOpen })
            this.props.LoadProductPriceFunction(this.props.shop.dataProductId._id)
        } else {
            this.props.alert("warning", "¡No ha seleccionado ningun producto!");
        }
    }

    render() {
        const optionsProducts = this.optionsProducts(this.props.dataProducts);
        return (
            <div>
                <Collapse isOpen={this.props.collapse}>
                    <Card>
                        <CardBody>
                            <div className="" align="center">
                                <FormGroup className="top form-group col-sm-8">
                                    <DefaultSearch
                                        pressKey={true}
                                        placeholder="Buscar Producto..."
                                        getOptions={this.props.searchProduct}
                                        options={optionsProducts}
                                        searchAction={this.props.searchOneSuppplie}
                                    />
                                </FormGroup>
                            </div>
                            <div className="row">
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="producto">Producto:</Label>
                                    <div className={this.state.divProducto}>
                                        <Input disabled={this.props.shop.searchProduct === 1 ? true : false} name="producto" id="producto" onKeyUp={this.handlekeyProducto} onChange={this.handleChange} value={this.state.producto} onBlur={this.productoOnBlur} type="text" placeholder="Producto" />
                                    </div>
                                    <div className="errorSelect">{this.state.divProductoError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="tipo">Tipo:</Label>
                                    <div className={this.state.divTipo}>
                                        <Select isSearchable="true" isDisabled={this.props.shop.searchProduct === 1 ? true : false} name="tipo" value={this.state.arrayTipoSelect} onChange={this.handleChangeTipo} options={this.props.aplication.dataGeneral.dataGeneral.type_supplies} />
                                    </div>
                                    <div className="errorSelect">{this.state.divTipoError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="codigo">Codigo:</Label>
                                    <div className={this.state.divCodigo}>
                                        <Input disabled={this.props.shop.searchProduct === 1 ? true : false} name="codigo" id="codigo" onKeyUp={this.handlekeyCodigo} onChange={this.handleChange} value={this.state.codigo} onBlur={this.codigoOnBlur} type="text" placeholder="Codigo" />
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
                                        <Input disabled={this.state.disabled} name="cantidad" id="cantidad" onKeyUp={this.handlekeyCantidad} onChange={this.handleChange} value={this.state.cantidad} type="number" placeholder="Cantidad" onBlur={this.eventoBlurCantidad} onFocus={this.eventoFocusCantidad} />
                                    </div>
                                    <div className="errorSelect">{this.state.divCantidadError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="precio">Precio de Compra:</Label>
                                    <div className={this.state.divPrecio}>
                                        <Input disabled={this.state.disabled} name="precio" id="precio" onKeyUp={this.handlekeyPrecio} onChange={this.handleChange} value={this.state.precio} type="text" placeholder="Precio de Compra" onKeyPress={enterDecimal} onBlur={this.eventoBlur} onFocus={this.eventoFocus} />
                                    </div>
                                    <div className="errorSelect">{this.state.divPrecioError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="descuento">Descuento %:</Label>
                                    <div className={this.state.divDescuento}>
                                        <Input disabled={this.state.disabled} name="descuento" id="descuento" onKeyUp={this.handlekeyDescuento} onChange={this.handleChange} value={this.state.descuento} type="number" placeholder="Descuento" onBlur={this.eventoBlurDescuento} onFocus={this.eventoFocusDescuento} />
                                    </div>
                                    <div className="errorSelect">{this.state.divDescuentoError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="precioVenta">Precio de Venta:</Label>
                                    <div className={this.state.divPrecioVenta}>
                                        <InputGroup>
                                            <Input disabled={this.state.disabled} name="precioVenta" id="precioVenta" onKeyUp={this.handlekeyPrecioVenta} onChange={this.handleChange} value={this.state.precioVenta} type="text" placeholder="Precio de Venta" onKeyPress={enterDecimal} onBlur={this.eventoBlurPrecioVenta} onFocus={this.eventoFocusPrecioVenta} />
                                            <InputGroupAddon addonType="append">
                                                <Button id="popoverPrecios" className={this.state.buttonView} title="Ver Precios" onClick={this.togglePopover}><Visibility className="iconTable" /></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                    <div className="errorSelect">{this.state.divPrecioVentaError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="limiteStock">Limite Stock:</Label>
                                    <div className={this.state.divLimiteStock}>
                                        <Input disabled={this.state.disabled} name="limiteStock" id="limiteStock" onKeyUp={this.handlekeyLimiteStock} onChange={this.handleChange} value={this.state.limiteStock} type="number" placeholder="Limite Stock" onBlur={this.eventoBlurLimiteStock} onFocus={this.eventoFocusLimiteStock} />
                                    </div>
                                    <div className="errorSelect">{this.state.divLimiteStockError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="exento">Exento:</Label>
                                    <div className={this.state.divExento}>
                                        <Select isSearchable="true" isDisabled={this.props.shop.searchProduct === 1 ? true : false} name="exento" value={this.state.arrayExentoSelect} onChange={this.handleChangeExento} options={this.state.arrayExento} />
                                    </div>
                                    <div className="errorSelect">{this.state.divExentoError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="arrayAlmacen">Almacen:</Label>
                                    <div className={this.state.divAlmacen}>
                                        <Select
                                            isSearchable="true"
                                            isDisabled={this.props.disabled}
                                            name="arrayAlmacen"
                                            value={this.state.arrayAlmacen}
                                            onChange={this.handleChangeAlmacen}
                                            options={this.props.shop.selectTransfers}
                                        />
                                    </div>
                                    <div className="errorSelect">{this.state.divAlmacenError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="arrayEstante">Estante:</Label>
                                    <div className={this.state.divEstante}>
                                        <Select
                                            isSearchable="true"
                                            isDisabled={this.props.disabled}
                                            name="arrayEstante"
                                            value={this.state.arrayEstante}
                                            onChange={this.handleChangeEstante}
                                            options={this.state.arrayEstanteSelect}
                                        />
                                    </div>
                                    <div className="errorSelect">{this.state.divEstanteError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="descripcion">Descripcion:</Label>
                                    <div className={this.state.divDescripcion}>
                                        <Input disabled={this.props.shop.searchProduct === 1 ? true : false} name="descripcion" id="descripcion" onKeyUp={this.handlekeyDescripcion} onChange={this.handleChange} value={this.state.descripcion} type="textarea" placeholder="Descripcion" />
                                    </div>
                                    <div className="errorSelect">{this.state.divDescripcionError}</div>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-6">
                                    <Label for="foto">Foto:</Label>
                                    <br />
                                    <InputGroup>
                                        <Input disabled={this.props.shop.searchProduct === 1 ? true : false} className="top" type="file" accept="image/*" invalid={this.state.fotoInvalid} onChange={this.fileHandlerFoto} />
                                        <FormFeedback tooltip>{this.state.fotoError}</FormFeedback>
                                        <InputGroupAddon addonType="append">
                                            <div>
                                                {
                                                    this.state.foto != null && <img alt="foto" style={{ width: 100, height: 100 }} className="image" src={"data:image/jpeg;" + this.state.foto} />
                                                }
                                            </div>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="top form-group col-sm-12">
                                    <Button className={this.state.ocultarBotones} disabled={this.props.disabled} color="danger" onClick={this.cleanState}>Limpiar</Button>
                                    &nbsp;&nbsp;
                                <Button className={this.state.ocultarBotones} disabled={this.props.disabled} color="primary" onClick={this.handleSubmitProductsNew}>Agregar</Button>
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
                                                                this.props.shop.dataProductPrice ? this.props.shop.dataProductPrice.map((data, i) => {
                                                                    return (
                                                                        <tr key={i} className="text-left">
                                                                            <td>{i + 1}</td>
                                                                            <td>{data.lote}</td>
                                                                            <td>{number_format(data.price, 2)}</td>
                                                                        </tr>
                                                                    );
                                                                })
                                                                    :
                                                                    null
                                                            }
                                                        </tbody>
                                                    </Table>
                                                    :
                                                    <div align="center" className="" style={{ padding: "1%" }}><img alt="loading" src="assets/loader.gif" width="40%" /></div>
                                            }

                                        </div>
                                    </PopoverBody>
                                </Popover>
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
    dataProducts: state.shop.get('dataProducts'),
    authData: state.auth,
    aplication: state.global
});

const mapDispatchToProps = dispatch => ({
    addProductsFunction: (arrayProducts, subtotal, impuesto, total) => dispatch(addProductsFunction(arrayProducts, subtotal, impuesto, total)),
    confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
    verificationSuppliesAction: (data, callback) => dispatch(verificationSuppliesAction(data, callback)),
    searchProduct: (data) => dispatch(searchProduct(data)),
    searchOneSuppplie: (data) => dispatch(searchOneSuppplie(data)),
    LoadProductPriceFunction: (productoId) => dispatch(LoadProductPriceFunction(productoId)),
    cleanInfoProductId: () => dispatch(cleanInfoProductId()),
    alert: (type, message) => dispatch(openSnackbars(type, message)),
    querySelectTransferAction: () => dispatch(querySelectTransferAction()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Products);