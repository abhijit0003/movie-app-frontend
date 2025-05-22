# 🎬 MovieHub – MERN Stack Movie App

A full-stack movie management web app with both **User** and **Admin** roles. Built using the MERN stack and styled using Material UI.

---

## 🔗 Live URLs

- **Frontend (Vercel)**: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)
- **Backend (Railway)**: [https://your-backend-url.up.railway.app](https://your-backend-url.up.railway.app)

---

## ✨ Features

### 👤 User Features
- View IMDb-style movie details
- Search movies by name or description
- Sort by name, rating, release date, or duration

### 🛠 Admin Features
- Add new movie
- Edit movie details
- Delete movie

---

## 🧰 Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Frontend  | React + Vite + Material UI|
| Backend   | Node.js + Express         |
| Database  | MongoDB Atlas             |
| Auth      | JWT (JSON Web Token)      |
| API       | OMDb API (Movie data)     |
| Hosting   | Vercel (Frontend), Railway (Backend) |

---

## 📘 API Documentation

All API routes are prefixed with:
https://your-backend-url.up.railway.app/api


### 🔹 Public (User)

| Method | Route                             | Description                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/movies`                         | Get all movies                       |
| GET    | `/movies/search?query=batman`     | Search by name or description        |
| GET    | `/movies/sorted?sortBy=rating`    | Sort by rating/title/date/duration   |

### 🔐 Admin (Protected with Token)

| Method | Route             | Description           |
|--------|------------------|------------------------|
| POST   | `/movies`        | Add movie             |
| PUT    | `/movies/:id`    | Update movie          |
| DELETE | `/movies/:id`    | Delete movie          |

> Requires `Authorization: Bearer <token>`

### 🔑 Auth

| Method | Route         | Description      |
|--------|---------------|------------------|
| POST   | `/auth/login` | Login and get JWT|
| POST   | `/auth/register` | Register       |

---

## ⚙️ Environment Variables

### Frontend (.env)
VITE_API_BASE_URL=https://your-backend-url.up.railway.app/api

### Backend (.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


---
## 💻 How to Run the Project Locally

### 1. Clone Repositories

```bash
git clone https://github.com/abhijit0003/movie-app-frontend
git clone https://github.com/abhijit0003/movie-app-backend

### 2. Install Dependencies
# Frontend
cd movie-app-frontend
npm install

# Backend
cd ../movie-app-backend
npm install

### 3. Start the Servers
# Backend
npm run dev

# Frontend
cd ../movie-app-frontend
npm run dev
