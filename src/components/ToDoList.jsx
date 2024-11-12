import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Container, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Importer l'icône de la poubelle

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
      setTasks([...tasks, { text: task, completed: false }]);
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
    <Container
      sx={{
        width: 300,
        minHeight: 300,
        padding: 3,
        background: 'transparent',
        border: '2px solid #e6b7eca1',
        borderRadius: 2,
        backdropFilter: 'blur(15px)',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ color: 'white', padding: 2 }}>ToDo List</Typography>
      
      <TextField
        label="Ajouter une tâche"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        sx={{ width: '100%', marginBottom: 2 }}
      />
      
      <Button variant="outlined" onClick={handleAddTask}>Ajouter</Button>
      
      {error && <Typography sx={{ color: 'red', marginTop: 2 }}>{error}</Typography>}

      <List sx={{ width: '100%', paddingTop: 2 }}>
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            sx={{
              background: 'transparent',
              cursor: 'pointer',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'gray' : 'black',
              display: 'flex',
              justifyContent: 'space-between', // Ajout de l'espace pour l'icône
            }}
            onClick={() => toggleCompleted(index)}
          >
            <ListItemText primary={task.text} />
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
