# PlanWise: Task Management Application
Welcome to PlanWise, a web application for managing tasks efficiently and effectively.

## Overview
This document summarizes the features and the development process of implementation of the Planwise webApp.

## 1. Technologies Used
* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express.js, MongoDB Atlas
* **Authentication:** JSON Web Tokens (JWT)
* **Deployment:** Vercel (frontend), Render (backend)

## 2. Database Integration
* Utilized MongoDB Atlas for managing the database.

## 3. CRUD Opearations
* Implemented CRUD opearation for handling the tasks.

### API Endpoints

* **Add new Task**
  - POST - (https://planwise-backend-sagar1205.onrender.com/newToDo)

* **Retrieve Tasks**
  - GET - (https://planwise-backend-sagar1205.onrender.com/getToDo?userId)
* **Update a Task**
  - PUT - (https://planwise-backend-sagar1205.onrender.com//updateTodo)
* **Delete a Task**
  - DELETE - (https://planwise-backend-sagar1205.onrender.com/deleteToDo/taskId)
* **Login**
  - POST - (https://planwise-backend-sagar1205.onrender.com/auth/login)
* **Register new User**
  - POST - (https://planwise-backend-sagar1205.onrender.com/auth/register)
* **Change Password**
  - POST - (https://planwise-backend-sagar1205.onrender.com/auth/changePassword)
 
## 4. Frontend Integration
* Created a React component for displaying the tasks of the user.
* Implemented UI forms for updation, deletion, creation and password change.
* Added functionality for filtering and searching.

### FrontEnd App URL
* (https://planwise-five.vercel.app/)

## UI Overview
**1. Task Categorization:** Organize your tasks into categories such as Today, This Week, and Eventually, making it easier to prioritize and manage your workload.

**2. Task Filtering:** Use the search feature to quickly find specific tasks.

**3. Task Addition and Deletion:** Easily add new tasks and remove completed or outdated tasks with a few clicks.

**4. Task Updating:** Edit tasks as needed, updating details like task description and due dates.

**5. Responsive Design:** PlanWise is responsive, making it accessible on both desktop and mobile devices.

**6. User Authentication:** Secure login and registration system to keep your task list private.

**7. Password Management:** Change your password securely within the application.

**8. Expired Tasks:** View and manage tasks that have passed their due date.

## 5. Conclusion
* Successfully integrated database management, and frontend UI.
* Successful deployment of the application.
* Achieved CRUD operations on the MongoDB Atlas database.
