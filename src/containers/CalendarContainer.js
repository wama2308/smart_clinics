import React from "react";
import styled from "styled-components";
import Calendario from "../views/calendar/Calendario";
import AddEvent from "../views/calendar/addEvent";
import {
  setAgent,
  getAgent,
  editEvent,
  deleteItem
} from "../actions/agendaAction";
import { openConfirmDialog } from "../actions/aplicantionActions";
import { connect } from "react-redux";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      start: null,
      end: null,
      title: "",
      description: "",
      event: []
    };
  }

  componentDidMount = () => {
    this.props.getAgent();
  };

  addEvent = obj => {
    if (!obj.id) {
      this.setState({ start: obj.start, end: obj.end, open: true });
    } else {
      this.setState({ ...obj, open: true });
    }
  };

  close = () => {
    this.setState({
      start: "",
      end: "",
      title: "",
      description: "",
      open: false,
      id: null
    });
  };

  changeEndOrStart = (name, value) => {
    this.setState({ [name]: value });
  };

  saveEvent = obj => {
    const newEvent = {
      start: this.state.start,
      end: this.state.end,
      title: this.state.title,
      description: this.state.description
    };

    this.props.setAgent(newEvent, () => {
      this.setState({
        start: "",
        end: "",
        title: "",
        description: "",
        open: false
      });
    });
  };

  render() {
    return (
      <Container>
        {this.state.open && (
          <AddEvent
            {...this.state}
            close={this.close}
            change={this.changeEndOrStart}
            saveEvent={this.saveEvent}
            editEvent={this.props.editEvent}
            deleteItem={this.props.deleteItem}
            confirm={this.props.openConfirmDialog}
          />
        )}
        <Calendario
          addEvent={this.addEvent}
          event={this.props.events ? this.props.events : []}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  events: state.calendar.get("events")
});

export default connect(
  mapStateToProps,
  { setAgent, getAgent, editEvent, deleteItem, openConfirmDialog }
)(Calendar);

const Container = styled.div`
  background: #fff;
  height: 85vh;
`;
