import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Avatar, Grid, LinearProgress } from "@mui/material";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [badges, setBadges] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const [error, setError] = useState("");

    
    
    useEffect(() => {
        const refreshPage = () => {
            window.location.reload();
        };

        const timeout = setTimeout(refreshPage, 30000);

        return () => {
            clearTimeout(timeout);
        };
    }, [user]);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            setError("Utilisateur non trouvé, veuillez vous reconnecter.");
            return;
        }

        axios.get(`http://localhost:5000/api/user/${storedUser.id}`)
            .then(res => setUser(res.data))
            .catch(error => {
                console.error("Erreur de récupération :", error);
                setError("Impossible de récupérer les informations.");
            });

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
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">👋 Bienvenue, {user.nomPrenom} !</Typography>
            <Typography variant="h6">💎 Points : {user.points}</Typography>
            <Typography variant="h6">🏆 Niveau : {user.niveau}</Typography>

            {/* 🎖️ Badges obtenus */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="h5">🎖️ Badges obtenus :</Typography>
                <Grid container spacing={2}>
                    {badges.length > 0 ? (
                        badges.map((badge, index) => (
                            <Grid item key={index}>
                                <Avatar src={`/badges/${badge.icon}`} sx={{ width: 56, height: 56 }} />
                                <Typography>{badge.name}</Typography>
                            </Grid>
                        ))
                    ) : (
                        <Typography>Pas encore de badges 🏅</Typography>
                    )}
                </Grid>
            </Box>

            {/* 📈 Défis en cours */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="h5">🏆 Défis en cours :</Typography>
                {challenges.map((challenge, index) => (
                    <Box key={index} sx={{ mt: 2 }}>
                        <Typography>{challenge.name}</Typography>
                        <LinearProgress variant="determinate" value={(challenge.progress / challenge.target) * 100} />
                        <Typography>{challenge.progress}/{challenge.target}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Dashboard;
