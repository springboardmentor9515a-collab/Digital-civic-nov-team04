"# Backend service" 
# Civix Backend – Milestone 1

This backend handles user registration, login, and role-based access for the Civix project.
It uses Node.js, Express, and MongoDB.

Milestone 1 focuses on:
- User roles (citizen or official)
- Secure authentication
- Location field
- Verification-ready user model

## How to run the backend

1. Go into the backend folder:

   cd BACKEND

2. Install packages:

   npm install

3. Create a `.env` file with:

   PORT=5000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret
   JWT_EXPIRES_IN=7d

4. Start the server:

   npm run dev

The backend runs at http://localhost:5000

## APIs implemented (Milestone 1)

### Register
POST /api/auth/register  
Creates a new user. Saves name, email, password, role, and location.

### Login
POST /api/auth/login  
Checks credentials and returns a JWT in an HttpOnly cookie.

### Session
GET /api/auth/me  
Returns the logged-in user’s profile.

## Role-based Access

Two roles:
- citizen
- official

Test routes used to verify roles:
- /api/test/citizen
- /api/test/official

## User Model Fields

- name  
- email (unique)  
- password (hashed)  
- role (citizen or official)  
- location  
- isVerified (future)  
- govtIdNumber (future)  
- verificationDocument (future)  
- timestamps

This completes backend Milestone 1.
