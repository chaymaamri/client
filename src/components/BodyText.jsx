import React from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"; // Import Framer Motion
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "@fontsource/poppins"; // Import Google Font
import './BodyText.css'; // Importer le fichier CSS

const features = [
  { title: "Emploi du temps", img: "/images/calendar.jpg", desc: "Visualise ton planning avec suggestions de révisions", link: "/timetable" },
  { title: "To‑do List", img: "/images/todo.jpg", desc: "Organise tes tâches et objectifs du jour", link: "/tasks" },
  { title: "Partage Docs", img: "/images/share.jpg", desc: "Échange PDF, cours, photos avec la communauté", link: "/share" },
  { title: "Chat Académique", img: "/images/chat.jpg", desc: "Pose tes questions et reçois du soutien instantané", link: "/chat" },
  { title: "PDF", img: "/images/pdf.jpg", desc: "Crée des résumés de cours avec les points clés", link: "/pdf-generator" },
];

function BodyText() {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <main style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Texte et bouton */}
      <div className="image-text-container">
        <h3 className="text">
          Bienvenue sur AITUDIANT<br /> votre clé pour réussir vos études
        </h3>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "7vh",
        }}
      >
        <Link to="/signin" className="span">
          <button className="button">
            Essayer Maintenant
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </Link>
      </Box>

      {/* Carousel */}
      <Container sx={{ my: 4 }}>
        <Slider {...carouselSettings}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={f.img}
                  alt={f.title}
                  sx={{ filter: "brightness(0.8)" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body1" sx={{ maxWidth: 600, mt: 1 }}>
                    {f.desc}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Slider>
      </Container>

      {/* Grid des fonctionnalités */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    "&:hover": { boxShadow: "0 6px 30px rgba(0,0,0,0.2)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={f.img}
                    alt={f.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
                      {f.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {f.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={Link}
                      to={f.link}
                      sx={{
                        color: "#1e88e5",
                        fontWeight: "bold",
                        "&:hover": { color: "#1565c0" },
                      }}
                    >
                      Accéder →
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default BodyText;