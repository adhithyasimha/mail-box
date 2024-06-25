import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/auth/index.js';
import Navbar from './components/nav-bar/index.js';
import BurgerMenu from './components/burger-menu/index.js';
import './index.css';
import { BaseProvider, LightTheme } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [logoutTimer, setLogoutTimer] = useState(null);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    startLogoutTimer();
  };

  const startLogoutTimer = () => {
    const timeout = 30 * 60 * 1000; // 30 minutes in milliseconds
    const timer = setTimeout(() => {
      handleLogout();
    }, timeout);
    setLogoutTimer(timer);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    clearTimeout(logoutTimer);
  };

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(logoutTimer);
      startLogoutTimer();
    };

    if (isAuthenticated) {
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
    }

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [isAuthenticated, logoutTimer]);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <>
                <section className='TopPart'>
                  <Navbar onLogout={handleLogout} />
                </section>
                <section className='bottomPart'>
                  <BurgerMenu />
                </section>
              </>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path='/auth'
          element={
            !isAuthenticated ? (
              <Auth onAuthSuccess={handleAuthSuccess} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StyletronProvider value={new Styletron()}>
      <BaseProvider theme={LightTheme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);