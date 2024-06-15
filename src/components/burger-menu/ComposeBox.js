import React, { useRef, useState, useEffect } from 'react';
import './ComposeBox.css';
import { Input, SIZE } from "baseui/input";
import { Button,KIND } from 'baseui/button';
import {Notification} from 'baseui/notification';

const ComposeBox = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSendButtonClick = async () => {
    const from = 'adhithya@adhithya.tech';
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, from, subject, text: message, fileName, fileContent }),
      });
      if (response.ok) {
        console.log('Email sent successfully');
        onClose()
      } else {
        console.error('Error sending email');
      }
        console.error('Error sending email');
      }
     catch (error) {
      console.error(error);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoaded(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target.result.split(',')[1]; // Remove the data URL prefix
        setFileName(file.name);
        setFileContent(fileContent);
        setIsLoaded(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItalicButtonClick = () => {
    setIsItalic(!isItalic);
  };

  const handleDiscardButtonClick = () => {
    setMessage('');
    setTo('');
    setSubject('');
    setFileName('');
    setFileContent('');
    document.querySelectorAll('.compose-input').forEach(input => input.value = '');
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePromptButtonClick = () => {
    setShowPrompt(!showPrompt);
  };

  const handlePromptSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: value }),
      });

      if (response.ok) {
        const data = await response.json();
        setSubject(data.data.subject);
        setMessage(data.data.body);
        setShowPrompt(false); // Close the prompt overlay after receiving the response
      } else {
        console.error('Error sending prompt to AI');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isLoaded && (
        <div className="loading-notification">
          <span>Loading...</span>
        </div>
      )}
      <div className="compose-box" style={{ width: '500px' }}>
        <div className="compose-header">
          <span>New Message</span>
          <button className="compose-close" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="compose-body">
          <input
            type="email"
            className="compose-input"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="text"
            className="compose-input"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            className="compose-textarea"
            style={{ fontStyle: isItalic ? 'italic' : 'normal' }}
            value={message}
            onChange={handleMessageChange}
            placeholder="Message"
          ></textarea>
        </div>
        <div className="compose-footer">
          <button className="compose-send-button" onClick={handleSendButtonClick}>
            Send
          </button>
          <div className="compose-icons">
            <button onClick={handleFileButtonClick}>🔗</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button onClick={handlePromptButtonClick}>
              <span className="material-symbols-outlined">🤖</span>
            </button>
            <button onClick={handleItalicButtonClick}>𝐼</button>
            <button onClick={handleDiscardButtonClick}>🗑️</button>
          </div>
        </div>
        {showPrompt && (
          <div className="prompt-overlay">
            <div className="prompt-container">
              <Input
                className="prompt-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size={SIZE.compact}
                placeholder="Ask Anything :)"
                clearable
                clearOnEscape
              />
              <br />
              <Button onClick={handlePromptSubmit} size={SIZE.mini}>
                Enter
              </Button>
              <Button onClick={() => setShowPrompt(false)} size={SIZE.mini}>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ComposeBox;
