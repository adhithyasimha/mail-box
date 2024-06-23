import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './components/auth/index.js';
import Navbar from './components/nav-bar/index.js';
import BurgerMenu from './components/burger-menu/index.js';
import './index.css';
import { BaseProvider, LightTheme } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Auth onAuthSuccess={handleAuthSuccess} />
      ) : (
        <>
          <section className='TopPart'>
            <Navbar />
          </section>
          <section className='bottomPart'>
            <BurgerMenu />
          </section>
        </>
      )}
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