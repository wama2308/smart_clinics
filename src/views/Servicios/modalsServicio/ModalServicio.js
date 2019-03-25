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

  render() {
    const { open, close } = this.props;
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
            // initialValues={InititalValues}
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
                        disabled={this.state.varDisabled}
                        name="servicio"
                        id="servicio"
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
                          value={this.state.selectedCategoriaOption}
                          onChange={this.handleChangeSelectCategory}
                          options={this.props.categoria}
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
                          {this.state.currencySymbol}
                        </InputGroupAddon>
                        <Input
                          name="monto"
                          id="monto"
                          onKeyUp={this.handlekeyMonto}
                          onChange={this.handleChange}
                          value={this.state.monto}
                        />
                      </InputGroup>
                      <FormFeedback tooltip>
                        {this.state.montoError}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup className="top form-group col-sm-12">
                      <Label for="categoria">Formato</Label>
                      <div className={this.state.divFormato}>
                        {/* <Editor
                  apiKey="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=oq05o4hhb17qaasizya3qaal9dnl5pbc189e4mxw09npjjmj"
                  initialValue={this.state.contentFormat}
                  init={{
                    language_url: "http://smartclinics.online/sc-front/es.js",
                    height: 500,
                    theme: "modern",
                    plugins:
                      "print preview fullpage paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help",
                    toolbar:
                      "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | demoItem | paciente",
                    image_advtab: true,
                    templates: arrayTemplates,
                    contextmenu: contexMenu,
                    setup: function(editor) {
                      var miArray = arrayContextMenu;
                      miArray.forEach(function(valor, indice, array) {
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
                /> */}
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
