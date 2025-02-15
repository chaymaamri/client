// SignUp.jsx
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', { 
        nomPrenom, 
        email, 
        mdp, 
        etablissement, 
        hobbies 
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ username: nomPrenom })); // Stocker le nom d'utilisateur
      setOpen(true);
      setTimeout(() => {
        navigate('/'); // Rediriger vers la page d'accueil après 2 secondes
      }, 2000);
    } catch (error) {
      console.error('Signup error', error);
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
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Inscription réussie !
        </Alert>
      </Snackbar>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Nom et Prenom</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            placeholder="Enter your Nom et Prenom"
            value={nomPrenom}
            onChange={(e) => setNomPrenom(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <input
            type="email"
            className="input"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label>Mot de passe</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Enter your Mot de passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label>Votre Etablissement</label>
        </div>
        <div className="inputForm">
          <select
            className="input"
            value={etablissement}
            onChange={(e) => setEtablissement(e.target.value)}
          >
            <option value="">Select your Etablissement</option>
            <option value="ISG Gabes">ISG Gabes</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex-column">
          <label>Votre Hobbies</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            placeholder="Enter your Hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>

        <button className="button-submit" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;