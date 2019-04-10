import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import styled from "styled-components";
import {
  ListItem,
  ListItemText,
  ListSubheader,
  List,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import {
  Send,
  Drafts,
  Inbox,
  Place,
  AccessTime,
  Phone,
  CalendarToday
} from "@material-ui/icons";


export default class Visitor extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>Visitador</CardHeader>
        <Container >
          <div className='info-container'>
          <List
              component="nav"
              subheader={
                <ListSubheader component="div">Detalles del visitador</ListSubheader>
              }
            >
              <ListItem button>
                <ListItemIcon>
                  <Place />
                </ListItemIcon>
                <ListItemText inset primary='Kevin Velasco'/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Drafts />
                </ListItemIcon>
                <ListItemText inset primary='kevinvelasco190@gmail.com' />
              </ListItem>
              <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText inset primary="Inbox" />
              </ListItem>
              <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText inset primary={'+58412485672'} />
              </ListItem>
            </List>

            <List
              component="nav"
              subheader={
                <ListSubheader component="div">Fecha de Visita</ListSubheader>
              }
            >
              <ListItem button>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText inset primary='5:40 AM'/>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CalendarToday />
                </ListItemIcon>
                <ListItemText inset primary='18-08-2019' />
              </ListItem>
            </List>

          </div>
          <div className='result-container'> world</div>
        </Container>
      </Card>
    );
  }
}

const Container = styled(CardBody)`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 40% 60%;
  min-height: 350px;
  padding:0px;

  .info{
    &-container{
      border-right: 1px solid #c8ced3;
    }
  }
`;
