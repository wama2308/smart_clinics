import React from "react";
import styled from "styled-components";
import Calendario from "../views/calendar/Calendario";
import AddEvent from "../views/calendar/addEvent";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null
    };
  }
  addEvent = obj => {
    this.setState({ start: obj.start, end: obj.end, open: true });
  };

  render() {
    return (
      <Container>
        <AddEvent {...this.state} />
        <Calendario addEvent={this.addEvent} />
      </Container>
    );
  }
}

const Container = styled.div`
  background: #fff;
  height: 85vh;
`;
