import React from 'react';
import styled from 'styled-components';

const Card = ({ user, badges, challenges }) => {
  
  if (!user) return <p>Chargement...</p>;
  console.log("User:", user);
  console.log("Badges:", badges);
  console.log("Challenges:", challenges);

  // Calculer le niveau de l'utilisateur en fonction de ses points
  const level = getLevel(user.points || 0);

   
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__title">Bienvenue {user.nomPrenom}</div>
        <div className="card__subtitle">
          Points: {user.points} | Niveau: {level.name} {level.icon}
        </div>
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
