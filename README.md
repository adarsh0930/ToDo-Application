## A MERN Stack ToDo App

## Features

- User Sign up
- User Login
- User Logout

- Get all tasks
- Get a task by Id
- Create a new task
- Update an existing task - title, description, completed status
- Delete a task (soft-deletion)

## API Endpoints

- User Signup: POST /users
- User Login: POST /users/login
- User Logout: POST /users/logout

- Get all tasks: GET /tasks
- Get a task: GET /tasks/:id
- Create task: POST /tasks
- Update task: PATCH /tasks/:id
- Delete task: DELETE /tasks/:id

## Project Structure

.
├── README.md
├── backend
│ ├── README.md
│ ├── package-lock.json
│ ├── package.json
│ └── src
│ ├── controllers
│ │ ├── auth
│ │ │ ├── login.js
│ │ │ ├── logout.js
│ │ │ └── signup.js
│ │ └── tasks
│ │ ├── index.js
│ │ └── utils.js
│ ├── index.js
│ ├── middleware
│ │ └── auth.js
│ ├── models
│ │ ├── db.js
│ │ ├── task.js
│ │ └── user.js
│ └── routes
│ ├── auth.js
│ └── task.js
└── frontend
├── README.md
├── package-lock.json
├── package.json
├── public
│ ├── favicon.ico
│ ├── index.html
│ ├── logo192.png
│ ├── logo512.png
│ ├── manifest.json
│ └── robots.txt
└── src
├── App.css
├── App.js
├── App.test.js
├── components
│ ├── Dashboard.js
│ ├── Login.js
│ └── Signup.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js
