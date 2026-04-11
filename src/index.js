import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './Router';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import ErrorHandlePage from "./pages/ErrorHandlePage";

// Initialize dark mode from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<ErrorHandlePage/>}/>
  </React.StrictMode>
);

reportWebVitals();
