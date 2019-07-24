import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import 'moment/locale/es'

const localizer = momentLocalizer(moment)

console.log(localizer, "asdasd", moment);

export default class Calendario extends React.Component {
  state = {
    culture: "es",
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ]
  };

  render() {
    return (
      <Calendar
        localizer={localizer}
        events={this.state.events}
        culture={moment.locale("es")}
        views={{
          month: true,
          day: true
        }}
      />
    );
  }
}
