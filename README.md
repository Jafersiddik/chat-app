# 💬 Real-time Chat App

A simple chat application that allows users to chat in real-time using **Socket.IO**, **Node.js**, **React.js**, and **MongoDB**.

---

## 🚀 Features

- ⚡ Real-time messaging with Socket.IO  
- 🔐 User authentication using JWT  
- 💬 Private and group chats  
- 🧾 Message history stored in MongoDB  
- 📱 Responsive design for mobile & desktop  

---

## 🛠️ Technologies Used

- **Frontend:** React.js  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **Real-time Communication:** Socket.IO  
- **Authentication:** JWT  

---

## 📦 Setup Instructions

### 🔧 Prerequisites

- Node.js and npm installed  
- MongoDB running locally  
- (Optional) Postman for API testing

---

### 🖥️ Frontend Setup (React)

1. **Navigate to the main directory:**
   ```bash
   cd chat-app
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env`:**
   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```
   - App will run at `http://localhost:3000`


### 🛠️ Backend Setup (Node.js + Express)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env`:**
   ```
   PORT=8000
   SecretJWT=your_jwt_secret
   mongoDbUrl=your_mongo_deb_url
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Run in development mode:**
   ```bash
   npm run dev
   ```
   - Backend server will run at `http://localhost:8000`


### 🚀 Production Build

1. **Build frontend:**
   ```bash
   npm run build
   ```

2. **Start backend in production mode:**
   ```bash
   npm start
   ```

