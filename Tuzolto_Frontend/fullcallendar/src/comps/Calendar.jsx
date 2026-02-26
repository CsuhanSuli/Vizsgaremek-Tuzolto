import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useEffect } from 'react';
import { useState } from 'react';



export default function Calendar() {
const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/schedule/index")
      .then(res => res.json())
      .then(res => {
        let event = [];
        res.forEach(element => {
          event.push(
          {
            id: element.id,
            title: element.schedule_types.name + " " + element.users.name,
            date: element.date,

          }
        )
          setData(event)
          console.log(data)
        });
      });
  }, [data])
    if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      events={data}
    />
  )
}