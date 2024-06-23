// const { SMTPServer } = require('smtp-server');
// const MailParser = require('mailparser-mit').MailParser;
// const { createClient } = require('@supabase/supabase-js');

// // Set up Supabase
// const supabaseUrl = 'https://djkrtmwwfohyonafoumv.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3J0bXd3Zm9oeW9uYWZvdW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1MTY5MjYsImV4cCI6MjAzNDA5MjkyNn0.coE-6KquwZi_KQlc893niek7iuSV-B7U46oNVGt3cp8';
// const supabase = createClient(supabaseUrl, supabaseKey);

// const smtpServer = new SMTPServer({
//     allowInsecureAuth: true,
//     authOptional: true,
//     disabledCommands: ['AUTH'],
//     onConnect(session, cb) {
//         console.log(`onConnect`, session.id);
//         cb();
//     },
//     onMailFrom(address, session, cb) {
//         console.log(`onMailFrom`, session.id);
//         cb();
//     },
//     onRcptTo(address, session, cb) {
//         console.log(`onRcptTo`, address.address, session.id);
//         cb();
//     },
//     onData(stream, session, cb) {
//         let emailData = {
//             sessionId: session.id,
//             from_address: '',
//             to_address: '',
//             subject: '',
//             date: '',
//             body: '',
//             attachments: []
//         };

//         const mailParser = new MailParser();

//         mailParser.on('headers', (headers) => {
//             emailData.from_address = headers.get('from').value[0].address;
//             emailData.to_address = headers.get('to').text;
//             emailData.subject = headers.get('subject');
//             emailData.date = headers.get('date');
//         });

//         mailParser.on('data', async (data) => {
//             if (data.type === 'text') {
//                 emailData.body += data.text;
//             } else if (data.type === 'attachment') {
//                 const base64Content = data.content.toString('base64');
//                 emailData.attachments.push({
//                     filename: data.filename,
//                     content: base64Content
//                 });
//             }
//         });

//         mailParser.on('end', async () => {
//             console.log('Email received:', emailData);

//             try {
//                 const { error } = await supabase
//                     .from('inboxMails')
//                     .insert([{
//                         sessionId: emailData.sessionId,
//                         from_address: emailData.from_address,
//                         to_address: emailData.to_address,
//                         subject: emailData.subject,
//                         date: emailData.date,
//                         body: emailData.body,
//                         attachments: JSON.stringify(emailData.attachments)
//                     }]);

//                 if (error) {
//                     console.error('Error inserting email:', error.message);
//                 } else {
//                     console.log('New email inserted into Supabase successfully!');
//                 }
//             } catch (error) {
//                 console.error('Error during email processing:', error.message);
//             }

//             cb();
//         });

//         stream.pipe(mailParser);
//     }
// });

// smtpServer.listen(25, () => {
//     console.log("Mail server is running on port 25");
// });
