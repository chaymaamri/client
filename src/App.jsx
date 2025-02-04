import Bar from "./components/Bar";
import ChatWidget from "./components/Chatpo";
import BodyText from "./components/BodyText";
import Box from "@mui/material/Box";
import { AuthProvider } from './context/AuthContext';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MonCompte from './components/MonCompte';
import ToDoList from "./components/ToDoList";
import ListUniv from "./components/ListUniv";
import Univ from "./components/Univ";
import Documents from "./components/Documents";
import ChatAcad from "./components/ChatAcad";
import ScheduleUpload from "./components/ScheduleUpload";
import Timetable from "./components/Timetable";
import TextUp from "./components/TextUp";
import Todo from "./components/Todo";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <Box sx={{ fontFamily: "Arial", minHeight: '100vh', display: 'flex', flexDirection: 'column', marginTop: '65px' }}>
        <Bar />
        
        <Routes>
          <Route path="/" element={<BodyText />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<MonCompte />} />
          <Route path="/emplois" element={<ScheduleUpload/>} />
          <Route path="/time" element={<Timetable/>} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="/universite/:name" element={<Univ/>} />
          <Route path="/share" element={<ListUniv />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/ChatAcad" element={<ChatAcad/>}/>
        </Routes>
        
        
        {location.pathname === '/' && (
          <>
            <TextUp/>
            <Todo/>
            
          </>
        )}
        <ChatWidget/>
      </Box>
    </AuthProvider>
  );
}

export default App;