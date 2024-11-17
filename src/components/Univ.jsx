import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importer Link pour la navigation
import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';

const Univ = () => {
  const { name } = useParams(); // Récupérer le nom de l'université à partir de l'URL
  const [level, setLevel] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [classes, setClasses] = useState([]); // État pour stocker les classes ajoutées

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajouter la classe à l'état
    if (level && specialty) {
      setClasses([...classes, { level, specialty }]);
      setLevel('');
      setSpecialty('');
    }
  };

  // Chemin de l'image de l'université
  const imageUrl = `${process.env.PUBLIC_URL}/images/${name}.jpg`; // Assurez-vous que le dossier images existe dans le dossier public

  return (
    <Grid container spacing={2}>
      {/* Zone d'affichage de l'image de l'université */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4">{name}</Typography>
            <img src={imageUrl} alt={name} style={{ width: '100%', height: 'auto' }} />
          </CardContent>
        </Card>
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Classes Ajoutées:
        </Typography>
        {classes.length === 0 ? (
          <Typography variant="body2">Aucune classe ajoutée.</Typography>
        ) : (
          classes.map((cls, index) => (
            <Card key={index} style={{ marginTop: '8px', padding: '8px' }}>
              <Link to="/documents" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body1">
                  {cls.level} - {cls.specialty}
                </Typography>
              </Link>
            </Card>
          ))
        )}
      </Grid>

      {/* Formulaire à droite */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Ajouter une Classe</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Niveau"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                fullWidth
                required
              />
              
              <TextField
                label="Spécialité"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                Ajouter Classe
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Univ;