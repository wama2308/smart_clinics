import React from 'react';
import { Collapse, Button, CardBody, Card, FormGroup, Label, Input, FormFeedback, Table} from 'reactstrap';
import '../../components/style.css';
import './Distributor.css';
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import { addContactoFunction, deleteContactoFunction } from "../../actions/DistributorActions";

class ContacDistributor extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
            collapse: false,
            names:'',
            namesInvalid:false,
            namesError:'',
            telefono:'',
            telefonoInvalid:false,
            telefonoError:'',
            email:'',
            emailInvalid:false,
            emailError:'',
            loading:'show',             
		};
	}

	componentDidMount(){
        //this.setState({collapse:this.props.collapse,listContacs: this.props.distributor.contacs,})        
        this.setState({collapse:this.props.collapse})        
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    } 

    cleanState = () => {
        this.setState({ 
            names:'',
            namesInvalid:false,
            namesError:'',
            telefono:'',
            telefonoInvalid:false,
            telefonoError:'',
            email:'',
            emailInvalid:false,
            emailError:'',
        })
    }

    toggleNuevoRol = () => {
        this.setState({ 
            collapseNuevoRol: !this.state.collapseNuevoRol 
        });        
    }

    toggleTab(tab){
        this.props.valorTab(tab);     
    }   

    handlekeyNames = event =>{
        this.setState({
            namesError: "",
            namesInvalid: false,         
        })
    }    

    handlekeyTelefono = event =>{
        this.setState({
            telefonoError: "",
            telefonoInvalid: false,         
        })
    }    

    handlekeyEmail = event =>{
        this.setState({
            emailError: "",
            emailInvalid: false,         
        })
    }

    componentWillReceiveProps=(props)=>{
        this.setState({collapse: props.collapse})    
    }    

    toggle = () => {
        this.setState({ 
            collapse: !this.state.collapse 
        });
    }

    validate = () => {
        let namesInvalid = false;
        let namesError = "";
        let telefonoInvalid = false;
        let telefonoError = "";
        let emailInvalid = false;
        let emailError = "";

        if (this.state.names === "") {            
            namesError = "¡Ingrese el contacto!";
            namesInvalid =true;
        }     
        if (this.state.telefono === "") {                    
            telefonoError = "¡Ingrese el telefono!";
            telefonoInvalid =true;
        }     
        /*if (this.state.email === "") {                    
            emailError = "¡Ingrese el email!";
            emailInvalid =true;
        }    */
        if(this.state.email !== ""){
            if(typeof this.state.email !== ""){
                let lastAtPos = this.state.email.lastIndexOf('@');
                let lastDotPos = this.state.email.lastIndexOf('.');
                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                    emailError = "¡Email invalido!";
                    emailInvalid = true;
                }
            }
        }
        
        if(this.props.distributor.contacs.length > 0){
            const resultado = this.props.distributor.contacs.find(contacs => contacs.email === this.state.email);
            if(resultado){
                emailError = "¡Este email ya se encuentgra agregado!";
                emailInvalid = true;   
            }
        }
        if (namesError || telefonoError || emailError) {            
            this.setState({ 
                namesInvalid,                         
                namesError, 
                telefonoInvalid, 
                telefonoError,
                emailInvalid,
                emailError
            });                           
            return false;
        }        
        let contacs = { name: this.state.names, phone: this.state.telefono, email: this.state.email}                       
        this.props.addContactoFunction(contacs);        
        this.cleanState();                   
        return true; 
    }

    deleteContac = key => {
        const message = {
          title: "Eliminar registro",
          info: "¿Esta seguro que desea eliminar este registro?"
        };
        this.props.confirm(message, res => {
            if (res) {                
                this.props.deleteContactoFunction(key);        
            }
        });        
    };

    handleSubmitContac = event => {        
        event.preventDefault();
        const isValid = this.validate();        
        if (isValid) {                  
            
        }
    } 

	render() {           
        return (
            <div>  
                {
                    this.props.option === 2 ?
                    <Label for="descripcion"><b>Lista de Contactos</b></Label>
                    :
                    <Button disabled={this.props.disabled} color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Lista de Contactos</Button>
                }
                
                <Collapse isOpen={this.state.collapse}>
                  <Card>
                    <CardBody>                        
                        <div className="row">       
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="names">Nombres:</Label>
                                <Input disabled={this.props.disabled} invalid={this.state.namesInvalid} name="names" id="names" onKeyUp={this.handlekeyNames} onChange={this.handleChange} value={this.state.names} type="text" placeholder="Nombres" />
                                <FormFeedback tooltip>{this.state.namesError}</FormFeedback>                                                                                                                                                            
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="telefono">Telefono:</Label>
                                <Input disabled={this.props.disabled} invalid={this.state.telefonoInvalid} name="telefono" id="telefono" onKeyUp={this.handlekeyTelefono} onChange={this.handleChange} value={this.state.telefono} type="text" placeholder="Telefono" />
                                <FormFeedback tooltip>{this.state.telefonoError}</FormFeedback>                                                                                                                                                            
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="email">Email:</Label>
                                <Input disabled={this.props.disabled} invalid={this.state.emailInvalid} name="email" id="email" onKeyUp={this.handlekeyEmail} onChange={this.handleChange} value={this.state.email} type="text" placeholder="Email" />
                                <FormFeedback tooltip>{this.state.emailError}</FormFeedback>                                                                                                                                                            
                            </FormGroup>
                            <FormGroup className="top form-group col-sm-12">    
                                {
                                    this.props.option !== 2 &&
                                    <div>
                                        <Button className={this.state.ocultarBotones} disabled={this.props.disabled} color="danger" onClick={this.cleanState}>Limpiar</Button>                                        
                                        &nbsp;
                                        &nbsp;
                                        <Button className={this.state.ocultarBotones} disabled={this.props.disabled} color="primary" onClick={this.handleSubmitContac}>Agregar</Button>
                                    </div>
                                }  
                                
                                <br />
                                <br />
                                <div className="error">{this.props.errorListContacs}</div>
                                <Table hover responsive borderless>
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="text-left">Nro</th>
                                            <th className="text-left">Nombres</th>                                                        
                                            <th className="text-left">Telefono</th>                                                        
                                            <th className="text-left">Email</th> 
                                            {
                                                this.props.option !== 2 &&                                                       
                                                <th className="text-left">Acciones</th>                                                        
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.distributor.contacs ? this.props.distributor.contacs.map((list, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{list.name}</td>                                                                                                                                                    
                                                        <td>{list.phone}</td>                                                                                                                                                    
                                                        <td>{list.email}</td>
                                                        {
                                                            this.props.option !== 2 &&   
                                                            <td>
                                                                <div  className={`float-left`} >
                                                                    <IconButton aria-label="Delete" title="Ver Rol" className="iconButtons" onClick={() => { this.deleteContac(i); }}><Delete className="iconTable" /></IconButton>                                                    
                                                                </div>
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            })
                                        :
                                          null
                                        }
                                    </tbody>
                                </Table>
                            </FormGroup>
                        </div>                        
                    </CardBody>
                  </Card>
                </Collapse>
            </div> 
		);
	}
  }
const mapStateToProps = state => ({
  distributor: state.distributor.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
    addContactoFunction: (arrayContactos) =>dispatch(addContactoFunction(arrayContactos)),
    deleteContactoFunction: (key) =>dispatch(deleteContactoFunction(key)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContacDistributor);