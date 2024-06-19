import React, { useRef, useState, useEffect } from 'react';
import './ComposeBox.css';
import { Input } from 'baseui/input';
import { Spinner } from 'baseui/icon';
import { Button, KIND, SHAPE } from 'baseui/button';

// icons
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import { ArrowRight } from 'baseui/icon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';

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

  const handleSubmit = async () => {
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
        onClose();
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendButtonClick = () => {
    handleSubmit();
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePromptSubmit();
    }
  };

  // function to close the compose-box when the user clicks esc button
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {!isLoaded && (
        <div className='loading-notification'>
          <Spinner $color='#5B91F5' />
        </div>
      )}
      <div className="compose-box">
        <div className="compose-header">
          <span>New Message</span>
          <button className="compose-close" onClick={onClose}>
            <CloseIcon />
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
        {showPrompt && (
          <div className="prompt-overlay">
            <div className="prompt-container">
              <Input
                className="prompt-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
                size="compact"
                placeholder="Ask Anything :)"
                endEnhancer={
                  <>
                    <span className="prompt-icon" onClick={handlePromptSubmit}>
                      <SendIcon/>
                    </span>
                    <span className="prompt-icon" onClick={handlePromptButtonClick}>
                      <CloseIcon />
                    </span>
                  </>
                }
              />
            </div>
          </div>
        )}
        <div className="compose-footer">
          <Button className="compose-send-button" onClick={handleSendButtonClick} startEnhancer={()=><ArrowRight size={24} title=''/>}>
            Send
          </Button>
          <div className="compose-icons">
            <button className='Ai-btn' onClick={handlePromptButtonClick}>
              <span>ask AI</span>
              <div className='ai-icon'>
                {/* Your SVG icon here */}
              </div>
            </button>
            <Button onClick={handleFileButtonClick} kind={KIND.tertiary} shape={SHAPE.pill}>
              <LinkIcon />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button onClick={handleItalicButtonClick} kind={KIND.tertiary} shape={SHAPE.pill}>
              <FormatItalicIcon />
            </Button>
            <Button onClick={handleDiscardButtonClick} kind={KIND.tertiary} shape={SHAPE.pill}>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposeBox;
