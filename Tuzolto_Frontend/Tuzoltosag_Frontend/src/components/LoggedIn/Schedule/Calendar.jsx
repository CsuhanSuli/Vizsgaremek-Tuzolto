import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useEffect } from 'react';
import { useState } from 'react';
import LoggedInLayout from '../LoggedInLayout';
import "./Calendar.css"
import huLocale from '@fullcalendar/core/locales/hu';
import timeGridPlugin from '@fullcalendar/timegrid'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';

export default function Calendar() {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/NewSchedule`)
  }
  
const [data, setData] = useState([])
 useEffect(() => {
  fetch("http://127.0.0.1:8000/api/schedule/index")
    .then(res => res.json())
    .then(res => {
      const event = res.map(element => ({
        id: element.id,
        title: element.schedule_types.name + " " + element.users.name,
        date: element.date,
      }));

      setData(event);
    });
}, [])

  return (
    <>
    <LoggedInLayout>
        <h1>Beosztás</h1>
        <aside>
            <FullCalendar
              headerToolbar={{
                left: 'dayGridMonth,timeGridWeek',
                center: 'title',
                right: 'prevYear,prev,next,nextYear'
              }}
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              events={data}
              locale={huLocale}
            />
        </aside>

        <Button onClick={handleClick} variant="danger">Új eszköz hozzáadása</Button>
    </LoggedInLayout>
    </>
  )
}