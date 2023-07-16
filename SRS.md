# Software Requirements Specification (SRS) for Agile Track Full-Stack Application

## 1. Introduction

### 1.1 Purpose

This document describes the software requirements for a full-stack application (hereafter referred to as "the Application") that functions similarly to Jira, a popular issue tracking and project management software. This document is intended to be used by the members of the development team and will form the basis of the design and development process. 

The application will use Next.js and TypeScript for the main framework, Prisma and PostgreSQL for the database, TailwindCSS for the frontend, NextAuth for authentication, Helmet.js for security, and Zod for input validation.

### 1.2 Scope

The application will provide the following functionalities:
- User Registration and Login
- Project Management
- Issue Tracking
- User Roles and Permissions
- Notifications
- Reporting and Analytics

## 2. Overall Description

### 2.1 User Classes and Characteristics

The Application will have three types of users:
1. **Administrators**: They have full control over the application and can create, edit, delete projects and users, assign user roles, and manage system settings.
2. **Project Managers**: They can create, edit, and delete projects they own. They can also manage issues within these projects.
3. **Team Members**: They can view and update issues in the projects they are assigned to.

### 2.2 Operating Environment

The application will be a web-based application and should work seamlessly on the latest versions of Google Chrome, Firefox, Safari, and Edge browsers.

## 3. System Features

### 3.1 User Registration and Login

The application should allow users to register and create an account using their email address. It should also support authentication using Google and GitHub accounts using NextAuth.

### 3.2 Project Management

Users should be able to create, update, delete, and view their own projects. Each project should have a title, description, start date, end date, and a list of assigned team members.

### 3.3 Issue Tracking

Within each project, users should be able to create, update, delete, and view issues. Each issue should have a title, description, type (bug, feature, etc.), priority, status (to do, in progress, done), assignee, and comments.

### 3.4 User Roles and Permissions

The application should support different user roles and permissions. Administrators should have full control over the application. Project Managers should be able to manage their own projects and the issues within these projects. Team Members should only be able to view and update issues they are assigned to.

### 3.5 Notifications

The application should send notifications to users when they are assigned to a project or an issue, or when a project or issue they are assigned to is updated.

### 3.6 Reporting and Analytics

The application should provide reporting and analytics features, such as the number of open/closed issues, the number of issues per type/priority/status, and the project progress.

## 4. External Interface Requirements

### 4.1 User Interfaces

The application will be a web-based application with a responsive design that works on desktop and mobile browsers. It should provide an easy-to-use, clean, and intuitive interface using TailwindCSS.

### 4.2 Software Interfaces

The application will use Next.js and TypeScript for the main framework, Prisma and PostgreSQL for the database, NextAuth for authentication, Helmet.js for security, and Zod for input validation.

## 5. Non-Functional Requirements

### 5.1 Security

The application should provide robust security features. User passwords should be hashed and all sensitive data should be encrypted. All HTTP requests and responses should be secured using Helmet.js.

### 5.2 Performance

The application should load within 3 seconds and all actions should respond within 2 seconds.

### 5.3 Availability

The application should be available 24/7, with a downtime of no more than 0.1%.

### 5.4 Scalability

The application should be able to handle an increase in the number of users and data without a significant impact on performance.

## 6. Other Requirements

The application should be developed using agile methodologies, with regular sprints. The code should be version-controlled using Git and GitHub, with regular code reviews and pull requests.

## 7. Database Design

1. **Users**: Stores user data.

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier for the user |
| username | VARCHAR(255) | Username of the user |
| password | VARCHAR(255) | Hashed password |
| email | VARCHAR(255) | Email address |
| role | VARCHAR(255) | Role of the user (Admin, Project Manager, Team Member) |

2. **Projects**: Stores project data.

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier for the project |
| name | VARCHAR(255) | Name of the project |
| description | TEXT | Description of the project |
| start_date | DATE | Start date of the project |
| end_date | DATE | End date of the project |
| project_manager_id | INTEGER FOREIGN KEY | References id in Users table |

3. **ProjectMembers**: Stores the relationship between users and projects.

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier |
| user_id | INTEGER FOREIGN KEY | References id in Users table |
| project_id | INTEGER FOREIGN KEY | References id in Projects table |

4. **Issues**: Stores issue data.

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier for the issue |
| title | VARCHAR(255) | Title of the issue |
| description | TEXT | Description of the issue |
| type | VARCHAR(255) | Type of the issue (bug, feature, etc.) |
| priority | VARCHAR(255) | Priority of the issue |
| status | VARCHAR(255) | Status of the issue (to do, in progress, done) |
| project_id | INTEGER FOREIGN KEY | References id in Projects table |
| assignee_id | INTEGER FOREIGN KEY | References id in Users table |

5. **Comments**: Stores comments on issues.

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier for the comment |
| content | TEXT | Content of the comment |
| issue_id | INTEGER FOREIGN KEY | References id in Issues table |
| author_id | INTEGER FOREIGN KEY | References id in Users table |

6. **Notifications**: Stores notifications for users.

| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier for the notification |
| content | TEXT | Content of the notification |
| user_id | INTEGER FOREIGN KEY | References id in Users table |
