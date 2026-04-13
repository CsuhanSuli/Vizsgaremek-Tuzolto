import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect } from 'react';
import { useState } from 'react';
import LoggedInLayout from '../LoggedInLayout';
import "./Calendar.css"
import huLocale from '@fullcalendar/core/locales/hu';
import timeGridPlugin from '@fullcalendar/timegrid'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import api, { isAdmin } from '../../Login/api';

export default function Calendar() {

  const navigate = useNavigate();
  const userIsAdmin = isAdmin();
  
  const handleClick = () => {
    navigate(`/NewSchedule`)
  }
  
  const [data, setData] = useState([])

  useEffect(() => {
    api.get("schedule/index")
      .then(res => {
        const events = res.data.map(element => ({
          id: element.id,
          title: (element.schedule_types?.name || "") + " " + (element.users?.name || ""),
          date: element.date,
        }));
        setData(events);
      })
      .catch(err => {
        console.error("Hiba a naptár adatok lekérésekor:", err);
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
              eventClick={(info) => {
                if (userIsAdmin) {
                  navigate(`/UpdateSchedule/${info.event.id}`, {
                    state: {
                      id: info.event.id,
                      title: info.event.title,
                      date: info.event.startStr
                    }
                  });
                }
              }}
            />
        </aside>

        {userIsAdmin && (
          <Button onClick={handleClick} variant="danger">Új beosztás hozzáadása</Button>
        )}
    </LoggedInLayout>
    </>
  )
}