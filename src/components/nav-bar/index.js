import React from 'react';

import './style.css';
import '../../index.css'

import { Avatar } from "baseui/avatar";
import { Search } from 'baseui/icon';
import { StatefulInput } from 'baseui/input';

// GSAP Animation 
import { useEffect } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';



const Navbar = () => {
  const [value, setValue] = React.useState('');

  // GSAP Animation
  const logoRef = useRef(null);
  const avatarRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { y: -30 },
      { y: 0, duration: 1 }
    );
    gsap.fromTo(
      avatarRef.current,
      { x: 50 }, 
      { x: 0, duration: 2}
    );
    gsap.fromTo(
      searchRef.current,
      { width: 0 },
      { width: 500, duration: 1.6}
    )
  }, []);

  return (

<nav className="navbar">
  <div className="navbar-left logo" ref={logoRef}>
    {/* aspect ration is 1:1.2112 */}
    <div className='logo-icon' >
    <svg width="50" height="50" viewBox="0 0 200 203" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_163_237)">
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
</defs>
</svg>

    </div>
    <div className='logo-text'>
      Mail Box
    </div>
  </div>
  <div className="search-bar"
    ref={searchRef}>
    <StatefulInput
      startEnhancer={<Search size={24} />}
      placeholder="Search for mail"
      clearOnEscape

      overrides={{
        Input: {
          style: ({ $theme }) => {
            return {
              fontFamily: 'uberMoveText, sans-serif',
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
  <div className="navbar-right" 
    ref={avatarRef}>
    <Avatar 
      name="Adolf Hitler"
      size="scale1000"
      src="https://images.uncyclomedia.co/uncyclopedia/en/5/58/Adolf.gif"
    />
  </div>
</nav>
);
};

export default Navbar ;