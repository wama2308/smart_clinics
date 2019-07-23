import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es";

const localizer = momentLocalizer(moment);

console.log(localizer, "asdasd", moment);

export default class Calendario extends React.Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(0, "days")),
        title: "Some title"
      }
    ]
  };

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title
          }
        ]
      });
  };

  render() {
    return (
      <Calendar
        selectable
        localizer={localizer}
        events={this.state.events}
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
