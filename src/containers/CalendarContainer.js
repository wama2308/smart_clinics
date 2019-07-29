import React from "react";
import styled from "styled-components";
import Calendario from "../views/calendar/Calendario";
import AddEvent from "../views/calendar/addEvent";
import { setAgent, getAgent } from "../actions/agendaAction";
import { connect } from "react-redux";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      start: null,
      end: null,
      event: []
    };
  }

  componentDidMount = () => {
    this.props.getAgent();
  };

  addEvent = obj => {
    this.setState({ start: obj.start, end: obj.end, open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  changeEndOrStart = (name, value) => {
    this.setState({ [name]: value });
  };

  saveEvent = obj => {
    const events = this.props.events
      ? Object.values(this.props.events)
      : [];

    events.push({
      start: this.state.start,
      end: this.state.end,
      ...obj
    });
    this.props.setAgent(events, () => {
      this.setState({ start: "", end: "", open: false });
    });
  };

  render() {
    console.log("aca", this.props.events);
    return (
      <Container>
        {this.state.open && (
          <AddEvent
            {...this.state}
            close={this.close}
            change={this.changeEndOrStart}
            saveEvent={this.saveEvent}
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
  { setAgent, getAgent }
)(Calendar);

const Container = styled.div`
  background: #fff;
  height: 85vh;
`;
