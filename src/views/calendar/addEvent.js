import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { TextField } from "@material-ui/core";
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

  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.close}>
        <ModalHeader toggle={this.props.close}>Agregar evento</ModalHeader>
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
