import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es";

const localizer = momentLocalizer(moment);

console.log(localizer, "asdasd", moment);

export default class Calendario extends React.Component {
  state = {
    events: []
  };

  render() {
    return (
      <Calendar
        selectable
        localizer={localizer}
        events={this.props.event}
        culture={moment.locale("es")}
        views={["month", "day", "agenda"]}
        messages={{
          next: "Siguiente",
          previous: "Atrás",
          today: "Ahora",
          month: "Mes",
          day: "Dia"
        }}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={this.props.addEvent}
      />
    );
  }
}
