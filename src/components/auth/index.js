import React, { useState } from 'react';
import './style.css';

const MailerAuth = () => {
    const [smtpHost, setSmtpHost] = useState('');
    const [smtpPort, setSmtpPort] = useState('');
    const [secure, setSecure] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can call the function to authenticate the user with nodemailer
        // You can pass the state variables to that function
    };

    return (
        <div className='authSection'>
            <div className='formSection'>
                <h2>Welcome to Mail Box </h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={smtpHost} onChange={e => setSmtpHost(e.target.value)} placeholder="SMTP Host" required />
                    <input type="number" value={smtpPort} onChange={e => setSmtpPort(e.target.value)} placeholder="SMTP Port" required />
                    <label>
                        <input type="checkbox" checked={secure} onChange={e => setSecure(e.target.checked)} />
                        Secure
                    </label>
                    <input type="email" value={user} onChange={e => setUser(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Authenticate</button>
                </form>
            </div>
        </div>
    );
};

export default MailerAuth;