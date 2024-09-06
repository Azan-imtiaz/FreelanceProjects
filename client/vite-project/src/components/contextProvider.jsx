import React, { createContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isSignedInFinal, setIsSignedIn] = useState(false);

  // Function to sign in
  const signInFinal = () => {
    setIsSignedIn(true);
  };

  // Function to sign out
  const signOutFinal = () => {
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedInFinal, signInFinal, signOutFinal }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
