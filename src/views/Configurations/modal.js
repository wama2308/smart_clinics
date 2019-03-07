import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
function FormModal (props){
    return(
       
  <div>
          <h1>React Bootstrap Modal Example</h1>
        
        <Modal >
        <form >
          <ModalHeader>IPL 2018</ModalHeader>
          <ModalBody>
          <div className="row">
            <div className="form-group col-md-4">
            <label>Name:</label>
            <input type="text"  className="form-control" />
              </div>
              </div>
            <div className="row">
             <div className="form-group col-md-4">
            <label>Team:</label>
                <input type="text"   className="form-control" />
               </div>
              </div>
            <div className="row">
             <div className="form-group col-md-4">
              <label>Country:</label>
                <input type="text"   className="form-control" />
               </div>
              </div>
          </ModalBody>
          <ModalFooter>
            <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
            
      <Button bsStyle="primary" onClick={props.handleClick}>Save changes</Button>
      
          </ModalFooter>
          </form>
        </Modal>
        </div>

   
        
    )
}

export default FormModal;