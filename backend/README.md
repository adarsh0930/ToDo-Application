# Todo List Application

This is a Todo List application.

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

- Get all tasks: GET /tasks
- Get a task: GET /tasks/:id
- Create task: POST /tasks
- Update task: PATCH /tasks/:id
- Delete task: DELETE /tasks/:id

Here's a brief explanation of each file and directory:

- `src/index.js`: This is the entry point of the application where the server is initialized.
- `src/routes`: This file contains all the routes.
- `src/controllers`: This file contains functions to handle routes.
- `src/middleware`: This file contains authentication middleware.
- `package.json`: This file lists the dependencies and scripts for the application.
- `README.md`: This file provides an overview of the application, its features, and the project structure.
- `env.sample`: This file contains sample environment variables to be used for creating `.env` file.
- `.gitignore`: This file contains a list of files and directories to be ignore by Git.
