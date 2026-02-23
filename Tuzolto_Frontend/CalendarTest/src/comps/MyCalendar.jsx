import { IlamyCalendar } from '@ilamy/calendar';
import { useEffect } from 'react';
import { useState } from 'react';

const events = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date('2026-01-15T10:00:00'),
    end: new Date('2026-01-15T11:00:00'),
    description: 'Weekly team sync',
    backgroundColor: '#3b82f6',
    color: 'black'
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: new Date('2026-01-20T23:59:59'),
    end: new Date('2026-01-20T23:59:59'),
    allDay: true,
    backgroundColor: '#ef4444',
    color: '#ef4444'
  }
];
export default function MyCalendar() {
  
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
            color: element.schedule_types.color,
            start: element.date,
            end: element.date,
            allDay: true,
            backgroundColor: 'white',
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
    <div className="p-6">
       <IlamyCalendar events={data} />
    </div>
  );
}