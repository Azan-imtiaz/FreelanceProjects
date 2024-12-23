import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import LoadingPage from '../src/components/Loader.jsx';
import { AuthProvider } from '../src/components/contextProvider.jsx';

import './index.css';
import 'animate.css';

function RootComponent() {
  const [check, setCheck] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheck(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    check ? (
      <LoadingPage />
    ) : (
      <StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StrictMode>
    )
  );
}

createRoot(document.getElementById('root')).render(<RootComponent />);







// import { StrictMode, useState } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import  LoadingPage from "../src/components/Loader.jsx"
// import {AuthProvider } from "../src/components/contextProvider.jsx";


// import './index.css'
// import 'animate.css';


// createRoot(document.getElementById('root')).render(



// <StrictMode>
// <AuthProvider >

//     <App />

// </AuthProvider>
//   </StrictMode>,
// )
