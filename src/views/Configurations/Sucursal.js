import React from "react";
import {
  Button,
  TabPane,
} from "reactstrap";
import "./loading.css";
import Table from "../../components/Table";

class Sucursales extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {

    const data = [
      { label: 'Sucursal',
        value: ' name'
      },
      {
        label: 'Codigo',
        value:'code'
      },
      {
        label:'Pais',
        country:'country'
      },
      {
        label:'Provincia',
        value:'province'
      },
      {
        label:'Acciones',
      }
    ]
    return (
      <div>
        <TabPane tabId="2">
          <div className="container">
            <div className="">
              <p className="text-muted">
                Ajuste la informacion de las sucursales de su Centro Medico
              </p>
            </div>
            <div className="App">
              <Button color="success" onClick={this.toggle}>
                Agregar Sucursal
              </Button>
              {
                // <ModalContainer
                //   ref={cd => (this.ModalContainer = cd)}
                //   edit={this.state.editbranchoffices}
                //   contactedit={this.state.contactedit}
                //   submitContact={this.submitContact.bind(this)}
                //   contacto={this.state.contacto}
                //   Toggle={this.toggleCancel.bind(this)}
                //   modal={this.state.modal}
                //   posicion={this.state.posicion}
                //   update={this.state.update}
                //   update0={this.state.update0}
                //   delete={this.deleteContact.bind(this)}
                //   refresh={this.refresh.bind(this)}
                //   loadbranch={this.loadBranchOffices.bind(this)}
                //   sucursalesview={this.state.sucursalesview}
                //   tipoview={this.state.tipoview}
                //   sectorview={this.state.sectorview}
                //   paisview={this.state.paisview}
                //   provinciaview={this.state.provinciaview}
                //   addressview={this.state.addressview}
                //   contactview={this.state.contactview}
                //   deleteview={this.state.deleteview}
                //   acciones={this.state.acciones}
                //   button={this.state.button}
                //   buttoncancel={this.state.buttoncancel}
                //   buttonsave={this.state.buttonsave}
                //   collapse={this.state.collapse}
                //   collapseFile={this.state.collapseFile}
                //   collapseMap={this.state.collapseMap}
                //   collapseSocial={this.state.collapseSocial}
                //   divhide={this.state.divhide}
                //   sucursaladd={this.state.sucursaladd}
                //   divfilehide={this.state.divfilehide}
                //   success={this.props.success}
                // />
              }
            </div>
            <br />
            <Table labels={data} data={this.props.sucursales} />
          </div>
        </TabPane>
      </div>
    );
  }
}

export default Sucursales;
