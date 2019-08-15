import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Collapse,
  Card,
  CardBody,
  ModalFooter,
  Button
} from "reactstrap";
import { KeyboardArrowDown } from "@material-ui/icons";
import { Checkbox, IconButton } from "@material-ui/core";
import styled from "styled-components";

export default class ModalReferences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };
  }
  render() {
    console.log("References Modal", this.props);
    return (
      <Modal
        toggle={this.props.close}
        isOpen={this.props.open}
        style={{ minWidth: "55%" }}
      >
        <ModalHeader toggle={this.props.close}>
          Selecione una referencia
        </ModalHeader>

        <ModalBody>
          {this.props.references.map(ref => {
            return (
              <div>
                <Reference>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center"
                    }}
                  >
                    <Checkbox checked={true} />

                    <div
                      style={{
                        paddingLeft: 20,
                        paddingRight: 20
                      }}
                    >
                      {ref.names} {ref.surnames}
                    </div>

                    {ref.medical_center_id && <div>{ref.dni}</div>}

                    {!ref.medical_center_id && (
                      <div>
                        {ref.type_identity}-{ref.dni}
                      </div>
                    )}
                  </div>

                  <div>
                    <IconButton>
                      <KeyboardArrowDown />
                    </IconButton>
                  </div>
                </Reference>
                <Collapse isOpen={this.state.collapse}>
                  <Card>
                    <CardBody>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. Nihil anim keffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident.
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button color="danger">Cancelar</Button>
          <Button color="success">Guardar</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const Reference = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background: #f0f3f5;
  border-radius: 5px;
  margin-top: 20px;

  &:first-child {
    margin-top: 20px;
  }
`;
