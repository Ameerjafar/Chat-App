import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { app } from './firebaseconfig.ts';
import { getDatabase } from 'firebase/database';

const database = getDatabase(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App database = { database } />
  </React.StrictMode>,
)
