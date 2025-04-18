# 🏠 HomeEase - Service Providing Platform 🛠️

Welcome to **HomeEase**! 🎉 This is a MERN stack project built to connect users with skilled workers for home services like carpentry, plumbing, moving, and more. 🛠️✨ The platform allows users to find workers in their city, book services, and leave reviews. Workers can showcase their skills, experience, and availability. 🌟

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How to Run the Project Locally](#how-to-run-the-project-locally)
- [How to Deploy to Render.com](#how-to-deploy-to-rendercom)
- [Features](#features)
- [Screenshots](#screenshots)

## Technologies Used

- **Frontend**:
  - ⚡ Vite + React + TypeScript
  - 🎨 Tailwind CSS
- **Backend**:
  - 🛠️ Express.js + Node.js
  - 🗄️ MongoDB (for database)
  - 🔐 JWT (for authentication)
- **Deployment**:
  - ☁️ Render.com (for both frontend and backend)

## Project Structure

```plaintext
HomeEase/
├── frontend/              # Frontend (Vite + React + TypeScript + Tailwind CSS)
│   ├── public/            # Static assets
│   ├── src/               # React components and pages
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── vite.config.ts     # Vite configuration
│
├── backend/               # Backend (Express.js + Node.js + MongoDB)
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   └── server.js          # Entry point for the backend
│
├── .gitignore             # Files to ignore in Git
├── README.md              # You're here! 😄
└── package.json           # Node.js dependencies and scripts
```

## How to Run the Project Locally

### Prerequisites

- Node.js (v16 or higher) 📦
- MongoDB (local or cloud) 🗄️
- Git (optional) 🐙

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/HomeEase.git
   cd HomeEase
   ```

   - OR simply download code as zip and extract it.

2. **Set Up Environment Variables**:

   - Create a .env file in the `backend` folder.
   - Heres the format:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. **Install Dependencies**:
   - for frontend:
   ```bash
   cd frontend
   npm install
   ```
   - for backend:
   ```bash
   cd backend
   npm install
   ```
4. **Run the Backend**:
   ```bash
   cd backend
   node server.js
   ```
5. **Run the Frontend**:
   ```bash
   cd Frontend
   npm run dev
   ```
6. **Open in Browser**:
   - Go to `http://localhost:5173/` in browser to see the Website.

## How to Deploy to Render.com

For detailed deployment instructions, check out the [Deployment Guide](DEPLOY_GUIDE.md).

## Features

- **User Authentication**: 🔐 Secure login and registration for users and workers.
- **Service Search**: 🔍 Find workers by service type and city.
- **Booking System**: 📅 Book services and track their status.
- **Reviews and Ratings**: ⭐ Rate and review workers after service completion.
- **Responsive Design**: 📱 Works seamlessly on all devices.

## Screenshots

Here are some screenshots of the **HomeEase** platform:

| Row 1                                                               | Row 2                                                                 |
|------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| ![Home](https://github.com/user-attachments/assets/db83896d-7ccb-4707-802d-bd2e77682bcf)  |   ![about](https://github.com/user-attachments/assets/d63bb559-6c26-4ed7-9b66-4472f44b1a6f)                                                       |
|   ![testimonials](https://github.com/user-attachments/assets/e3578501-4c53-4530-85e1-96afd40c035a) |  ![contactus](https://github.com/user-attachments/assets/47540d54-52f3-42b1-bd8e-db5369238dc5)                                                        |
|     ![services](https://github.com/user-attachments/assets/36cc5337-7b16-4e68-a773-facfd7dcc173)      |   ![servicedetails](https://github.com/user-attachments/assets/34f970c3-9489-4b56-b65c-d6549aae6b68) |
|   ![userdashboard](https://github.com/user-attachments/assets/30d953a8-ec8e-4a94-ba8f-4fe72a4a2710)    | ![workerdashboard](https://github.com/user-attachments/assets/df470eaa-7d89-44d8-9787-9728263accc9)    |
|   ![userprofile](https://github.com/user-attachments/assets/7259650f-b8f0-40f1-96fe-024d1a91602f)   |  ![workerprofile](https://github.com/user-attachments/assets/911ff25d-24f7-4947-a8cd-30ad2a5f15e9)    |
|  ![workerdetails](https://github.com/user-attachments/assets/54ba4143-8b80-48c6-a915-93d5731e525b)                                              |                                                   |

Enjoy building and using HomeEase! 🎉 If you have any questions or suggestions, feel free to open an issue or reach out ✨
