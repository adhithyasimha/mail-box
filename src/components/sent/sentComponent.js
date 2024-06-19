import React, { useEffect, useState } from 'react';
import { Table } from 'baseui/table';

const SentSection = () => {
  const [sentMails, setSentMails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/supabase-sent')
      .then(response => response.json())
      .then(data => setSentMails(data))
      .catch(error => console.error('Error fetching sent emails:', error));
  }, []);

  const columns = ['To', 'Subject', 'Message', 'Time'];
  const data = sentMails.map(mail => [mail.to_email, mail.subject, mail.message, new Date(mail.sent_at).toLocaleString()])

  return (
    <Table columns={columns} data={data} />
    // <table id="sent">
    //   <thead>
    //     <tr>
    //       <th>To</th>
    //       <th>Subject</th>
    //       <th>Message</th>
    //       <th>Time Sent</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {sentMails.map((mail, index) => (
    //       <tr key={index}>
    //         <td>{mail.to_email}</td>
    //         <td>{mail.subject}</td>
    //         <td>{mail.message}</td>
    //         <td>{new Date(mail.sent_at).toLocaleString()}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
}


export default SentSection;

// import React, { useState } from 'react';

// const SentComponent = () => {
//   const [sentMails, setSentMails] = useState([]);

//   const handleSendMail = (to, subject, message) => {
//     const timeSent = new Date().toLocaleString();
//     setSentMails(prevMails => [...prevMails, { to, subject, message, timeSent }]);
//   };

//   return (
//     <table id="sent">
//       <thead>
//         <tr>
//           <th>To</th>
//           <th>Subject</th>
//           <th>Message</th>
//           <th>Time Sent</th>
//         </tr>
//       </thead>
//       <tbody>
//         {sentMails.map((mail, index) => (
//           <tr key={index}>
//             <td>{mail.to}</td>
//             <td>{mail.subject}</td>
//             <td>{mail.message}</td>
//             <td>{mail.timeSent}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default SentComponent;