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
      <svg width="45" viewBox="0 0 200 215" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_136_237)">
      <path d="M100.249 21L21 70.3226L100.249 120L180 70.3226L100.249 21Z" stroke="#0F0F0E"/>
      <path d="M100.385 48L64 70.4194L100.385 93L137 70.4194L100.385 48Z" stroke="#0F0F0E"/>
      <path d="M100.5 48V93" stroke="#0F0F0E"/>
      <path d="M100.249 21L21 70.3226L100.249 120L180 70.3226L100.249 21Z" fill="white" stroke="#0F0F0E"/>
      <path d="M100.385 48L64 70.4194L100.385 93L137 70.4194L100.385 48Z" fill="#0F0F0E" stroke="#0F0F0E"/>
      <path d="M100.5 47V94" stroke="white" stroke-width="0.2"/>
      <path d="M182 143L180.5 71L100.915 119.078L101.253 199.424L182 143Z" fill="#0F0F0E" fill-opacity="0.95" stroke="#0F0F0E" stroke-opacity="0.95"/>
      <path d="M20.5603 151L100.44 199.227L100 121L20.5603 71.3686L20.5603 151Z" fill="#0F0F0E" stroke="#0F0F0E"/>
      </g>
      <defs>
      <clipPath id="clip0_136_237">
      <rect width="200" height="215" fill="white"/>
      </clipPath>
      </defs>
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
              },
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