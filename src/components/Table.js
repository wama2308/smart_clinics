import React, { Component } from "react";
import { Table } from "reactstrap";
import { FaSearch, FaUserEdit, FaMinusCircle } from "react-icons/fa";


class TableComponent extends React.Component {
  render() {
    return (
      <Table hover responsive borderless>
        <thead className="thead-light">
          <tr>
            {this.props.labels.map((data, key) => {
              return <th>{data.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((item, i) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.country}</td>
                <td>{item.province}</td>
                <td>
                  <div className="float-left">
                    <a
                      title="edit"
                      className="icon"
                      onClick={() => {
                        this.view(item);
                      }}
                    >
                      <FaSearch />
                    </a>
                    <a
                      title="edit"
                      className="icon"
                      onClick={() => {
                        this.modaledit(item);
                      }}
                    >
                      <FaUserEdit />
                    </a>
                    <a
                      className="text-danger icon"
                      onClick={() => {
                        this.modalConfirm(item);
                      }}
                    >
                      <FaMinusCircle />{" "}
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default TableComponent;
