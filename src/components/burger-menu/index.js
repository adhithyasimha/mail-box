import React from 'react';
import './styles.css';
import { Button } from "baseui/button";
import { Plus } from 'baseui/icon';
import { Navigation } from "baseui/side-navigation";
import './ComposeBox.css';
import ComposeBox from './ComposeBox';


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
                  width: '90%',
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
