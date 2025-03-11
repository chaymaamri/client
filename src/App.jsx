import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Bar from './components/Bar';
import ChatWidget from './components/Chatpo';
import BodyText from './components/BodyText';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MonCompte from './components/MonCompte';
import ToDoList from './components/ToDoList';
import ListUniv from './components/ListUniv';
import Univ from './components/Univ';
import Documents from './components/Documents';
import ChatAcad from './components/ChatAcad';
import ScheduleUpload from './components/ScheduleUpload';
import Timetable from './components/Timetable';
import TextUp from './components/TextUp';
import Todo from './components/Todo';
import TestAuth from './components/Test';
import Dashboard from './components/Dashboard';
import NotificationPopup from './components/NotificationPopup';
import CourseUpload from './components/CourseUpload';

function App() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000); // Hide after 5 seconds
    }, 100000); // Show every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <Box sx={{ fontFamily: 'Arial', minHeight: '100vh', display: 'flex', flexDirection: 'column', marginTop: '65px' }}>
        <Bar />
        <Routes>
          <Route path="/" element={<BodyText />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<MonCompte />} />
          <Route path="/emplois" element={<ScheduleUpload />} />
          <Route path="/time" element={<Timetable />} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="/universite/:name" element={<Univ />} />
          <Route path="/share" element={<ListUniv />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/ChatAcad" element={<ChatAcad />} />
          <Route path="/test" element={<TestAuth />} />
          <Route path="/courses" element={<CourseUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {location.pathname === '/' && (
          <>
            <TextUp />
            <Todo />
          </>
        )}
        {user && <ChatWidget userName={user.nomPrenom} />}
        {showNotification && <NotificationPopup onClose={() => setShowNotification(false)} />}
      </Box>
    </AuthProvider>
  );
}

export default App;