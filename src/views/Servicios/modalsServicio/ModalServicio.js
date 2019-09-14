import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  FormFeedback,
  Card,
  NavItem,
  Nav,
  NavLink,
  Table
} from "reactstrap";
import "../Services.css";
import "../loading.css";
import classnames from "classnames";
import { DoneOutlineOutlined } from "@material-ui/icons";
import { Formik } from "formik";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import {
  loadOriginalService,
  loadModifiedService,
  editServices
} from "../../../actions/ServicesAction";
import { Delete, Edit } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import Cleave from "cleave.js/react";
import jstz from "jstz";
import * as yup from "yup";
import AddField from "./addField";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

class ModalServicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "show",
      amount: 0,
      openModal: false,
      edit: null,
      activeTab: 1
    };
  }

  componentDidMount = () => {
    const obj = {
      licenseId: this.props.licenseID,
      serviceId: this.props.serviceID
    };
    if (this.props.type === 1) {
      this.props.loadOriginalService(obj);
    } else {
      this.props.loadModifiedService(obj);
    }
  };

  componentWillReceiveProps = props => {
    props.serviceModalData
      ? this.setState({
          loading: props.serviceModalData.loading
        })
      : null;
  };

  handleSubmit = value => {
    this.setState({
      loading: "show"
    });
    const obj = {
      ...value,
      category: value.category.value,
      licenseId: this.props.licenseID,
      serviceId: this.props.serviceID,
      timeZ: jstz.determine().name()
    };
    this.props.editServices(obj, () => {
      this.setState({ loading: "hide" });
      this.props.close();
    });
  };

  dataFilterView = data => {
    let obj = {
      servicio: "",
      category: "",
      amount: "",
      fields: [],
      format: ""
    };
    if (!data) {
      return obj;
    }
    return (obj = {
      service: data.serviceName,
      category: data.category,
      amount: data.amount,
      format: data.format,
      fields: data.fields
    });
  };

  contextMenu = data => {
    let dataFields = data;
    let fields = dataFields.toString();
    let fields_split = fields.split(",");
    let fields_lenght = fields_split.length;
    let fields_replace = fields.replace(/,/g, " | ");

    return fields_replace;
  };

  getGroup = fields => {
    let arrayGroups = [];
    fields.map(field => {
      const result = arrayGroups.find(data => data === field.group);
      if (!result) {
        arrayGroups.push(field.group);
      }
    });
    return arrayGroups;
  };

  closeModal = () => {
    this.setState({ openModal: false, edit: null });
  };

  confirm = field => {
    const obj = {
      title: "Servicios",
      info: "Esta seguro que desea eliminar este campo?"
    };
    this.props.alert(obj, res => {
      if (res) {
        this.props.deleteModifyServices({
          field_id: field._id,
          licenseId: this.props.licenseID,
          serviceId: this.props.serviceID
        });
      }
    });
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  activeField = obj => {
    this.props.enabledField({
      licenseId: this.props.licenseID,
      serviceId: this.props.serviceID,
      field_id: obj._id
    });
  };

  render() {
    const { open, close, serviceModalData, plantilla, disabled } = this.props;

    const data = !serviceModalData
      ? undefined
      : serviceModalData.serviceOriginal;
    const Initialvalue = this.dataFilterView(data);

    const contextMenu = this.contextMenu(Initialvalue.fields);

    const validationSchema = yup.object().shape({
      service: yup.string().required("Este Campo es Requerido")
    });
   
    

    return (
      <Modal isOpen={open} toggle={close} className="Modal">
        {this.state.loading === "show" && (
          <div align="center" className={"show"} style={{ padding: "5%" }}>
            <CircularProgress
              style={{
                position: " absolute",
                height: 40,
                top: "45%",
                right: "50%",
                zIndex: 2
              }}
            />
          </div>
        )}
        {this.state.loading === "hide" && (
          <Formik
            onSubmit={this.handleSubmit}
            enableReinitialize
            initialValues={Initialvalue}
            validationSchema={validationSchema}
            render={({
              values,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              handleBlur,
              resetForm
            }) => {
              const group = this.getGroup(values.fields);
              const inactive = serviceModalData.serviceOriginal.fields_disable;
              console.log(group);
              return (
                <div>
                  {this.state.openModal && (
                    <AddField
                      open={this.state.openModal}
                      close={this.closeModal}
                      group={group}
                      update={this.state.edit}
                      licenseID={this.props.licenseID}
                      serviceID={this.props.serviceID}
                    />
                  )}
                  <ModalHeader toggle={this.props.close}>
                    Servicio Original
                  </ModalHeader>
                  <ModalBody className="Scroll">
                    <FormGroup className="top form-group col-sm-12">
                      <Label for="servicio">Servicio</Label>
                      <Input
                        name="servicio"
                        id="servicio"
                        value={values.service}
                        disabled={disabled}
                        type="text"
                        onBlur={handleBlur}
                        placeholder="Servicio"
                        onChange={event => {
                          setFieldValue("service", event.target.value);
                        }}
                      />
                      {touched.servicio && errors.service && (
                        <FormFeedback style={{ display: "block" }} tooltip>
                          {errors.service}
                        </FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup className="top form-group col-sm-12">
                      <Label for="categoria">Categoria</Label>
                      <div>
                        <Select
                          isSearchable="true"
                          name="categoria"
                          value={values.category}
                          isDisabled={disabled}
                          onChange={event => {
                            setFieldValue("category", event);
                          }}
                          options={serviceModalData.categoria}
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.categoriaError}
                      </div>
                    </FormGroup>
                    <FormGroup
                      className={
                        "top form-group col-sm-12 " + this.state.labelMonto
                      }
                    >
                      <Label for="monto">Monto</Label>
                      <InputGroup style={{ flexWrap: "nowrap" }}>
                        <InputGroupAddon addonType="prepend">
                          {data.currencySymbol}
                        </InputGroupAddon>
                        <Cleave
                          style={{
                            width: "95%",
                            height: 35,
                            border: "1.5px solid",
                            borderColor: "#e4e7ea",
                            borderRadius: 5
                          }}
                          options={{
                            numeral: true,
                            numeralThousandsGroupStyle: "thousand"
                          }}
                          value={values.amount}
                          onChange={e => {
                            setFieldValue("amount", e.target.value);
                          }}
                        />
                      </InputGroup>
                      <FormFeedback tooltip>
                        {this.state.montoError}
                      </FormFeedback>
                    </FormGroup>

                    <FormGroup
                      className={
                        "top form-group col-sm-12 " + this.state.labelMonto
                      }
                    >
                      <Label for="monto">Monto maximo de Descuento</Label>
                      <InputGroup style={{ flexWrap: "nowrap" }}>
                        <InputGroupAddon addonType="prepend">
                          {data.currencySymbol}
                        </InputGroupAddon>
                        <Cleave
                          style={{
                            width: "95%",
                            height: 35,
                            border: "1.5px solid",
                            borderColor: "#e4e7ea",
                            borderRadius: 5
                          }}
                          options={{
                            numeral: true,
                            numeralThousandsGroupStyle: "thousand"
                          }}
                          value={values.amount}
                          onChange={e => {
                            setFieldValue("amount", e.target.value);
                          }}
                        />
                      </InputGroup>
                      <FormFeedback tooltip>
                        {this.state.montoError}
                      </FormFeedback>
                    </FormGroup>

                    <h4>Campos Modificables del servicio</h4>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          style={{ height: 50 }}
                          className={classnames({
                            active: this.state.activeTab === 1
                          })}
                          onClick={() => {
                            this.toggleTab(1);
                          }}
                        >
                          Activos
                        </NavLink>
                      </NavItem>

                      {inactive && !disabled && (
                        <NavItem>
                          <NavLink
                            style={{ height: 50 }}
                            className={classnames({
                              active: this.state.activeTab === 2
                            })}
                            onClick={() => {
                              this.toggleTab(2);
                            }}
                          >
                            Inactivo
                          </NavLink>
                        </NavItem>
                      )}
                    </Nav>
                    {this.state.activeTab === 1 && (
                      <EditableInput>
                        <div className="containerInputs">
                          {group.sort().map(group => {
                            return values.fields.map((field, key) => {
                              if (group === field.group) {
                                if (field.type === "input") {
                                  return (
                                    <FormGroup
                                      key={key}
                                      className={`top "form-group col-sm-${field.size} groupContainer `}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "baseline",
                                          height: 40
                                        }}
                                      >
                                        <Label for="servicio">
                                          {field.label}
                                        </Label>
                                        {!disabled && (
                                          <div className="buttonSEdit">
                                            <IconButton
                                              onClick={() => {
                                                this.setState({
                                                  openModal: true,
                                                  edit: field
                                                });
                                              }}
                                            >
                                              <Edit style={{ fontSize: 18 }} />
                                            </IconButton>
                                            <IconButton
                                              onClick={() => {
                                                this.confirm(field);
                                              }}
                                            >
                                              <Delete
                                                style={{ fontSize: 18 }}
                                              />
                                            </IconButton>
                                          </div>
                                        )}
                                      </div>

                                      <Input
                                        value={field.values}
                                        disabled={disabled}
                                        type="text"
                                        onBlur={handleBlur}
                                        placeholder={field.placeholder}
                                        onChange={event => {
                                          setFieldValue(
                                            `fields[${key}].value`,
                                            event.target.value
                                          );
                                        }}
                                      />
                                    </FormGroup>
                                  );
                                } else if (field.type === "select") {
                                  return (
                                    <FormGroup
                                      key={key}
                                      className={`top form-group col-sm-${field.size} groupContainer`}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "baseline",
                                          height: 40
                                        }}
                                      >
                                        <Label for="servicio">
                                          {field.label}
                                        </Label>

                                        {!disabled && (
                                          <div className="buttonSEdit">
                                            <IconButton
                                              onClick={() => {
                                                this.setState({
                                                  openModal: true,
                                                  edit: field
                                                });
                                              }}
                                            >
                                              <Edit style={{ fontSize: 18 }} />
                                            </IconButton>
                                            <IconButton
                                              onClick={() => {
                                                this.confirm(field);
                                              }}
                                            >
                                              <Delete
                                                style={{ fontSize: 18 }}
                                              />
                                            </IconButton>
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <Select
                                          isSearchable="true"
                                          name="categoria"
                                          value={field.value}
                                          isDisabled={disabled}
                                          onChange={event => {
                                            setFieldValue(
                                              `fields[${key}].value`,
                                              event
                                            );
                                          }}
                                          options={field.options}
                                        />
                                      </div>
                                      <div className="errorSelect">
                                        {this.state.categoriaError}
                                      </div>
                                    </FormGroup>
                                  );
                                } else if (field.type === "textArea") {
                                  return (
                                    <FormGroup
                                      key={key}
                                      className={`top form-group col-sm-${field.size} groupContainer`}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "baseline",
                                          height: 40
                                        }}
                                      >
                                        <Label for="servicio">
                                          {field.label}
                                        </Label>
                                        {!disabled && (
                                          <div className="buttonSEdit">
                                            <IconButton
                                              onClick={() => {
                                                this.setState({
                                                  openModal: true,
                                                  edit: field
                                                });
                                              }}
                                            >
                                              <Edit style={{ fontSize: 18 }} />
                                            </IconButton>
                                            <IconButton
                                              onClick={() => {
                                                this.confirm(field);
                                              }}
                                            >
                                              <Delete
                                                style={{ fontSize: 18 }}
                                              />
                                            </IconButton>
                                          </div>
                                        )}
                                      </div>
                                      <Input
                                        type="textarea"
                                        name="code"
                                        disabled={disabled}
                                        rows={5}
                                        value={field.value}
                                        onChange={event => {
                                          setFieldValue(
                                            `fields[${key}].value`,
                                            event.target.value
                                          );
                                        }}
                                      />
                                    </FormGroup>
                                  );
                                } else if (field.type === "checkBox") {
                                  return (
                                    <FormGroup
                                      key={key}
                                      className={`top form-group col-sm-${field.size} groupContainer`}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "baseline",
                                          height: 40
                                        }}
                                      >
                                        <Label for="servicio">
                                          {field.label}
                                        </Label>
                                        {!disabled && (
                                          <div className="buttonSEdit">
                                            <IconButton
                                              onClick={() => {
                                                this.setState({
                                                  openModal: true,
                                                  edit: field
                                                });
                                              }}
                                            >
                                              <Edit style={{ fontSize: 18 }} />
                                            </IconButton>
                                            <IconButton
                                              onClick={() => {
                                                this.confirm(field);
                                              }}
                                            >
                                              <Delete
                                                style={{ fontSize: 18 }}
                                              />
                                            </IconButton>
                                          </div>
                                        )}
                                      </div>
                                      <Input
                                        style={{ width: "10%" }}
                                        value={field.value}
                                        disabled={disabled}
                                        type="checkbox"
                                        onClick={() =>
                                          setFieldValue(
                                            `fields[${key}].value`,
                                            !field.value
                                          )
                                        }
                                        name="code"
                                      />
                                    </FormGroup>
                                  );
                                }
                              }
                            });
                          })}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end"
                          }}
                        >
                          <Button
                            style={{
                              margin: 20
                            }}
                            disabled={disabled}
                            color="success"
                            onClick={() => this.setState({ openModal: true })}
                          >
                            Agregar nuevas plantillas
                          </Button>
                        </div>
                      </EditableInput>
                    )}

                    {this.state.activeTab === 2 && (
                      <EditableInput>
                        <div
                          style={{
                            padding: 20
                          }}
                        >
                          <Table hover responsive borderless>
                            <thead className="thead-light">
                              <tr>
                                <th className="text-left">Nombre </th>
                                <th className="text-left">Type</th>
                                <th className="text-left">Requerido</th>
                                <th
                                  className="text-left"
                                  style={{ minWidth: "105px" }}
                                >
                                  Acciones
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {inactive.map(data => {
                                return (
                                  <tr key={data._id} className="text-left">
                                    <td>{data.label}</td>
                                    <td>{data.type}</td>
                                    <td>{data.required ? "si" : "no"}</td>
                                    <td style={{ minWidth: "205px" }}>
                                      <div className="float-left">
                                        <IconButton
                                          aria-label="Delete"
                                          title="Activar servicio"
                                          className="iconButtons"
                                          onClick={() => {
                                            this.activeField(data);
                                          }}
                                        >
                                          <DoneOutlineOutlined className="iconTable" />
                                        </IconButton>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </EditableInput>
                    )}
                    <FormGroup className="top form-group col-sm-12">
                      <Label for="categoria">Formato</Label>
                      <div className={this.state.divFormato}>
                        <Editor
                          apiKey="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=oq05o4hhb17qaasizya3qaal9dnl5pbc189e4mxw09npjjmj"
                          initialValue={values.format}
                          init={{
                            language_url:
                              "http://smartclinics.online/sc-front/es.js",
                            height: 500,
                            theme: "modern",
                            plugins:
                              "print preview fullpage paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help",
                            toolbar:
                              "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | demoItem | paciente",
                            image_advtab: true,
                            templates: plantilla.tinymce,
                            contextmenu: contextMenu,
                            setup: function(editor) {
                              values.fields.forEach(function(valor) {
                                editor.addMenuItem(valor, {
                                  text: valor,
                                  context: "tools",
                                  onClick: function() {
                                    editor.insertContent(valor.toString());
                                  }
                                });
                              });
                            }
                          }}
                          onChange={event => {
                            setFieldValue("format", event.level.content);
                          }}
                          disabled={disabled}
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.formatoError}
                      </div>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.props.close}>
                      Cancelar
                    </Button>
                    <Button
                      className={this.state.buttonave}
                      color="primary"
                      onClick={handleSubmit}
                      disabled={disabled}
                    >
                      Guadar
                    </Button>
                  </ModalFooter>
                </div>
              );
            }}
          />
        )}
      </Modal>
    );
  }
}

export default connect(
  null,
  { loadOriginalService, loadModifiedService, editServices }
)(ModalServicio);

const EditableInput = styled(Card)`
  border-top: none;
  .containerInputs {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  }

  .groupContainer {
    .buttonSEdit {
      display: none;
    }

    &:hover {
      .buttonSEdit {
        display: block;
      }
    }
  }
`;
