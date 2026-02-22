import { IlamyCalendar } from '@ilamy/calendar';
const events = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date('2024-01-15T10:00:00'),
    end: new Date('2026-01-15T11:00:00'),
    description: 'Weekly team sync',
    backgroundColor: '#3b82f6',
    color: 'black'
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: new Date('2024-01-20T23:59:59'),
    end: new Date('2026-01-20T23:59:59'),
    allDay: true,
    backgroundColor: '#ef4444',
    color: 'black'
  }
];

export default function MyCalendar() {
  return (
    <div className="p-6">
      <IlamyCalendar events={events}/>
    </div>
  );
}