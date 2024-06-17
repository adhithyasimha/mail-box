import React, { useRef, useState, useEffect } from 'react';
import './ComposeBox.css';
import { Input } from 'baseui/input';
import { Spinner } from 'baseui/icon';

// icons 
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import { ArrowRight } from 'baseui/icon';
import CloseIcon from '@material-ui/icons/Close';



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
        onClose();
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePromptSubmit();
    }
  };

  const handleSubmit = () => {
    handlePromptSubmit();
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
                    <span className="prompt-icon" onClick={handleSubmit}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{ cursor: 'pointer' }}>
                        <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                      </svg>
                    </span>
                    <span className="prompt-icon" onClick={onClose}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" style={{ cursor: 'pointer' }}>
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </span>
                  </>
                }
              />
            </div>
          </div>
        )}
        <div className="compose-footer">
          <Button className="compose-send-button" 
            onClick={handleSendButtonClick}
            startEnhancer={()=><ArrowRight size={24} title=''/>}>
            Send
          </Button>
          <div className="compose-icons">
            <button className='Ai-btn' onClick={handlePromptButtonClick}>
            <span>ask AI</span>
              <div className='ai-icon'>
                <svg width="20" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 52.9608C26.6871 51.9109 48 29.9445 48 3C48 30.6143 70.3857 53 98 53C71.3929 53 49.64 73.7825 48.0885 100H47.9115C46.399 74.4425 25.6895 54.0498 0 53.0392V52.9608ZM100 53.0392C99.3365 53.0131 98.6698 53 98 53C98.4418 53 98.8823 52.9943 99.3214 52.9829C99.3984 52.9809 99.4753 52.9788 99.5522 52.9764C99.7017 52.9719 99.8508 52.9666 100 52.9608V53.0392ZM48 3C48 1.99274 48.0298 0.992493 48.0885 0H47.9115C47.9702 0.992493 48 1.99274 48 3Z" fill="url(#paint0_linear_150_249)"/>
                <defs>
                <linearGradient id="paint0_linear_150_249" x1="0.0475285" y1="40.3846" x2="100" y2="40.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#688AE9"/>
                <stop offset="1" stop-color="#C66D7B"/>
                </linearGradient>
                </defs>
                </svg>
              </div>
            </button>
            <Button onClick={handleFileButtonClick} kind={KIND.tertiary}>
              <LinkIcon />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button onClick={handleItalicButtonClick} kind={KIND.tertiary}>
              <FormatItalicIcon />
            </Button>
            <Button onClick={handleDiscardButtonClick} kind={KIND.tertiary}>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposeBox;

