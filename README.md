# AI Interview Agent 🤖

A production-ready AI Interview Agent built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This SaaS-style platform allows users to practice technical and HR interviews with AI-generated feedback.

---

# 🚀 Features

## 📄 Resume Parsing
- Upload resumes in PDF format
- Extract resume details automatically
- Generate interview questions based on skills and experience

## 🤖 AI Interviewing
- Personalized Technical Interview Questions
- Personalized HR Interview Questions
- AI-generated interview flow
- Dynamic question generation using AI

## 📊 Smart Feedback
- AI-generated performance analysis
- Interview score and evaluation
- Detailed feedback report
- Suggestions for improvement

## 💳 Credit System
- Credit-based interview access
- Track remaining credits
- Manage interview usage efficiently

## 💰 Razorpay Payment Integration
- Secure payment gateway integration
- Purchase additional interview credits
- Smooth payment experience

## 🔐 Authentication
- Google Authentication using Firebase
- Secure user login and registration

## 🎨 Modern UI/UX
- Responsive design
- Smooth animations using Framer Motion
- Clean and modern dashboard

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- Framer Motion

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- Firebase Authentication

## Payments
- Razorpay API

## Deployment
- Render

---

# 📂 Folder Structure

```bash
AI-Interview-Agent/
│
├── frontend/                 # Frontend React Application
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/                 # Backend Node.js API
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── package.json
│
├── README.md
└── package.json

.env
MONGO_URI=your_mongodb_connection_string

OPENROUTER_API_KEY=your_openrouter_api_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id


git clone https://github.com/your-username/AI-Interview-Agent.git
