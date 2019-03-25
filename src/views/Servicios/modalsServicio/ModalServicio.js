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

class ModalServicio extends React.Component {
  render() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className="Modal">
        <div className={this.state.divLoading} style={{ padding: "2%" }}>
          <img src="assets/loader.gif" width="30%" />
        </div>
        <div className={this.state.divContainer}>
          <ModalHeader toggle={this.cerrarModal}>Servicio Original</ModalHeader>
          <ModalBody className="Scroll">
            <FormGroup className="top form-group col-sm-12">
              <Label for="servicio">Servicio</Label>
              <Input
                disabled={this.state.varDisabled}
                name="servicio"
                id="servicio"
                onKeyUp={this.handlekeyServicio}
                onChange={this.handleChange}
                value={this.state.servicio}
                type="text"
                placeholder="Servicio"
              />
              <FormFeedback tooltip>{this.state.servicioError}</FormFeedback>
            </FormGroup>
            <FormGroup className="top form-group col-sm-12">
              <Label for="categoria">Categoria</Label>
              <div className={this.state.divSelectCategoria}>
                <Select
                  isSearchable="true"
                  name="categoria"
                  value={this.state.selectedCategoriaOption}
                  onChange={this.handleChangeSelectCategory}
                  options={this.state.categoria}
                />
              </div>
              <div className="errorSelect">{this.state.categoriaError}</div>
            </FormGroup>
            <FormGroup
              className={"top form-group col-sm-12 " + this.state.labelMonto}
            >
              <Label for="monto">Monto</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  {this.state.currencySymbol}
                </InputGroupAddon>
                <Input
                  disabled={this.state.varDisabled}
                  invalid={this.state.montoInvalid}
                  name="monto"
                  id="monto"
                  onKeyUp={this.handlekeyMonto}
                  onChange={this.handleChange}
                  value={this.state.monto}
                  type="text"
                  placeholder="Monto"
                  onKeyPress={this.enterDecimal}
                  onPaste="false"
                  onBlur={this.eventoBlur}
                  onFocus={this.eventoFocus}
                />
              </InputGroup>
              <FormFeedback tooltip>{this.state.montoError}</FormFeedback>
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
              <div className="errorSelect">{this.state.formatoError}</div>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              className={this.state.buttonSave}
              color="primary"
              onClick={this.handleSaveServicio}
            >
              {this.state.modalFooterButton}
            </Button>
            <Button
              className={this.state.buttonCancel}
              color="danger"
              onClick={this.cerrarModal}
            >
              Cancelar
            </Button>
            {/*<Button className={this.state.buttonCancel} color="danger" onClick={this.prueba}>Cancelar</Button>*/}
          </ModalFooter>
        </div>
      </Modal>
    );
  }
}

export default ModalServicio;
