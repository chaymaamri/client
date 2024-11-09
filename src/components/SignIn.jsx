import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Logique de connexion
    setIsAuthenticated(true); // Met à jour l'état comme connecté
    navigate('/profile'); // Redirige vers le profil
  };

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={handleSignIn}>Se connecter</button>
    </div>
  );
}

export default SignIn;
