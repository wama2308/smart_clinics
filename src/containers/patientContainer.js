import React from "react";
import { Card } from "reactstrap";
import PerfilPatient from "../views/patients/PerfilPatient";
import InfoPatient from "../views/patients/InfoPatient";
import NewConsultation from "../views/patients/NewConsultation";
import styled from "styled-components";

class PatientContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Container>
        {this.state.open && (
          <NewConsultation close={this.handleClose} open={this.state.open} />
        )}
        <div className="patient-info">
          <PerfilPatient open={this.handleOpen} />
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
