import React, { useState } from 'react';
import axios from 'axios';
import nodemailer from 'nodemailer';

const MailerTemplate = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.resend.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'resend',
                    pass: 're_aJfU9vHL_DGMnihQa24A1Hp4eRV9Nj7KA',
                },
            });

            const mailOptions = {
                from: 'youremail@example.com',
                to: email,
                subject: subject,
                text: message
            };

            const info = await transporter.sendMail(mailOptions);
            setStatus(`Message sent: ${info.messageId}`);
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Recipient's email" required />
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" required />
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" required />
                <button type="submit">Send Email</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default MailerTemplate;