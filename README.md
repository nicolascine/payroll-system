# Payroll Management System

A modern payroll management system that integrates attendance control with payroll calculation using a queue-based architecture.

## 🚀 Features

- Employee management
- Attendance tracking integration
- Asynchronous payroll calculation using Bull queues
- Real-time queue monitoring
- Excel file processing
- REST API integration
- Secure authentication and authorization
- Rate limiting and security measures

## 🏗️ Architecture

The application follows a microservices-based architecture with:
- Frontend: Next.js 14+
- Backend: NestJS with Bull Queue
- Database: PostgreSQL
- Message Queue: Redis
- Docker containerization

## 🛠️ Tech Stack

### Frontend
- Next.js 14+
- React 18
- TailwindCSS
- React Query
- Axios
- TypeScript

### Backend
- NestJS
- Bull Queue
- TypeORM
- PostgreSQL
- Redis
- RabbitMQ
- Bull Board for queue monitoring

### DevOps
- Docker
- Docker Compose
- Environment Variables

## 🚦 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

### Installation

1. Clone the repository:

bash
git clone https://github.com/nicolascine/payroll-system

2. Start the application:

```bash
make build
make up
```


The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Queue Monitor: http://localhost:3001/admin/queues
- RabbitMQ Management: http://localhost:15672
- Swagger API Docs: http://localhost:3001/api

## 📚 Documentation

- [Demo Guide](DEMO.md) - Detailed demonstration guide
- API Documentation: http://localhost:3001/api
- Queue Monitor: http://localhost:3001/admin/queues

## 🧪 Testing
```bash
Run tests
make test
```

## Run linter
```bash
make lint
```

## 📁 Project Structure
```
.
├── backend/ # NestJS backend application
│ ├── src/
│ │ ├── payroll/ # Payroll calculation module
│ │ ├── attendance/ # Attendance tracking module
│ │ └── ...
│ └── ...
├── frontend/ # Next.js frontend application
└── docker-compose.yml # Docker composition file
```


## 🔒 Security Features

- CORS protection
- Rate limiting
- Helmet security headers
- JWT authentication
- Input validation
- Error handling

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details