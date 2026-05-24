LMS Portal Project
A full-stack Learning Management System (LMS) built using the MERN stack ecosystem (MongoDB, Express, React, and Node.js) with Tailwind CSS for styling. This platform allows users to handle courses, manage enrollments, and authenticate securely.

Folder Structure

Plaintext
LMS-FULLSTACK-PROJECT/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection settings (MongoDB)
│   ├── controllers/
│   │   ├── authController.js     # User registration and login logic
│   │   ├── courseController.js   # Course creation, reading, updating, deleting (CRUD)
│   │   ├── enrollmentController.js# Student course enrollment logic
│   │   └── userController.js     # User profile and data management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT validation and route protection
│   │   └── errorMiddleware.js    # Global error handling middleware
│   ├── models/
│   │   ├── Course.js             # Mongoose schema for Courses
│   │   ├── Enrollment.js         # Mongoose schema for Enrollments
│   │   └── User.js               # Mongoose schema for Users
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   ├── courseRoutes.js       # Course management endpoints
│   │   ├── enrollmentRoutes.js   # Enrollment endpoints
│   │   └── userRoutes.js         # User profile endpoints
│   ├── utils/
│   │   └── generateToken.js      # Utility function to generate JWTs
│   ├── .env                      # Backend environment variables (Secret)
│   ├── package.json              # Backend dependencies and scripts
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html            # Main HTML file template
│   ├── src/
│   │   ├── assets/               # Static assets like images, icons, logos
│   │   ├── components/           # Reusable UI components (Navbar, Sidebar, Cards)
│   │   ├── pages/
│   │   │   ├── CourseList.js     # Catalog page to view available courses
│   │   │   ├── Dashboard.js      # Main overview dashboard for authenticated users
│   │   │   ├── Login.js          # User Login page
│   │   │   └── Register.js       # User Registration page
│   │   ├── services/
│   │   │   └── api.js            # Axios configuration and API request calls
│   │   ├── styles/               # Custom global CSS or layout styles
│   │   ├── utils/
│   │   │   └── db.js             # Local utilities / local storage helpers
│   │   ├── App.js                # Main React app component & client-side routing
│   │   ├── index.css             # Entry Tailwind CSS directives file
│   │   └── index.js              # React DOM render entry point
│   ├── package.json              # Frontend dependencies and scripts
│   ├── tailwind.config.js        # Tailwind CSS styling configuration
│   └── .gitignore                # Files to ignore in Git version control

 Required Libraries & Dependencies

1. Backend Dependencies (backend/package.json)
express: Fast, unopinionated, minimalist web framework for Node.js.

mongoose: Elegant MongoDB object modeling for Node.js.

dotenv: Loads environment variables from a .env file into process.env.

jsonwebtoken (jwt): For securely transmitting information between parties as a JSON object.

bcryptjs: Used to hash passwords securely before saving to the database.

cors: Enables Cross-Origin Resource Sharing for API requests from the frontend.

nodemon (Dev Dependency): Automatically restarts the node application when file changes are detected.

2. Frontend Dependencies (frontend/package.json)
react & react-dom: Core React libraries.

react-router-dom: Declarative routing for React web applications.

axios: Promise-based HTTP client for making API requests to the backend.

tailwindcss, postcss, autoprefixer: Utility-first CSS framework configuration files.

Installation & Setup Guide
Follow these steps to get local environment running smoothly.

Step 1: Environment Variables Setup

Code snippet
PORT=5000
MONGO_URI=mongodb+srv://rubinabibi1144_db_user:Rubina7418@cluster0.sevuxme.mongodb.net/LMS?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=any_random_long_string_123
NODE_ENV=development

Step 2: Install Dependencies

Open your terminal and run the following commands sequentially to clean install both applications:

For the Backend:

Bash
cd backend
npm install
For the Frontend:

Bash
cd ../frontend
npm install
 How to Run the Project
You can run both environments simultaneously or separately. Choose one of the options below:

Option A: Running Separately (Recommended for Debugging)
Start the Express Backend Server:

Bash
cd backend
npm run dev
(Note: Ensure you have configured a "dev": "nodemon server.js" script inside your backend/package.json file).

Start the React Frontend Development Server:
Open a new, secondary terminal tab/window and run:

Bash
cd frontend
npm start
Option B: Running Concurrently (Advanced One-Command Execution)
If you prefer to start both with a single terminal command from the root folder (LMS-FULLSTACK-PROJECT), you can install concurrently in your project's root folder:

In your root folder, run: npm install concurrently --save-dev

Add the following block to a package.json file located in your root directory:

JSON
"scripts": {
  "backend": "npm start --prefix backend",
  "frontend": "npm start --prefix frontend",
  "dev": "concurrently \"npm run backend\" \"npm run frontend\""
}
Then simply run:

Bash
npm start
The backend server will hook onto http://localhost:5000 while your interactive UI portal mounts to http://localhost:3000.