import React from "react";
import { Input, ListGroup, ListGroupItem } from "reactstrap";
import styled from "styled-components";

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      over: "no",
      clicked: "no",
    };
  }

  onOver = () => {
    this.setState({ over: "yes" });
  };

  mouseOut = () => {
    this.setState({ over: "no" });
  };

  handleClick = () => {
    console.log('hello')
    this.setState({ clicked: "yes" });
  };

  handleBlur = () => {
    console.log("asdasd");
    this.setState({ clicked: "no" });
  };

  render() {
    return (
      <Container  onFocus={this.handleBlur} onClick={this.handleClick}>
        <Select
          placeholder="search..."
          theme={this.state.over}
          value={this.state.selected}
          clicked={this.state.clicked}
          value={this.props.value}
          onChange={event => this.props.searchAtion(event.target.value)}
          onMouseOver={this.onOver}
          onMouseOut={this.mouseOut}
        />
        {this.state.clicked === "yes" && (
          <BodySearch>
            {this.props.options.map(option => {
              return (
                <ListGroup key={option.id}>
                  <ListGroupItem
                    onClick={() => this.props.searchAtion(option.name)}
                  >
                    {option.name}
                  </ListGroupItem>
                </ListGroup>
              );
            })}
          </BodySearch>
        )}
      </Container>
    );
  }
}

export default SearchComponent;

const Select = styled(Input)`
  border-radius: ${props =>
    props.clicked === "yes" ? "20px 20px 0px 0px" : "20px 20px"};
  height: 40px;
  &:hover {
    box-shadow: 0px 1.5px 7px 0px rgba(134, 117, 117, 0.75);
  }
`;

const Container = styled.div`
  min-width: 40%;
  position: absolute;
  z-index: 1;
  top: 2%;
  right: 1%;
`;

const BodySearch = styled.div`
  height: 230px;
  width: 100%;
  z-index: 2;
  background: white;
  /* border-top: 1px solid black; */
  top: 57px;
  box-shadow: 0px 1.5px 7px 0px rgba(134, 117, 117, 0.75);
`;

// props =>
//
