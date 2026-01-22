# Civix – Digital Civic Engagement Platform (Backend)

## Overview

This repository contains the backend service for Civix, a Digital Civic Engagement Platform designed to model real-world governance workflows.

The backend enables citizens to raise petitions, sign petitions, participate in polls, and allows government officials to review, respond, and generate analytical reports based on jurisdiction.

The system is built using Node.js, Express, and MongoDB, with strong emphasis on security, role-based access control, location-based authorization, audit logging, and aggregation-driven reporting.

This backend goes beyond basic CRUD operations and reflects realistic civic governance system design.

---

## Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- MongoDB Aggregation Framework  
- CSV Reporting  
- Git and GitHub  

---

## Core Features

### Authentication and Authorization
- Secure JWT-based authentication
- Role-based access control with two roles:
  - citizen
  - official
- Protected routes using middleware
- Authorization enforced strictly at backend level

---

### Petition Management
- Citizens can create petitions with category and location
- Petition lifecycle managed using status:
  - active
  - under_review
  - closed
- Petitions are strictly filtered by location

---

### Governance Actions (Officials)
- Officials can view petitions only within their jurisdiction
- Officials can respond to petitions
- Officials can update petition status
- Location-based authorization enforced on every governance action

---

### Audit Logging
- All official actions are recorded using admin logs
- Each log captures:
  - Action performed
  - Official user
  - Related petition (if applicable)
  - Timestamp
- Ensures accountability and traceability

---

### Signatures and Public Support
- Citizens can sign petitions
- Duplicate signatures prevented at database level
- Signatures aggregated per petition for analytics

---

### Polls and Voting
- Polls are created for specific locations
- Citizens can vote on polls
- Each vote stores:
  - Selected option
  - User reference
  - Location snapshot at the time of voting
- Duplicate voting prevented using database constraints

---

### Reporting and Analytics

Reporting is implemented using MongoDB aggregation pipelines rather than application-side logic.

Reports include:
- Petition counts grouped by status
- Signature counts per petition
- Poll vote counts per poll (location-based)

All reports are:
- Generated dynamically
- Scoped to the official’s jurisdiction
- Processed entirely on the backend

---

### CSV Export
- Officials can export reports as CSV files
- CSV output is compatible with Excel and Google Sheets
- Implemented without third-party file-processing libraries

---

## API Structure (High Level)

- /api/auth  
- /api/petitions  
- /api/governance  
- /api/reports  
- /api/reports/export  

All governance and reporting APIs are protected using authentication and role-based authorization.

---

## Project Structure

src/
├── controllers/
│ ├── authController.js
│ ├── petitionController.js
│ ├── governanceController.js
│ ├── reportController.js
│
├── models/
│ ├── User.js
│ ├── Petition.js
│ ├── Signature.js
│ ├── Poll.js
│ ├── Vote.js
│ ├── AdminLog.js
│
├── routes/
│ ├── authRoutes.js
│ ├── petitionRoutes.js
│ ├── governanceRoutes.js
│ ├── reportRoutes.js
│
├── middleware/
│ ├── authMiddleware.js
│ ├── roleMiddleware.js
│
└── server.js 


---

## Security Considerations

- Environment variables managed via `.env`
- Secrets are never committed to the repository
- JWT secrets are never exposed to frontend
- Location-based authorization enforced at backend
- No sensitive data leaked through APIs

---

## Running the Backend Locally

Install dependencies:

npm install 

Dependencies:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- cors
- cookie-parser
- helmet
- express-rate-limit
- morgan

Dev Dependencies:
- nodemon


Create a `.env` file:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret

Start the server:

npm run dev

Server runs at: http://localhost:5000


---

## Milestone Coverage

### Milestone 1
- User registration and login
- Role-based access (citizen, official)
- Location field in user model
- Secure authentication

### Milestone 2–3
- Petition creation
- Signatures
- Polls and voting
- Role-protected APIs

### Milestone 4
- Governance APIs for officials
- Petition response workflow
- Admin audit logs
- Aggregation-based analytics
- CSV report export

---

## Development Notes

- MongoDB aggregation is used instead of manual counting
- Audit logs ensure accountability
- CSV export implemented without external dependencies
- Temporary test routes (if present) are not part of production APIs

---

## Author

Backend developed as part of an academic project focused on building a secure, realistic, and accountable digital governance system.

---

## Final Note

This backend prioritizes correctness, security, and real-world system design.
All critical logic such as authorization, auditing, and analytics is handled entirely on the backend.
