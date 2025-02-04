import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Box, List, ListItem, ListItemText } from "@mui/material";

function ScheduleUpload() {
  const [file, setFile] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSchedule(response.data.schedule);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        📂 Télécharger un emploi du temps
      </Typography>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
        Upload
      </Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          📅 Emploi du temps extrait
        </Typography>
        <List>
          {schedule.map((entry, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${entry.day} | ${entry.time}`}
                secondary={`📖 ${entry.name} | 👨‍🏫 ${entry.instructor}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          🎓 Suggestions de révision
        </Typography>
        <List>
          {suggestions.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`📖 ${item.subject}`}
                secondary={item.suggestions}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default ScheduleUpload;