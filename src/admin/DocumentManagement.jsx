import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewType, setPreviewType] = useState('');
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/files');
      setDocuments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des documents :', error);
    }
  };

  const handleApproveDoc = async (docId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/documents/approve/${docId}`);
      fetchDocuments();
    } catch (error) {
      console.error('Erreur lors de l\'approbation du document :', error);
    }
  };

  const handleDeleteDoc = async (docId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/documents/${docId}`);
      fetchDocuments();
    } catch (error) {
      console.error('Erreur lors de la suppression du document :', error);
    }
  };

  const handleViewDoc = async (doc) => {
    setLoadingPreview(true);
    try {
      // Assuming the API returns a direct URL or Blob
      const response = await axios.get(`http://localhost:5000/api/admin/files/${doc.id}`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: response.data.type });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      // Determine type
      if (doc.name.match(/\.(pdf)$/i)) {
        setPreviewType('pdf');
      } else if (doc.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        setPreviewType('image');
      } else {
        setPreviewType('other');
      }
      setPreviewOpen(true);
    } catch (error) {
      console.error('Erreur lors de la récupération du document pour aperçu :', error);
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
    setPreviewType('');
  };

  return (
    <>
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
                  <Button onClick={() => handleViewDoc(doc)}>
                    Voir
                  </Button>
                  {doc.status === 'pending' && (
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

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Aperçu du document
          <IconButton
            aria-label="close"
            onClick={handleClosePreview}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ textAlign: 'center' }}>
          {loadingPreview ? (
            <CircularProgress />
          ) : previewType === 'pdf' ? (
            <object
              data={previewUrl}
              type="application/pdf"
              width="100%"
              height="600px"
            >
              <p>Votre navigateur ne supporte pas l'affichage PDF. <a href={previewUrl} target="_blank" rel="noopener noreferrer">Télécharger le PDF</a>.</p>
            </object>
          ) : previewType === 'image' ? (
            <img
              src={previewUrl}
              alt="Aperçu du document"
              style={{ maxWidth: '100%', maxHeight: '600px' }}
            />
          ) : (
            <p>Aperçu non disponible pour ce type de fichier. <a href={previewUrl} target="_blank" rel="noopener noreferrer">Télécharger le fichier</a>.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentManagement;
