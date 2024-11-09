import React from 'react';
import { useAuth } from '../context/AuthContext'; // Assurez-vous que le chemin est correct

function MonCompte() {
  const { user, setIsAuthenticated } = useAuth(); // Supposons que `user` contient les infos de l'utilisateur

  const handleLogout = () => {
    // Logique de déconnexion
    setIsAuthenticated(false); // Met à jour l'état comme déconnecté
    // Vous pourriez également rediriger vers la page de connexion
  };

  return (
    <div>
      <h2>Mon Compte</h2>
      {user ? (
        <div>
          <p>Bienvenue, {user.name}!</p>
          <p>Email: {user.email}</p>
          {/* Autres informations que vous souhaitez afficher */}
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <p>Veuillez vous connecter pour voir vos informations de compte.</p>
      )}
    </div>
  );
}

export default MonCompte;
