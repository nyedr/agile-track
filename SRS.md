# Software Requirements Specification (SRS) for AgileTrack Full-Stack Application

## 1. Introduction

### 1.1 Purpose

This document describes the software requirements for AgileTrack, a full-stack application (hereafter referred to as "the Application") that functions similarly to Jira, a popular issue tracking and project management software. This document is intended to be used by the members of the development team and will form the basis of the design and development process.

The application will use Next.js and TypeScript for the main framework, Prisma and MongoDB for the database, TailwindCSS for the frontend, NextAuth for authentication, Helmet.js for security, and Zod for input validation.

### 1.2 Scope

AgileTrack will provide the following functionalities:

- User Registration and Login
- Project Management
- Issue Tracking
- User Roles and Permissions
- Notifications
- Reporting and Analytics

## 2. Overall Description

### 2.1 User Classes and Characteristics

AgileTrack will have five types of users:

1. **Administrators**: They have full control over the application and can create, edit, delete projects and users, assign user roles, and manage system settings.
2. **Project Managers**: They can create, edit, and delete projects they own. They can also manage issues within these projects.
3. **Team Members**: They can view and update issues in the projects they are assigned to.
4. **Testers**: They are responsible for testing the application for bugs and report them.
5. **Developers**: They are responsible for resolving issues and updating the status of the issues.

### 2.2 Operating Environment

AgileTrack will be a web-based application and should work seamlessly on the latest versions of Google Chrome, Firefox, Safari, and Edge browsers.

## 3. System Features

### 3.1 User Registration and Login

AgileTrack should allow users to register and create an account using their email address. It should also support authentication using Google and GitHub accounts using NextAuth.

### 3.2 Project Management

Users should be able to create, update, delete, and view their own projects. Each project should have a title, description, start date, end date, and a list of assigned team members.

### 3.3 Issue Tracking

Within each project, users should be able to create, update, delete, and view issues. Each issue should have a title, description, type (bug, feature, etc.), priority, status (to do, in progress, done), assignee, and comments.

### 3.4 User Roles and Permissions

AgileTrack should support different user roles and permissions. Administrators should have full control over the application. Project Managers should be able to manage their own projects and the issues within these projects. Team Members should only be able to view and update issues they are assigned to.

### 3.5 Notifications

AgileTrack should send notifications to users when they are assigned to a project or an issue, or when a project or issue they are assigned to is updated.

### 3.6 Reporting and Analytics

AgileTrack should provide reporting and analytics features, such as the number of open/closed issues, the number of issues per type/priority/status, and the project progress.

## 4. External Interface Requirements

### 4.1 User Interfaces

AgileTrack will be a web-based application with a responsive design that works on desktop and mobile browsers. It should provide an easy-to-use, clean, and intuitive interface using TailwindCSS.

### 4.2 Software Interfaces

AgileTrack will use Next.js and TypeScript for the main framework, Prisma and MongoDB for the database, NextAuth for authentication, Helmet.js for security, and Zod for input validation.

## 5. Non-Functional Requirements

### 5.1 Security

AgileTrack should provide robust security features. User passwords should be hashed and all sensitive data should be encrypted. All HTTP requests and responses should be secured using Helmet.js.

### 5.2 Performance

AgileTrack should load within 3 seconds and all actions should respond within 2 seconds.

### 5.3 Availability

AgileTrack should be available 24/7, with a downtime of no more than 0.1%.

### 5.4 Scalability

AgileTrack should be able to handle an increase in the number of users and data without a significant impact on performance.

## 6. Other Requirements

AgileTrack should be developed using agile methodologies, with regular sprints. The code should be version-controlled using Git and GitHub, with regular code reviews and pull requests.

## 7. Database Design

AgileTrack will use MongoDB for its database. The database will be managed using Prisma, an open-source database toolkit. The database schema will consist of several collections including Users, Projects, ProjectMembers, Issues, Comments, and Notifications. See the [AgileTrackDB](AgileTrackDB.png) file for the full schema.

Each collection will store information related to its name. For instance, the Users collection will store user data, the Projects collection will store project data, and so on. The exact structure and fields of these collections will be determined during the development process.
