
##watch this video to get a view about the project
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/6h5FVmjph7M/1.jpg)](https://youtu.be/6h5FVmjph7M)



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
   
   - git clone https://github.com/adhithyasimha/mail-box.git
   - cd mailbox
   - cd frontend && npm install
   - cd ../backend && npm install
   

2. Set up `.env` files in `frontend/` and `backend/` with necessary credentials.

3. Start development servers:
npm start
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


