import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([
    { name: "Utilisateurs", value: 0 },
    { name: "Docs partagés", value: 0 },
    { name: "Contenus supprimés", value: 0 },
  ]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/statistics");
      const stats = response.data;
      setData([
        { name: "Utilisateurs", value: stats.userCount },
        { name: "Docs partagés", value: stats.docCount },
        { name: "Contenus supprimés", value: stats.deletedCount },
      ]);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques :", error);
    }
  };

  return (
    <Grid container spacing={3}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="h4">{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Statistiques</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976D2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;