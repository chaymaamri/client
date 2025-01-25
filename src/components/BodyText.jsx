import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
        <Button
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
          Essayer Maintenant 
        </Button>
      </Box>
    </main>
  );
}

export default BodyText;