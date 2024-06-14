import React, { useState } from 'react';
import './inbox.css';
import BurgerMenu from '../burger-menu';
const mails = [
  { id: 1, from: 'John Doe', fromEmail: 'john@example.com', subject: 'Test mail 1' },
  { id: 2, from: 'Jane Doe', fromEmail: 'jane@example.com', subject: 'Test mail 2' },
  { id: 3, from: 'Bob Smith', fromEmail: 'bob@example.com', subject: 'Test mail 3' },
];

function handleMailClick(mail) {
  console.log(`Clicked on mail with id ${mail.id}`);
}

// ...

<div className="MailContainer">
  {mails.map((mail) => (
    <div key={mail.id} className="MailItem" onClick={() => handleMailClick(mail)}>
      <div className="MailItemFrom">
        <div className="MailItemFromName">{mail.from}</div>
        <div>{mail.fromEmail}</div>
      </div>
      <div>{mail.subject}</div>
    </div>
  ))}
</div>

function Inbox() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`InboxContainer ${isDarkMode ? 'dark' : ''}`}>
      <nav className="navbar">
        <div className="navbar-left logo">
          Mail Box
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for mail"
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
          <img
            src="https://cdn.britannica.com/58/156058-131-22083D0A/Adolf-Hitler.jpg"
            alt="Avatar"
            className="avatar"
          />
        </div>
      </nav>
      <div className="ContentContainer">
        <BurgerMenu />
        <div className="MailContainer">
          {mails.map((mail) => (
            <div key={mail.id} className="MailItem">
              <div className="MailItemFrom">
                <div className="MailItemFromName">{mail.from}</div>
                <div>{mail.fromEmail}</div>
              </div>
              <div>{mail.subject}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inbox;
