import React, { useEffect, useState } from 'react';

const SentSection = () => {
  const [sentMails, setSentMails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/supabase-sent')
      .then(response => response.json())
      .then(data => setSentMails(data))
      .catch(error => console.error('Error fetching sent emails:', error));
  }, []);

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
            <td>{mail.to_email}</td>
            <td>{mail.subject}</td>
            <td>{mail.message}</td>
            <td>{new Date(mail.sent_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SentSection;
