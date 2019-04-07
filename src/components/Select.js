import React from "react";
import { Input } from "reactstrap";
import styled from "styled-components";
import {connect } from 'react-redux'
class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      over: 2,
      clicked: false
    };
  }

  onOver = () => {
    console.log('over')
    this.setState({ over: 2 });
  };

  mouseOut = () => {
    console.log('out')
    this.setState({ over: 1 });
  };

  handleClick = () => {
    this.setState({ clicked: true });
  };

  handleBlur = () => {
    this.setState({ clicked: false });
  };

  render() {
    return (
      <div style={{ minWidth: "40%" }}>
        <Select
          placeholder="search..."
          theme={this.state.over}
          onMouseOver={this.onOver}
          onClick={this.handleClick}
          onMouseOut={this.mouseOut}
        />
        {!this.props.outside && <BodySearch  onClick={this.handleClick}  />}
      </div>
    );
  }
}

const mapStateToProps= state=>({
  outside: state.global.outside
})

export default connect(mapStateToProps, null)(SelectComponent)

const Select = styled(Input)`
  border-radius: ${props => (props.theme === 2 ? "20px 20px 0px 0px" : "20px 20px")};
  height: 40px;
  &:hover {
    box-shadow: 0px 1.5px 7px 0px rgba(134, 117, 117, 0.75);
  }
`;

const BodySearch = styled.div`
  position: absolute;
  height: 230px;
  width: 38.5%;
  z-index: 2;
  background: white;
  /* border-top: 1px solid black; */
  top: 57px;
  box-shadow: 0px 1.5px 7px 0px rgba(134, 117, 117, 0.75);
`;
