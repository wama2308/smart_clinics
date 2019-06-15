import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import PreRegistro from "./PreRegistro/PreRegistro";

class BodyExternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      ids: null
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
            {this.props.data && this.props.data.length > 0
              ? this.props.data.map((item, i) => {
                  return (
                    <tr key={i}>
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
        </Table>
        {this.props.data.length === 0 && (
          <div
            style={{
              flex: 1,
              flexDirection: "row",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            No tienes solitudes {this.props.type}s
          </div>
        )}
      </div>
    );
  }
}

export default BodyExternal;
