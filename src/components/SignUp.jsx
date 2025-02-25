import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './signin.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignUp() {
  const [nomPrenom, setNomPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Réinitialiser les erreurs
    try {
      const response = await axios.post('/api/auth/signup', { 
        nomPrenom, 
        email, 
        mdp, 
        etablissement, 
        hobbies 
      });

      setOpen(true);
      setTimeout(() => {
        navigate('/signin'); // Rediriger vers la page de connexion après 3s
      }, 3000);
    } catch (error) {
      console.error('Erreur d\'inscription', error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé. Essayez un autre.");
      } else {
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="signin-container">
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Inscription réussie ! Vérifiez votre e-mail pour activer votre compte.
        </Alert>
      </Snackbar>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Nom et Prénom</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            placeholder="Entrez votre Nom et Prénom"
            value={nomPrenom}
            onChange={(e) => setNomPrenom(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <input
            type="email"
            className="input"
            placeholder="Entrez votre Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Mot de passe</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Entrez votre mot de passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Votre Établissement</label>
        </div>
        <div className="inputForm">
          <select
            className="input"
            value={etablissement}
            onChange={(e) => setEtablissement(e.target.value)}
            required
          >
            <option value="">Sélectionnez votre établissement</option>
            <option value="ISG Gabes">ISG Gabès</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="flex-column">
          <label>Vos Hobbies</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            placeholder="Entrez vos hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>

        <button className="button-submit" type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default SignUp;
