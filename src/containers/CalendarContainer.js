import React from "react";
import styled from "styled-components";
import Calendario from "../views/calendar/Calendario";
import AddEvent from "../views/calendar/addEvent";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      start: null,
      end: null,
      event: []
    };
  }
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
    const events = this.state.event;
    events.push({
      start: this.state.start,
      end: this.state.end,
      ...obj
    });

    this.setState({ event: events, open: false });
  };

  render() {
    return (
      <Container>
        <AddEvent
          {...this.state}
          close={this.close}
          change={this.changeEndOrStart}
          saveEvent={this.saveEvent}
        />
        <Calendario addEvent={this.addEvent} event={this.state.event} />
      </Container>
    );
  }
}

const Container = styled.div`
  background: #fff;
  height: 85vh;
`;
