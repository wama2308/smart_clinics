import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import { GetDisabledPermits, getArray } from "../../core/utils";
import PreRegistro from "./PreRegistro/PreRegistro";
import Pagination from '../../components/Pagination';

class BodyExternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      ids: null,
      page: 0,
      rowsPerPage: 10,
    };
  }
  ViewModal = data => {
    const obj = {
      id_branchoffices: data.id_branchoffices,
      id_medical_center: data.id_medical_center,
      status: data.status
    };
    this.setState({ openModal: true, ids: obj });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  delete = data => {
    const obj = {
      title: "Eliminar Personal Externo",
      info: "Esta seguro que desea Eliminar Personal externo"
    };
    this.props.deleteData(obj, res => {
      if (res) {
        this.props.delete({
          external_id: data.id_medical_center,
          branchoffices_id: data.id_branchoffices
        });
      }
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  render() {
    const data = [
      {
        label: "Nombre"
      },
      {
        label: "Estatus"
      },
      { label: "Centro medico" },
      { label: "pais" },
      { label: "Provincia" },
      { label: "Acciones" }
    ];

    const deleteDisabled = GetDisabledPermits(this.props.externalPermits, "Delete")
    const { rowsPerPage, page } = this.state;
    const ArrayData = getArray(this.props.data)

    return (
      <div
        style={{
          height: "90%"
        }}
      >
        {this.state.openModal && (
          <PreRegistro
            open={this.state.openModal}
            ids={this.state.ids}
            close={this.closeModal}
            disabled={true}
          />
        )}
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              {data.map((data, key) => {
                return <th key={key}>{data.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {ArrayData && ArrayData.length > 0
              ? ArrayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                return (
                  <tr key={item.number - 1}>
                    <td>{item.name_branchoffices}</td>
                    <td>{this.props.type}</td>
                    <td>{item.name_medical_center}</td>
                    <td>{item.country}</td>
                    <td>{item.province}</td>
                    <td>
                      <div className="float-left">
                        <IconButton
                          className="iconButtons"
                          onClick={() => {
                            this.ViewModal(item);
                          }}
                        >
                          <Visibility className="iconTable" />
                        </IconButton>
                        <IconButton
                          className="iconButtons"
                          disabled={deleteDisabled}
                          onClick={() => {
                            this.delete(item);
                          }}
                        >
                          <Delete className="iconTable" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              })
              : null}
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

export default BodyExternal;
