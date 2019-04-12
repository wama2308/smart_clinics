import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
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
  Check,
  PermIdentity,
  Close,
  Phone,
  CalendarToday
} from "@material-ui/icons";

export default class Visitor extends React.Component {
  state = {
    status: false,
    visita: false
  };
  render() {
    return (
      <Card>
        <CardHeader>Visitador</CardHeader>
        <Container>
          <div className="info-container">
            <List
              component="nav"
              subheader={
                <ListSubheader component="div">
                  Detalles del visitador
                </ListSubheader>
              }
            >
              <ListItem button>
                <ListItemIcon>
                  <PermIdentity />
                </ListItemIcon>
                <ListItemText inset primary="Kevin Velasco" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Drafts />
                </ListItemIcon>
                <ListItemText inset primary="kevinvelasco190@gmail.com" />
              </ListItem>
              <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText inset primary={"+58412485672"} />
              </ListItem>
            </List>

            <List
              component="nav"
              subheader={<ListSubheader component="div">Visita</ListSubheader>}
            >
              {this.state.visita && (
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText inset primary="18-08-2019" />
                  </ListItem>
                  {this.state.status && (
                    <ListItem button>
                      <ListItemIcon>
                        <Check />
                      </ListItemIcon>
                      <ListItemText inset primary="Aprobado" />
                    </ListItem>
                  )}

                  {!this.state.status && (
                    <ListItem button>
                      <ListItemIcon>
                        <Close />
                      </ListItemIcon>
                      <ListItemText
                        inset
                        primary="No Cumple con los requesitos"
                      />
                    </ListItem>
                  )}
                </div>
              )}
              <Typography
                style={{
                  textAlign: "center",
                  padding: 20,
                  fontSize: "1rem"
                }}
              >
                Visitador no a efectuado esta visita
              </Typography>
            </List>
          </div>
          <div className="result-container">
            <Editor
              apiKey="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=oq05o4hhb17qaasizya3qaal9dnl5pbc189e4mxw09npjjmj"
              // initialValue={values.formato}
              init={{
                height:215,
                theme: "modern",
                plugins:
                  "print preview fullpage paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help",
                toolbar:
                  "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | demoItem | paciente",
                image_advtab: true
              }}
              // onChange={event => {
              //   setFieldValue("formato", event.level.content);
              // }}
              // name="formato"
              // onBlur={handleBlur}
              // disabled={disabled}
            />
          </div>
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
  padding: 0px;

  .info {
    &-container {
      border-right: 1px solid #c8ced3;
    }
  }

  .result{
    &-container{
      width:98%
    }
  }
`;
