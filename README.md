# DevPulse Backend API

**DevPulse** is a collaborative internal tech issue & feature tracker for software teams. It allows team members to report bugs, suggest features, and coordinate resolutions efficiently with role-based access control.

---

## 🔗 Important Links
- **Live Deployment:** [https://dev-pulse-ebon-eight.vercel.app](https://dev-pulse-ebon-eight.vercel.app)
- **GitHub Repository:** [https://github.com/Md-SalmanHossen/DevPulse](https://github.com/Md-SalmanHossen/DevPulse)



## ✨ Key Features
- 🔐 **Secure Authentication:** JWT-based login/signup with `bcrypt` password hashing (salt rounds: 10).
- 👥 **Role-Based Access Control (RBAC):** Strict permission checks for `contributor` and `maintainer` roles.
- 🗄️ **Raw SQL Queries:** Direct `pg` pool queries without any ORM or Query Builder, ensuring optimal performance and strict adherence to constraints (No SQL JOINs).

- 🚀 **Optimized Data Fetching:** Reporter data is fetched in a separate batch query and merged in the application layer to avoid SQL JOINs.
- 🛡️ **Centralized Error Handling:** Custom `AppError` class and global error handler for consistent API responses.
- 🧩 **Modular Architecture:** Clean separation of concerns using Controllers, Services, Routes, and Middlewares.


## 🛠️ Technology Stack
- **Runtime:** Node.js (v24.x+)
- **Language:** TypeScript (Strict mode)
- **Framework:** Express.js
- **Database:** PostgreSQL (Native `pg` driver, Raw SQL)
- **Security:** `bcrypt` (password hashing), `jsonwebtoken` (JWT)
- **Utilities:** `http-status-codes`, `dotenv`, `cors`

---

## 🗄️ Database Schema Summary

### 1. `users` Table
| Column | Type | Constraints |
| :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY |
| `name` | VARCHAR(100) | NOT NULL |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL |
| `password` | TEXT | NOT NULL (Hashed) |
| `role` | VARCHAR(20) | DEFAULT 'contributor' ('contributor' \| 'maintainer') |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 2. `issues` Table
| Column | Type | Constraints |
| :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY |
| `title` | VARCHAR(150) | NOT NULL |
| `description` | TEXT | NOT NULL |
| `type` | VARCHAR(30) | NOT NULL ('bug' \| 'feature_request') |
| `status` | VARCHAR(30) | DEFAULT 'open' ('open' \| 'in_progress' \| 'resolved') |
| `reporter_id` | INTEGER | NOT NULL (References `users.id`) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user account | Public |
| `POST` | `/api/auth/login` | Authenticate user and get JWT | Public |
| `POST` | `/api/issues` | Create a new bug or feature request | Authenticated |
| `GET` | `/api/issues` | Get all issues  | Public |
| `GET` | `/api/issues/:id` | Get full details of a specific issue | Public |
| `PATCH`| `/api/issues/:id` | Update an issue | Contributor (own & open only) / Maintainer (any) |
| `DELETE`| `/api/issues/:id` | Permanently delete an issue | Maintainer Only |

---

## ⚙️ Local Setup Instructions

Follow these steps to run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Md-SalmanHossen/DevPulse.git
   cd DevPulse```