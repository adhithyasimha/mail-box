import React from 'react';
import './style.css';
import { Avatar } from "baseui/avatar";
import { Search } from 'baseui/icon';
import { Input } from 'baseui/input';

const Navbar = () => {
  const [value, setValue] = React.useState('');
  return (

<nav className="navbar">
  <div className="navbar-left logo">
    Mail Box
  </div>
  <div className="search-bar">
    <Input
      value={value}
      onChange={event => setValue(event.currentTarget.value)}
      startEnhancer={<Search size={24} />}
      placeholder="Search for mail"
      clearOnEscape
      overrides={{
        Input: {
          style: ({ $theme }) => {
            return {
              borderColor: $theme.colors.mono300,
              ':hover': {
                borderColor: $theme.colors.primaryA,
              },
              ':focus': {
                borderColor: $theme.colors.primaryA,
              }
            }
          }
        }
      }}
    />
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a>Help</a>
      </li>
    </ul>
  </div>
  <div className="navbar-right">
    <Avatar 
      name="Adolf Hitler"
      size="scale1000"
      src="https://images.uncyclomedia.co/uncyclopedia/en/5/58/Adolf.gif"
    />
  </div>
</nav>
);
};

export default Navbar;