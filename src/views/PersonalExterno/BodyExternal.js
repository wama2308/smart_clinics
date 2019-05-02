import React from "react";
import { Table , Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";

class BodyExternal extends React.Component {
  render() {
    const array = [1, 2, 3];
    const data = [
      {
        label: "Nombre"
      },
      {
        label: "Estatus"
      },
      { label: "Nombre del centro medico" },
      { label: "Direccion" },
      { label: "Provincia" },
      { label: "Acciones" }
    ];
    return (
      <div>
        {/* <div className="App">
          <Button color="success">Agregar Sucursal</Button>
        </div> */}
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              {data.map((data, key) => {
                return <th key={key}>{data.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.type
              ? this.props.type.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.nombre}</td>
                      <td>{item.status}</td>
                      <td>{item.ncm}</td>
                      <td>{item.direccion}</td>
                      <td>{item.provincia}</td>
                      <td>
                        <div className="float-left">
                          <IconButton
                            aria-label="Delete"
                            className="iconButtons"
                            onClick={() => {
                              this.view(item);
                            }}
                          >
                            <Visibility className="iconTable" />
                          </IconButton>

                          <IconButton
                            aria-label="Delete"
                            className="iconButtons"
                            onClick={() => {
                              this.modaledit(item, i);
                            }}
                          >
                            <Edit className="iconTable" />
                          </IconButton>

                          <IconButton
                            className="iconButtons"
                            aria-label="Delete"
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
