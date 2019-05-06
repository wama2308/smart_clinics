import React from "react";
import { Input, ListGroup, ListGroupItem } from "reactstrap";
import styled from "styled-components";
import { search, outsideClick } from "../actions/aplicantionActions";
import { openSnackbars } from "../actions/aplicantionActions";
import { connect } from "react-redux";

class DefaultSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      over: 2,
      clicked: false,
      type: "V"
    };
  }

  onOver = () => {
    this.setState({ over: 2 });
  };

  mouseOut = () => {
    this.setState({ over: 1 });
  };

  keyPress = e => {
    if (e.key === "Enter" && this.props.pressKey) {
      this.props.value.length === 0
        ? this.props.openSnackbars("error", "Ingrese el dni del cliente")
        : this.props.searchAction(this.props.value, this.state.type);
    }
  };

  render() {
    const action = this.props.onChange? this.props.onChange: this.props.search
    return (
      <div style={{ minWidth: "40%", display: "flex" }}>
        {this.props.typeOfNationality &&
          <Input
            type="select"
            name="pais"
            value={this.state.type}
            style={{
              maxWidth: 40,
              height: 40,
              padding: 0,
              border: "1px solid #e4e7ea",
              borderRight: "none"
            }}
            onChange={event => this.setState({ type: event.target.value })}
          >
            {this.props.type.dataCountries.type_identity.map(type => {
              return (
                <option key={type.value} value={type.value}>
                  {type.value}
                </option>
              );
            })}
          </Input>
        }
        <Search
          placeholder={
            this.props.placeholder ? this.props.placeholder : "search..."
          }
          theme={!this.props.outside ? "yes" : "no"}
          onMouseOver={this.onOver}
          onClick={this.handleClick}
          value={this.props.value}
          onChange={event => action(event.target.value)}
          onKeyDown={this.keyPress}
          onMouseOut={this.mouseOut}
        />
        {!this.props.outside && this.props.options && (
          <BodySearch>
            {this.props.options.map(option => {
              return (
                <List key={option.id}>
                  <ListGroupItem
                    className="list-contend"
                    onClick={() => {
                      this.props.search(option.name);
                      this.props.outsideClick();
                    }}
                  >
                    {option.name.toLowerCase()}
                  </ListGroupItem>
                </List>
              );
            })}
          </BodySearch>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  outside: state.global.outside,
  value: state.global.search,
  type: state.global.dataGeneral,
  options: state.ventas.get('products')
});

export default connect(
  mapStateToProps,
  { search, outsideClick, openSnackbars }
)(DefaultSearch);

const Search = styled(Input)`
  height: 40px;
  &:hover {
    box-shadow: 0px 1.5px 7px 0px rgba(134, 117, 117, 0.75);
  }
`;

const BodySearch = styled.div`
  position: absolute;
  min-height: 215px;
  width: 37.5%;
  border-radius: 0px 0px 20px 20px;
  z-index: 2;
  background: white;
  /* border-top: 1px solid black; */
  top: 57px;
  box-shadow: 0px 1.5px 7px 0px rgba(134, 117, 117, 0.75);
`;

const List = styled(ListGroup)`
  cursor: pointer;
  .list-contend {
    &:hover {
      background: #d7e0e4;
    }
  }
`;
