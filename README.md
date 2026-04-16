📝 Task Manager (MERN Stack)

A full-stack Task Management application where users can create, manage, and track their tasks efficiently with authentication and real-time updates.
Built with modern full-stack practices including authentication, REST APIs, and scalable architecture.

## 🔗 Live Demo
[Open App](https://task-manager-one-peach.vercel.app)

## 📂 Repository
[View Code](https://github.com/raviswamiii/Task-Manager)

🚀 Features

✅ Task Management

Create tasks with title, description, and due date
View all tasks in a list
Mark tasks as completed
Edit task details
Delete tasks
Automatic overdue task detection based on due date

💾 Persistence

Data is stored in MongoDB
Tasks are linked to individual users (secure per-user data)

🔐 Authentication

User Sign Up / Sign In
JWT-based authentication
Protected routes
Logout with token blacklisting

⚠️ Validation & Error Handling

Task title, description, and due date are required
Prevent invalid operations
Meaningful error messages returned from backend
Handles expired/invalid tokens

⏰ Due Dates & Status

Tasks include a due date
Status types:
✅ Completed
❌ Overdue
⏳ Pending

🛠️ Tech Stack

Frontend:
React.js
Tailwind CSS
React Router
Axios

Backend:
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
bcrypt (password hashing)

## 🔌 API Endpoints

POST /user/signUp
POST /user/signIn
POST /user/logout

POST /api/createTask
POST /api/toggleTask/:taskId

GET /api/getTasks
GET /api/getTask/:taskId

PATCH /api/updateTask/:taskId
DELETE /api/deleteTask/:taskId

⚙️ Setup Instructions

1️⃣ Clone the repository

git clone https://github.com/raviswamiii/Task-Manager.git

2️⃣ Setup Backend

cd backend
npm install

Create a .env file:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=jwtsecretforuser
FRONTEND_URL=http://localhost:5173

Run backend:
npm run dev

3️⃣ Setup Frontend

cd frontend
npm install

Create .env:
VITE_BACKEND_URL=http://localhost:3000

Run frontend:
npm run dev

▶️ How to Use

Sign Up with your name, email, and password
Sign In to your account
Click on "Add Task" to create a new task
View all tasks on the dashboard
Click on a task to see details
Edit or delete tasks
Mark tasks as completed
Overdue tasks are highlighted automatically
Logout when done

🧠 Key Design Decisions

1. User-Based Data Isolation:
Each task is linked to a user using userId
Ensures users can only access their own tasks

2. JWT Authentication:
Stateless authentication using tokens
Middleware verifies token on each request

3. Token Blacklisting:
Logout invalidates token by storing it in a blacklist
Prevents reuse after logout

4. Optimistic UI Updates:
Frontend updates UI instantly after actions (create/delete/update)
Improves user experience

5. Clean Separation of Concerns:
Controllers → Business logic
Routes → API endpoints
Models → Database schema
Middleware → Authentication

6. Responsive UI:
Mobile: Slide panel for adding tasks