import React, { useEffect, useState } from 'react';
import { Table } from 'baseui/table';
import { PLACEMENT, StatefulPopover } from 'baseui/popover';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { ChevronLeft } from 'baseui/icon';

const SentSection = () => {
  const [sentMails, setSentMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/supabase-sent')
      .then(response => response.json())
      .then(data => setSentMails(data))
      .catch(error => console.error('Error fetching sent emails:', error));
  }, []);

  const columns = ['To', 'Subject', 'Message', 'Time'];
  const renderCell = (value, mail) => (
    <Block 
      whiteSpace='nowrap'
      maxWidth='200px'
      textOverflow='ellipsis'
      overflow='hidden'
      onClick={() => setSelectedMail(mail)}
      overrides={{
        Block: {
          style: {
            cursor: 'pointer'
          }
        }
      
      }}>
        {value}        
    </Block>
  );

  return (
    <>
    {selectedMail ? (
      <div>
        <Button onClick={()=>setSelectedMail(null)}><ChevronLeft size={24}/></Button>
        <h2><strong>Subject:</strong> {selectedMail.subject}</h2>
        <p><strong>From:</strong> {selectedMail.from_email}</p>
        <p><strong>To:</strong> {selectedMail.to_email}</p>
        <p><strong>Message:</strong> {selectedMail.message}</p>
        <p><strong>Time Sent:</strong> {new Date(selectedMail.sent_at).toLocaleString()}</p>
      </div>
    ) : (
      <Table columns={columns} data={sentMails
        .sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at))
        .map((mail, index) => [
        renderCell(mail.to_email, mail),
        renderCell(mail.subject, mail),
        renderCell(mail.message, mail),
        new Date(mail.sent_at).toLocaleString() 
      ])} />
    )}
    </>
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