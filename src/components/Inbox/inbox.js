import React, { useState } from 'react';
import './inbox.css';

const mails = [
  { id: 1, from: 'John Doe', fromEmail: 'john@example.com', subject: 'Test mail 1' },
  { id: 2, from: 'Jane Doe', fromEmail: 'jane@example.com', subject: 'Test mail 2' },
  { id: 3, from: 'Bob Smith', fromEmail: 'bob@example.com', subject: 'Test mail 3' },
];

function handleMailClick(mail) {
  console.log(`Clicked on mail with id ${mail.id}`);
}

// ...

function Inbox() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
  
  
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
  
  );
}

export default Inbox;
