import React, {Component} from 'react';

class Todoform extends Component{
  constructor(){
    super();
    this.state = {
      title: '',
      responsible:'',
      description:'',
      priority:'low',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e){
    const {value, name} = e.target;
    this.setState({
      [name]: value
    })
    console.log(this.state);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.onApptodo(this.state);
    console.log("enviando...");
  }
  render(){
    return(


            <AvForm>
            <p className="text-muted">Ajuste sus datos de contacto del Centro Medico</p>
            <div className="row">


                <div div className="form-group col-sm-6">
                <AvField name="Nombre" label="Nombre" type="text" onChange={this.handleInput} required/>

                </div>
                    

                <div div className="form-group col-sm-6">
                <AvField name="telephone" label="Phone" type="tel" onChange={this.handleInput} required/>
                </div>

                <div div className="form-group col-sm-6">
                    <AvField name="email" label="Email" type="email" onChange={this.handleInput}required/>
                </div>

            </div>
            <Button type="submit"  color="primary">Añadir</Button>
            </AvForm>

)
}
}
export default Todoform;