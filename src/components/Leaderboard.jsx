import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leaderboards/top-users")
      .then((response) => {
        console.log("Données reçues :", response.data);
        // Ajuste ici le filtrage selon la structure de tes données
        const filteredUsers = response.data.filter(user => user.role === "user");
        setTopUsers(filteredUsers);
      })
      .catch(() => setError("Erreur lors du chargement du classement."));
  }, []);
  

  if (error) return <p>{error}</p>;

  return (
    <LeaderboardWrapper>
      <h2>Leaderboard</h2>
      <Table>
        <thead>
          <tr>
            <th>Rang</th>
            <th>Nom et Prénom</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((user, index) => (
            <TableRow key={user.id} topRank={index < 3}>
              <td>
                {index + 1}{" "}
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : ""}
              </td>
              <td>{user.nomPrenom}</td>
              <td>{user.points}</td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </LeaderboardWrapper>
  );
};

const LeaderboardWrapper = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const TableRow = styled.tr`
  background: ${(props) => (props.topRank ? "#fffbea" : "inherit")};
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => (props.topRank ? "#fff2c2" : "#f9f9f9")};
  }
`;

export default Leaderboard;
