# 🎬 MovieHub – MERN Stack Movie App

A full-stack movie management web app with both **User** and **Admin** roles. Built using the MERN stack and styled using Material UI.

---

## 🔗 Live URLs

- **Frontend (Vercel)**: [https://movie-app-frontend-git-main-abhijit0003s-projects.vercel.app]
(https://movie-app-frontend-git-main-abhijit0003s-projects.vercel.app)
- **Backend (Railway)**: [https://movie-app-backend-production-5e7b.up.railway.app/api]
(https://movie-app-backend-production-5e7b.up.railway.app/api)

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
https://movie-app-backend-production-5e7b.up.railway.app/api


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
VITE_API_BASE_URL=https://movie-app-backend-production-5e7b.up.railway.app/api

### Backend (.env)
MONGO_URI=mongodb+srv://admin:admin123@movieappcluster.nemryeq.mongodb.net/?retryWrites=true&w=majority&appName=movieAppCluster
PORT=5000
JWT_SECRET=thisissecret


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
