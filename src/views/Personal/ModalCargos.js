import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, FormFeedback } from 'reactstrap';
import '../../components/style.css';
import './Personal.css';
import { InitalState } from './InitialStatePersonal.js';
import jstz from 'jstz';
import { connect } from "react-redux";
import { saveCargoAction, editCargoAction } from "../../actions/PersonalInternoActions";

class ModalCargos extends React.Component {
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

    closeModal = () => {
        this.setState({
            ...InitalState                
        })        
    	this.props.valorCloseModal(false); 
    }   

    validate = () => {
        let cargoInvalid = false;
        let cargoError = "";        
        let descripcionInvalid = false;
        let descripcionError = "";       

        if (this.state.cargo === "") {
            cargoError = "¡Ingrese el cargo!";
            cargoInvalid = true;
        }
        if (this.state.descripcion === "") {
            descripcionError = "¡Ingrese la descripcion!";
            descripcionInvalid = true;
        }        
        if (cargoError || descripcionError) {            
            this.setState({ 
                cargoError,
                cargoInvalid,                         
                descripcionError,    
                descripcionInvalid,                 
            });                           
            return false;
        }        
        return true;
    } 

    handleSaveCargos = event => {
        event.preventDefault();
        const isValid = this.validate();        
        if (isValid) { 
            if(this.props.option === 1)
            {
                this.setState({loading:'show'})    
                this.props.saveCargoAction(
                  {
                    name:this.state.cargo,
                    description: this.state.descripcion,   
                    timeZ: jstz.determine().name()
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            } 
            else if(this.props.option === 3){
                this.setState({loading:'show'})    
                this.props.editCargoAction(
                  {
                    _id:this.props.cargoId,
                    name:this.state.cargo,
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

    handlekeyCargo = event =>{
        this.setState({
            cargoError: "",
            cargoInvalid: false,            
        })
    }

    handlekeyDescripcion = event =>{
        this.setState({
            descripcionError: "",
            descripcionInvalid: false,            
        })
    }

    componentWillReceiveProps=(props)=>{        
        this.setState({
            modal: props.modal,       
            loading:'show'     
        });

        this.setState({
            cargo: props.cargo,
            descripcion: props.descripcion,             
            loading:'hide',
        })                 
    }

	render() {   
        return (
            <span>                            
        		<Modal isOpen={this.props.modal} className="ModalUsersRoles">
                    {
                        this.state.loading === "hide" ?
                            <div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">    
                            <form className="formCodeConfirm" onSubmit={this.handleSaveCargos.bind(this)}> 
                                <FormGroup className="top form-group col-sm-12">                                                                 
                                    <Label for="plantilla">Cargo</Label>
                                    <Input disabled={this.props.disabled} invalid={this.state.cargoInvalid} name="cargo" id="cargo" onKeyUp={this.handlekeyCargo} onChange={this.handleChange} value={this.state.cargo} type="text" placeholder="Cargo" />
                                    <FormFeedback tooltip>{this.state.cargoError}</FormFeedback>                                                            
                                </FormGroup>    
                                <FormGroup className="top form-group col-sm-12">                                                                 
                                    <Label for="direccion">Descripcion:</Label>
                                    <Input disabled={this.props.disabled} invalid={this.state.descripcionInvalid} name="descripcion" id="descripcion" onKeyUp={this.handlekeyDescripcion} onChange={this.handleChange} value={this.state.descripcion} type="textarea" placeholder="Descripcion" />
                                    <FormFeedback tooltip>{this.state.descripcionError}</FormFeedback>                                                                                                                                                            
                                </FormGroup>     
                            </form>                                                                    
                            </ModalBody>
                            <ModalFooter>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveCargos}>{this.props.modalFooter}</Button>
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
  personaInterno: state.personaInterno.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
    saveCargoAction: (data, callback) => dispatch(saveCargoAction(data, callback)),  
    editCargoAction: (data, callback) => dispatch(editCargoAction(data, callback)),  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCargos);