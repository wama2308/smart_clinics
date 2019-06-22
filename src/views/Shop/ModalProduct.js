import React from 'react';
import { Collapse, CardBody, Card, Button, Table, Input, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, FormFeedback, Label, } from 'reactstrap';
import '../../components/style.css';
import './Shop.css';
import Select from 'react-select';
import jstz from 'jstz';
import { connect } from "react-redux";
import { InitalState } from './InitialState.js';
import { number_format } from "../../core/utils";
import { enterDecimal } from "../../core/utils";
import { Edit, Visibility, Delete, ExitToApp } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { openConfirmDialog } from "../../actions/aplicantionActions";
import { cleanProducts, editSupplieAction } from "../../actions/ShopActions";
import ModalProductLote from './ModalProductLote.js';
import CircularProgress from "@material-ui/core/CircularProgress";

class ModalProduct extends React.Component {
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

    componentWillReceiveProps=(props)=>{
        console.log("props.shop.ProductLoteId.lote ", props.shop.ProductLoteId.lote)
        if(props.option === 1 || props.option === 2){ 
            if(props.shop.ProductLoteId){                
                if(props.shop.ProductLoteId.name){
                    this.setState({
                        producto: props.shop.ProductLoteId.name,
                        arrayTipoSelect: props.shop.ProductLoteId.type_select,
                        codigo: props.shop.ProductLoteId.code,
                        descripcion: props.shop.ProductLoteId.description,
                        foto: props.shop.ProductLoteId.photo !== '' ? props.shop.ProductLoteId.photo : null,                        
                        collapse: true,
                        loading: props.shop.loading,
                        
                    })    
                }                        
                    
            }
        }
        if(props.option === 0){
            this.setState({
                ...InitalState
            })   
        }
    }  

    closeModal = () => {
        this.setState({                        
            ...InitalState,
            loading: 'show'
        });   
        this.props.cleanProducts();
        this.props.valorCloseModal(false);       
    }     

    toggleCollapse = () => {
        this.setState({ 
            collapse: !this.state.collapse 
        });
    }

    handlekeyProducto = event =>{
        this.setState({
            divProducto: "",
            divProductoError: "",         
        })
    }    

    handlekeyCodigo= event =>{
        this.setState({
            divCodigo: "",
            divCodigoError: "",         
        })
    }            

    handlekeyDescripcion= event =>{
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

    fileHandlerFoto = event =>{ 
      event.preventDefault();
       if(event.target.files[0].size > 25000) {
            this.setState({
                fotoError:'El tamaño de la imagen no esta permitido ',
                fotoInvalid:true,
                collapseFil:true,
            })           
       }  
       else {
            this.setState({
                fotoError:' ',
                fotoInvalid:false,
            })
            let selectedFile = event.target.files;
            let fileName = "";
            let file = null
            if (selectedFile.length > 0) {
                let fileToLoad = selectedFile[0];
                fileName = fileToLoad.name;
                let fileReader = new FileReader();
                fileReader.onload = function(fileLoadedEvent) {
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

    openModal = (option, pos, lote_id, number, quantity_stock, quantity, price, discount, price_sale, limit_stock, exempt) => {  
        var exento = { label: exempt, value: exempt };
        if(option === 1){
          this.setState({
            modal:true,
            option:option,
            modalHeader:'Ver Lote',
            modalFooter:'Guardar',
            disabled: true,
            showHide: 'show',       
            showHideEditar: 'hide',    
            keyProduct: pos,    
            loteId: lote_id,
            nroLote: number,
            cantidadAvailable: quantity_stock,
            cantidad: quantity,
            precio: price,
            descuento: discount,
            precioVenta: price_sale,
            limiteStock: limit_stock,
            arrayExentoSelect: exento
          })
        }else if(option === 2){
          this.setState({
            modal:true,
            option:option,
            modalHeader:'Editar Lote',
            modalFooter:'Editar',
            disabled: false,
            showHide: 'show',       
            showHideEditar: 'hide',                       
            loteId: lote_id,
            keyProduct: pos, 
            nroLote: number,
            cantidadAvailable: quantity_stock,
            cantidad: quantity,
            precio: price,
            descuento: discount,
            precioVenta: price_sale,
            limiteStock: limit_stock,
            arrayExentoSelect: exento
          })
        }else if(option === 3){
          this.setState({
            modal:true,
            option:option,
            modalHeader:'Editar Cantidad Lote',
            modalFooter:'Guardar',
            disabled: false,
            showHide: 'hide',               
            showHideEditar: 'show',               
            loteId: lote_id,
            keyProduct: pos, 
            nroLote: number,
            cantidadAvailable: quantity_stock,
            cantidad: quantity,
            precio: price,
            descuento: discount,
            precioVenta: price_sale,
            limiteStock: limit_stock,
            arrayExentoSelect: exento
          })
        }  

    }  

    closeModalProductLote = (valor) => {            
        this.setState({
            modal: valor,   
            option: 0,       
        });                    
    } 

    validate = () => {
        let divProducto= '';        
        let divProductoError= '';        
        let divTipo= '';        
        let divTipoError= '';        
        let divCodigo= '';        
        let divCodigoError= '';        
        
        if (this.state.producto === "") {            
            divProductoError = "¡Ingrese el producto!";
            divProducto = "borderColor";
        }
        if (!this.state.arrayTipoSelect) {            
            divTipoError = "¡Seleccione el tipo de producto!";
            divTipo ="borderColor";
        }
        if (this.state.codigo === "") {            
            divCodigoError = "¡Ingrese el codigo del producto!";
            divCodigo ="borderColor";
        }        
        if (divProductoError || divTipoError || divCodigoError ) {            
            this.setState({ 
                divProductoError,
                divProducto,
                divTipoError,
                divTipo,
                divCodigoError,
                divCodigo,                
            });  
            return false;
        }
        return true;        
    };

    handleAction = event => {
        event.preventDefault();
        const isValid = this.validate();   
        if (isValid) {             
            let valueTipo = "";
            let arrayTipo = Object.values(this.state.arrayTipoSelect);
            arrayTipo.forEach(function (elemento, indice) {
                if(indice === 1){
                    valueTipo = elemento;
                }            
            });
            
            if(this.props.option === 2)
            {
                this.setState({loading:'show'})                                    
                this.props.editSupplieAction(
                  {
                    id: this.props.productoId,
                    name: this.state.producto,
                    code: this.state.codigo,
                    type_id: valueTipo,
                    photo: this.state.foto,
                    description: this.state.descripcion,
                    timeZ: jstz.determine().name()
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
                <ModalProductLote
                    option = {this.state.option}
                    modal = {this.state.modal}
                    modalHeader = {this.state.modalHeader}
                    modalFooter = {this.state.modalFooter}
                    disabled = {this.state.disabled}
                    showHide = {this.state.showHide}     
                    showHideEditar = {this.state.showHideEditar}     
                    productoId = {this.props.productoId}
                    loteId = {this.state.loteId}
                    keyProduct = {this.state.keyProduct}
                    nroLote = {this.state.nroLote}
                    cantidadAvailable = {this.state.cantidadAvailable}
                    cantidad = {this.state.cantidad}
                    precio = {this.state.precio}
                    descuento = {this.state.descuento}
                    precioVenta = {this.state.precioVenta}
                    limiteStock = {this.state.limiteStock}
                    arrayExentoSelect = {this.state.arrayExentoSelect}
                    closeModalProductLote = {this.closeModalProductLote}          
                />      
                <Modal isOpen={this.props.modal} toggle={this.closeModal} className="ModalShop">
                    {
                        this.props.shop.ProductLoteId.name ?
                        <div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">      
                                <form className="formCodeConfirm" onSubmit={this.handleAction.bind(this)}> 
                                    <div className="row"> 
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="producto">Producto:</Label> 
                                            <div className={this.state.divProducto}>                               
                                                <Input disabled={this.props.disabled} name="producto" id="producto" onKeyUp={this.handlekeyProducto} onChange={this.handleChange} value={this.state.producto} onBlur={this.productoOnBlur} type="text" placeholder="Producto" />
                                            </div>
                                            <div className="errorSelect">{this.state.divProductoError}</div>
                                        </FormGroup> 
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="tipo">Tipo:</Label>
                                            <div className={this.state.divTipo}>
                                                <Select isSearchable="true" isDisabled={this.props.disabled} name="tipo" value={this.state.arrayTipoSelect} onChange={this.handleChangeTipo} options={this.props.aplication.dataGeneral.dataGeneral.type_supplies} />
                                            </div>                                            
                                            <div className="errorSelect">{this.state.divTipoError}</div>
                                        </FormGroup>
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="codigo">Codigo:</Label> 
                                            <div className={this.state.divCodigo}>                               
                                                <Input disabled={this.props.disabled} name="codigo" id="codigo" onKeyUp={this.handlekeyCodigo} onChange={this.handleChange} value={this.state.codigo} onBlur={this.codigoOnBlur} type="text" placeholder="Codigo" />
                                            </div>
                                            <div className="errorSelect">{this.state.divCodigoError}</div>                                                                                                                                                                                         
                                        </FormGroup> 
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="descripcion">Descripcion:</Label>
                                            <div className={this.state.divDescripcion}>
                                                <Input disabled={this.props.disabled} name="descripcion" id="descripcion" onKeyUp={this.handlekeyDescripcion} onChange={this.handleChange} value={this.state.descripcion} type="textarea" placeholder="Descripcion" />
                                            </div>
                                            <div className="errorSelect">{this.state.divDescripcionError}</div>                                                                                                                                                            
                                        </FormGroup>
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="foto">Foto:</Label>
                                            <br />
                                            <InputGroup>
                                            <Input disabled={this.props.disabled} className="top" type="file" accept="image/*" invalid={this.state.fotoInvalid} onChange={this.fileHandlerFoto} />
                                            <FormFeedback tooltip>{this.state.fotoError}</FormFeedback>  
                                            <InputGroupAddon addonType="append">
                                                <div>
                                                    {
                                                        this.state.foto != null && <img alt="foto" style={{width: 100, height: 100}}  className="image"  src={"data:image/jpeg;" + this.state.foto} />
                                                    }
                                                </div>
                                            </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </div>
                                    <Button disabled={this.props.disabled} color="primary" onClick={this.toggleCollapse} style={{ marginBottom: '1rem' }}>Lista de Lotes</Button>
                                    <br />
                                    <br />
                                    <Collapse isOpen={this.state.collapse}>
                                        <Card>
                                            <CardBody>       
                                                <Table hover responsive borderless>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th className="text-left">Nro</th>
                                                            <th className="text-left ">Lote</th>                                                        
                                                            <th className="text-left ">Compra</th>                                                        
                                                            <th className="text-left">Cantidad</th>                                                        
                                                            <th className="text-left">Stock</th>                                                        
                                                            <th className="text-left" style={{'minWidth':"108px"}}>Limite Stock</th>                                                        
                                                            <th className="text-left">Precio/Compra</th>                                                        
                                                            <th className="text-left" style={{'minWidth':"115px"}}>Precio/venta</th>                                                        
                                                            <th className="text-left" style={{'minWidth':"75px"}}>Desc %</th>                                                                                                                    
                                                            <th className="text-left">Exento</th>                                                        
                                                            <th className="text-left" style={{'minWidth':"155px"}}>Acciones</th>                                                        
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.props.shop.ProductLoteId.lote ? this.props.shop.ProductLoteId.lote.map((product, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{i+1}</td>
                                                                        <td>{product.number}</td>                                                                                                                                                    
                                                                        <td>{product.number_invoice}</td>                                                                                                                                                                                                            
                                                                        <td>{product.quantity}</td>                                                                                                                                                    
                                                                        <td>{product.quantity_stock}</td>                                                                                                                                                    
                                                                        <td style={{'minWidth':"108px"}}>{product.limit_stock}</td>                                                                                                                                                    
                                                                        <td>{number_format(product.price, 2)} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>                                                                                                                                                                                                            
                                                                        <td style={{'minWidth':"115px"}}>{number_format(product.price_sale, 2)} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>                                                                                                                                                                                                            
                                                                        <td style={{'minWidth':"75px"}}>{product.discount}</td>                                                                       
                                                                        <td>{product.exempt}</td>
                                                                        <td style={{'minWidth':"155px"}}>
                                                                            <div  className="float-left" >
                                                                                <IconButton aria-label="Delete" disabled={this.props.option === 1 ? true : false} title="Ver lote" className="iconButtons" onClick={() => { this.openModal(1, i, product._id, product.number, product.quantity_stock, product.quantity, product.price, product.discount, product.price_sale, product.limit_stock, product.exempt); }}><Visibility className="iconTable" /></IconButton>
                                                                                <IconButton aria-label="Delete" disabled={this.props.option === 1 ? true : false} title="Editar lote" className="iconButtons" onClick={() => { this.openModal(2, i, product._id, product.number, product.quantity_stock, product.quantity, product.price, product.discount, product.price_sale, product.limit_stock, product.exempt); }}><Edit className="iconTable" /></IconButton>                                                                                
                                                                                <IconButton aria-label="Delete" disabled={this.props.option === 1 ? true : false} title="Salida de lote" className="iconButtons" onClick={() => { this.openModal(3, i, product._id, product.number, product.quantity_stock, product.quantity, product.price, product.discount, product.price_sale, product.limit_stock, product.exempt); }}><ExitToApp className="iconTable" /></IconButton>                                                                                
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
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleAction}>{this.props.modalFooter}</Button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
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
    cleanProducts: () =>dispatch(cleanProducts()),
    editSupplieAction: (data, callback) =>dispatch(editSupplieAction(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalProduct);