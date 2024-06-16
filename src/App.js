import React from 'react';
import ReactDOM from 'react-dom/client';
// import MailApp from './components/auth';

import Inbox from './components/Inbox/index.js';    
import SentSection from './components/sent/index.js';
import draftsSection from './components/drafts/index.js';
import starredSection from './components/starred/index.js';

import Navbar from './components/nav-bar/index.js';
import BurgerMenu from './components/burger-menu/index.js';
import './index.css';
import Auth from './components/auth/index.js'
import Ai from './components/ai/front.js';
import { BaseProvider, LightTheme } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

const App = ()=>{
    const nav = [
    {
      title: 'Inbox',
      itemId: 'inbox',
      component: <Inbox />,
    },
    {
      title: 'SentSection',
      itemId: 'sent',
      component: <SentSection />,
    },
    {
      title: 'draftsSection',
      itemId: 'draftsSection',
      component: <draftsSection />,
    },
    {
      title: 'starredSection',
      itemId: 'starredSection',
      component: <starredSection />,
    },
  ];
    const [activeItemId, setActiveItemId] = React.useState('inbox');
    const ActiveComponent = nav.find(item => item.itemId === activeItemId).component;

    return(
        <React.StrictMode>        
            <StyletronProvider value={new Styletron()}>
            <BaseProvider theme={LightTheme}>
                <main>
                <section className='TopPart'>
                    <Navbar />
                </section>
                <section className='bottomPart'>
                    <BurgerMenu 
                        nav={nav}
                        activeItemId = {activeItemId}
                        setActiveItemId = {setActiveItemId}
                        />
                    {ActiveComponent}
                </section>
                </main>
            </BaseProvider> 
            </StyletronProvider>
        </React.StrictMode>
    );
}

export default App; 