import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Container, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Importer l'icône de la poubelle
import axios from 'axios';
import './todo.css'; // Importer le fichier CSS

const TodoList = () => {
  // Déclaration des états
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  

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
  const handleAddTask = async () => {
    if (task === '') {
      setError('Ajouter une tâche!');
      return;
    }

    const newTask = { text: task, completed: false, date: new Date().toLocaleString() };
    setTasks([...tasks, newTask]);
    setTask('');
    setError('');

    if (user) {
      try {
        await axios.post("http://localhost:5000/api/todo/add", { userId: user.id, task });
        await axios.post("http://localhost:5000/api/gamification/addPoints", { userId: user.id, points: 5 });
        await axios.post("http://localhost:5000/api/gamification/updateChallenge", { userId: user.id, challenge: "Super Organisé" });

        const updatedUser = await axios.get(`http://localhost:5000/api/user/${user.id}`);
        localStorage.setItem("user", JSON.stringify(updatedUser.data));
        setUser(updatedUser.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche :", error);
      }
    }
  };
  const toggleCompleted = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
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