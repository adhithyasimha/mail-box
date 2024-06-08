import React from 'react';
import './style.css';
import { Avatar } from "baseui/avatar";

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left logo">
      Mail Box
  </div>
  <div className="search-bar">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3 10.7L9.1001 8.50002C9.6501 7.70002 10 6.75003 10 5.70003C10 3.10003 7.85 0.950012 5.25 0.950012C2.65 0.950012 0.5 3.10003 0.5 5.70003C0.5 8.30003 2.65 10.45 5.25 10.45C6.3 10.45 7.25005 10.1 8.05005 9.55L10.25 11.75L11.3 10.7ZM2 5.75002C2 3.95002 3.45 2.50002 5.25 2.50002C7.05 2.50002 8.5 3.95002 8.5 5.75002C8.5 7.55002 7.05 9.00002 5.25 9.00002C3.45 9.00002 2 7.55002 2 5.75002Z" fill="var(--black-800)"/>
</svg>
    <input type="text" placeholder="search for mail" />
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
      src="https://cdn.britannica.com/58/156058-131-22083D0A/Adolf-Hitler.jpg"
    />
  </div>
</nav>
);
};

export default Navbar;