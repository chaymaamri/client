import React, { useContext } from "react";
import { GamificationContext } from "../contexts/GamificationContext";
import { Box, Typography } from "@mui/material";

const Leaderboard = () => {
  const { leaderboard } = useContext(GamificationContext);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">🏅 Classement des Étudiants</Typography>
      {leaderboard.map((student, index) => (
        <Typography key={index}>
          {index + 1}. {student.nomPrenom} - {student.points} points
        </Typography>
      ))}
    </Box>
  );
};

export default Leaderboard;
