import React from "react";
import styled from "styled-components";
import Rating from "react-rating";
import Search from "../../../components/Select";
import {
  ListItem,
  ListItemText,
  ListSubheader,
  List,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import { Table } from "reactstrap";
import {
  Drafts,
  Place,
  LocalHospital,
  Phone
} from "@material-ui/icons";
export default class Body extends React.Component {
  render() {
    const {
      name,
      address,
      services,
      medical_center,
      contact
    } = this.props.dataSelected;

    const result = this.props.search
      ? services.filter(service => {
          return (
            service.name.toLowerCase().includes(this.props.search) ||
            service.type.toLowerCase().includes(this.props.search)
          );
        })
      : services;

    const data = [{ label: "Numero" }, { label: "Nombre" }, { label: "Tipo" }];
    return (
      <Container>
        <Details className="item-container1 border2">
          <div className="details-header">
            <div className="details-image">
              <img
                src="http://www.wirelesssystems.co.th/images/nophoto.jpg"
                alt="Smiley fachttps://image.shutterstock.com/image-vector/no-image-available-icon-template-260nw-1036735678.jpge"
                style={{
                  maxWidth: "100%",
                  display: "block",
                  width: "auto",
                  height: "auto"
                }}
              />
            </div>
            <div className="details-title">
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography variant="title" color="inherit">
                        {medical_center}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          style={{ display: "inline", color: "white" }}
                        >
                          3.4
                        </Typography>
                        <Typography
                          style={{ display: "inline", color: "white" }}
                          component="span"
                        >
                          <Rate
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            fractions={2}
                            initialRating={3}
                            readonly
                          />
                        </Typography>
                        <Typography
                          style={{ display: "inline", color: "white" }}
                        >
                          203 opiniones
                        </Typography>
                        <Typography style={{ color: "white" }} variant="body2">
                          {this.props.dataSelected.type}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </div>
          <div>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div">Sucursal</ListSubheader>
              }
            >
              <ListItem>
                <ListItemIcon>
                  <LocalHospital />
                </ListItemIcon>
                <ListItemText inset primary={name} />
              </ListItem>
            </List>
          </div>
          <div>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div">Detalles</ListSubheader>
              }
            >
              <ListItem button>
                <ListItemIcon>
                  <Place />
                </ListItemIcon>
                <ListItemText inset primary={address} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Drafts />
                </ListItemIcon>
                <ListItemText inset primary={contact[0].email} />
              </ListItem>
              <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText inset primary={contact[0].phone} />
              </ListItem>
            </List>
          </div>
        </Details>
        <Info>
          <div style={{ padding: "0px 20px 20px 20px" }}>
            <Search />
          </div>

          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                {data.map((data, key) => {
                  return <th key={key}>{data.label}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {services
                ? result.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Info>
      </Container>
    );
  }
}

const Container = styled.div`
  display: grid;
  min-height: 500px;
  grid-template-columns: 40% 60%;
  grid-column-gap: 10px;

  .border2 {
    border-right: 1px solid #c8ced3 !important;
  }
`;

const Details = styled.div`
  display: grid;
  grid-template-rows: 60% 20% 30%;
  overflow: auto;
  max-height: 500px;
  .details {
    &-header {
      flex-direction: column;
      display: flex;
      flex: 1;
    }

    &-image {
      flex: 4;
      overflow: hidden;
    }
    &-title {
      flex: 2;
      background: #4285f4;
      color: white;
    }

    &-subtitle {
      font-family: "Roboto, Arial, sans-serif";
    }

    &-titleCM {
    }
  }
`;

const Rate = styled(Rating)`
  font-size: 7px;
  color: "white";
  padding: 0 5px;
`;

const Info = styled.div`
  width: 95%;
  padding: 20px;
`;
