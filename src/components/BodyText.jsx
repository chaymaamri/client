import React from "react";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
// import Button from "@mui/material/Button";
import './BodyText.css'; // Importer le fichier CSS
import etud1 from './etud1.png'; // Importer l'image etud1
import etud2 from './etud2.png'; // Importer l'image etud2

function BodyText() {
  return (
    <main>
      <div className="image-text-container">
        <img src={etud1} alt="Étudiant 1" />
        <h3 className="text">
          Bienvenue sur AITUDIANT<br></br> votre clé pour réussir vos études 
        </h3>
        <img src={etud2} alt="Étudiant 2" />
      </div>
      <Box
        sx={{
          display: "flex", // Utilisation de flexbox
          justifyContent: "center", // Centrage horizontal
          alignItems: "center", // Centrage vertical
          height: "7vh",
        }}
      >
        {/* <Button
          variant="contained"
          type="button"
          sx={{
            backgroundColor: "rgb(115, 177, 240)", // Couleur personnalisée
            color: "#fff", // Couleur du texte
            width: "350px", // Augmenter la largeur du bouton
            fontSize: "16px", // Taille de la police
            fontWeight: "bold", // Épaisseur de la police
            padding: "10px 20px", // Ajouter un padding pour un bouton plus grand
          }}
        >
          
        </Button> */}
 <Link to="/signin" className="span">      
<button class="button">
Essayer Maintenant 
  <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
    <path
      fill-rule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
      clip-rule="evenodd"
    ></path>
  </svg>
</button>
</Link>
      </Box>
    </main>
  );
}

export default BodyText;