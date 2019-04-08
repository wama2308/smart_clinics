import React from "react";
import styled from "styled-components";

export default class Body extends React.Component {
  render() {
    return (
      <Container>
        <div className="item-container1 border2"> this body</div>
        <div className="item-container2">services</div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: grid;
  min-height: 500px;
  grid-template-columns: 40% 60%;
  grid-column-gap: 10px;

  .border2 {
    border-right: 1px solid  #c8ced3 !important;
  }
`;
