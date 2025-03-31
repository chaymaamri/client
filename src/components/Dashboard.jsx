import Card from './Card';
import Leaderboard from './Leaderboard'; // Importation du composant Leaderboard
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      setError("Utilisateur non trouvé, veuillez vous reconnecter.");
      return;
    }

    axios.get(`http://localhost:5000/api/user/${storedUser.id}`)
      .then(res => setUser(res.data))
      .catch(() => setError("Impossible de récupérer les informations."));

    axios.get(`http://localhost:5000/api/user/${storedUser.id}/badges`)
      .then(response => setBadges(response.data))
      .catch(error => console.error("Erreur récupération badges:", error));

    axios.get(`http://localhost:5000/api/user/${storedUser.id}/challenges`)
      .then(response => setChallenges(response.data))
      .catch(error => console.error("Erreur récupération défis:", error));
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Chargement...</p>;

  return (
    <>
      <Card user={user} badges={badges} challenges={challenges} />
      <Leaderboard /> {/* Affichage du Leaderboard */}
    </>
  );
};

export default Dashboard;
