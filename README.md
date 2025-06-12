# 🚀 Shikhun Server – Backend API for Course Management

This is the backend API server for **Shikhun**, a course management application. It provides secure RESTful endpoints to manage users, courses, and enrollments with authentication and authorization using JWT.

---

## 🛠️ Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB** with **Mongoose** ODM  
- **JWT** for authentication  
- Middleware for user authorization and validation  

---

## 📦 Features

- User authentication and authorization with JWT  
- CRUD operations for courses (Create, Read, Update, Delete)  
- Enrollment management (Enroll / Unenroll users)  
- Validation for max enrollment limit per user (3 courses)  
- Secure routes protected by token verification  
- Error handling with meaningful HTTP status codes  

---

## 📋 API Endpoints Overview

| Method | Endpoint                  | Description                       |
|--------|---------------------------|---------------------------------|
| POST   | `/api/register`           | User registration               |
| POST   | `/api/login`              | User login                     |
| GET    | `/api/courses`            | Get all courses                |
| GET    | `/api/courses/:id`        | Get course details by ID       |
| POST   | `/api/courses`            | Create new course (protected)  |
| PUT    | `/api/courses/:id`        | Update course (protected)      |
| DELETE | `/api/courses/:id`        | Delete course (protected)      |
| GET    | `/api/myEnrollments`      | Get courses current user enrolled in (protected) |
| PUT    | `/api/enroll/:courseId`   | Toggle enrollment (enroll/unenroll) |
| DELETE | `/api/removeEnrollment/:courseId` | Remove user enrollment from course |

---

## 🔧 Installation & Setup

1. Clone the repository  
```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-Sulayman-WebMaster 
cd shikhun-server
