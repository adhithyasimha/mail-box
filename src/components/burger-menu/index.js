import React from 'react';
import './styles.css';
import { Button } from "baseui/button";
import { Plus } from 'baseui/icon';
import { Navigation } from "baseui/side-navigation";
import './ComposeBox.css';
import ComposeBox from './ComposeBox';

import Inbox from '../Inbox/inbox';
import SentSection from '../sent/sent-section';
import starredSection from '../starred';
import draftsSection from '../drafts';


const BurgerMenu = () => {
  const [activeItemId, setActiveItemId] = React.useState("#Inbox");
  const [isComposeOpen, setIsComposeOpen] = React.useState(false);

  const nav = [
    {
      title: 'Inbox',
      itemId: '#Inbox',
    },
    {
      title: 'Starred',
      itemId: '#starred',
    },
    {
      title: 'Sent',
      itemId: '#sent',
    },
    {
      title: 'Drafts',
      itemId: '#drafts',
    }
  ];

  let ActiveComponent;
  switch (activeItemId) {
    case '#Inbox':  
      ActiveComponent = <Inbox />;
      break;  
    case '#starred':
      ActiveComponent = <starredSection />;
      break;
    case '#sent':
      ActiveComponent = <SentSection />;
      break;
    case '#drafts':
      ActiveComponent = <draftsSection />;
      break;
    default:
      ActiveComponent = <Inbox />;
  }

  const composeButtonClickHandler = () => {
    setIsComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
  };

  return (
    <div className="burgerMenu">
      <div className='composeSec'>
        <Button
          startEnhancer={() => <Plus size={24} />}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => {
                return {
                  color: $theme.colors.primaryA,
                  color: $theme.colors.mono100,
                  width: '80%',
                  ':hover': {
                    backgroundColor: $theme.colors.primaryA,
                  },
                };
              },
            },
          }}
          onClick={composeButtonClickHandler}
        >
          Compose
        </Button>
      </div>
      <div className='menuSec'>
        <Navigation
          items={nav}
          activeItemId={activeItemId}
          onChange={({ item }) => setActiveItemId(item.itemId)}
        />
      </div>
      {isComposeOpen && <ComposeBox onClose={handleCloseCompose} />}
    </div>
  );
};

export default BurgerMenu;
