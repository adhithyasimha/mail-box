import React, { useState } from 'react';

const SentSection = () => {
  const [sentMails, setSentMails] = useState([]);

  const handleSendMail = (to, subject, message) => {
    const timeSent = new Date().toLocaleString();
    setSentMails(prevMails => [...prevMails, { to, subject, message, timeSent }]);
  };

  return (
    <table id="sent">
      <thead>
        <tr>
          <th>To</th>
          <th>Subject</th>
          <th>Message</th>
          <th>Time Sent</th>
        </tr>
      </thead>
      <tbody>
        {sentMails.map((mail, index) => (
          <tr key={index}>
            <td>{mail.to}</td>
            <td>{mail.subject}</td>
            <td>{mail.message}</td>
            <td>{mail.timeSent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SentSection;