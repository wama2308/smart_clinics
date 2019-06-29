import React from "react";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { Button, Table } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Edit, Visibility, Delete } from "@material-ui/icons";
import ModalPlantilla from "./modalsServicio/ModalPlantilla";
import { GetDisabledPermits } from "../../core/utils";
import jstz from "jstz";

import "./Services.css";
import "./loading.css";
import Pagination from '../../components/Pagination';

class Plantillas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      disabled: false,
      editTemplate: "", 
      page: 0,
      rowsPerPage: 10,
    };
  }

  closeModal = () => {
    this.setState({
      openModal: false,
      type: 1
    });
  };

  view = item => {
    this.setState({
      editTemplate: item,
      openModal: true,
      disabled: true
    });
  };

  edit = (item, key) => {
    this.setState({
      editTemplate: { ...item, key },
      openModal: true,
      disabled: false
    });
  };

  delete = id => {
    const obj = {
      title: "Eliminar Plantilla",
      info: "¿Esta seguro que desea eliminar esta plantilla?"
    };
    this.props.alert(obj, data => {
      if (data) {
        this.props.delete({
          time: jstz.determine().name(),
          id
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
    let count = [];

    const createDisabled = GetDisabledPermits(this.props.serviciosPermits, "Create")
    const updateDisabled = GetDisabledPermits(this.props.serviciosPermits, "Update")
    const deleteDisabled = GetDisabledPermits(this.props.serviciosPermits, "Delete")

    const { rowsPerPage, page } = this.state;
    const ArrayTemplate = [];

    this.props.template.map((template, key) => {
      ArrayTemplate.push({
        ...template, number: key 
      })
    })

    return (
      <div>
        {this.state.openModal && (
          <ModalPlantilla
            open={this.state.openModal}
            close={this.closeModal}
            disabled={this.state.disabled}
            edit={this.state.editTemplate}
          />
        )}
        <div
          style={{
            paddingLeft: 20
          }}
        >
          <Button
            color="success"
            disabled={createDisabled}
            onClick={() => this.setState({ openModal: true })}
          >
            Agregar
          </Button>
        </div>
        <br />

        <div>
          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                <th style={{ width: "30%" }}>Nro</th>
                <th style={{ width: "40%" }}>Plantilla</th>
                <th style={{ width: "30%", textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.props.template.length > 0 &&
               ArrayTemplate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((template) => {
                  if (template.status === true) {
                    count.push(template.number);
                    return (
                      <tr key={template.number}>
                        <td scope="row" style={{ width: "30%" }}>
                          {count.length}
                        </td>
                        <td style={{ width: "40%" }}>{template.template}</td>
                        <td
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div className="float-left">
                            <a title="Ver Plantilla">
                              <IconButton
                                aria-label="Delete"
                                className="iconButtons"
                                onClick={() => {
                                  this.view(template);
                                }}
                              >
                                <Visibility className="iconTable" />
                              </IconButton>
                            </a>
                            <a title="Modificar Plantilla">
                              <IconButton
                                aria-label="Delete"
                                className="iconButtons"
                                disabled={updateDisabled}
                                onClick={() => {
                                  this.edit(template, template.number);
                                }}
                              >
                                <Edit className="iconTable" />
                              </IconButton>
                            </a>
                            <a title="Eliminar Plantilla">
                              <IconButton
                                className="iconButtons"
                                aria-label="Delete"
                                delete={deleteDisabled}
                                onClick={() => {
                                  this.delete(template.number);
                                }}
                              >
                                <Delete className="iconTable" />
                              </IconButton>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </Table>
          <div style={{ 'display': "flex", 'justify-content': "flex-end" }}>
            <Pagination contador={this.props.template}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              handleChangePage={this.handleChangePage} />
          </div>
        </div>
      </div>
    );
  }
}

export default Plantillas;
