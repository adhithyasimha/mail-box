Certainly! Here's the full updated README with the changes incorporated:

```markdown
# MailBox - Modern Email Client

## Introduction

MailBox is a feature-rich email client built with React and Node.js, offering real-time inbox updates, email composition, and advanced search capabilities.

## Key Features

- Secure authentication
- Real-time inbox management
- AI-powered email content generation
- Advanced search functionality
- Responsive design

## Core Technologies

- Frontend: React, Base Web UI, GSAP
- Backend: Node.js, Express.js, Supabase
- Authentication: Custom implementation with Supabase
- AI: Google's Generative AI

## Setup

1. Clone and install dependencies:
   ```
   git clone https://github.com/yourusername/mailbox.git
   cd mailbox
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. Set up `.env` files in `frontend/` and `backend/` with necessary credentials.

3. Start development servers:
   ```
   # Backend
   npm run dev

   # Frontend
   npm start
   ```

## Key Components and Code Snippets

### ComposeBox Component

```javascript
const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, from, subject, text: message, fileName, fileContent }),
    });
    const data = await response.json();
    
    if (data.success) {
      setStatus(200);
      setStatusMessage(data.message);
      onClose();
    } else {
      setStatus(response.status);
      setStatusMessage(data.error || 'Failed to send message');
    }
  } catch (error) {
    setStatus(null);
    setStatusMessage('An error occurred');
  }
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
      setShowPrompt(false);
    } else {
      console.error('Error sending prompt to AI');
    }
  } catch (error) {
    console.error(error);
  }
};
```

### InboxComponent

```javascript
useEffect(() => {
  const fetchMails = async () => {
    let { data, error } = await supabase
      .from('inboxMails')
      .select('*');
    
    if (error) console.error(error);
    else setInboxMails(data);
  };
  fetchMails();
}, []);
```

### Navbar Component (Search)

```javascript
const handleSearch = debounce(async (query) => {
  if (query.length > 2) {
    try {
      const [inboxResult, sentResult] = await Promise.all([
        supabase
          .from('inboxMails')
          .select('*')
          .or(`from_address.ilike.%${query}%,to_address.ilike.%${query}%,subject.ilike.%${query}%,body.ilike.%${query}%`),
        supabase
          .from('sentMails')
          .select('*')
          .or(`from_mail.ilike.%${query}%,to_mail.ilike.%${query}%,subject.ilike.%${query}%,message.ilike.%${query}%`)
      ]);

      if (inboxResult.error) throw inboxResult.error;
      if (sentResult.error) throw sentResult.error;

      setResults([...inboxResult.data, ...sentResult.data]);
    } catch (error) {
      console.error('Search error:', error);
    }
  } else {
    setResults([]);
  }
}, 300);
```

## API Endpoints

- `POST /api/send-email`: Send an email
- `GET /api/supabase-sent`: Fetch sent emails
- `POST /api/ai`: Generate AI email content

## Security Features

- Secure authentication with Supabase
- Automatic session timeout
- CORS configuration

## Deployment

1. Set up production database
2. Configure production environment variables
3. Build frontend: `cd frontend && npm run build`
4. Deploy backend to hosting platform
5. Set up web server to serve frontend and proxy API requests

## Contributing

Contributions are welcome via Pull Requests.

## License

[MIT License](LICENSE)
```

This updated README now includes more detailed code snippets for the key components, especially the search functionality in the Navbar component. It provides a comprehensive overview of the project's features, setup instructions, and core functionalities, making it easier for developers to understand and potentially contribute to the project.
