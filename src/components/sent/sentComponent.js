import React, { useEffect, useState } from 'react';
import { Table } from 'baseui/table-semantic';
import { Block } from 'baseui/block';
import { Button, SIZE, KIND } from 'baseui/button';
import { Avatar } from 'baseui/avatar';
import { Pagination } from 'baseui/pagination';

// Icons 
import { ChevronLeft } from 'baseui/icon';
import GetAppIcon from '@material-ui/icons/GetApp';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';

import './style.css';

const SentSection = () => {
  const [sentMails, setSentMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [starredMails, setStarredMails] = useState([]);

  useEffect(() => {
    fetch('https://mailbox-server-rho.vercel.app/api/supabase-sent')
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
      onClick={() => setSelectedMail(mail)}>
        {value}
    </Block>
  );

  const renderAttachment = (fileName, fileContent) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const fileTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'mp3': 'audio/mpeg',
      'mp4': 'video/mp4',
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };

    const fileType = fileTypes[fileExtension] || 'application/octet-stream';

    return (
      <div className="attSec">
        {fileType.startsWith('image') && (
          <img src={`data:${fileType};base64,${fileContent}`}
            alt={fileName}
            style={{ maxWidth: '300px', marginBottom: '1rem' }} />
        )}
        {fileType.startsWith('audio') && (
          <audio controls style={{ marginBottom: '1rem' }}>
            <source src={`data:${fileType};base64,${fileContent}`} type={fileType} />
            Your browser does not support the audio element.
          </audio>
        )}
        {fileType.startsWith('video') && (
          <video controls style={{ maxWidth: '300px', marginBottom: '1rem' }}>
            <source src={`data:${fileType};base64,${fileContent}`} type={fileType} />
            Your browser does not support the video element.
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
        {/* Download button for all file types */}
        <Button startEnhancer={() => <GetAppIcon />}>
          <a href={`data:${fileType};base64,${fileContent}`} download={fileName}>
            Download {fileName}
          </a>
        </Button>
        {/* Message for file types that can't be previewed */}
        {!fileType.startsWith('image') && 
         !fileType.startsWith('audio') && 
         !fileType.startsWith('video') && 
         fileType !== 'application/pdf' && (
          <p>Preview not available for {fileExtension.toUpperCase()} files. Please download to view.</p>
        )}
      </div>
    );
  };

  const rowsPerPage = 11;
  const totalNumPages = Math.ceil(sentMails.length / rowsPerPage);

  const pagedData = sentMails
    .sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at))
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    .map((mail) => [
      renderCell(mail.to_email, mail),
      renderCell(mail.subject, mail),
      renderCell(mail.message, mail),
      new Date(mail.sent_at).toLocaleString()
    ]);

  const toggleStar = (mailId) => {
    setStarredMails(prev => {
      if (prev.includes(mailId)) {
        return prev.filter(id => id !== mailId);
      }
      return [...prev, mailId];
    });
  };

  return (
    <>
      {selectedMail ? (
        <div className='mail-container'>
          <section className='top-nav'>
            <Button onClick={() => setSelectedMail(null)}
              size={SIZE.compact}
              kind={KIND.secondary}> <ChevronLeft size={24} />
            </Button>
          </section>
          <section className='subject'>
            <h2>{selectedMail.subject}</h2>
            <Button onClick={() => toggleStar(selectedMail.id)}
              kind={KIND.tertiary}
              size={SIZE.compact}>
              {starredMails.includes(selectedMail.id) ? <StarIcon /> : <StarBorderOutlinedIcon />}
            </Button>
          </section>
          <section className='from-to'>
            <aside>
              <Avatar name={selectedMail.from_email}
                size='scale1200' />
            </aside>
            <aside className='in-from-to'>
              <p>from : {selectedMail.from_email}</p>
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
          <Table columns={columns}
            data={pagedData}
            overrides={{
              TableBodyRow: {
                style: () => ({
                  cursor: 'pointer',
                })
              }
            }} />
          <div className='page'>
            <Pagination numPages={Math.ceil(sentMails.length / rowsPerPage)}
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

export default SentSection;
