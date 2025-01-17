# Payroll Management System

A modern payroll management system that integrates attendance control with payroll calculation.

## 🚀 Features

- Employee management
- Attendance tracking integration
- Payroll calculation
- Excel file processing
- REST API integration with attendance partner
- Secure authentication and authorization
- Rate limiting and security measures

## 🏗️ Architecture

The application follows a microservices-based architecture with:
- Frontend: Next.js 14+
- Backend: Node.js with Express
- Database: SQLite
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
- Node.js
- Express
- Sequelize ORM
- SQLite
- JWT Authentication
- Express Rate Limit
- Helmet Security

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

2. Create .env file:

3. Start the application:

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 📁 Project Structure

`
project/
├── docker-compose.yml
├── .env
├── backend/
│ ├── Dockerfile
│ ├── package.json
│ └── src/
│ ├── index.js
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ └── utils/
└── frontend/
├── Dockerfile
├── package.json
└── src/
├── app/
├── components/
└── lib/
`


## 🔒 Security Features

- CORS protection
- Rate limiting
- Helmet security headers
- JWT authentication
- Input validation
- Error handling

## 🔍 API Documentation

### Base URL

### Endpoints

#### Employees
- `GET /employees` - List all employees
- `POST /employees` - Create new employee
- `GET /employees/:id` - Get employee details
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

#### Attendance
- `GET /attendance` - Get attendance records
- `POST /attendance` - Create attendance record
- `GET /attendance/:employeeId` - Get employee attendance

#### Payroll
- `POST /liquidations/calculate` - Calculate payroll
- `GET /liquidations/:employeeId` - Get employee payroll

## 🧪 Testing


## 📈 Monitoring

The application includes:
- Winston logging
- Error tracking
- Performance monitoring
- API request logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
