import React from 'react';
import ReactDOM from 'react-dom/client';

// import MailApp from './components/auth';
// import Inbox from './components/Inbox/index.js';    
// import SentSection from './components/sent/index.js';
// import draftsSection from './components/drafts/index.js';
// import starredSection from './components/starred/index.js';

import Navbar from './components/nav-bar/index.js';
import BurgerMenu from './components/burger-menu/index.js';
import './index.css';

import { BaseProvider, LightTheme } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>        
    <StyletronProvider value={new Styletron()}>
    <BaseProvider theme={LightTheme}>
        <main>
        <section className='TopPart'>
            <Navbar />
        </section>
        <section className='bottomPart'>
            <BurgerMenu/>
        </section>
        </main>
    </BaseProvider> 
    </StyletronProvider>
</React.StrictMode>
);
