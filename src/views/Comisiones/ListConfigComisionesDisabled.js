import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { CheckCircle } from "@material-ui/icons";
import Pagination from '../../components/Pagination';
import { getArray } from '../../core/utils'
import { number_format } from "../../core/utils";

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

    return (
      <div>
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
             <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Personal</th>
              <th className="text-left">Tiempo</th>
              <th className="text-left">Modo de Pago</th>
              <th className="text-left">Minimo para Pago</th>              
              <th className="text-left" style={{ 'minWidth': "105px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ArrayData ? ArrayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
              return (
                <tr key={data.number} className="text-left">
                  <td>{data.number}</td>
                  <td>{data.type_staff}</td>
                  <td>{data.time}</td>
                  <td>{data.payment_type}</td>
                  <td>{number_format(data.amount_min, 2)}</td>
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
