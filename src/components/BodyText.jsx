import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function BodyText(){
    return(
        <>
        <h1  className="text" >Bienvenue sur AIeasy, votre partenaire idéal pour réussir vos études avec sérénité et efficacité !</h1>
        
        
        <Box
      sx={{
        display: 'flex',           // Utilisation de flexbox
        justifyContent: 'center',  // Centrage horizontal
        alignItems: 'center',      // Centrage vertical
        height: '5vh',
                 
      }}
    >
      <Button variant="contained" type="button"
      sx={{ 
        backgroundColor: ' rgb(115, 177, 240);', // Couleur personnalisée
        color: '#fff',              // Couleur du texte
        width: '350px',             // Augmenter la largeur du bouton
        fontSize: '16px',           // Taille de la police
        fontWeight: 'bold',         // Épaisseur de la police
        padding: '10px 20px'        // Ajouter un padding pour un bouton plus grand
      }}>
        Essayer gratuitement
      </Button>
      </Box>
        </>
    )
}
export default BodyText