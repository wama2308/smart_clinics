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
import { Edit, Visibility } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { openConfirmDialog } from "../../actions/aplicantionActions";
import { cleanProducts } from "../../actions/ShopActions";
import ModalProductLote from './ModalProductLote.js';

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
        if(props.option === 1 || props.option === 2){ 
            if(props.shop.ProductLoteId){                
                if(props.shop.ProductLoteId.name && this.state.action === 0){
                    this.setState({
                        producto: props.shop.ProductLoteId.name,
                        arrayTipoSelect: props.shop.ProductLoteId.type_select,
                        codigo: props.shop.ProductLoteId.code,
                        descripcion: props.shop.ProductLoteId.description,
                        foto: props.shop.ProductLoteId.photo !== '' ? props.shop.ProductLoteId.photo : null,                        
                        collapse: true,
                        loading: props.shop.loading,
                        action:1
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

    openModal = (option, pos, _id, number, quantity_stock, quantity, price, discount, price_sale, limit_stock, exempt) => {  
        var exento = { label: exempt, value: exempt };
        if(option === 1){
          this.setState({
            modal:true,
            option:option,
            modalHeader:'Ver Lote',
            modalFooter:'Guardar',
            disabled: true,
            showHide: 'hide',    
            keyProduct: pos,    
            productoId: _id,
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
            productoId: _id,
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
                    productoId = {this.props.productoId}
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
                <Modal isOpen={this.props.modal} className="ModalShop">
                    {
                        this.props.shop.ProductLoteId.name ?
                        <div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">      
                                <form className="formCodeConfirm" onSubmit=""> 
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
                                                            <th className="text-left">Limite Stock</th>                                                        
                                                            <th className="text-left">Precio/Compra</th>                                                        
                                                            <th className="text-left">Precio/venta</th>                                                        
                                                            <th className="text-left">Desc %</th>                                                                                                                    
                                                            <th className="text-left">Exento</th>                                                        
                                                            <th className="text-left">Acciones</th>                                                        
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
                                                                        <td>{product.limit_stock}</td>                                                                                                                                                    
                                                                        <td>{number_format(product.price, 2)} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>                                                                                                                                                                                                            
                                                                        <td>{number_format(product.price_sale, 2)} {this.props.aplication.dataGeneral.dataCountries.current_simbol}</td>                                                                                                                                                                                                            
                                                                        <td>{product.discount}</td>                                                                       
                                                                        <td>{product.exempt}</td>
                                                                        <td>
                                                                            <div  className="float-left" >
                                                                                <IconButton aria-label="Delete" disabled={this.props.option === 1 ? true : false} title="Editar lote" className="iconButtons" onClick={() => { this.openModal(1, i, product._id, product.number, product.quantity_stock, product.quantity, product.price, product.discount, product.price_sale, product.limit_stock, product.exempt); }}><Visibility className="iconTable" /></IconButton>
                                                                                <IconButton aria-label="Delete" disabled={this.props.option === 1 ? true : false} title="Ver lote" className="iconButtons" onClick={() => { this.openModal(2, i, product._id, product.number, product.quantity_stock, product.quantity, product.price, product.discount, product.price_sale, product.limit_stock, product.exempt); }}><Edit className="iconTable" /></IconButton>                                                                                
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
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveCompras}>{this.props.modalFooter}</Button>
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                            </ModalFooter>
                        </div>  
                        :
                        <div align="center" className={this.state.divLoading} style={{padding:"1%"}}><img alt="loading" src="assets/loader.gif" width="30%" /></div>  
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalProduct);