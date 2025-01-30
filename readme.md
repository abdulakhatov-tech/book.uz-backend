# book.uz Server

The **book.uz** server is the backend system powering the book.uz platform, handling user authentication, book management, orders, and other essential functionalities.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
### User Authentication
- Secure JWT-based authentication

### Book Management
- CRUD operations for books

### Order Processing
- Manage book orders and transactions

### Search & Filtering
- Find books easily with filters

### Admin Panel
- Manage users, books, and orders

### Secure Payments
- Integrated payment system (if applicable)

## Technologies Used
### Backend Framework
- Node.js + Express.js

### Database
- MongoDB with Mongoose ORM

### Authentication
- JWT (JSON Web Token)

### Validation
- Zod

### Logging
- Winston

### API Documentation
- Swagger (if applicable)

### Version Control
- Git

## Getting Started

### Prerequisites
Ensure you have the following installed:

- **Node.js** (version 16.x or higher) - [Download Node.js](https://nodejs.org/)
- **MongoDB** (local or cloud-based like MongoDB Atlas)
- **npm** (version 7.x or higher) or **yarn** (version 1.x or higher)

### Installation
#### Clone the repository
```sh
git clone https://github.com/abdulakhatov-dev/book.uz-server.git
cd book.uz-server
