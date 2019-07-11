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
import { Formik } from "formik";

class addField extends React.Component {
  render() {
    const { open, close } = this.props;

    const type = ["input", "textArea", "select", "checkbox"];
    const size = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <Formik
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
                      type="text"
                      name="maxLength"
                      className="inputStyle"
                      value={values.maxLength}
                      onBlur={handleBlur}
                      onChange={event =>
                        setFieldValue("maxLength", event.target.value)
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
                        setFieldValue("dni", event.target.value)
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
                      value={values.size}
                      id="codigo"
                      className="inputStyle"
                      onChange={event =>
                        setFieldValue("grupo", event.target.value)
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

                  <hr />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
                <Button color="success" onClick={this.toggle}>
                  Do Something
                </Button>{" "}
              </ModalFooter>
            </Modal>
          );
        }}
      />
    );
  }
}

export default addField;
