import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { CheckCircle } from "@material-ui/icons";
import Pagination from '../../components/Pagination';
import { getArray } from '../../core/utils'
import { number_format } from "../../core/utils";
import Search from "../../components/Select";

class ListStoreInactivos extends React.Component {
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
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() { }

  activateRegister = (id) => {
    const message = {
      title: "Activar Configuracion de Comision",
      info: "¿Esta seguro que desea activar esta configuracion de comision?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enableConfigCommissionsAction(id);
      }
    });
  }
  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const ArrayData = getArray(this.props.data.commissions_disabled);

    const result = this.props.search
      ? ArrayData.filter(users => {
        return (
          users.type_staff.toLowerCase().includes(this.props.search.toLowerCase()) ||
          users.time.toLowerCase().includes(this.props.search.toLowerCase()) ||
          users.type.toLowerCase().includes(this.props.search.toLowerCase()) ||
          users.payment_type.toLowerCase().includes(this.props.search.toLowerCase())
        );
      })
      : ArrayData;

    return (
      <div>
        <div className="containerGeneral">
          <div className="container-button">
          </div>
          <div className="containerSearch">
            <Search value={ArrayData} />
          </div>
        </div>
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Personal</th>
              <th className="text-left">Tiempo(dias)</th>
              <th className="text-left">Tipo</th>
              <th className="text-left">Condicion</th>
              <th className="text-left">Forma de pago</th>
              <th className="text-left" style={{ 'minWidth': "105px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ArrayData ? ArrayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
              let condition = "";
              data.type_id === "5d1776e3b0d4a50b23931122" ?
                condition = data.condition :
                condition = number_format(data.condition, 2) + " " + this.props.current_simbol
              return (
                <tr key={data.number} className="text-left">
                  <td>{data.number}</td>
                  <td>{data.type_staff}</td>
                  <td>{data.time}</td>
                  <td>{data.type}</td>
                  <td>{condition}</td>
                  <td>{data.payment_type}</td>
                  <td style={{ 'minWidth': "205px" }}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete"
                        title="Activar Comision"
                        className="iconButtons"
                        onClick={() => { this.activateRegister(data._id); }}>
                        <CheckCircle className="iconTable" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })
              :
              null
            }
          </tbody>
          {
            this.props.data.commissions_disabled.length > 10 &&
            <Pagination contador={this.props.data.commissions_disabled}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              handleChangePage={this.handleChangePage} />
          }
        </Table>
      </div>
    );
  }
}

export default ListStoreInactivos;
