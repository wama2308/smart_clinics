import React from "react";
import styled from "styled-components";

class ExternalHeader extends React.Component {
  render() {
    return (
      <Container>
        <div className="box-style box-one">Pacientes</div>
        <div className="box-style box-two">Comision</div>
        <div className="box-style box-three">Status</div>
      </Container>
    );
  }
}

export default ExternalHeader;

const Container = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 25% 25% 25% 25%;

  .box-style {
    cursor:pointer;
    border-radius: 4px;
    border: 1px solid;
  }

  .box-one {
    background: #2eadd3;
    border-color: #1c74ce;
  }

  .box-two {
    background: #ffc107;
    border-color: #c69500;
  }


  .box-three {
    background: #43a047;
    border-color: #1b5e20;
  }

`;
