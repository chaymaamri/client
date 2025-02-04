import { Paper, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

function Timetable({ schedule = [] }) {
  const events = schedule.map(course => {
    const [startHour, startMinute] = course.time.split('-')[0].split(':');
    const [endHour, endMinute] = course.time.split('-')[1]?.split(':') || [startHour, startMinute];
    return {
      title: `${course.name}\n${course.location}`,
      start: `2023-01-01T${startHour}:${startMinute}:00`, // Replace with actual date
      end: `2023-01-01T${endHour}:${endMinute}:00`, // Replace with actual date
      daysOfWeek: [course.day], // Adjust to match FullCalendar's day format
    };
  });

  console.log('Rendering Events:', events); // Log the events being rendered

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Academic Schedule
      </Typography>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }}
        events={events}
        height="auto"
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
      />
    </Paper>
  );
}

export default Timetable;