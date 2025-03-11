import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Container, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import './todo.css';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [suggestions, setSuggestions] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [newTaskValue, setNewTaskValue] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSuggestions(user.id);
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/todo_lists/${user.id}`);
      setTasks(response.data);
      localStorage.setItem("tasks", JSON.stringify(response.data));
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
    }
  };

  const fetchSuggestions = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/suggestions/${userId}`);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions :", error);
    }
  };

  const markTodoListAsModified = async () => {
    try {
      await axios.post(`http://localhost:5000/api/todo/modified`, { userId: user.id });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'état de la todo list :", error);
    }
  };

  const handleAddTask = async () => {
    if (task.trim() === '') {
      setError('Ajouter une tâche!');
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/todo/add", { userId: user.id, task });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      setTask('');
      setError('');
      markTodoListAsModified();
      
      await axios.post("http://localhost:5000/api/gamification/addPoints", { userId: user.id, points: 5 });
      await axios.post("http://localhost:5000/api/gamification/updateChallenge", { userId: user.id, challenge: "Super Organisé" });
      
      const updatedUser = await axios.get(`http://localhost:5000/api/user/${user.id}`);
      localStorage.setItem("user", JSON.stringify(updatedUser.data));
      setUser(updatedUser.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  };

  const toggleCompleted = async (index) => {
    const newTasks = [...tasks];
    const taskToUpdate = newTasks[index];
    const updatedCompleted = !taskToUpdate.completed;
    newTasks[index] = { ...taskToUpdate, completed: updatedCompleted };
    setTasks(newTasks);
    try {
      await axios.put(`http://localhost:5000/api/todo_lists/update/${taskToUpdate.id}`, { task: taskToUpdate.task, completed: updatedCompleted });
      markTodoListAsModified();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
      newTasks[index] = { ...taskToUpdate, completed: !updatedCompleted };
      setTasks(newTasks);
    }
  };

  const handleDeleteTask = async () => {
    const taskToDelete = tasks[currentTaskIndex];
    try {
      await axios.delete(`http://localhost:5000/api/todo_lists/delete/${taskToDelete.id}`);
      const newTasks = tasks.filter((_, i) => i !== currentTaskIndex);
      setTasks(newTasks);
      markTodoListAsModified();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  const handleEditTask = async () => {
    const updatedTasks = [...tasks];
    updatedTasks[currentTaskIndex].task = newTaskValue;
    setTasks(updatedTasks);
    try {
      await axios.put(`http://localhost:5000/api/todo_lists/update/${tasks[currentTaskIndex].id}`, { task: newTaskValue, completed: updatedTasks[currentTaskIndex].completed });
      markTodoListAsModified();
      setShowEditModal(false);
    } catch (error) {
      console.error("Erreur lors de la modification de la tâche :", error);
    }
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
      
      <Button variant="contained" className="todo-button" onClick={handleAddTask}>
        Ajouter
      </Button>
      
      {error && <Typography sx={{ color: 'red', marginTop: 2 }}>{error}</Typography>}

      <List className="todo-list">
        {tasks.map((taskItem, index) => (
          <ListItem
            key={taskItem.id}
            className={`task ${taskItem.completed ? 'completed' : ''}`}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ListItemText 
              primary={taskItem.task} 
              secondary={`Ajouté le: ${new Date(taskItem.due_date).toLocaleDateString()}`}
              sx={{ flexGrow: 1 }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCompleted(index);
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentTaskIndex(index);
                  setNewTaskValue(taskItem.task);
                  setShowEditModal(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentTaskIndex(index);
                  setShowDeleteModal(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
            <Button onClick={handleDeleteTask}>Oui</Button>
            <Button onClick={() => setShowDeleteModal(false)}>Non</Button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier la tâche</h2>
            <TextField
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              fullWidth
            />
            <Button onClick={handleEditTask}>Enregistrer</Button>
            <Button onClick={() => setShowEditModal(false)}>Annuler</Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default TodoList;