import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';  
import IconButton from '@mui/material/IconButton';



const Card = ({ user, badges, challenges }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  if (!user) return <p>Chargement...</p>;
  console.log("User:", user);
  console.log("Badges:", badges);
  console.log("Challenges:", challenges);

  // Calculer le niveau de l'utilisateur en fonction de ses points
  const level = getLevel(user.points || 0);

   
  return (
    <StyledWrapper>
      <div className="card">
      <div className="card__title">
          Bienvenue {user.nomPrenom}
          <IconButton onClick={handleOpen} aria-label="infos" size="small">
            <InfoIcon />
          </IconButton>
        </div>
        
        <div className="card__subtitle">
          Points: {user.points} | Niveau: {level.name} {level.icon}
        </div>
               {/* Modal contenant les infos */}
               <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" gutterBottom>🌟 Système de Niveaux & Récompenses</Typography>
            <Typography variant="body2" sx={{ maxHeight: 400, overflowY: 'auto' }}>
              🌱 Niveau 1 - Débutant : 0 points<br />
              🚀 Niveau 2 - Avancé : 100 points<br />
              🎓 Niveau 3 - Expert : 250 points<br />
              🔥 Niveau 4 - Master : 500 points<br />
              🏅 Niveau 5 - Légende : 1000 points<br /><br />
              🔐 +20 points à l’inscription → Badge "Nouveau Départ"<br />
              📅 +15 points pour emploi du temps → Badge "Organisé(e)"<br />
              ✅ To-do : +5 pts/tâche , +10 pts si complétée → Badge "Étudiant Organisé"<br />
              🎯 Défis : Super Organisé (3 tâches/jour pendant 7 jours), Planificateur (5 tâches avant dimanche)<br />
              📚 Chatbot académique : +5 pts/question → Badge "Étudiant Curieux" → Défi "Intello du Mois" (20 questions)<br />
              📝 Cours PDF : +10 pts import, +5 pts résumé → Badge "Pro de la Révision", Défi "Super Réviseur"<br />
              📂 Partage de docs : +30 pts/docs validé → Badge "Partageur Engagé", Défi "Échange de Savoirs"<br />
              💬 Chatbot Positif : +5 pts/interaction → Badge "Motivé Toujours", Défi "Positivité Active"<br />
            </Typography>
          </Box>
        </Modal>
        <div className="card__wrapper">
          <div className="badges-section">
            <h4>🎖️ Badges:</h4>
            {badges.length > 0 ? (
              <BadgeContainer>
                {badges.map((badge, index) => (
                  <BadgeItem key={index}>
                    <img
                      src={`/badges/${badge.icon}`}
                      alt={badge.name}
                  
                    />
                    <span>{badge.name}</span>
                  </BadgeItem>
                ))}
              </BadgeContainer>
            ) : (
              <p>Pas encore de badges 🏅</p>
            )}
          </div>
          <div className="challenges-section">
            <h4>🏆 Défis en cours:</h4>
            {challenges.length > 0 ? (
              challenges.map((challenge, index) => (
                <div key={index}>
                  <p>{challenge.name}</p>
                  <progress
                    value={(challenge.progress / challenge.target) * 100}
                    max="100"
                  ></progress>
                  <p>
                    {challenge.progress}/{challenge.target}
                  </p>
                </div>
              ))
            ) : (
              <p>Pas encore de défis 📈</p>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};
function getLevel(points) {
  if (points >= 1000) return { name: "Légende", icon: "🏅" };
  if (points >= 500) return { name: "Master", icon: "🔥" };
  if (points >= 250) return { name: "Expert", icon: "🎓" };
  if (points >= 100) return { name: "Avancé", icon: "🚀" };
  return { name: "Débutant", icon: "🌱" };
}
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Utilise un pourcentage pour une largeur responsive
  maxWidth: 500, // Largeur maximale pour les écrans plus grands
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '90vh', // Limite la hauteur pour éviter le débordement
  overflowY: 'auto', // Ajoute un défilement vertical si le contenu dépasse
};

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
`;

const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  span {
    margin-top: 5px;
    font-size: 14px;
    color: #333;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200vh; /* Hauteur totale de la vue */


  .card {
    --main-color: #000;
    --submain-color: #333;
    --bg-color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    width: 900px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background: var(--bg-color);
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
  }

  .card__img {
    width: 100%;
    height: 300px;
    background: linear-gradient(135deg, #007bff, #0056b3);
    border-radius: 20px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
  }



  // .card__avatar {
  //   position: absolute;
  //   width: 114px;
  //   height: 114px;
  //   background: linear-gradient(135deg, #007bff, #0056b3);
  //   color: #fff;
  //   font-size: 36px;
  //   font-weight: bold;
  //   border-radius: 50%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   top: 200px;
  //   left: calc(50% - 57px);
  // }

  .card__title {
    margin-top: 80px;
    font-weight: 500;
    font-size: 18px;
    color: var(--main-color);
  }

  .card__subtitle {
    margin-top: 10px;
    font-weight: 400;
    font-size: 15px;
    color: var(--submain-color);
  }

  .card__wrapper {
    margin-top: 15px;
    width: 100%;
  }

  h4 {
    margin: 10px 0;
  }

  progress {
    width: 100%;
    height: 10px;
    margin: 5px 0;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .card {
      width: 100%;
      padding: 15px;
      height: 100%;
    }
  }

  @media (max-width: 480px) {
    .card {
      width: 100%;
      padding: 10px;
      height: auto;
    }
  }
`;

export default Card;
