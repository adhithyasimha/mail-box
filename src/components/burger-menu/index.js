import React from 'react';

import './styles.css';

import { Button } from "baseui/button";
import AddIcon from '@material-ui/icons/Add'
import { Navigation } from "baseui/side-navigation";

import './ComposeBox.css';
import ComposeBox from './ComposeBox';
import InboxComponent from '../Inbox/inboxComponent.js';
import StarredComponent from '../starred/starredComponent.js';
import SentComponent from '../sent/sentComponent.js';
import DraftsComponent from '../drafts/draftsComponent.js';

// GSAP animation
import { useEffect } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';

const BurgerMenu = () => {
  const [activeItemId, setActiveItemId] = React.useState("#inbox");
  const [isComposeOpen, setIsComposeOpen] = React.useState(false);

  const compoRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      compoRef.current, 
      { x: -50 }, 
      { x: 0, duration: 1},
    );
    gsap.fromTo(
      menuRef.current,
      { x: -50 },
      { x: 0, delay: .2, duration: 1},
    )
  }, []);



  const nav = [
    {
      title: 'Inbox',
      itemId: '#inbox',
    },
    // {
    //   title: 'Starred',
    //   itemId: '#starred',
    // },
    {
      title: 'Sent',
      itemId: '#sent',
    },
    // {
    //   title: 'Drafts',
    //   itemId: '#drafts',
    // }
  ];

  const composeButtonClickHandler = () => {
    setIsComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
  };
  return (
    <section className="main-navigation">
      <aside className="burgerMenu">
        <div className='composeSec'
        ref={compoRef}>
          <Button
            startEnhancer={() => <AddIcon/>}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => {
                  return {
                    color: $theme.colors.mono100,
                    width: '90%',
                    ':hover': {
                      backgroundColor: $theme.colors.primaryA,
                    },
                    fontSize: '1.2rem',
                    fontFamily: 'Uber Move , sans-serif',
                  };
                },
              },
            }}
            onClick={composeButtonClickHandler}
          >
            Compose
          </Button>
        </div>
        <div className='menuSec'
          ref={menuRef}>
          <Navigation
            items={nav}
            activeItemId={activeItemId}
            onChange={({ item }) => {
              setActiveItemId(item.itemId);
              console.log(item.itemId);
            }}
          />
        </div>

        {isComposeOpen && <ComposeBox onClose={handleCloseCompose} />}
      </aside>
      <aside className='contentSec'>
          {(()=> {
            console.log(activeItemId);
            switch(activeItemId){
              case '#inbox':
                return <InboxComponent />;
              // case '#starred':
              //   return <StarredComponent />;
              case '#sent':
                return <SentComponent />;
              // case '#drafts':
              //   return <DraftsComponent />;
              default:
                return <InboxComponent />;
            }
          })()}
        </aside>
    </section>
  );
};

export default BurgerMenu;
