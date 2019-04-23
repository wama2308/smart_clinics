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
    console.log("aca", data);
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

  delete = id => {
    const obj = {
      title: "Eliminar Personal Externo",
      info: "Esta seguro que desea Eliminar Personal externo"
    };
    this.props.deleteData(obj, res => {
      console.log(res);
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
    console.log("body", this.props.data);
    return (
      <div>
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
            {this.props.data
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
                              this.delete(i);
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
      </div>
    );
  }
}

export default BodyExternal;
