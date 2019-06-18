import React from "react";
import { Card } from "reactstrap";
import styled from "styled-components";

export default class InfoPatient extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const array = ["1", "2", "3", "4"];
    return (
      <div>
        {array.map((data, key) => {
          return <Card key={key}>hello word</Card>;
        })}
      </div>
    );
  }
}
