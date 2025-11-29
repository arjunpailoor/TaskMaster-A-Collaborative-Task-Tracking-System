# TaskMaster-A-Collaborative-Task-Tracking-System
A backend system for a task tracking and management application that facilitates collaboration and organization within teams or projects. The application will allow users to create, assign, and track tasks, as well as collaborate with team members through comments and attachments.


## Testing the API

You can test the backend using **Postman**. Below are the key endpoints for testing:

### 1. User Registration

- **POST** `http://localhost:3000/users/register`

```json
{
  "name": "John",
  "email": "john@test.com",
  "password": "123456"
}
```

### 2. User Login
- **POST** `http://localhost:3000/users/login`

```json
{
  "email": "john@test.com",
  "password": "123456"
}
```
Copy the returned JWT token for authenticated requests.

### 3. Create Team

- **POST** http://localhost:3000/teams

Header: Authorization: Bearer <JWT_TOKEN>

```json
{
  "name": "Team India"
}
```


### 4. Create Task
- **POST** http://localhost:3000/tasks

Header: Authorization: Bearer <JWT_TOKEN>
```json
{
  "title": "Fix bug",
  "description": "Bug in API",
  "dueDate": "2025-12-10T00:00:00.000Z",
  "teamId": "<TEAM_ID>",
  "assigneeId": "<USER_ID>"
}
```

### 5. View My Tasks

- **GET** http://localhost:3000/tasks/my

Header: Authorization: Bearer <JWT_TOKEN>

### 6. Update Task
- **PATCH** http://localhost:3000/tasks/<TASK_ID>

Header: Authorization: Bearer <JWT_TOKEN>

```JSON
{
  "status": "completed"
}
```

### 7. Delete Task
- **DELETE** http://localhost:3000/tasks/<TASK_ID>

Header: Authorization: Bearer <JWT_TOKEN>

- MongoDB Compass was used to view the database for convenience