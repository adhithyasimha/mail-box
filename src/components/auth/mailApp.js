import React, { useState } from 'react';
import nodemailer from 'nodemailer';
import MailerAuth from './MailerAuth';
import MailerTemplate from './MailerTemplate';

const MailApp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [transporter, setTransporter] = useState(null);

    const handleAuth = (smtpHost, smtpPort, secure, user, password) => {
        try {
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: secure,
                auth: {
                    user: user,
                    pass: password,
                },
            });

            // Test connection
            transporter.verify((error, success) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Server is ready to take our messages');
                    setTransporter(transporter);
                    setIsAuthenticated(true);
                }
            });
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <MailerTemplate transporter={transporter} />
            ) : (
                <MailerAuth onAuth={handleAuth} />
            )}
        </div>
    );
};

export default MailApp;