	import React, { Component } from 'react';
import {
	Nav,
	NavItem,
	NavLink,
	Badge,
	Button,
	ButtonDropdown,
	ButtonGroup,
	ButtonToolbar,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
	CardText,
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Progress,
	Row,
	Table,Input, InputGroup, InputGroupAddon, InputGroupText, TabContent, TabPane,Modal, Form, FormGroup, Label
	} from 'reactstrap';
	
	class contacto extends Component {
		render(){
			return (

				   <Form  className="formCodeConfirm" id="2">
                 <p className="text-muted">Ajuste sus datos de contacto del Centro Medico</p>  
                <div className="row">
                <FormGroup className="form-group col-sm-6" >
                    <Label for="Nombre">Nombre</Label>
                    <Input name="name" type="text" id="name"  maxLength="10" pattern="^[A-Za-z]*$" required/>
                
                </FormGroup>
                  
                </div>    
           <div>
                 <Button color="primary">Añadir</Button>
           </div>
          
            </Form>
          


				)
		}


}

export default contacto;