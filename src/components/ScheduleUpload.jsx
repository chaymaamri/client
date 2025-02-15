import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Box,
  Grid,
  Snackbar,
  Alert,
  Grow,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import Loaders from "./Loaders"; // Import the Loaders component
import "./ScheduleUpload.css"; // Assuming you save the CSS in this file

function ScheduleUpload() {
  const [file, setFile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("pdf", file);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Réponse du serveur :", response.data); // Debug
      setSuggestions(response.data.suggestions);
      setSnackbarMessage("Upload réussi !");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      setSnackbarMessage("Erreur lors de l'upload !");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const currentDay = new Date().toLocaleString('fr-FR', { weekday: 'long' });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        
      </Typography>
      <Box {...getRootProps()} sx={{ textAlign: 'center', cursor: 'pointer' }}>
        <div className="container">
          <div className="folder">
            <div className="front-side">
              <div className="tip"></div>
              <div className="cover"></div>
            </div>
            <div className="back-side cover"></div>
          </div>
          <label className="custom-file-upload">
            <input {...getInputProps()} />
            {file ? file.name : "📂 Importer votre emploi du temps"}
          </label>
        </div>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
        className="btn1"
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
            },
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '16px',
          }}
        >
          Upload
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          🎓 Suggestions de révision pour {currentDay}
        </Typography>
        {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', mt: 2 }}>
          <Loaders />
        </Box>
      )}

        <Grid container spacing={2}>
          {suggestions.map((item, index) => (
            <Grow in={true} key={index} timeout={1000}>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ borderRadius: '12px', boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      📖 {item.subject}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {item.suggestions.split('\n').map((suggestion, idx) => (
                        <Typography key={idx} variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>{idx + 1}.</strong> {suggestion}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      size="small"
                      color="primary"
                      sx={{ textTransform: 'none' }}
                      onClick={() => window.open(item.link)} // Ouvrir le lien dans un nouvel onglet
                    >
                      Voir plus
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes("Erreur") ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ScheduleUpload;