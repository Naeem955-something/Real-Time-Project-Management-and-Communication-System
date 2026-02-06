

# 🚀 Real-Time Project Management and Communication System

A full-stack collaboration platform for project management, real-time teamwork, and productivity tracking.

---

## 📌 Overview

Centralized workspace to manage projects, tasks, files, and real-time collaboration using REST APIs, WebSockets, and background schedulers.

---

## 🧰 Tech Stack

**Frontend**

* React.js, Tailwind CSS
* React Router, Socket.IO Client
* Chart.js / Recharts

**Backend**

* Spring Boot (Java 17+)
* REST APIs, WebSockets
* JPA / Hibernate, Spring Scheduler

**Database**

* MySQL / PostgreSQL

---

## 🔐 Authentication

* JWT-based authentication
* Role-based access (Admin / Member)
* Protected routes

---

## ✨ Features

* Project & task management (Kanban, Gantt)
* Real-time chat & whiteboard
* File upload with versioning
* Notifications & activity logs
* Daily summaries & automation
* Analytics dashboard
* Smart search & export
* Admin management panel

---

## 🗄️ Database

users, teams, projects, tasks, task_assignments, messages, notifications,
files, file_versions, documents, activity_logs, goals

---

## 🧱 Architecture

* **REST APIs** – Auth, CRUD, analytics
* **WebSockets** – Chat, live sync, notifications
* **Schedulers** – Summaries, reminders, cleanup

---

## 📂 Structure

**Backend**

```
controller/ service/ repository/ model/ dto/
config/ scheduler/ websocket/
```

**Frontend**

```
components/ pages/ services/ hooks/ context/ utils/
```

---

## ⚙️ Installation

### ✅ Prerequisites

Java 17+, Node.js, MySQL, Maven

---

## ▶️ Quick Start (Recommended)

```bash
chmod +x start.sh
./start.sh
```

* Backend: [http://localhost:8080](http://localhost:8080)
* Frontend: [http://localhost:3000](http://localhost:3000)

Stop backend:

```bash
pkill -f "mvn spring-boot:run"
```

---

## 🛠 Manual Start

**Backend**

```bash
cd backend
mvn spring-boot:run
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Backend Config

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/productivity_hub
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

---

## 👥 Roles

* **Admin** – System & team management
* **Member** – Projects & collaboration

---

## 🚧 Status

Active development
Academic & demonstration project



Just say the word.
