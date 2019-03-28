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
import numeral from 'numeral'

class ModalServicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "show"
    };
  }

  componentDidMount = () => {
    const obj = {
      licenseId: this.props.licenseID,
      serviceId: this.props.serviceID
    };

    this.props.getdataModal(obj);
  };

  componentWillReceiveProps = props => {
    props.serviceModalData
      ? this.setState({
          loading: props.serviceModalData.loading
        })
      : null;
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
      servicio: data.serviceName,
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
    const { open, close, serviceModalData, plantilla } = this.props;
    const data = !serviceModalData
      ? undefined
      : serviceModalData.serviceOriginal;
    const Initialvalue = this.dataFilterView(data);

    const contextMenu = this.contextMenu(Initialvalue.fields);

    numeral(Initialvalue.amount).format('0,0.00')
    return (
      <Modal isOpen={open} toggle={close} className="Modal">
        {this.state.loading === "show" && (
          <div align="center" className={"show"} style={{ padding: "5%" }}>
            <img src="assets/loader.gif" width="30%" />
          </div>
        )}
        {this.state.loading === "hide" && (
          <Formik
            // onSubmit={this.handleSubmit}
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
                        disabled={true}
                        type="text"
                        placeholder="Servicio"
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
                          isDisabled={true}
                          onChange={this.handleChangeSelectCategory}
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
                        <Input

                          name="monto"
                          id="monto"
                          type='number'
                          disabled={true}
                          onKeyUp={this.handlekeyMonto}
                          onChange={this.handleChange}
                          value={numeral(values.amount).format('0,0.00')}
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
                              values.fields.forEach(function(
                                valor,
                              ) {
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
                          disabled={this.state.varDisabled}
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.formatoError}
                      </div>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className={this.state.buttonSave}
                      color="primary"
                      onClick={this.handleSaveServicio}
                    >
                      Guadar
                    </Button>
                    <Button
                      className={this.state.buttonCancel}
                      color="danger"
                      onClick={this.props.close}
                    >
                      Cancelar
                    </Button>
                    {/*<Button className={this.state.buttonCancel} color="danger" onClick={this.prueba}>Cancelar</Button>*/}
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

export default ModalServicio;
