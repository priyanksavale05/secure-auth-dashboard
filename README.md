# 🔐 Secure Auth Dashboard

A **production-ready SaaS authentication & security monitoring dashboard** built with React and Firebase.

---

## 🚀 Features

* 🔐 **Authentication System**

  * Google Sign-In
  * Email & Password Login
  * Password Reset & Email Verification

* 📊 **Security Dashboard**

  * Real-time user activity monitoring
  * Session tracking & login history
  * Device fingerprint logging (User-Agent based)

* 📡 **Telemetry Engine**

  * Logs LOGIN, SESSION_CREATED events
  * Stores structured activity in Firestore
  * Real-time UI updates from backend

* 🛡 **Security Features**

  * Multi-session awareness
  * Logout from all devices (frontend simulated)
  * Clean role-based UI structure (extendable)

* 🎯 **Modern SaaS UI**

  * Dark mode dashboard
  * Responsive layout
  * Modular component architecture

---

## 🛠 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Firebase Authentication + Firestore
* **State Management:** React Context API
* **UI:** Custom components + modern dashboard design

---

## 📷 Screenshots

<img width="1489" height="1095" src="https://github.com/user-attachments/assets/50ef1d00-99ae-48c0-be80-cd56043a47da" />
<img width="1919" height="1097" src="https://github.com/user-attachments/assets/535e7e8a-5e14-4e3d-af0e-a7de5250db10" />
<img width="1919" height="1139" src="https://github.com/user-attachments/assets/5a70a0a3-4d3a-4410-ba82-2913c0988a52" />

---

## ⚙️ Setup

```bash
git clone https://github.com/priyanksavale05/secure-auth-dashboard.git
cd secure-auth-dashboard
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

---

## 🧠 Architecture

```
User → Firebase Auth → Firestore (logs + users) → React Dashboard
```

---

## 📌 Future Improvements

* 🔍 New Device Detection (IP-based)
* 🛡 Suspicious Login Alerts
* 👨‍💼 Admin Panel (RBAC)
* 📊 Advanced Analytics Dashboard
* 🌐 Deploy to production (Vercel / Firebase Hosting)

---

## 👨‍💻 Author

**Priyank Savale**
📧 [omsavale18@gmail.com](mailto:omsavale18@gmail.com)
🔗 https://github.com/priyanksavale05
