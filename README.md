# 💬 Real-time Chat App

A simple real-time chat app using **Node.js**, **React**, **Socket.IO**, and **MongoDB**.

## 🚀 Features

- Real-time messaging
- User authentication (JWT)
- Private & group chats
- Message history (MongoDB)
- Responsive UI

## 🛠️ Tech Stack

- React (Frontend)
- Node.js + Express (Backend)
- MongoDB (Database)
- Socket.IO (Real-time)
- JWT (Auth)

## ⚙️ Setup Instructions

### Frontend

```bash
cd frontend
cp .env.example .env
# Update .env:
# REACT_APP_API_URL=http://localhost:8000
npm install
npm start
```

### Backend

```bash
cd backend
cp .env.example .env
# Update .env:
# PORT=8000
# SecretJWT=your_secret
# mongoDbUrl=mongodb://localhost:27017/chat-app
npm install
npm run dev
```

### Production

```bash
npm run build   # Frontend
npm start       # Backend
```

## 📄 License

MIT License
