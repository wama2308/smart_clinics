import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { TextField } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export default class addEvent extends React.Component {
  state = {
    start: new Date(),
    end: new Date()
  };

  handleDateChange = date => {
    this.setState({});
  };

  render() {
    console.log("asdasdasd", this.state.selectedDate);
    return (
      <Modal isOpen={true}>
        <ModalHeader>Agregar evento</ModalHeader>
        <ModalBody style={{ minHeight: 300 }}>
          <TextField
            id="standard-name"
            fullWidth
            placeholder="Añadadir titulo y una hora"
            onChange={e => console.log(e)}
            margin="normal"
          />
          <div
            style={{
              paddingTop: 20
            }}
          >
            <DatePicker
              selected={this.state.start}
              dateFormat="dd-MM-yyyy"
              showYearDropdown
              dateFormatCalendar="MMMM"
              className="form-control inputStyle"
              handleDateChange={this.handleDateChange}
            />
            &nbsp; hasta &nbsp;
            <DatePicker
              dateFormat="dd-MM-yyyy"
              selected={this.state.end}
              showYearDropdown
              dateFormatCalendar="MMMM"
              className="form-control inputStyle"
            />
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
