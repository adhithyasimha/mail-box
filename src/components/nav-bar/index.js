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
    {/* aspect ration is 1:1.2112 */}
    <div className='logo-icon'>
      <svg height="45" viewBox="0 0 161 195" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M80.2492 1L1 50.3226L80.2492 100L160 50.3226L80.2492 1Z" stroke="#0F0F0E"/>
  <path d="M80.3849 28L44 50.4194L80.3849 73L117 50.4194L80.3849 28Z" stroke="#0F0F0E"/>
  <path d="M80.5 28V73" stroke="#0F0F0E"/>
  <path d="M80.2492 1L1 50.3226L80.2492 100L160 50.3226L80.2492 1Z" fill="white" stroke="#0F0F0E"/>
  <path d="M80.3849 28L44 50.4194L80.3849 73L117 50.4194L80.3849 28Z" fill="#0F0F0E" stroke="#0F0F0E"/>
  <path d="M80.5 27V74" stroke="white" stroke-width="0.2"/>
  <path d="M160.33 139.274L160.186 51.0066L80.839 100.62L81.2333 194.331L160.33 139.274Z" fill="#0F0F0E" fill-opacity="0.95" stroke="#0F0F0E" stroke-opacity="0.95"/>
  <path d="M0.999971 151.5L80.3979 194.5L80.3979 100.426L1.00002 51L0.999971 151.5Z" fill="#0F0F0E" stroke="#0F0F0E"/>
  </svg>
    </div>
    <div className='logo-text'>
      Mail Box 
    </div>
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