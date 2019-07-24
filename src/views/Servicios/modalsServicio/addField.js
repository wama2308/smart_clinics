import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
  FormFeedback
} from "reactstrap";
import { addField, editField } from "../../../actions/ServicesAction";
import { connect } from "react-redux";
import { Formik } from "formik";
import TagsInput from "react-tagsinput";

class AddField extends React.Component {
  handleSubmit = values => {
    if (this.props.update) {
      this.props.editField(
        {
          licenseId: this.props.licenseID,
          serviceId: this.props.serviceID,
          field: values
        },
        () => {
          this.props.close();
        }
      );
    } else {
      this.props.addField(
        {
          licenseId: this.props.licenseID,
          serviceId: this.props.serviceID,
          field: values
        },
        () => {

          this.props.close();
        }
      );
    }
  };

  orderField = (obj, set) => {
    const options = [];
    obj.map(option => {
      options.push({ label: option, value: option });
    });

    set("options", options);
  };

  getOptions = obj => {
    const options = [];
    obj.map(option => {
      options.push(option.label);
    });
    return options;
  };

  render() {
    const { open, close, update } = this.props;
    console.log("update", update);
    const type = ["input", "textArea", "select", "checkbox"];
    const size = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const values = {
      label: "",
      placeholder: "",
      max_length: "",
      tooltip: "",
      type: type[0],
      size: size[5],
      group: size[0],
      position: size[0],
      required: false,
      options: []
    };

    const initialVal = update ? update : values;

    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={initialVal}
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
            <Modal isOpen={open} toggle={close} className="Modal">
              <ModalHeader toggle={close}>Agregar Campos</ModalHeader>
              <ModalBody>
                <div className="row">
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="Sucursal" className="mr-sm-2">
                      label
                    </Label>
                    <Input
                      type="text"
                      name="label"
                      className="inputStyle"
                      value={values.label}
                      onBlur={handleBlur}
                      onChange={event =>
                        setFieldValue("label", event.target.value)
                      }
                    />

                    {errors.label && touched.label && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.label}
                      </FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="Sucursal" className="mr-sm-2">
                      placeholder
                    </Label>
                    <Input
                      type="text"
                      name="placeholder"
                      className="inputStyle"
                      value={values.placeholder}
                      onBlur={handleBlur}
                      onChange={event =>
                        setFieldValue("placeholder", event.target.value)
                      }
                    />

                    {errors.placeholder && touched.placeholder && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.placeholder}
                      </FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="Sucursal" className="mr-sm-2">
                      maxLength
                    </Label>
                    <Input
                      type="number"
                      name="maxLength"
                      className="inputStyle"
                      value={values.max_length}
                      onBlur={handleBlur}
                      onChange={event =>
                        setFieldValue("max_length", event.target.value)
                      }
                    />

                    {errors.maxLength && touched.maxLength && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.maxLength}
                      </FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="Sucursal" className="mr-sm-2">
                      tooltip
                    </Label>
                    <Input
                      type="text"
                      name="tooltip"
                      className="inputStyle"
                      value={values.tooltip}
                      onBlur={handleBlur}
                      onChange={event =>
                        setFieldValue("tooltip", event.target.value)
                      }
                    />

                    {errors.tooltip && touched.tooltip && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.tooltip}
                      </FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="Sucursal" className="mr-sm-2">
                      type
                    </Label>
                    <Input
                      type="select"
                      name="type"
                      className="inputStyle"
                      value={values.type}
                      onBlur={handleBlur}
                      onChange={event =>
                        setFieldValue("type", event.target.value)
                      }
                    >
                      {type.map((type, key) => {
                        return (
                          <option key={key} value={type}>
                            {type}
                          </option>
                        );
                      })}
                    </Input>
                    {errors.type && touched.type && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.type}
                      </FormFeedback>
                    )}
                  </FormGroup>
                  {values.type === "select" && (
                    <FormGroup className="top form-group col-sm-6">
                      <Label for="emails">options</Label>
                      <div>
                        <TagsInput
                          name="email"
                          className="react-tagsinputMy"
                          inputProps={{
                            placeholder: "opciones",
                            className: "react-tagsinput-inputMy",
                            type: "text"
                          }}
                          focusedClassName="react-tagsinput-focusedMy"
                          tagProps={{
                            className: "react-tagsinput-tagMy",
                            classNameRemove: "react-tagsinput-removeMy"
                          }}
                          value={this.getOptions(values.options)}
                          onChange={event =>
                            this.orderField(event, setFieldValue)
                          }
                        />
                      </div>
                    </FormGroup>
                  )}

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="codigo" className="mr-sm-2">
                      Tamaño del campo
                    </Label>

                    <Input
                      type="select"
                      name="size"
                      value={values.size}
                      id="codigo"
                      className="inputStyle"
                      onChange={event =>
                        setFieldValue("size", event.target.value)
                      }
                    >
                      {size.map((size, key) => {
                        return (
                          <option key={key} value={size}>
                            {size}
                          </option>
                        );
                      })}
                    </Input>

                    {errors.size && touched.size && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.size}
                      </FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="codigo" className="mr-sm-2">
                      Grupo
                    </Label>

                    <Input
                      type="select"
                      name="grupo"
                      value={values.group}
                      id="codigo"
                      className="inputStyle"
                      onChange={event =>
                        setFieldValue("group", event.target.value)
                      }
                    >
                      {this.props.group.map((group, key) => {
                        return (
                          <option key={key} value={group}>
                            {group}
                          </option>
                        );
                      })}
                    </Input>

                    {errors.grupo && touched.grupo && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.grupo}
                      </FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="codigo" className="mr-sm-2">
                      posicíon
                    </Label>

                    <Input
                      type="select"
                      name="grupo"
                      value={values.position}
                      id="codigo"
                      className="inputStyle"
                      onChange={event =>
                        setFieldValue("position", event.target.value)
                      }
                    >
                      {size.map((group, key) => {
                        return (
                          <option key={key} value={group}>
                            {group}
                          </option>
                        );
                      })}
                    </Input>

                    {errors.grupo && touched.grupo && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.grupo}
                      </FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup
                    className={`top form-group col-sm-12 groupContainer`}
                  >
                    <Label for="servicio">Requerido?</Label>
                    <Input
                      style={{ width: "15%" }}
                      checked={values.required}
                      type="checkbox"
                      onChange={() =>
                        setFieldValue(`required`, !values.required)
                      }
                      name="code"
                    />
                  </FormGroup>

                  <hr />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.props.close}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                  Guardar
                </Button>{" "}
              </ModalFooter>
            </Modal>
          );
        }}
      />
    );
  }
}

export default connect(
  null,
  { addField, editField }
)(AddField);
