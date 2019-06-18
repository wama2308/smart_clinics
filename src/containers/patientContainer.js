import React from "react";
import { Card } from "reactstrap";
import PerfilPatient from "../views/patients/PerfilPatient";
import InfoPatient from "../views/patients/InfoPatient";
import styled from "styled-components";

class PatientContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <div className="patient-info">
          <PerfilPatient />
        </div>
        <div className="patient-result">
          <InfoPatient />
        </div>
      </Container>
    );
  }
}

export default PatientContainer;

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;

  .patient {
    &-info {
      flex: 0.5;
      background: #f0f3f5;
      display: flex;
      padding: 20px;
    }

    &-result {
      flex: 2;
      display: flex;
    }
  }
`;
