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
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import {
  Checkbox,
  IconButton,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow
} from "@material-ui/core";
import { formatNumber } from "../../core/utils";
import styled from "styled-components";
import { connect } from "react-redux";
import { openConfirmDialog } from "../../actions/aplicantionActions";
import {
  selectedReferences,
  deleteReferences
} from "../../actions/ventasAction";

class ModalReferences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      selected: false
    };
  }

  addReferences = () => {
    const refSelected = this.props.references.find(ref => {
      return this.state.selected === ref._id;
    });

    const obj = {
      title: "Eliminar Referencias",
      info: "Tiene mas referencias Desea Eliminarlas?"
    };

    this.props.openConfirmDialog(obj, res => {
      if (res) {
        this.props.deleteReferences(
          {
            patient_id: this.props.patient._id,
            reference_id: refSelected._id
          },
          () => {
            this.props.selectedReferences(refSelected, () => {
              this.props.close();
            });
          }
        );
      } else {
        this.props.selectedReferences(refSelected, () => {
          this.props.close();
        });
      }
    });
  };

  render() {
    const dataHead = [
      { label: "CODIGO" },
      { label: "NOMBRE" },
      { label: "TIPO" },
      { label: "DISPONIBLE" },
      { label: "CANTIDAD" },
      { label: "PRECIO/U" },
      { label: "PRECIO/T" }
    ];
    return (
      <Modal
        toggle={this.props.close}
        isOpen={this.props.open}
        style={{ minWidth: "70%" }}
      >
        <ModalHeader toggle={this.props.close}>
          Selecione una referencia
        </ModalHeader>

        <ModalBody>
          {this.props.references.map((ref, key) => {
            return (
              <div key={key}>
                <Reference>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center"
                    }}
                  >
                    <Checkbox
                      checked={ref._id === this.state.selected ? true : false}
                      onClick={() => this.setState({ selected: ref._id })}
                    />

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
                    {this.state.collapse !== key && (
                      <IconButton
                        onClick={() => {
                          this.setState({
                            collapse: key === this.state.collapse ? true : key
                          });
                        }}
                      >
                        <KeyboardArrowDown />
                      </IconButton>
                    )}
                    {this.state.collapse === key && (
                      <IconButton
                        onClick={() => {
                          this.setState({
                            collapse: key === this.state.collapse ? true : key
                          });
                        }}
                      >
                        <KeyboardArrowUp />
                      </IconButton>
                    )}
                  </div>
                </Reference>
                <Collapse isOpen={this.state.collapse === key}>
                  <Card>
                    <CardBody
                      style={{
                        overflow: "auto"
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow style={{ height: 35 }}>
                            {dataHead.map((head, key) => {
                              return (
                                <TableCell
                                  key={key}
                                  style={{ border: "1px solid #c8ced3" }}
                                >
                                  {head.label}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {ref.products.map(product => {
                            return (
                              <TableRow key={product._id}>
                                <Cell className="cellStyle">
                                  {product.code}
                                </Cell>
                                <Cell>{product.name}</Cell>
                                <Cell>{product.type}</Cell>
                                <Cell>
                                  {product.service
                                    ? "0"
                                    : product.quantity_stock}
                                </Cell>

                                <Cell
                                  onClick={() => this.editInput(product._id)}
                                >
                                  {product.quantity}
                                </Cell>

                                <Cell>{formatNumber(product.price)}</Cell>
                                <Cell>
                                  {product.quantity
                                    ? formatNumber(
                                        product.quantity * product.price
                                      )
                                    : formatNumber(product.price)}
                                </Cell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => this.props.close}>
            Cancelar
          </Button>
          <Button color="success" onClick={this.addReferences}>
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(
  null,
  { selectedReferences, openConfirmDialog, deleteReferences }
)(ModalReferences);

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

const Cell = styled(TableCell)`
  border: 1px solid #c8ced3;
`;
