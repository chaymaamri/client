import React, { createContext, useState, useContext } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Fournisseur de contexte
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Par défaut, utilisateur non connecté

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useAuth() {
  return useContext(AuthContext);
}
