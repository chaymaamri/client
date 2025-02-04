// SignIn.jsx
import React, { useState } from 'react';
import axios from 'axios';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signin', { username, password });
      localStorage.setItem('token', response.data.token);
      // Rediriger l'utilisateur vers la page d'accueil ou une autre page sécurisée
    } catch (error) {
      console.error('Erreur de connexion', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default SignIn;