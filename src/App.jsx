import Bar from "./components/Bar";
import BodyText from "./components/BodyText";
import Box from "@mui/material/Box";
import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom'; 
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MonCompte from './components/MonCompte';
import Chatbot from "./components/Chatbot";
import ToDoList from "./components/ToDoList";
// import Documents from "./components/Documents";
import ListUniv from "./components/ListUniv";
import Univ from "./components/Univ";
import Documents from "./components/Documents";
import Timetable from "./components/Timetable"



function App() {
  return (
    <AuthProvider>
      <Box sx={{ fontFamily: "Arial", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Bar />
        
        <Routes>
          <Route path="/" element={<BodyText />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<MonCompte />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="/universite/:name" element={<Univ/>} /> {/* Ajout de la route pour Univ */}
          <Route path="/share" element={<ListUniv />} />
          <Route path="/documents" element={<Documents />} /> {/* Ajout de la route pour Documents */}
          <Route path="/time" element={<Timetable/>}/>
       

          {/* <Route path="/emplois" element={<Emplois />} /> */}
          {/* Tu peux ajouter d'autres routes ici si nécessaire */}
        </Routes>
      </Box>
    </AuthProvider>
  );
}

export default App
