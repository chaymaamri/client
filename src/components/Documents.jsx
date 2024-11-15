import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CardMedia, Alert } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

function Documents() {
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [alert, setAlert] = useState(null); // State for controlling the alert

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setSelectedFile(uploadedFile);
    }
  };

  const handleSubmit = () => {
    if (fileName && description && selectedFile) {
      const newFile = {
        name: fileName,
        description: description,
        fileType: selectedFile.type,
        fileUrl: URL.createObjectURL(selectedFile), // Create URL for download
        coverImage: selectedFile.type.startsWith("image/")
          ? URL.createObjectURL(selectedFile)
          : null,
      };
      setFileList([...fileList, newFile]);
      setFileName("");
      setDescription("");
      setSelectedFile(null);
      setAlert(null); // Clear alert on successful submission
    } else {
      setAlert("Veuillez remplir tous les champs et sélectionner un fichier."); // Set alert message
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Alert message */}
        {alert && (
          <Grid item xs={12}>
            <Alert severity="warning" onClose={() => setAlert(null)}>
              {alert}
            </Alert>
          </Grid>
        )}

        {/* Zone d'affichage des fichiers */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {fileList.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    {file.coverImage ? (
                      <CardMedia
                        component="img"
                        height="140"
                        image={file.coverImage}
                        alt={file.name}
                      />
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 140 }}>
                        <PictureAsPdfIcon fontSize="large" color="error" />
                      </div>
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {file.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {file.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {/* Download Button with an <a> tag */}
                    <a href={file.fileUrl} download={file.name} style={{ textDecoration: 'none' }}>
                      <Button size="small" color="primary">
                        Télécharger
                      </Button>
                    </a>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Formulaire d'importation */}
        <Grid item xs={12} md={4}>
          <Item>
            <h3>Partagez un fichier important, ça peut aider les autres !</h3>
            <TextField
              id="file-name"
              label="Nom de fichier"
              variant="standard"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              fullWidth
            />
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            <label htmlFor="upload-file" style={{ cursor: "pointer" }}>
              <DriveFolderUploadIcon fontSize="large" color="primary" />
            </label>
            <input
              id="upload-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
              Envoyer
            </Button>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
export default Documents;
