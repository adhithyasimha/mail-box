import React, { Component, useEffect, useState } from 'react';
import { Table } from 'baseui/table-semantic';
import { Block } from 'baseui/block';
import { Button, SIZE, KIND, SHAPE } from 'baseui/button';
import { Avatar } from 'baseui/avatar';
import { Pagination } from 'baseui/pagination';

import { ChevronLeft } from 'baseui/icon';
import GetAppIcon from '@material-ui/icons/GetApp';
import './style.css';
import { FormatAlignJustifyOutlined } from '@material-ui/icons';

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

  // function for rendering file attachments 
  const renderAttachment = (fileName, fileContent) => {
    const fileExtension = fileName.split('.').pop();
    const fileTypes = {
      'jpg': 'image/jpg',
      'jpeg' : 'image/jpeg',
      'png' : 'image/png',
      'mp3' : 'audio/mpeg',
      'mp4' : 'video/mp4'
    };

    const fileType = fileTypes[fileExtension];

    if(fileType) {
      return(
        <div className="attSec" style={{display: 'flex', alignItems: 'center'}}>
          {fileType.startsWith('image') && (
            <img src={`data:${fileType};base64,${fileContent}`}
              alt={fileName}
              style={{ maxWidth: '300px', marginRight : '1rem' }} />
          )}
          {fileType.startsWith('audio') && (
            <audio controls style={{ marginRight : '1rem' }}>
              <source src={`data:${fileType};base64,${fileContent}`} type={fileType}/>
              Your browser does not support the audion element
            </audio>
          )}
          <Button startEnhancer={()=><GetAppIcon/>}>
            <a href={`data:${fileType};base64,${fileContent}`} 
              download={fileName}
              >
              {fileName}
            </a>
          </Button>
          
        </div>
      );
    }
    return null;
  };

  // pagination 
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 9;
  const totalNumPages = Math.ceil(sentMails.length / rowsPerPage);

  const pagedData = sentMails
  .sort((a,b) => new Date(b.sent_at) - new Date(a.sent_at))
  .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  .map((mail) => [
    renderCell(mail.to_email, mail),
    renderCell(mail.subject, mail),
    renderCell(mail.message, mail),
    new Date(mail.sent_at).toLocaleString()
  ]);

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
        </section>
        <section className='from-to'>
          <aside>
            <Avatar name={selectedMail.from_email} 
              size='scale1200'/>
          </aside>
          <aside className='in-from-to'>
            <p>{selectedMail.from_email}</p>
            <p>to : {selectedMail.to_email}</p>
          </aside>
          <aside className='time'>  
            <p>Time Sent : {new Date(selectedMail.sent_at).toLocaleString()}</p>
          </aside>
        </section>
        <section className='message'>
          <h3>Message:</h3> 
          <article>{selectedMail.message}</article>
        </section>
        <section className='attachments'>
          {selectedMail.file_name && selectedMail.file_content && (
            <div>
              <p><strong>Attachments: </strong>{selectedMail.file_name}</p>
              {renderAttachment(selectedMail.file_name, selectedMail.file_content)}
            </div>
          )}
        </section>
      </div>
    ) : (
      <section className='sentContainer'>
        <Table columns={columns} data={ pagedData } />
        <div className='page'>        
          <Pagination numPages={Math.ceil(sentMails.length / rowsPerPage)}
            currentPage={currentPage}
            onPageChange={({ nextPage })=>{
              setCurrentPage(Math.min(Math.max(nextPage, 1), totalNumPages))
            }} />
        </div>
      </section>
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