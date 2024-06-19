import React, { useEffect, useState } from 'react';
import { Table } from 'baseui/table';
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
      }}
    >
      {value}
    </Block>
  );

  return (
    <>
      {selectedMail ? (
        <div>
          <Button onClick={() => setSelectedMail(null)}><ChevronLeft size={24} /></Button>
          <h2><strong>Subject:</strong> {selectedMail.subject}</h2>
          <p><strong>From:</strong> {selectedMail.from_email}</p>
          <p><strong>To:</strong> {selectedMail.to_email}</p>
          <p><strong>Message:</strong> {selectedMail.message}</p>
          {selectedMail.file_name && selectedMail.file_content && (
            <div>
              <p><strong>Attachment:</strong> {selectedMail.file_name}</p>
              {selectedMail.file_name.endsWith('.jpg') || selectedMail.file_name.endsWith('.jpeg') || selectedMail.file_name.endsWith('.png') ? (
                // Display a preview of the photo with a maximum width of 300px and a download link
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={`data:image/jpeg;base64,${selectedMail.file_content}`} alt={selectedMail.file_name} style={{ maxWidth: '300px', marginRight: '1em' }} />
                  <a
                    href={`data:image/jpeg;base64,${selectedMail.file_content}`}
                    download={selectedMail.file_name}
                  >
                    {selectedMail.file_name}
                  </a>
                </div>
              ) : selectedMail.file_name.endsWith('.mp3') ? (
                // Play the audio file and show a download link
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <audio controls style={{ marginRight: '1em' }}>
                    <source src={`data:audio/mpeg;base64,${selectedMail.file_content}`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <a
                    href={`data:audio/mpeg;base64,${selectedMail.file_content}`}
                    download={selectedMail.file_name}
                  >
                    {selectedMail.file_name}
                  </a>
                </div>
              ) : selectedMail.file_name.endsWith('.mp4') ? (
                // Play the video file with a maximum width of 300px and a download link
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <video controls width="300" style={{ marginRight: '1em' }}>
                    <source src={`data:video/mp4;base64,${selectedMail.file_content}`} type="video/mp4" />
                    Your browser does not support the video element.
                  </video>
                  <a
                    href={`data:video/mp4;base64,${selectedMail.file_content}`}
                    download={selectedMail.file_name}
                  >
                    {selectedMail.file_name}
                  </a>
                </div>
              ) : (
                // Show a generic file icon and a download link
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <i className="fas fa-file" style={{ fontSize: '2em', marginRight: '1em' }}></i>
                  <a
                    href={`data:application/octet-stream;base64,${selectedMail.file_content}`}
                    download={selectedMail.file_name}
                  >
                    
                    {selectedMail.file_name}
                  </a>
                </div>
              )}
              <p><strong>Time Sent:</strong> {selectedMail.sent_at && new Date(selectedMail.sent_at).toLocaleString()}</p>
            </div>
          )}
        </div>
      ) : (
        <Table columns={columns} data={sentMails
          .sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at))
          .map((mail) => [
            renderCell(mail.to_email, mail),
            renderCell(mail.subject, mail),
            renderCell(mail.message, mail),
            mail.sent_at && new Date(mail.sent_at).toLocaleString()
          ])} />
      )}
    </>
  );
}

export default SentSection;
