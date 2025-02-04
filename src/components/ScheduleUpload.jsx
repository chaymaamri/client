import React, { useState } from 'react';
import { Paper, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Timetable from './Timetable';

function ScheduleUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [schedule, setSchedule] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/upload', formData);
      const scheduleResponse = await axios.get('/api/schedule');
      console.log('Received Schedule:', scheduleResponse.data); // Log the received schedule
      setSchedule(scheduleResponse.data);
    } catch (err) {
      setError('Failed to upload schedule. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Upload Schedule
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          accept="application/pdf"
          style={{ display: 'none' }}
          id="upload-pdf"
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="upload-pdf">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            disabled={loading}
          >
            Upload PDF Schedule
          </Button>
        </label>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
      {schedule.length > 0 && <Timetable schedule={schedule} />}
    </Paper>
  );
}

export default ScheduleUpload;