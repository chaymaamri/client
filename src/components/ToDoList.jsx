import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Container, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Importer l'icône de la poubelle
import './todo.css'; // Importer le fichier CSS

const TodoList = () => {
  // Déclaration des états
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  // 1. Charger les tâches depuis le localStorage dès le chargement du composant
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Récupère et parse les tâches
    }
  }, []);

  // 2. Sauvegarder les tâches dans localStorage à chaque changement
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Sauvegarde des tâches dans le localStorage
    }
  }, [tasks]);

  // 3. Fonction pour ajouter une tâche
  const handleAddTask = () => {
    if (task !== '') {
      const newTask = {
        text: task,
        completed: false,
        date: new Date().toLocaleString() // Ajoute la date et l'heure actuelles
      };
      setTasks([...tasks, newTask]);
      setTask('');
      setError('');
    } else {
      setError('Ajouter une tâche!');
    }
  };

  // 4. Fonction pour marquer une tâche comme complétée ou non
  const toggleCompleted = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // 5. Fonction pour supprimer une tâche
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(newTasks); // Met à jour l'état des tâches
  };

  return (
    <Container className="todo-container">
      <Typography variant="h4" className="todo-title">TODO LIST</Typography>
      
      <TextField
        label="Ajouter une tâche"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        sx={{ width: '100%', marginBottom: 2 }}
      />
      
      <Button variant="contained" className="todo-button" onClick={handleAddTask}>Ajouter</Button>
      
      {error && <Typography sx={{ color: 'red', marginTop: 2 }}>{error}</Typography>}

      <List className="todo-list">
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            className={`task ${task.completed ? 'completed' : ''}`}
            onClick={() => toggleCompleted(index)}
          >
            <ListItemText 
              primary={task.text} 
              secondary={`Ajouté le: ${task.date}`} // Affiche la date et l'heure d'ajout
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Empêche l'événement de cliquer sur l'élément de se propager
                handleDeleteTask(index); // Supprime la tâche
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoList;