import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { DoneOutlineOutlined } from "@material-ui/icons";
import ModalStore from './ModalStore.js';
import Pagination from '../../components/Pagination';
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

  render() {
    const { rowsPerPage, page } = this.state;
    const ArrayData = getArray(this.props.data);

    return (
      <div>
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
            {ArrayData ? ArrayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
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
                        <DoneOutlineOutlined className="iconTable" />
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
