import React, { useState } from "react";
import { useEffect } from "react";
import './inbox.css';
import { createClient } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import '../table-design.css';
import {Table} from 'baseui/table';

function InboxComponent() {
  
//   return (
//     <h1>This is Inbox</h1>
//   );
// }

  const [inboxMails, setInboxMails] = useState([]);
  const supabaseUrl = 'https://djkrtmwwfohyonafoumv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3J0bXd3Zm9oeW9uYWZvdW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MTY5MjYsImV4cCI6MjAzNDA5MjkyNn0.coE-6KquwZi_KQlc893niek7iuSV-B7U46oNVGt3cp8';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(()=>{
    const fetchMails = async()=> {
      let {data, error} = await supabase
      .from('inboxMails')
      .select('*');
      
      if (error) console.error(error);
      else setInboxMails(data);
    };
    fetchMails();
  }, []);

  const handleMailClick = (mail) => {
    console.log(mail)
  };

  const columns = ['Subject', 'From', 'Body'];
  const data = inboxMails.map(mail => [mail.subject, mail.from_address, mail.body]);

  return (
    <div className="mail-container">
      <Table columns={columns} data={data} onRowClick={({rowData}) => handleMailClick(rowData)}/>
    </div>
  );

}

export default InboxComponent;

// import React, { useEffect, useState } from 'react';
// import './inbox.css';

// // const mails = [
// //   { id: 1, from: 'John Doe', fromEmail: 'john@example.com', subject: 'Test mail 1' },
// //   { id: 2, from: 'Jane Doe', fromEmail: 'jane@example.com', subject: 'Test mail 2' },
// //   { id: 3, from: 'Bob Smith', fromEmail: 'bob@example.com', subject: 'Test mail 3' },
// // ];

// function handleMailClick(mail) {
//   console.log(`Clicked on mail with id ${mail.id}`);
// }

// // ...

// function Inbox() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [mails, setMails] = useState([]);

//   useEffect(() => {
//     // Fetch mails from API
//     const fetchCount = 5; // number of time to fetch data
//     const fetchPromises = Array(fetchCount).fill().map(() => 
//       fetch('https://127.0.0.1/api/mail')
//         .then(response => response.json())
//       );  
      
//       Promise.all(fetchPromises)
//       .then(dataArrays =>{
//         const combinedData = [].concat(...dataArrays);
//         const uniqueMails = combinedData.reduce((acc, current) => {
//           const x = acc.find(item => item.id === current.id);
//           if (!x) {
//             return acc.concat([current]);
//           } else {
//             return acc;
//           }
  
//       }, []);
//       setMails(uniqueMails);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []);



//   return (  
//     <table id="Inbox">
//       <thead>
//         <tr>
//           <th>From Name</th>
//           <th>From Email</th>
//           <th>Subject</th>
//         </tr>
//       </thead>
//       <tbody>
//         {mails.map((mail) =>(
//           <tr key={mail.id} className="MailItem" onClick={() => handleMailClick(mail)}>
//             <td>{mail.from}</td>
//             <td>{mail.fromEmail}</td>
//             <td>{mail.subject}</td>
//           </tr>
//         ))}
//       </tbody>
//       {mails.map((mail) => (
//         <div key={mail.id} className="MailItem" onClick={() => handleMailClick(mail)}>
//           <div className="MailItemFrom">
//             <div className="MailItemFromName">{mail.from.value[0].name}</div>
//             <div>{mail.from.value[0].address}</div>
//           </div>
//           <div>{mail.subject}</div>
//         </div>
//       ))}
//       <h1>This is Inbox</h1>
//     </table>
//   );
// }

// export default Inbox;
