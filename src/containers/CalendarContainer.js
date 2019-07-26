import React from "react";
import styled from "styled-components";
import Calendario from "../views/calendar/Calendario";

export default class Calendar extends React.Component {
  render() {
    return (
      <Container>
        <Calendario />
      </Container>
    );
  }
}

const Container = styled.div`
  background: #fff;
  height: 85vh;
`;
