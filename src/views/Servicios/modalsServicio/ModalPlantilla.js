import React from "react";
import {
  Button,
  Input,
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
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import {
  loadOriginalService,
  loadModifiedService,
  editServices
} from "../../../actions/ServicesAction";
import jstz from "jstz";
import * as yup from "yup";

class ModalPlatinlla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "hide"
    };
  }

  componentDidMount = () => {};

  componentWillReceiveProps = props => {};

  handleSubmit = value => {};

  dataFilterView = data => {};

  render() {
    const {open ,close, disabled} = this.props
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
            // initialValues={Initialvalue}
            // validationSchema={validationSchema}
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
                      <Label for="servicio">Plantilla</Label>
                      <Input
                        name="servicio"
                        id="servicio"
                        // value={values.service}
                        disabled={disabled}
                        type="text"
                        // onBlur={handleBlur}
                        placeholder="Plantilla"
                        // onChange={event => {
                        //   setFieldValue("service", event.target.value);
                        // }}
                      />
                      {touched.servicio && errors.service && (
                        <FormFeedback style={{ display: "block" }} tooltip>
                          {errors.service}
                        </FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup className="top form-group col-sm-12">
                      <Label for="categoria">Plantilla</Label>
                      <div className={this.state.divFormato}>
                        <Editor
                          apiKey="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=oq05o4hhb17qaasizya3qaal9dnl5pbc189e4mxw09npjjmj"
                          initialValue={this.state.contentFormatPlantilla}
                          init={{
                            height: 500,
                            theme: "modern",
                            plugins:
                              "print preview fullpage paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help",
                            toolbar:
                              "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | demoItem | paciente",
                            image_advtab: true
                          }}
                          onChange={this.handleEditorPlantillaChange}
                          disabled={this.state.varDisabled}
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.formatoError}
                      </div>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={close}>
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
)(ModalPlatinlla);
