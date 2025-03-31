import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

const ProfileUpdate = () => {
  // Récupérer l'utilisateur connecté depuis le localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user.id : null;

  const [nomPrenom, setNomPrenom] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setNomPrenom(data.nomPrenom);
        // Mise à jour du localStorage si besoin
        if (!storedUser) {
          localStorage.setItem('user', JSON.stringify(data));
        }
      })
      .catch((err) => console.error(err));
  }, [userId, storedUser]);

  if (!userId) {
    return <div>Veuillez vous connecter pour accéder à votre profil.</div>;
  }

  const updateName = () => {
    fetch('http://localhost:5000/api/user/name', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, nomPrenom })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Réponse update name : ', data);
        const updatedUser = { ...user, nomPrenom };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch((err) => console.error('Erreur lors de la mise à jour du nom :', err));
  };

  const updatePassword = () => {
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    fetch('http://localhost:5000/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, password })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Réponse update password : ', data);
        setPassword('');
        setConfirmPassword('');
      })
      .catch((err) => console.error(err));
  };

  const deleteAccount = () => {
    setOpenDialog(false);
    fetch(`http://localhost:5000/api/user/${userId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Compte supprimé : ', data);
        localStorage.removeItem('user');
        // Rediriger vers la page de login ou afficher un message
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Mon Profil
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
          <Typography variant="h6">Modifier vos coordonnées</Typography>
          <TextField
            fullWidth
            label="Nom et Prénom"
            margin="normal"
            value={nomPrenom}
            onChange={(e) => setNomPrenom(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={updateName} sx={{ mt: 2 }}>
            Mettre à jour
          </Button>
        </Box>

        <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
          <Typography variant="h6">Modifier votre mot de passe</Typography>
          <TextField
            fullWidth
            label="Nouveau mot de passe"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Confirmer le mot de passe"
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={updatePassword} sx={{ mt: 2 }}>
            Modifier le mot de passe
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" color="error" onClick={() => setOpenDialog(true)}>
            Supprimer le compte
          </Button>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={deleteAccount} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileUpdate;
