# 🚀 Payroll System Demo Guide

A comprehensive guide for demonstrating the Payroll Management System's key features and capabilities.

## 📋 Quick Setup (5 minutes)

```bash
# 1. Start all services
make build
make up

# 2. Verify services are running
docker-compose ps

# 3. Check API health
curl http://localhost:3001/health
```

## 🎯 Demo Scenarios (30 minutes)

### 1. Basic Single Employee Calculation (5 minutes)
```bash
# Calculate payroll for one employee (regular hours only)
curl -X POST http://localhost:3001/api/payroll/calculate \
-H "Content-Type: application/json" \
-d '{
  "companyId": 1,
  "period": "2024-03",
  "attendanceList": [{
    "employeeId": 1,
    "regularHours": 160,
    "overtimeHours": 0,
    "sickLeaveHours": 0,
    "absenceHours": 0,
    "vacationHours": 0
  }]
}'

# Expected Response:
{
  "jobId": "1",
  "message": "Payroll calculation queued"
}

# Check calculation results
curl http://localhost:3001/api/payroll/job/1

# Expected Result:
{
  "id": "1",
  "state": "completed",
  "progress": 100,
  "result": {
    "employeeId": 1,
    "regularPay": 3200,    # 160 hours × $20/hour
    "overtimePay": 0,
    "sickLeavePay": 0,
    "vacationPay": 0,
    "grossPay": 3200,
    "deductions": 640,     # 20% tax rate
    "netPay": 2560
  }
}
```

### 2. Complex Multi-Employee Scenario (10 minutes)
```bash
# Calculate payroll for multiple employees with different scenarios
curl -X POST http://localhost:3001/api/payroll/calculate \
-H "Content-Type: application/json" \
-d '{
  "companyId": 1,
  "period": "2024-03",
  "attendanceList": [
    {
      "employeeId": 1,
      "regularHours": 160,
      "overtimeHours": 10,
      "sickLeaveHours": 0,
      "absenceHours": 0,
      "vacationHours": 0
    },
    {
      "employeeId": 2,
      "regularHours": 152,
      "sickLeaveHours": 8,
      "overtimeHours": 0,
      "absenceHours": 0,
      "vacationHours": 0
    },
    {
      "employeeId": 3,
      "regularHours": 144,
      "overtimeHours": 0,
      "sickLeaveHours": 0,
      "absenceHours": 0,
      "vacationHours": 16
    }
  ]
}'
```

### 3. Error Handling Demo (5 minutes)
```bash
# 1. Invalid Hours (Negative Values)
curl -X POST http://localhost:3001/api/payroll/calculate \
-H "Content-Type: application/json" \
-d '{
  "companyId": 1,
  "period": "2024-03",
  "attendanceList": [{
    "employeeId": 1,
    "regularHours": -160,
    "overtimeHours": 0
  }]
}'

# 2. Missing Required Fields
curl -X POST http://localhost:3001/api/payroll/calculate \
-H "Content-Type: application/json" \
-d '{
  "companyId": 1,
  "period": "2024-03",
  "attendanceList": [{
    "employeeId": 1
  }]
}'
```

### 4. Queue Monitoring (5 minutes)

1. Access Bull Board UI:
   - Open http://localhost:3001/admin/queues
   - Show active jobs
   - Show completed jobs
   - Show failed jobs

2. Check Queue Stats via API:
```bash
# Get queue statistics
curl http://localhost:3001/api/payroll/queue/info

# Monitor specific job
curl http://localhost:3001/api/payroll/job/1
```

## 🎯 Key Features to Highlight (5 minutes)

1. **Architecture**
   - Clean Architecture principles
   - Separation of concerns
   - Queue-based processing

2. **Technical Features**
   - Input validation
   - Error handling
   - Async processing
   - Real-time monitoring

3. **Business Logic**
   - Multiple employee processing
   - Different pay types
   - Tax calculations
   - Summary reports

## 🔍 Live Debugging (if needed)

```bash
# View backend logs
docker-compose logs -f backend

# Monitor Redis queue
docker-compose exec redis redis-cli monitor

# Check service health
docker-compose ps
```

## 📊 Demo Results Matrix

| Scenario | Input | Expected Output |
|----------|-------|----------------|
| Regular Hours | 160 hrs | $3,200 gross |
| With Overtime | 10 OT hrs | $300 premium |
| Sick Leave | 8 hrs | Paid at base |
| Vacation | 16 hrs | Paid at base |

## 🚨 Troubleshooting Guide

If issues arise during demo:

1. Service Issues
```bash
# Restart specific service
docker-compose restart backend

# Restart all services
docker-compose down && docker-compose up -d
```

2. Queue Issues
```bash
# Clear Redis queue
docker-compose exec redis redis-cli FLUSHALL

# Check Redis connection
docker-compose exec redis redis-cli ping
```

## 📝 Demo Checklist

- [ ] Start all services
- [ ] Verify API health
- [ ] Run basic calculation
- [ ] Show multi-employee scenario
- [ ] Demonstrate error handling
- [ ] Show queue monitoring
- [ ] Highlight key features
- [ ] Q&A session

