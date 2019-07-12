import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { CheckCircle } from "@material-ui/icons";
import ModalStore from './ModalStore.js';
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'
import { getArray } from '../../core/utils'

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

  ActivateStore = (id, sucursalId) => {
    const message = {
      title: "Activar Almacen",
      info: "¿Esta seguro que desea activar este almacen?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enableStoreBranchOfficesAction(id, sucursalId);
      }
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  getStore = store => {
    if (!store) {
      return [];
    }
    return store;
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const arrayData = getArray(this.props.data);

    const result = this.props.search
      ? arrayData.filter(data => {
          return (
              data.name.toLowerCase().includes(this.props.search) ||
              data.branchoffice.label.toLowerCase().includes(this.props.search)
          );
        })
      : arrayData;

    return (
      <div>
        <div className="containerGeneral" style={{"justifyContent": "flex-end"}}>
          <div className="containerSearch">
            <Search value={arrayData} />
          </div>
        </div>
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Almacen</th>
              <th className="text-left">Sucursal</th>
              <th className="text-left">Descripcion</th>
              <th className="text-left" style={{ 'minWidth': "105px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {arrayData ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
              return (
                <tr key={data.number} className="text-left">
                  <td>{data.number}</td>
                  <td>{data.name}</td>
                  <td>{data.branchoffice.label}</td>
                  <td>{data.description}</td>
                  <td style={{ 'minWidth': "205px" }}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete"
                        title="Activar Almacen"
                        className="iconButtons"
                        onClick={() => { this.ActivateStore(data._id, data.branchoffice.value); }}>
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
            this.props.data.length > 10 &&
              <Pagination contador={this.props.data}
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
