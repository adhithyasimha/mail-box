import React, { Component, useEffect, useState } from 'react';

import { createClient } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import { useStyletron } from 'baseui';

import '../table-design.css';

import { Table } from 'baseui/table-semantic';
import { Block } from 'baseui/block';
import { Button, SIZE, KIND, SHAPE } from 'baseui/button';
import { Avatar } from 'baseui/avatar';
import { Pagination } from 'baseui/pagination';



import './inbox.css';

// Icons 
import { ChevronLeft } from 'baseui/icon';
import GetAppIcon from '@material-ui/icons/GetApp';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';
function InboxComponent() {
  
//   return (
//     <h1>This is Inbox</h1>
//   );
// }

  const [inboxMails, setInboxMails] = useState([]);
  const supabaseUrl = 'https://djkrtmwwfohyonafoumv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3J0bXd3Zm9oeW9uYWZvdW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MTY5MjYsImV4cCI6MjAzNDA5MjkyNn0.coE-6KquwZi_KQlc893niek7iuSV-B7U46oNVGt3cp8';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [selectedMail, setSelectedMail] = useState(null);

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

  const columns = ['From', 'Subject', 'Message', 'Time'];
  const renderCell = (value, mail) => (
    <Block
      whiteSpace='nowrap'
      maxWidth='200px'
      textOverflow='ellipsis'
      overflow='hidden'
      onClick={() => setSelectedMail(mail)}
      overrides={{
        block: {
          style: {
            cursor: 'pointer'
          }
        }
      }}>
        {value}
      </Block>
  );

  // pagination 
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 9;
  const totalNumPages = Math.ceil(inboxMails.length / rowsPerPage);

  const pagedData = inboxMails
  .sort((a,b) => new Date(b.date) - new Date(a.date))
  .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  .map((mail) => [
    renderCell(mail.from_address, mail),
    renderCell(mail.subject, mail),
    renderCell(mail.body, mail),
    new Date(mail.date).toLocaleString()
  ]);

  // Star mail logic
  const [starredMails, setStarredMails] = useState([]);
  const toggleStar = (mailId) => {
    setStarredMails(prev => {
      if(prev.includes(mailId)) {
        return prev.filter(id => id !== mailId);
      }
      return [...prev, mailId];
    
    });
  };

  // row style overrides
  const rowStyle = useStyletron();
  const [css] = rowStyle;
  const rowOverrides = {
    cursor : 'pointer',
  };

  return (
    <>
    {selectedMail ? (
      <div className='mail-container'>
        <section className='top-nav'>
          <Button onClick={()=>setSelectedMail(null)}
            size={SIZE.compact}
            kind={KIND.secondary}> <ChevronLeft size={24}/>
          </Button> 
        </section>
        <section className='subject'> 
          <h2>{selectedMail.subject}</h2>
          <Button onClick={() => toggleStar(selectedMail.id)}
            kind={KIND.tertiary}
            size={SIZE.compact}>
            {starredMails.includes(selectedMail.id) ? <StarIcon/> : <StarBorderOutlinedIcon/>}
          </Button>
        </section>
        <section className='from-to'>
          <aside>
            <Avatar name={selectedMail.to_address} 
              size='scale1200'/>
          </aside>
          <aside className='in-from-to'>
            <p>{selectedMail.from_addressl}</p>
            <p>to : {selectedMail.to_address}</p>
          </aside>
          <aside className='time'>  
            <p>Time Sent : {new Date(selectedMail.date).toLocaleString()}</p>
          </aside>
        </section>
        <section className='message'>
          <h3>Message:</h3> 
          <article>{selectedMail.body}</article>
        </section>
      </div>
    ) : (
      <section className='sentContainer'>
        <Table columns={columns} 
          data={ pagedData } 
          rowStyle={rowOverrides}
          overrides={{
            TableBodyRow: {
              style: () => ({
                cursor: 'pointer',
              })
            }
          }}/>
        <div className='page'>        
          <Pagination numPages={Math.ceil(inboxMails.length / rowsPerPage)}
            currentPage={currentPage}
            onPageChange={({ nextPage })=>{
              setCurrentPage(Math.min(Math.max(nextPage, 1), totalNumPages))
            }} />
        </div>
      </section>
    )}
    </>
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

