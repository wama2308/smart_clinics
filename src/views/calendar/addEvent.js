import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { TextField, IconButton } from "@material-ui/core";
import { Delete, Clear } from "@material-ui/icons";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const es = require("date-fns/locale/es");

registerLocale("es", es);
export default class addEvent extends React.Component {
  state = {
    title: "",
    description: ""
  };

  eventEdit = () => {
    const value = this.props;
    this.props.editEvent(
      {
        title: value.title,
        end: value.end,
        start: value.start,
        description: value.description
      },
      value.id,
      () => {
        this.props.close();
      }
    );
  };

  delete = () => {
    const obj = {
      title: "Evento",
      info: "Desea eliminar este evento?"
    };
    this.props.confirm(obj, res => {
      if (res) {
        this.props.deleteItem(this.props.id, () => {
          this.props.close();
        });
      }
    });
  };

  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.close}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 12,
            borderBottom: "1px solid #00000059"
          }}
        >
          <h5 className="modal-title">Agregar evento</h5>
          <div>
            <IconButton onClick={this.delete}>
              <Delete />
            </IconButton>
            <IconButton onClick={this.props.close}>
              <Clear />
            </IconButton>
          </div>
        </div>
        <ModalBody style={{ minHeight: 300 }}>
          <TextField
            id="standard-name"
            fullWidth
            value={this.props.title}
            placeholder="Añadadir titulo y una hora"
            onChange={event => this.props.change("title", event.target.value)}
            margin="normal"
          />
          <div
            style={{
              paddingTop: 20
            }}
          >
            <DatePicker
              selected={this.props.start}
              locale="es"
              dateFormat="MMMM d, yyyy h:mm aa"
              showYearDropdown
              showTimeSelect
              timeFormat="HH:mm"
              className="form-control inputStyle"
              onChange={event => this.props.change("start", event)}
            />
            &nbsp; hasta &nbsp;
            <DatePicker
              dateFormat="MMMM d, yyyy h:mm aa"
              locale="es"
              showTimeSelect
              timeFormat="HH:mm"
              selected={this.props.end}
              showYearDropdown
              onChange={event => this.props.change("end", event)}
              className="form-control inputStyle"
            />
          </div>

          <TextField
            id="standard-name"
            fullWidth
            multiline
            rows="4"
            value={this.props.description}
            placeholder="Añade una descripcion"
            onChange={event =>
              this.props.change("description", event.target.value)
            }
            margin="normal"
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={this.props.close}>Atras</Button>
          {!this.props.id && (
            <Button
              color="success"
              onClick={() => this.props.saveEvent(this.state)}
            >
              Guardar
            </Button>
          )}

          {this.props.id && (
            <Button color="success" onClick={this.eventEdit}>
              Editar
            </Button>
          )}
        </ModalFooter>
      </Modal>
    );
  }
}
