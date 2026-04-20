# 🔐 Secure Auth Dashboard

A production-ready **SaaS Authentication & Security Dashboard** built using React and Firebase.  
This project simulates a real-world identity system with **real-time session tracking, device monitoring, and security logs**.

---

## 🌐 Live Demo

👉 https://your-vercel-link.vercel.app

---

## 🧠 What This Project Solves

Modern applications require secure and trackable authentication systems.

This project demonstrates:
- User session tracking  
- Device monitoring  
- Authentication event logging  
- Real-time security insights  

---

## 🚀 Features

### 🔐 Authentication
- Google Sign-In (Firebase)  
- Email & Password Login  
- Email Verification  
- Password Reset  

### 📊 Security Dashboard
- Real-time dashboard UI  
- Session tracking  
- Login activity logs  
- User activity timeline  

### 📡 Firestore Integration
- Stores user data  
- Logs events (LOGIN, LOGOUT, SESSION_CREATED)  
- Timestamp-based tracking  

### 🖥️ Device Tracking
- Captures browser/device info (User-Agent)  
- Displays device details in logs  

### 🎯 UI/UX
- Clean SaaS dashboard  
- Responsive design  
- Modular React components  

---
## 🔑 Environment Variables

Create a `.env` file in root:

VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id

---

Firestore Data Structure
users collection
users/{uid}
- displayName
- email
- role
- createdAt
- lastLogin
logs collection
logs/{logId}
- uid
- event (LOGIN / LOGOUT / SESSION_CREATED)
- provider
- device
- timestamp

---

📈 Resume Highlights
Built full-stack authentication system using Firebase
Designed real-time security logging architecture
Implemented device tracking using User-Agent parsing
Developed scalable Firestore schema for logs
Created responsive SaaS dashboard using React
Deployed production-ready app on Vercel 

---
📌 Future Improvements
Suspicious login detection
Role-based access control (RBAC)
Admin dashboard
Analytics charts
Export logs (CSV / PDF)

---
## 🛠 Tech Stack

**Frontend**
- React (Vite)  
- Tailwind CSS  

**Backend**
- Firebase Authentication  
- Firebase Firestore  

**Deployment**
- Vercel  

---

## 📷 Screenshots

![Dashboard](https://github.com/user-attachments/assets/50ef1d00-99ae-48c0-be80-cd56043a47da)  
![Login](https://github.com/user-attachments/assets/535e7e8a-5e14-4e3d-af0e-a7de5250db10)  
![UI](https://github.com/user-attachments/assets/5a70a0a3-4d3a-4410-ba82-2913c0988a52)  

---

## ⚙️ Setup

```bash
git clone https://github.com/priyanksavale05/secure-auth-dashboard.git
cd secure-auth-dashboard
npm install
npm run dev


👨‍💻 Author
Priyank Savale
