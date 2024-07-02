import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from 'baseui/avatar';
import { Search } from 'baseui/icon';
import { StatefulInput } from 'baseui/input';
import { Button } from 'baseui/button';
import gsap from 'gsap';
import { createClient } from '@supabase/supabase-js';
import './style.css';
import '../../index.css';

// Supabase client setup
const supabaseUrl = 'supaurl';
const supabaseKey = 'supakey';
const supabase = createClient(supabaseUrl, supabaseKey);

const Navbar = ({ onLogout }) => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);

  // GSAP Animation
  const logoRef = useRef(null);
  const searchRef = useRef(null);
  const avatarRef = useRef(null);
  const navbarRef = useRef(null); 

  const width = window.screen.width;

  useEffect(() => {
    gsap.fromTo(logoRef.current, { y: -30 }, { y: 0, duration: 1 });
    gsap.fromTo(avatarRef.current, { x: 50 }, { x: 0, duration: 2 });
    gsap.fromTo(searchRef.current, { width: 0 }, { width: 500, duration: 1.6 });
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = debounce(async (query) => {
    if (query.length > 2) {
      try {
        const [inboxResult, sentResult] = await Promise.all([
          supabase
            .from('inboxMails')
            .select('*')
            .or(`from_address.ilike.%${query}%,to_address.ilike.%${query}%,subject.ilike.%${query}%,body.ilike.%${query}%`),
          supabase
            .from('sentMails')
            .select('*')
            .or(`from_mail.ilike.%${query}%,to_mail.ilike.%${query}%,subject.ilike.%${query}%,message.ilike.%${query}%`)
        ]);

        if (inboxResult.error) throw inboxResult.error;
        if (sentResult.error) throw sentResult.error;

        setResults([...inboxResult.data, ...sentResult.data]);
      } catch (error) {
        console.error('Search error:', error);
        // Handle error (e.g., show error message to user)
      }
    } else {
      setResults([]);
    }
  }, 300);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setValue(query);
    handleSearch(query);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left logo" ref={logoRef}>
        <div className='logo-icon'>
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
        <div className='logo-text'>Mail Box</div>
      </div>
      <div className="search-bar" ref={searchRef}>
        <StatefulInput
          startEnhancer={<Search size={24} />}
          placeholder="Search for mail"
          clearOnEscape
          value={value}
          onChange={handleInputChange}
          overrides={{
            Input: {
              style: ({ $theme }) => ({
                fontFamily: 'uberMoveText, sans-serif',
              }),
              props: {
                'aria-label': 'Search for mail',
              },
            },
          }}
        />
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="#help" aria-label="Help">Help</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right" ref={avatarRef}>
        <Button onClick={onLogout} aria-label="Sign Out">Sign Out</Button>
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
