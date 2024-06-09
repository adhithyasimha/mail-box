import React, { useState, useEffect } from 'react';
import './style.css';
import { SpaBase } from 'spabase';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API Key

const MailInbox = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await SpaBase.get('/api/messages'); // replace with your API endpoint
      setData(response.data);
    };

    fetchData();
  }, []);

  const sendEmail = async (email, subject, text) => {
    const msg = {
      to: email, // Change to your recipient
      from: 'your-email@example.com', // Change to your verified sender
      subject: subject,
      text: text,
    }

    try {
      await sgMail.send(msg);
      console.log('Email sent')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="main-section" id='Inbox'>
      {/* Render your data here */}
    </div> 
  );
};

export default MailInbox;