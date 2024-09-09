import React, { createContext, useEffect, useState } from 'react';

// Create the context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isSignedInFinal, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [popUp,setSignInPopUp]=useEffect(false);



 const signInPopUpTrue=()=>{
 setSignInPopUp(true);
 }

 const signInPopUpFalse=()=>{
  setSignInPopUp(false);
 }


  // Function to sign in
  const signInFinal = () => {
    setIsSignedIn(true);
  };

  // Function to sign out
  const signOutFinal = () => {
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedInFinal, signInFinal, signOutFinal,userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
