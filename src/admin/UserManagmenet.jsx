import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/approve/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'approbation de l'utilisateur :", error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/reject/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors du rejet de l'utilisateur :", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Etablissement</TableCell>
            <TableCell>Hobbies</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Niveau</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.nomPrenom}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.etablissement}</TableCell>
              <TableCell>{user.hobbies}</TableCell>
              <TableCell>{user.is_active ? "Yes" : "No"}</TableCell>
              <TableCell>{user.points}</TableCell>
              <TableCell>{user.niveau}</TableCell>
              <TableCell>
                {user.status === "pending" && (
                  <>
                    <Button onClick={() => handleApprove(user.id)} color="primary">
                      Approuver
                    </Button>
                    <Button onClick={() => handleReject(user.id)} color="secondary">
                      Rejeter
                    </Button>
                  </>
                )}
                <Button onClick={() => handleDelete(user.id)} color="error">
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserManagement;