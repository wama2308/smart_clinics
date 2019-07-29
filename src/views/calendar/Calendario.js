import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es";

const localizer = momentLocalizer(moment);

export default class Calendario extends React.Component {
  dataTimeFix = values => {
    console.log("casdasd", values);
    if (!Object.values(values)) {
      return [];
    }
    const array = [];
    Object.values(values).map(data => {
      array.push({
        ...data,
        end: data.end.toDate(),
        start: data.start.toDate()
      });
    });

    return array;
  };

  render() {
    console.log(this.props.event);

    return (
      <Calendar
        selectable
        localizer={localizer}
        events={this.dataTimeFix(this.props.event)}
        culture={moment.locale("es")}
        views={["month", "day", "agenda"]}
        messages={{
          next: "Siguiente",
          previous: "Atrás",
          today: "Ahora",
          month: "Mes",
          day: "Dia"
        }}
        onSelectEvent={event => this.props.addEvent(event)}
        onSelectSlot={this.props.addEvent}
      />
    );
  }
}
