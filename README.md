# 📌 Productivity & Collaboration Hub

## Team Name
Innovision Dynamics

---

## ⚠️ IMPORTANT DEVELOPMENT INSTRUCTIONS (READ FIRST)

This README defines **minimum functional requirements**, not design limits.

When implementing the application:
- Pages **must not be visually empty**
- Add additional UI sections, widgets, cards, tables, placeholders, and sample content where appropriate
- Follow modern dashboard UI/UX practices
- Dummy data and placeholder content are allowed and encouraged
- If a page logically requires more content than explicitly listed, **add it**
- Empty states must include descriptive messages and actionable buttons
- The application should feel **production-like and complete**, not minimal

---

## 🚨 SYSTEM INSTRUCTIONS FOR CODE GENERATION (COPILOT CONTROL)

Copilot MUST assume this repository starts completely EMPTY.

Copilot MUST:
- Generate the complete backend project from scratch
- Create all required directories and files automatically
- Generate a Spring Boot backend project using Maven
- Create the full standard Spring Boot file structure
- Generate all configuration, source, and resource files
- Proceed without asking setup or clarification questions

Copilot MUST NOT:
- Ask the user to manually create files or folders
- Ask questions about environment or setup
- Pause implementation waiting for confirmation

## Database Instructions (Copilot-Controlled)

- A MySQL database named `productivity_hub` already exists on localhost
- Assume MySQL is running and accessible
- Do NOT generate SQL schema files or migration scripts
- Do NOT use Flyway or Liquibase
- Use Spring Boot with JPA/Hibernate exclusively
- Define all database tables using Java `@Entity` classes only
- Use Spring Data JPA repositories for data access
- Configure Hibernate to automatically create and update tables
- Use `spring.jpa.hibernate.ddl-auto=update`
- Copilot MUST generate `application.properties` with MySQL configuration
- Do NOT include database creation or setup instructions


## Project Overview

Productivity & Collaboration Hub is a full-stack web application designed to help teams manage projects, collaborate in real time, and track productivity from a single platform.

The system integrates:
- Project and task management
- Real-time communication and collaboration
- File storage with versioning
- Analytics and activity tracking
- Background automation using threads

This project demonstrates:
- RESTful API design
- Networking using WebSockets
- Multithreading and scheduling in Java
- Clean, scalable software architecture

---

## Core Objectives

- Provide a centralized collaboration workspace
- Demonstrate REST, WebSocket, and multithreading concepts
- Build a modular and extensible system
- Deliver a stable, presentable, and realistic application

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Socket.IO Client
- Chart.js / Recharts

### Backend
- Spring Boot
- REST APIs
- Spring WebSockets
- Java ScheduledExecutorService / Spring Scheduler
- JPA / Hibernate

### Database
- PostgreSQL or MySQL

### File Storage
- Local server storage
- Database for metadata and version control

---

## Authentication & Authorization

- JWT-based authentication
- Secure password hashing
- Role-based access control (Admin / Member)
- Protected frontend routes
- Backend token validation

---

## Application Pages & Features

---

## 1. Public Pages (No Authentication)

### Landing Page
Minimum:
- Project name and description
- Feature highlights
- Call-to-action buttons (Login / Register)

Expected:
- Hero section
- Feature cards or sections
- Footer with project/team info

---

### Authentication Pages

#### Login
Minimum:
- Email / username
- Password
- Error handling

Expected:
- Validation messages
- Redirect after login
- Helpful UI feedback

Functionality:
- Accept email/username and password
- Validate credentials via REST API
- Issue JWT token on success
- Store token on frontend
- Redirect user to Dashboard
- Show error messages on failure

#### Register
Minimum:
- Name
- Email
- Password
- Create or join a team

Expected:
- Role selection
- Validation and onboarding hints

Functionality:
- Create new user account
- Allow user to create a new team or join an existing team
- Assign default role (Member)
- Persist user and team data using REST API
- Auto-login user after successful registration

#### Forgot Password (Optional)
- Email input
- Reset flow or placeholder message

---

## 2. Main Application Layout (After Login)

This is the primary workspace and must feel like a complete dashboard system.

### Minimum Layout Components
- Top navigation bar
- Sidebar navigation
- Notification icon with unread count
- User profile menu

### Expected Behavior
- Sidebar includes labeled icons and grouped navigation
- Top bar may include search, project selector, and quick actions
- Pages must include content-rich layouts
- No page should appear blank or nearly empty

Functionality:
- Fetch authenticated user profile using REST API
- Render role-based navigation (Admin / Member)
- Fetch unread notification count
- Logout clears authentication token and redirects to Login

---

## 3. Dashboard Page

Primary landing page after login.

### Minimum Required Sections
- Task status summary (To Do / In Progress / Done)
- Upcoming deadlines
- Recent activity feed
- Notifications preview

### Additional Expected Content
- Welcome banner
- Quick action cards (Create Task, Open Board, Start Chat)
- Productivity or usage insights
- Placeholder charts when data is unavailable

Functionality:
- Fetch task status summary (To Do / In Progress / Done)
- Fetch upcoming task deadlines
- Fetch recent activity logs
- Fetch notification preview
- Display all data using REST APIs

---

## 4. User Profile & Settings

### Profile Page
Minimum:
- Name, email, role
- Profile image
- Activity statistics

Expected:
- Editable fields
- Contribution overview
- Visual indicators

Functionality:
- Fetch user profile information
- Update editable profile fields
- Display user activity statistics
---

### Settings Page
Minimum:
- Change password
- Notification preferences
- Logout

Expected:
- Clear sections
- Descriptive labels
- Confirmation feedback

- Change user password
- Update notification preferences
- Logout from application


Functionality:
---

## 5. Project Management Module

---

### Project Overview Page
Minimum:
- Project details
- Member list
- Linked tasks and documents

Expected:
- Project summary cards
- Timeline preview
- Activity snapshot

Functionality:
- Create new projects
- Update project details (name, description, dates)
- Delete projects
- Add or remove team members from a project
- Assign project-level roles
- Fetch project-related tasks and documents

---

### Kanban Task Board

Minimum:
- Columns: To Do, In Progress, Review, Done
- Create, edit, delete tasks
- Assign users
- Drag-and-drop support

Expected:
- Task priority indicators
- Due date highlighting
- Empty state prompts

Backend: REST APIs  
Realtime updates: WebSockets

Functionality:
- Create tasks
- Edit task title, description, priority, and due date
- Assign tasks to users
- Move tasks between workflow states
- Delete tasks
- Persist all changes using REST APIs
- Broadcast task updates to connected users using WebSockets

---

### Gantt Chart Planner
Minimum:
- Timeline visualization
- Task durations and milestones

Expected:
- Read-only or limited editing
- Clear legends and labels

Functionality:
- Fetch project tasks with start and end dates
- Render project timeline visualization
- Reflect updates made in Kanban board
- Read-only or limited editing functionality

---

## 6. Real-Time Collaboration

---

### Team Chat
Minimum:
- Project-based chat rooms
- Real-time messaging
- Message persistence

Expected:
- User avatars
- Timestamps
- Online/offline indicators

Technology: WebSockets

Functionality:
- Create project-based chat rooms
- Send and receive messages in real time
- Persist messages in database
- Load chat history on page load
---

### Interactive Whiteboard
Minimum:
- Free drawing
- Shapes and text
- Multi-user real-time sync

Expected:
- Clear toolbar
- Session-based collaboration
- Placeholder canvas when empty

Functionality:
- Create whiteboard sessions per project
- Draw freehand, shapes, and text
- Synchronize drawing actions via WebSockets
- Save board state periodically

---

### Collaborative Documents
Minimum:
- Create and edit text documents
- Save content
- Version history

Expected:
- Auto-save or manual save
- Restore previous versions
- Clear editing UI

Functionality:
- Create documents under a project
- Edit document content
- Save document versions on update
- Restore previous document versions
---

## 7. File Management & Versioning

### File Storage Page
Minimum:
- Upload and download files
- View file list
- Version history

Expected:
- File previews
- Restore older versions
- Clear empty state messaging

Functionality:
- Upload files to server
- Store file metadata in database
- Maintain multiple versions per file
- Download current or previous versions
---

## 8. Notifications & Automation

---

### Notification Center
Minimum:
- Task assignments
- Deadline reminders
- System alerts

Expected:
- Read/unread states
- Timestamped entries

Functionality:
- Fetch notifications from backend
- Mark notifications as read or unread
- Display notifications triggered by system events
---

### Background Scheduler
Automated tasks:
- Daily summary generation
- Deadline monitoring
- Inactive data cleanup

Technology:
- Java ScheduledExecutorService
- Spring @Scheduled tasks

Functionality:
- Run scheduled jobs for:
- Deadline reminders
- Daily summary generation
- Cleanup of inactive data

---

## 9. Analytics & Activity Tracking

### Analytics Dashboard
Minimum:
- Task completion statistics
- Team activity overview

Expected:
- Charts and graphs
- Time-based filtering
- Placeholder analytics when data is missing

Functionality:
- Fetch task completion statistics
- Fetch team activity metrics
- Display charts using backend-provided data
---

## 10. Daily Summary

Minimum:
- Tasks completed
- Pending tasks
- Recent activity

Expected:
- Auto-generated content
- Clear formatting
- Stored history

Functionality:
- Generate summaries using background threads
- Store summary history
- Allow users to view past summaries
---

## 11. Smart Search

Minimum:
- Keyword-based search
- Search across tasks, projects, files

Expected:
- Filters
- Highlighted results
- No-results messaging

Functionality:
- Perform keyword-based search
- Search across projects, tasks, documents, and files
- Return filtered results via REST API
---

## 12. Export & Reporting

Minimum:
- Export Kanban board
- Export project summaries

Expected:
- PDF and image formats
- Clear export options

Functionality:
- Export Kanban board state
- Export project summary reports
- Generate PDF or image output

---

## 13. Goal & Habit Tracker

Minimum:
- Create goals
- Track progress

Expected:
- Visual progress indicators
- Weekly and monthly views

Functionality:
- Create goals
- Update goal progress
- Store goal history
- Display progress visually

---

## 14. Admin / Team Management Panel

Minimum:
- Manage team members
- Assign roles
- View activity logs

Expected:
- Clear admin-only access
- System overview panels

Functionality:
- View all users in the team
- Assign or update user roles
- Remove users from team
- View system-wide activity logs
---

## Database Core Tables (Expected)

- users
- teams
- projects
- tasks
- task_assignments
- messages
- notifications
- files
- file_versions
- documents
- activity_logs
- goals

-Add any table that is needed
---

## API Architecture

### REST APIs
Used for:
- Authentication
- CRUD operations
- Analytics
- File metadata
- Search
- Goals and tasks

### WebSockets
Used for:
- Chat
- Whiteboard updates
- Live task synchronization
- Notifications

---

## Multithreading & Scheduling

Implemented using:
- @Scheduled
- ScheduledExecutorService

Used for:
- Daily summaries
- Deadline alerts
- Background cleanup jobs

---
## Backend Bootstrap Requirements (Mandatory)

Copilot MUST generate the backend with the following:

- Spring Boot application (Maven)
- Java version 17 or higher
- `pom.xml` with required dependencies:
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - MySQL Driver
  - WebSocket
- Main Spring Boot application class
- Standard package structure:
  - controller
  - service
  - repository
  - model / entity
  - config
  - security
- `application.properties` configured for MySQL and JPA

---

## Suggested Project Structure

### Backend
controller/
service/
repository/
model/
dto/
config/
scheduler/
websocket/

### Frontend
components/
pages/
services/
hooks/
context/
utils/

---

## Development Guidelines

- Follow clean architecture principles
- Keep controllers thin
- Place business logic in services
- Use DTOs for API communication
- Use WebSockets only for real-time features
- Ensure all pages are visually complete
- Maintain readable and well-documented code

---

## Deployment & Run Instructions (Copilot-Controlled)

Copilot MUST generate code or scripts to allow the project to run locally and optionally in GitHub Codespaces.

Copilot MUST:
- Provide instructions or scripts to run backend and frontend automatically
- Configure backend to connect to MySQL on localhost
- Ensure JPA/Hibernate generates tables automatically on startup
- Allow optional H2 in-memory database for Codespaces / demo only
- Provide proper port configuration:
  - Backend: 8080
  - Frontend: 3000
- Generate `README_RUN.md` or `run_instructions.md` with clear run commands
- Include npm / yarn commands for frontend
- Include Maven commands for backend
- Include steps for switching between local MySQL and H2 for Codespaces
- Provide instructions to verify the project is running (open browser, sample URLs)

Copilot MUST NOT:
- Attempt to deploy to cloud automatically
- Generate complex infrastructure (AWS / Docker / Railway) unless explicitly asked
- Modify database creation assumptions (still relies on existing `productivity_hub` database)
