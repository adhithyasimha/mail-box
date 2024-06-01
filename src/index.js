import React from 'react';
import ReactDOM from 'react-dom/client';
import EmailForm from './components/mailer-template/index.js';
// import BurgerMenu from './components/buger-menu/index.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmailForm />
  </React.StrictMode>
);