import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, FormFeedback, } from 'reactstrap';
import '../../components/style.css';
import './Store.css';
import Select from 'react-select';
import jstz from 'jstz';
import { connect } from "react-redux";
import Shelf from './Shelf.js';
import { openConfirmDialog } from "../../actions/aplicantionActions";
import { saveStoreAction, editStoreAction, cleanShelfs } from "../../actions/StoreActions";
import { InitalState } from './InitialState.js';

class ModalStore extends React.Component {
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
        this.props.cleanShelfs();
        this.props.valorCloseModal(false);       
    }       

    validate = () => {
        let almacenInvalid = "";
        let almacenError = "";
        let divSucursalesSelect = "";
        let divSucursalesSelectError = "";
        let descripcionError = "";
        let descripcionInvalid = false;                 

        if (this.state.almacen === "") {            
            almacenError = "¡Ingrese el almacen!";
            almacenInvalid ="borderColor";
        }
        if (this.state.arraySucursalesSelect === null) {            
            divSucursalesSelectError = "¡Seleccione la sucursal!";
            divSucursalesSelect = "borderColor";
        }
        if (this.state.descripcion === "") {            
            descripcionError = "¡Ingrese la descripcion!";
            descripcionInvalid =true;
        }                
        if (almacenError || divSucursalesSelectError || descripcionError) {            
            this.setState({ 
                almacenError,
                almacenInvalid,
                divSucursalesSelectError,
                divSucursalesSelect,
                descripcionError,
                descripcionInvalid,                                
            });  
            return false;
        }
        return true;        
    };

    handleSaveAlmacen = event => {
        event.preventDefault();
        const isValid = this.validate();           
        if (isValid) {             
            let valueSucursales = "";
            let arraySucursales = Object.values(this.state.arraySucursalesSelect);
            arraySucursales.forEach(function (elemento, indice) {
                if(indice === 0){
                    valueSucursales = elemento;
                }            
            });
            
            if(this.props.option === 1)
            {
                if(this.props.store.shelfs.length === 0){
                    const message = {
                      title: "¡Registrar sin estantes!",
                      info: "¿Esta seguro que desea guardar el almacen sin estantes?"
                    };
                    this.props.confirm(message, res => {
                        if (res) {                
                            this.setState({loading:'show'})                                    
                            this.props.saveStoreAction(
                            {
                                sucursal_id:valueSucursales,
                                name:this.state.almacen,
                                description:this.state.descripcion,
                                shelf:this.props.store.shelfs,                        
                                timeZ: jstz.determine().name()
                            },
                              () => {
                                this.closeModal();                    
                              }
                            )
                        }
                    });  
                }else{
                    this.setState({loading:'show'})                                    
                    this.props.saveStoreAction(
                    {
                        sucursal_id:valueSucursales,
                        name:this.state.almacen,
                        description:this.state.descripcion,
                        shelf:this.props.store.shelfs,                        
                        timeZ: jstz.determine().name()
                    },
                      () => {
                        this.closeModal();                    
                      }
                    )
                }                
            } 
            else if(this.props.option === 3)
            {
                if(this.props.store.shelfs.length === 0){
                    const message = {
                      title: "¡Registrar sin estantes!",
                      info: "¿Esta seguro que desea guardar el almacen sin estantes?"
                    };
                    this.props.confirm(message, res => {
                        if (res) {  
                            this.setState({loading:'show'})   
                            this.props.editStoreAction(
                              {
                                store_id:this.props.id,
                                sucursal_id_now: this.props.sucursal_id_now,
                                sucursal_id:valueSucursales,
                                name:this.state.almacen,
                                description:this.state.descripcion,
                                shelf:this.props.store.shelfs,                        
                                timeZ: jstz.determine().name()
                              },
                              () => {
                                this.closeModal();                    
                              }
                            )
                        }
                    });
                }else{
                    this.setState({loading:'show'})   
                    this.props.editStoreAction(
                      {
                        store_id:this.props.id,
                        sucursal_id_now: this.props.sucursal_id_now,
                        sucursal_id:valueSucursales,
                        name:this.state.almacen,
                        description:this.state.descripcion,
                        shelf:this.props.store.shelfs,                        
                        timeZ: jstz.determine().name()
                      },
                      () => {
                        this.closeModal();                    
                      }
                    )
                }                    
            }        
        }
    }

    handlekeyAlmacen = event =>{
        this.setState({
            almacenError: "",
            almacenInvalid: false,         
        })
    }    

    handleChangeSucursalesSelect = (arraySucursalesSelect) => {
        this.setState({ 
            arraySucursalesSelect,
            divSucursalesSelect: '',
            divSucursalesSelectError: ''                                
        });  
    }

    handlekeyDescripcion = event =>{
        this.setState({
            descripcionError: '',
            descripcionInvalid: false
        })
    }    

    componentWillReceiveProps=(props)=>{       
        if(props.option === 1){
            this.setState({
                loading: 'hide',
            })
        }
        if(props.option === 0){
            this.setState({
                ...InitalState
            })   
        }
        if(props.option === 2 || props.option === 3){                  
            if(props.store.storeId && this.state.action === 0){
                this.setState({
                    almacen: props.store.storeId.storeId.name,
                    arraySucursalesSelect: props.store.storeId.storeId.sucursal,
                    descripcion: props.store.storeId.storeId.description,
                    loading: props.store.storeId.loading,
                    action:1
                })                  
            }       
            if(props.store.shelfs.length > 0){
                this.setState({
                    collapse: true
                })
            }else{
                this.setState({
                    collapse: false
                })
            }      
        }       
    }   

	render() {         
        return (
            <span>                            
        		<Modal isOpen={this.props.modal} className="ModalStore">
                    {
                        this.state.loading === "hide" ?
                            <div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">      
                            <form className="formCodeConfirm" onSubmit={this.handleSaveAlmacen.bind(this)}> 
                                <div className="row"> 
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="almacen">Almacen:</Label>
                                        <div className={this.state.almacenInvalid}>
                                            <Input disabled={this.props.disabled} name="almacen" id="almacen" onKeyUp={this.handlekeyAlmacen} onChange={this.handleChange} value={this.state.almacen} type="text" placeholder="Almacen" />
                                        </div>                                            
                                        <div className="errorSelect">{this.state.almacenError}</div>
                                    </FormGroup>                                     
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="sucursales">Sucursales</Label>
                                        <div className={this.state.divSucursalesSelect}>
                                            <Select isSearchable="true" isDisabled={this.props.disabled} name="sucursales" value={this.state.arraySucursalesSelect} onChange={this.handleChangeSucursalesSelect} options={this.props.branchOfficces} />
                                        </div>
                                        <div className="errorSelect">{this.state.divSucursalesSelectError}</div>
                                    </FormGroup>                                      
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="descripcion">Descripcion:</Label>
                                        <Input disabled={this.props.disabled} invalid={this.state.descripcionInvalid} name="descripcion" id="descripcion" onKeyUp={this.handlekeyDescripcion} onChange={this.handleChange} value={this.state.descripcion} type="textarea" placeholder="Descripcion" />
                                        <FormFeedback tooltip>{this.state.descripcionError}</FormFeedback>                                                                                                                                                            
                                    </FormGroup>                                                                 
                                </div>            
                                <Button disabled={this.props.disabled} color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Estantes</Button>                                                                                            
                                <Shelf 
                                    collapse={this.state.collapse}
                                    option={this.props.option}
                                />
                            </form>                                                                    
                            </ModalBody>
                            <ModalFooter>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveAlmacen}>{this.props.modalFooter}</Button>
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
  store: state.store.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
    confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
    saveStoreAction: (data, callback) =>dispatch(saveStoreAction(data, callback)),
    editStoreAction: (data, callback) =>dispatch(editStoreAction(data, callback)),    
    cleanShelfs: () =>dispatch(cleanShelfs()),    
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalStore);