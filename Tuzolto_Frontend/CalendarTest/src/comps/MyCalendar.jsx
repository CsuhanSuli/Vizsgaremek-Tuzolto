import { IlamyCalendar } from '@ilamy/calendar';
import { useEffect } from 'react';
import { useState } from 'react';

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