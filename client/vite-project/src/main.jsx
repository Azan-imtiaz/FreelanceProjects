import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import  LoadingPage from "../src/components/Loader.jsx"


import './index.css'
import 'animate.css';


createRoot(document.getElementById('root')).render(



<StrictMode>

    <App />
  </StrictMode>,
)
