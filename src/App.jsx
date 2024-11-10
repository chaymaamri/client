import Bar from "./components/Bar";
import BodyText from "./components/BodyText";
import Box from "@mui/material/Box";
import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom'; 
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MonCompte from './components/MonCompte';
import Chatbot from "./components/Chatbot";



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

          {/* <Route path="/emplois" element={<Emplois />} /> */}
          {/* Tu peux ajouter d'autres routes ici si nécessaire */}
        </Routes>
      </Box>
    </AuthProvider>
  );
}

export default App
