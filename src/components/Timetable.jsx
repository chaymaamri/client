// import { useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

function Timetable({ schedule }) {
  const events = schedule.map(course => ({
    title: `${course.name}\n${course.location}`,
    startTime: course.time.split('-')[0],
    endTime: course.time.split('-')[1],
    daysOfWeek: [course.day],
  }));

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