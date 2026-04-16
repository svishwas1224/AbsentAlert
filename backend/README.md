# LeaveFlow — Backend

> Current implementation uses browser `localStorage` as the data layer (prototype/demo).
> This folder contains the data schema and seed data for future backend integration.

## Current Storage
All data is persisted in the browser via `localStorage` using three keys:
- `lf_user` — logged-in user session
- `lf_leaves` — all leave applications
- `lf_notifs` — all notifications

## Seed Data
`data/seed.json` — contains the initial demo data structure including users, students, leaves, and notifications.

## Future Backend Stack (Roadmap)
```
backend/
├── server.js            ← Express.js entry point
├── routes/
│   ├── auth.js          ← POST /login, POST /logout
│   ├── leaves.js        ← GET/POST/PATCH /leaves
│   └── notifications.js ← GET /notifications
├── models/
│   ├── User.js          ← Mongoose schema
│   ├── Leave.js
│   └── Notification.js
├── middleware/
│   └── auth.js          ← JWT verification
├── data/
│   └── seed.json        ← Seed data
└── .env                 ← DB_URI, JWT_SECRET, PORT
```

## Planned Tech Stack
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Email Alerts | Nodemailer |
| Real-time | Socket.io (live notifications) |
| Deployment | Railway / Render / AWS EC2 |
