import React from 'react';
import './styles.css';
import { Button } from "baseui/button";
import { Plus } from 'baseui/icon';
import { Navigation } from "baseui/side-navigation";
import './ComposeBox.css';
import ComposeBox from './ComposeBox';

const BurgerMenu = ({nav, activeItemId, setActiveItemId}) => {
  const [isComposeOpen, setIsComposeOpen] = React.useState(false);

  const composeButtonClickHandler = () => {
    setIsComposeOpen(!isComposeOpen);
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
