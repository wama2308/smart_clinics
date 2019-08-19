import React from "react";
import { Table, Button, FormGroup, Input, Label } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import Switch from '@material-ui/core/Switch';
import "./Commissions.css";
import Pagination from '../../components/Pagination';
import { getArray, GetDisabledPermits } from '../../core/utils';

class ListServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: '',
      showHide: '',
      option: 0,
      position: 0,
      id: '',
      sucursal_id_now: '',
      searchService:'',
      page: 0,
      rowsPerPage: 10,
      arrayTest:getArray(this.props.data)
    };
  }

  componentDidMount() { }

  handleChange = e => {
    const { name, value } = e.target;    
    const dataService = getArray(this.props.data)
    let expresion = new RegExp(`${value}.*`, "i");
    const result = dataService.filter(data => expresion.test(data.serviceName));    
    this.setState({
      [name]: value,
      arrayTest: result
    });

  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };  

  handleChangeInputTable = (pos) => e => {
    const { name, value } = e.target;
    let valor = 0;
    valor = parseFloat(value);
    /*if(value === "0"){
        valor = 0;
        var elemento = document.getElementById("divQuantity_"+pos);
        elemento.className += " borderColorInputTable";            
    }
    else if(value === ""){
        valor = 0;            
        var elemento = document.getElementById("divQuantity_"+pos);
        elemento.className += " borderColorInputTable";            
    }else{
        valor = parseFloat(value);
        var elemento = document.getElementById("divQuantity_"+pos);
        elemento.className += " borderColorInputTableWhite";             
    }*/
    this.props.setPorcentajeTable(pos, valor);
  }

  handleChangeSwitch = pos => event => {
    this.props.setSwitchTableComisiones(pos, event.target.checked, this.props.tab, this.props.typePersonal);        
  };

  handleChangeSwitchAll = name => event => {        
      this.setState({ 
          [name]: event.target.checked 
      });
      this.props.setSwitchAllTableComisiones(event.target.checked, this.props.tab, this.props.typePersonal);
  };

  componentWillReceiveProps = props => {
    this.setState({
      arrayTest: getArray(props.data)
    })
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const ArrayData = this.state.arrayTest
    return (
      <span>
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
            placeholder="Buscar Servicio..." 
            style={{ height: "7vh", borderRadius: "1.25rem" }}
          />
        </FormGroup>  
      </div>
      <div>         
        <div align="right">      
                  <Label for="seleccionarTodos"><b>Seleccionar Todos:</b></Label>
                  <Switch
                    checked={this.state.checked?this.state.checked:false}
                    onChange={this.handleChangeSwitchAll("checked")}
                    value={this.state.checked}
                    color="primary"
                    disabled={this.props.disabled} 
                  />
                </div>     
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Servicio</th>
              <th className="text-left">Categoria</th>
              {
                this.props.typePersonal === "5d1776e3b0d4a50b23936710" ?
                <th className="text-left">% Ganancia</th>
                :
                <th className="text-left">Seleccionar</th>
              }
            </tr>
          </thead>
          <tbody>
            {ArrayData ? ArrayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => {
              return (
                <tr key={data.number} className="text-left">
                  <td>{data.number}</td>
                  <td>{data.serviceName}</td>
                  <td>{data.category}</td>
                  {
                    this.props.typePersonal === "5d1776e3b0d4a50b23936710" ?
                    <td style={{padding: "9px"}}>
                      <div id={`divQuantity_${i}`} className="">
                        <Input 
                          name={`inputQuantity_${i}`}
                          id={`inputQuantity_${i}`}
                          type="number"                                                                    
                          value={data.percentage}
                          onChange={this.handleChangeInputTable(i)}
                          style={{width: "40%"}}
                          disabled={this.props.disabled} 
                        />
                      </div>
                    </td>
                    :
                    <td style={{padding: "1px"}}>
                      <Switch
                          onChange={this.handleChangeSwitch(i)} 
                          value= {data.confirm}                                             
                          id= {`checked_${i}`}
                          name= {`checked_${i}`}
                          color="primary"
                          checked={data.confirm}
                          disabled={this.props.disabled} 
                      />
                    </td>      
                  }
                  
                </tr>
              );              
            })            
              :
              null
            } 
          </tbody>    
          {

            this.props.data.lenght > 10 &&
              <Pagination contador={this.props.data}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                handleChangePage={this.handleChangePage} />
          }
        </Table>        
      </div>  
      </span>    
    );
  }
}

export default ListServices;