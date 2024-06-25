import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from 'baseui/avatar';
import { Search } from 'baseui/icon';
import { StatefulInput } from 'baseui/input';
<<<<<<< HEAD
import { Button } from 'baseui/button';
import gsap from 'gsap';
import { createClient } from '@supabase/supabase-js';
import './style.css';
import '../../index.css';

// Supabase client setup
const supabaseUrl = 'https://djkrtmwwfohyonafoumv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3J0bXd3Zm9oeW9uYWZvdW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MTY5MjYsImV4cCI6MjAzNDA5MjkyNn0.coE-6KquwZi_KQlc893niek7iuSV-B7U46oNVGt3cp8';
const supabase = createClient(supabaseUrl, supabaseKey);

const Navbar = ({ onLogout }) => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
=======

// GSAP Animation 
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const [value, setValue] = React.useState('');
>>>>>>> e701268facd8f97c6e41d9436001b180c5c75086

  // GSAP Animation
  const avatarRef = useRef(null);
  const navbarRef = useRef(null); 

  const width = window.screen.width;

  useEffect(() => {
<<<<<<< HEAD
    gsap.fromTo(logoRef.current, { y: -30 }, { y: 0, duration: 1 });
    gsap.fromTo(avatarRef.current, { x: 50 }, { x: 0, duration: 2 });
    gsap.fromTo(searchRef.current, { width: 0 }, { width: 500, duration: 1.6 });
=======
    gsap.fromTo(
      avatarRef.current,
      { x: 50 }, 
      { x: 0, duration: 2}
    );
    gsap.fromTo(
      navbarRef.current,
      { width: 700 },
      { width: width, duration: 2.6}
    )
>>>>>>> e701268facd8f97c6e41d9436001b180c5c75086
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

<<<<<<< HEAD
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
=======
<nav className="navbar"
  ref={navbarRef}>
  <div className="navbar-left logo" >
    {/* aspect ration is 1:1.2112 */}
    <div className='logo-icon' >
    <svg width="50" height="50" viewBox="0 0 200 203" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_163_237)">
>>>>>>> e701268facd8f97c6e41d9436001b180c5c75086
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
<<<<<<< HEAD
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
=======
</svg>

    </div>
    <div className='logo-text'>
      Mail Box
    </div>
  </div>
  <div className="search-bar">
    <StatefulInput
      startEnhancer={<Search size={24} />}
      placeholder="Search for mail"
      clearOnEscape

      overrides={{
        Input: {
          style: ({ $theme }) => {
            return {
              fontFamily: 'Uber Move, sans-serif',
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
>>>>>>> e701268facd8f97c6e41d9436001b180c5c75086
};

export default Navbar;