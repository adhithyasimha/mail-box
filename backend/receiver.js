const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const { createClient } = require('@supabase/supabase-js');

// Set up Supabase
const supabaseUrl = 'supaurl';
const supabaseKey = 'supakey'
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to extract email address from a string
const extractEmail = (address) => {
  const match = address.match(/<([^>]+)>/);
  return match ? match[1] : address;
};

// Set up SMTP server
const smtpServer = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  disabledCommands: ['AUTH'],
  onConnect(session, cb) {
    console.log(`onConnect`, session.id);
    cb();
  },
  onMailFrom(address, session, cb) {
    console.log(`onMailFrom`, session.id);
    cb();
  },
  onRcptTo(address, session, cb) {
    console.log(`onRcptTo`, address.address, session.id);
    cb();
  },
  onData(stream, session, cb) {
    let emailData = {
      sessionId: session.id,
      from_address: '',
      to_address: '',
      subject: '',
      date: '',
      body: '',
      attachments: []
    };

    simpleParser(stream, {}, async (err, parsed) => {
      if (err) {
        console.error('Error parsing email:', err);
        return cb(err);
      }

      emailData.from_address = extractEmail(parsed.from.text);
      emailData.to_address = parsed.to.value.map(addr => extractEmail(addr.address)).join(', ');
      emailData.subject = parsed.subject;
      emailData.date = parsed.date;
      emailData.body = parsed.text;

      parsed.attachments.forEach(attachment => {
        emailData.attachments.push({
          filename: attachment.filename,
          content: attachment.content.toString('base64')
        });
      });

      console.log('Email received:', emailData);

      try {
        const { error } = await supabase
          .from('inboxMails')
          .insert([{
            sessionId: emailData.sessionId,
            from_address: emailData.from_address,
            to_address: emailData.to_address,
            subject: emailData.subject,
            date: emailData.date,
            body: emailData.body,
            attachments: JSON.stringify(emailData.attachments)
          }]);

        if (error) {
          console.error('Error inserting email:', error.message);
        } else {
          console.log('New email inserted into Supabase successfully!');
        }
      } catch (error) {
        console.error('Error during email processing:', error.message);
      }

      cb();
    });
  }
});

smtpServer.listen(25, () => {
  console.log("Mail server is running on port 25");
});