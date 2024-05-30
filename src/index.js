import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/buger-menu/index.jsx';
import BurgerMenu from './components/buger-menu/index.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BurgerMenu />
  </React.StrictMode>
);