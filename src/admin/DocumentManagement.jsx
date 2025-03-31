import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/files');
      setDocuments(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des documents :", error);
    }
  };

  const handleApproveDoc = async (docId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/documents/approve/${docId}`);
      fetchDocuments();
    } catch (error) {
      console.error("Erreur lors de l'approbation du document :", error);
    }
  };

  const handleDeleteDoc = async (docId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/documents/${docId}`);
      fetchDocuments();
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.id}</TableCell>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.status}</TableCell>
              <TableCell>
                {doc.status === "pending" && (
                  <Button onClick={() => handleApproveDoc(doc.id)} color="primary">
                    Approuver
                  </Button>
                )}
                <Button onClick={() => handleDeleteDoc(doc.id)} color="error">
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

export default DocumentManagement;