import React from "react";
import { Table, FormGroup, Input, Label } from "reactstrap";

import Switch from '@material-ui/core/Switch';
import "./Commissions.css";
import Pagination from '../../components/Pagination';
import { InitalState } from "./InitialState.js";
import { getArray } from '../../core/utils';

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
      searchService: '',
      page: 0,
      rowsPerPage: 10,
      arrayTest: getArray(this.props.data),
      ...InitalState
    };
  }

  componentDidMount() { }

  handleChange = e => {
    const { name, value } = e.target;
    this.props.filterServicesAction(value, this.props.tab);
    this.setState({
      [name]: value
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeInputTable = (id) => e => {
    const { name, value } = e.target;
    /*let valor = 0;
    valor = parseFloat(value);*/
    this.props.setPorcentajeTable(id, value);
    this.props.seteardivSeleccioneServiciosComision();
  }

  handleChangeSwitch = (id) => event => {
    this.props.setSwitchTableComisiones(id, event.target.checked, this.props.tab, this.props.typePersonal);
    this.props.seteardivSeleccioneServiciosComision();
  };

  handleChangeSwitchAll = name => event => {
    this.setState({
      [name]: event.target.checked
    });
    this.props.setSwitchAllTableComisiones(event.target.checked, this.props.tab, this.props.typePersonal);
    this.props.seteardivSeleccioneServiciosComision();
  };

  componentWillReceiveProps = props => {
    this.setState({
      arrayTest: getArray(props.data)
    })
  };

  eventoBlurAplicarTodos = (id) => e => {
    if (document.getElementById("inputQuantity_" + id).value === '' || document.getElementById("inputQuantity_" + id).value === '0') {
      document.getElementById("inputQuantity_" + id).value = '0';
    }
  }

  eventoFocusAplicarTodos = (id) => e => {
    if (document.getElementById("inputQuantity_" + id).value === '0') {
      document.getElementById("inputQuantity_" + id).value = '';
    }
  }

  handlekeyAplicarPorcentajeTodos = event => {
    this.setState({
      divAplicarPorcentajeTodos: "",
      divAplicarPorcentajeTodosError: "",
    })
  }

  handleChangeInputTable_ = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    this.props.setPorcentajeAllTable(value);
    this.setState({
      divSeleccioneServiciosPayment: '',
    });
  };

  eventoBlurAplicarTodos_ = (e) => {
    if (this.state.aplicarPorcentajeTodos === '' || this.state.aplicarPorcentajeTodos === '0') {
      this.setState({
        aplicarPorcentajeTodos: '0'
      });
    }
  }

  eventoFocusAplicarTodos_ = (e) => {
    if (this.state.aplicarPorcentajeTodos === '0') {
      this.setState({
        aplicarPorcentajeTodos: ''
      });
    }
  }

  render() {
    const { rowsPerPage, page } = this.state;
    const ArrayData = this.state.arrayTest
    return (
      <span>
        <div className="row">
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
              style={{ borderRadius: "0.25rem", border: "1px solid #e4e7ea" }}
            />
          </FormGroup>
        </div>
        <div>
          <div className="errorSelect" style={{ width: "100%" }}>{this.props.divSeleccioneServiciosComision}</div>
          <div className="errorSelect" style={{ width: "100%" }}>{this.props.divSeleccioneServiciosPayment}</div>
          {
            this.props.typePersonal === "5d1776e3b0d4a50b23936710" &&
            <div className="row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <FormGroup className={`top form-group col-sm-6`}>
                <div className={this.state.divAplicarPorcentajeTodos}>
                  <Label for="aplicarPorcentajeTodos">Aplicar Porcentaje:</Label>
                  <Input
                    disabled={this.props.disabled}
                    name="aplicarPorcentajeTodos"
                    id="aplicarPorcentajeTodos"
                    onKeyUp={this.handlekeyAplicarPorcentajeTodos}
                    onChange={this.handleChangeInputTable_}
                    value={this.state.aplicarPorcentajeTodos}
                    type="number"
                    placeholder="Aplicar Porcentaje para Todos"
                    onBlur={this.eventoBlurAplicarTodos_}
                    onFocus={this.eventoFocusAplicarTodos_}
                  />
                </div>
                <div className="errorSelect">{this.state.divAplicarPorcentajeTodosError}</div>
              </FormGroup>
            </div>
          }
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
                        <td style={{ padding: "9px" }}>
                          <div id={`divQuantity_${data.serviceId}`} className="">
                            <Input
                              name={`inputQuantity_${data.serviceId}`}
                              id={`inputQuantity_${data.serviceId}`}
                              type="number"
                              value={data.percentage}
                              onChange={this.handleChangeInputTable(data.serviceId)}
                              style={{ width: "40%" }}
                              disabled={this.props.disabled}
                              onBlur={this.eventoBlurAplicarTodos(data.serviceId)}
                              onFocus={this.eventoFocusAplicarTodos(data.serviceId)}
                            />
                          </div>
                        </td>
                        :
                        <td style={{ padding: "1px" }}>
                          <Switch
                            onChange={this.handleChangeSwitch(data.serviceId)}
                            value={data.confirm}
                            id={`checked_${i}`}
                            name={`checked_${i}`}
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
          {
            this.props.typePersonal !== "5d1776e3b0d4a50b23936710" &&
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <FormGroup className={`top form-group col-sm-12`}>
                <Label for="seleccionarTodos"><b>Seleccionar Todos:</b></Label>
                <Switch
                  checked={this.state.checked ? this.state.checked : false}
                  onChange={this.handleChangeSwitchAll("checked")}
                  value={this.state.checked}
                  color="primary"
                  disabled={this.props.disabled}
                />
              </FormGroup>
            </div>
          }
        </div>
      </span>
    );
  }
}

export default ListServices;