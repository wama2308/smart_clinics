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
import { SavePlantillas, editPlantilla } from "../../../actions/ServicesAction";
import jstz from "jstz";
import * as yup from "yup";

let InitialValues = {
  plantilla: "",
  formato: ""
};
const validationSchema = yup.object().shape({
  plantilla: yup.string().required("Este Campo es Requerido"),
  formato: yup.string().required("Este Campo es Requerido")
});
class ModalPlatinlla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "hide"
    };
  }

  componentDidMount = () => {};

  componentWillReceiveProps = props => {};

  handleSubmit = value => {
    this.setState({ loading: "show" });
    value.timeZ = jstz.determine().name();
    if (!this.props.edit.template) {
      this.props.SavePlantillas(value, () => {
        this.setState({ loading: "hide" });
        this.props.close();
      });
    } else {
      this.props.editPlantilla(
        {
          ...value,
          posicion: this.props.edit.key
        },
        () => {
          this.setState({ loading: "hide" });
          this.props.close();
        }
      );
    }
  };

  dataFilterView = data => {};

  render() {
    const { open, close, disabled, edit } = this.props;
    const value = edit.template
      ? (InitialValues = {
          plantilla: edit.template,
          formato: edit.content
        })
      : InitialValues;
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
            initialValues={value}
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
              console.log(touched, errors);
              return (
                <div>
                  <ModalHeader toggle={this.props.close}>
                    Servicio Original
                  </ModalHeader>
                  <ModalBody className="Scroll">
                    <FormGroup className="top form-group col-sm-12">
                      <Label for="servicio">Plantilla</Label>
                      <Input
                        name="plantilla"
                        id="plantilla"
                        value={values.plantilla}
                        disabled={disabled}
                        type="text"
                        onBlur={handleBlur}
                        placeholder="Plantilla"
                        onChange={event => {
                          setFieldValue("plantilla", event.target.value);
                        }}
                      />
                      {touched.plantilla && errors.plantilla && (
                        <FormFeedback style={{ display: "block" }} tooltip>
                          {errors.plantilla}
                        </FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup className="top form-group col-sm-12">
                      <Label for="categoria">Plantilla</Label>
                      <div className={this.state.divFormato}>
                        <Editor
                          apiKey="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=oq05o4hhb17qaasizya3qaal9dnl5pbc189e4mxw09npjjmj"
                          initialValue={values.formato}
                          init={{
                            height: 350,
                            theme: "modern",
                            plugins:
                              "print preview fullpage paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help",
                            toolbar:
                              "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | demoItem | paciente",
                            image_advtab: true
                          }}
                          onChange={event => {
                            setFieldValue("formato", event.level.content);
                          }}
                          name="formato"
                          onBlur={handleBlur}
                          disabled={disabled}
                        />
                      </div>
                      {touched.formato && errors.formato && (
                        <FormFeedback style={{ display: "block" }} tooltip>
                          {errors.formato}
                        </FormFeedback>
                      )}
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
  { SavePlantillas, editPlantilla }
)(ModalPlatinlla);
