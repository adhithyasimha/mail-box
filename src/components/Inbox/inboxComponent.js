import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useStyletron } from 'baseui';
import '../table-design.css';

import { Table } from 'baseui/table-semantic';
import { Block } from 'baseui/block';
import { Button, SIZE, KIND } from 'baseui/button';
import { Avatar } from 'baseui/avatar';
import { Pagination } from 'baseui/pagination';
import './inbox.css';

// Icons 
import { ChevronLeft } from 'baseui/icon';
import GetAppIcon from '@material-ui/icons/GetApp';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';

function InboxComponent() {
  const [inboxMails, setInboxMails] = useState([]);
  const supabaseUrl = 'supaurl';
  const supabaseKey = 'supakey';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    const fetchMails = async () => {
      let { data, error } = await supabase
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
        Block: {
          style: {
            cursor: 'pointer'
          }
        }
      }}>
      {value}
    </Block>
  );

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 11;
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

  // Row style overrides
  const [css] = useStyletron();
  const rowOverrides = {
    style: { cursor: 'pointer' }
  };

  // Function for rendering file attachments
  const renderAttachment = (fileName, fileContent) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const fileTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'mp3': 'audio/mpeg',
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'ogg': 'video/ogg',
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };

    const fileType = fileTypes[fileExtension];

    if (fileType) {
      return (
        <div className="attachment-container">
          {fileType.startsWith('image') && (
            <img src={`data:${fileType};base64,${fileContent}`}
              alt={fileName}
              className="attachment-preview" />
          )}
          {fileType.startsWith('audio') && (
            <audio controls className="attachment-preview">
              <source src={`data:${fileType};base64,${fileContent}`} type={fileType} />
              Your browser does not support the audio element.
            </audio>
          )}
          {fileType.startsWith('video') && (
            <video controls className="attachment-preview">
              <source src={`data:${fileType};base64,${fileContent}`} type={fileType} />
              Your browser does not support the video tag.
            </video>
          )}
          {fileType === 'application/pdf' && (
            <iframe
              src={`data:${fileType};base64,${fileContent}`}
              width="100%"
              height="200px"
              style={{ border: 'none', marginBottom: '1rem' }}
            >
              This browser does not support PDFs. Please download the PDF to view it.
            </iframe>
          )}
          {['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(fileType) && (
            <Button startEnhancer={() => <GetAppIcon />} className="attachment-button">
              <a href={`data:${fileType};base64,${fileContent}`} download={fileName}>
                Download {fileName}
              </a>
            </Button>
          )}
          <Button startEnhancer={() => <GetAppIcon />} className="attachment-button">
            <a href={`data:${fileType};base64,${fileContent}`} 
              download={fileName}>
              {fileName}
            </a>
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {selectedMail ? (
        <div className='mail-container'>
          <section className='top-nav'>
            <Button onClick={() => setSelectedMail(null)}
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
              <Avatar name={selectedMail.from_address} 
                size='scale1200'/>
            </aside>
            <aside className='in-from-to'>
              <p>from: {selectedMail.from_address}</p>
              <p>to: {selectedMail.to_address}</p>
            </aside>
            <aside className='time'>  
              <p>Time Sent: {new Date(selectedMail.date).toLocaleString()}</p>
            </aside>
          </section>
          <section className='message'>
            <h3>Message:</h3> 
            <article>{selectedMail.body}</article>
          </section>
          <section className='attachments'>
            {selectedMail.attachments && JSON.parse(selectedMail.attachments).map((attachment, index) => (
              <div key={index}>
                <p><strong>Attachment {index + 1}: </strong>{attachment.filename}</p>
                {renderAttachment(attachment.filename, attachment.content)}
              </div>
            ))}
          </section>
        </div>
      ) : (
        <section className='sentContainer'>
          <Table columns={columns} 
            data={pagedData} 
            overrides={{
              TableBodyRow: {
                style: rowOverrides.style
              }
            }}/>
          <div className='page'>        
            <Pagination numPages={Math.ceil(inboxMails.length / rowsPerPage)}
              currentPage={currentPage}
              onPageChange={({ nextPage }) => {
                setCurrentPage(Math.min(Math.max(nextPage, 1), totalNumPages))
              }} />
          </div>
        </section>
      )}
    </>
  );
}

export default InboxComponent;

