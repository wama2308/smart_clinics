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
  FormFeedback
} from "reactstrap";
import "../Services.css";
import "../loading.css";
import { Formik } from "formik";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import numeral from "numeral";
import { connect } from "react-redux";
import {
  loadOriginalService,
  loadModifiedService
} from "../../../actions/ServicesAction";
import Cleave from "cleave.js/react";
import jstz from 'jstz';

class ModalServicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "show",
      amount: 0
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
     const obj = {
       ...value,
       licenseId: this.props.licenseID,
       serviceId: this.props.serviceID,
       timeZ: jstz.determine().name()
     }
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

  render() {
    const { open, close, serviceModalData, plantilla, disabled } = this.props;
    const data = !serviceModalData
      ? undefined
      : serviceModalData.serviceOriginal;
    const Initialvalue = this.dataFilterView(data);

    const contextMenu = this.contextMenu(Initialvalue.fields);
    console.log(Initialvalue);
    return (
      <Modal isOpen={open} toggle={close} className="Modal">
        {this.state.loading === "show" && (
          <div align="center" className={"show"} style={{ padding: "5%" }}>
            <img src="assets/loader.gif" width="30%" />
          </div>
        )}
        {this.state.loading === "hide" && (
          <Formik
            onSubmit={this.handleSubmit}
            initialValues={Initialvalue}
            // validationSchema={MedicalValidacion}
            render={({
              values,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              handleBlur,
              resetForm
            }) => {
              console.log(errors);
              return (
                <div>
                  <ModalHeader toggle={this.props.close}>
                    Servicio Original
                  </ModalHeader>
                  <ModalBody className="Scroll">
                    <FormGroup className="top form-group col-sm-12">
                      <Label for="servicio">Servicio</Label>
                      <Input
                        name="servicio"
                        id="servicio"
                        value={values.servicio}
                        disabled={disabled}
                        type="text"
                        placeholder="Servicio"
                        onChange={event => {
                          setFieldValue("service", event.target.value);
                        }}
                      />
                      <FormFeedback tooltip>
                        {this.state.servicioError}
                      </FormFeedback>
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
                            setFieldValue("category", event.target.value);
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
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          {data.currencySymbol}
                        </InputGroupAddon>
                        <Cleave
                          style={{
                            width: "96%",
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
                                  onclick: function() {
                                    editor.insertContent(valor.toString());
                                  }
                                });
                              });
                            }
                          }}
                          onChange={this.handleEditorChange}
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
  { loadOriginalService, loadModifiedService }
)(ModalServicio);
