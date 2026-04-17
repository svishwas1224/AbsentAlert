# 🎓 AbsentAlert — Automated Leave Intimation System for Colleges

> A full-stack leave management system — React frontend + Flask backend + SQLite database.

---

## 👥 Team Members
| Name | Role |
|---|---|
| Sudeep | Frontend & UI Design |
| Bhagyaraj | Logic & Integration |
| Vishwas | Backend Architecture & Storage |
| Sumukha | Testing & Documentation |

---

## 🚨 Problem Statement
In many colleges, leave management is still handled manually. Students submit handwritten applications and wait for approval without knowing the status. This leads to delays, confusion, and sometimes loss of records. Faculty also face difficulty in tracking student leave and attendance due to the lack of a centralized system.

---

## 💡 Proposed Solution
AbsentAlert is a web-based system that simplifies and automates the leave application process. Students can apply for leave online, and faculty can easily approve or reject requests. The system provides real-time updates and stores all records digitally, making the process faster, transparent, and easy to manage.

---

## ✨ Key Features
- 🎓 Student portal to apply for leave online
- 👨‍🏫 Faculty dashboard to approve or reject requests
- 🔔 Real-time status tracking with instant notifications
- 📅 Leave calendar view with visual day markers
- 📊 Simple dashboard for monitoring leave data
- 🗂️ Digital record of all leave requests
- 📈 Reports & Analytics — leave type breakdown, approval rate, month-wise trends
- ⚠️ Attendance alerts for high absenteeism

---

## 🛠 Technology Stack
| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Styling | CSS3 — custom properties, glassmorphism, grid, animations |
| Logic | JavaScript ES6+ |
| Backend | Flask (Python) |
| Database | SQLite (via Flask-SQLAlchemy) → MongoDB Atlas (production) |
| Deployment | Render / Railway / Static Hosting |

---

## 🚀 Getting Started

### Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
# API runs at http://localhost:5000
```

### Frontend (React)
```bash
cd frontend-react
npm install
npm run dev
# App runs at http://localhost:3000
```

### Demo Credentials
| Role | Email | Password |
|---|---|---|
| 🎓 Student | student@demo.com | 1234 |
| 👨‍🏫 Faculty | faculty@demo.com | 1234 |

---

## 📁 Project Structure
```
AbsentAlert/
├── backend/
│   ├── app.py              ← Flask entry point
│   ├── models.py           ← SQLAlchemy models (User, Leave, Notification)
│   ├── extensions.py       ← db instance
│   ├── seed.py             ← Demo data seeder
│   ├── requirements.txt
│   ├── routes/
│   │   ├── auth.py         ← POST /api/auth/login, logout, me
│   │   ├── leaves.py       ← GET/POST /api/leaves, PATCH /api/leaves/:id
│   │   └── notifications.py← GET /api/notifications, PATCH read-all
│   ├── seed.py             ← Auto-seeds demo data on first run
├── frontend-react/
│   ├── src/
│   │   ├── App.jsx         ← Root component + routing
│   │   ├── api.js          ← Centralized API calls
│   │   ├── index.css       ← All styles
│   │   ├── context/AuthContext.jsx
│   │   ├── hooks/useToast.js
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Toast.jsx
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── StudentDashboard.jsx
│   │       └── FacultyDashboard.jsx
│   └── vite.config.js      ← Proxy /api → Flask :5000
└── frontend/               ← Legacy static HTML (reference only)
```

---

## 📊 Expected Impact
- Reduces leave processing time from **days → minutes**
- Eliminates lost paperwork and manual follow-ups
- Full transparency for students on application status
- Clean dashboard for faculty to manage their mentee group
- Digital audit trail and attendance analytics

---

*Built for college hackathon — Team AbsentAlert (Sudeep, Bhagyaraj, Vishwas, Sumukha)*
