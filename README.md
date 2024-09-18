# Todo List API

## Overview

This project is a RESTful API that allows users to manage their to-do lists. In addition to the standard CRUD operations, the API also supports user authentication, ensuring that only authorized users can manage their tasks. The project uses Mongoose for database interactions, Express for routing, and incorporates error handling, data validation, and security measures.

Solution for TODO LIST API from [roadmap.sh](https://roadmap.sh/projects/todo-list-api)
## Goals

The following skills are practiced and demonstrated in this project:

- User authentication (login, registration, password reset)
- Schema design and database management
- RESTful API design
- CRUD operations for tasks
- Error handling and security
- Pagination and filtering

## Features

- **User Registration**: Register new users with unique email addresses.
- **User Authentication**: Login and token-based authentication.
- **Task Management**: Create, update, delete, and retrieve tasks.
- **Error Handling**: Comprehensive error handling with meaningful messages.
- **Security**: Password hashing, secure password reset, and user authorization.
- **Pagination**: Task listing with pagination and filtering options.

## Technologies Used

- Node.js
- Express.js
- Mongoose (MongoDB)
- JWT (for authentication)
- bcrypt.js (for password hashing)
- crypto (for secure token generation)
- Validator (for email validation)

## API Endpoints

### User Authentication

#### Register

**Endpoint**: `POST /api/v1/users/signup`

#### Request Body:

```json
{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "password",
  "passwordConfirm": "password"
}

```
#### Login
**Endpoint**: `POST /api/v1/users/login`


#### Request Body:

```json

{
  "email": "john@doe.com",
  "password": "password"
}
```


### Task Management

## Create a Task


**EndPoint**:`POST /api/v1/tasks`

**Request Header**: `Authorization: Bearer <token>` Request Body:

```json

{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}
```
**Response**:

```json

{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}
```

## Update a Task

bash

**EndPoint**:`PATCH /api/v1/tasks/:id`

**Request Header**: `Authorization: Bearer <token> `Request Body:

```json

{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}
```
**Response**:

```json

{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}
```
## Delete a Task


**EndPoint**:`DELETE /api/v1/tasks/:id`

**Request Header**: `Authorization: Bearer <token>` **Response**: `204 No Content`

## Get Tasks (with Pagination)


**EndPoint**:`GET /api/v1/tasks?page=1&limit=10`

**Request Header**: `Authorization: Bearer <token>` Response:

```json

{
  "data": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Buy milk, eggs, bread"
    },
    {
      "id": 2,
      "title": "Pay bills",
      "description": "Pay electricity and water bills"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 2
}
```
## Error Handling

Errors such as invalid input, unauthorized access, or resource not found will return structured error messages with appropriate HTTP status codes, ensuring proper communication between the client and server.

## Security

- Password Hashing: User passwords are hashed before being stored in the database using bcrypt.
- JWT Authentication: Secure user authentication using JSON Web Tokens.
- Data Validation: Ensures proper data formats using Validator.

## Bonus Features

   - Filtering and Sorting: Filter and sort tasks based on criteria such as status or creation date.
   - Rate Limiting and Throttling: Prevent misuse by limiting API calls.
   - Unit Tests: Tests for API endpoints.

## How to Run the Project

    Clone the repository:

    ```bash

git clone https://github.com/ahmdWard/Todo-List-API.git
```

## Install dependencies:

```bash

npm install
``` 
## Create a .env file for environment variables (e.g., database URL, JWT secret).

### Start the server:

```bash

npm start
```