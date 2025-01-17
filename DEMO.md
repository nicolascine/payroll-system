# 🚀 Payroll System Demo Guide

## 1. Basic Single Employee Calculation
```bash
# Request
curl -X POST http://localhost:3001/api/payroll/calculate \
-H "Content-Type: application/json" \
-d '{
  "companyId": 1,
  "period": "2024-03",
  "attendanceList": [{
    "employeeId": 1,
    "regularHours": 160,
    "overtimeHours": 15,
    "sickLeaveHours": 0,
    "vacationHours": 0,
    "absenceHours": 0
  }]
}'

# Response
{
  "jobId": "1",
  "message": "Payroll calculation queued"
}

# Check Results
curl http://localhost:3001/api/payroll/job/1

# Result Response
{
  "id": "1",
  "state": "completed",
  "result": {
    "calculations": [{
      "employeeId": 1,
      "regularPay": 3200.00,    # 160 hours × $20/hour
      "overtimePay": 450.00,    # 15 hours × $20/hour × 1.5
      "sickLeavePay": 0,
      "vacationPay": 0,
      "grossPay": 3650.00,
      "deductions": 730.00,     # 20% tax
      "netPay": 2920.00
    }],
    "summary": {
      "employeeCount": 1,
      "totalGrossPay": 3650.00,
      "totalDeductions": 730.00,
      "totalNetPay": 2920.00
    }
  }
}
```

## 2. Multiple Employees with Different Scenarios
```bash
curl -X POST http://localhost:3001/api/payroll/calculate \
-H "Content-Type: application/json" \
-d '{
  "companyId": 1,
  "period": "2024-03",
  "attendanceList": [
    {
      "employeeId": 1,
      "regularHours": 160,
      "overtimeHours": 15,
      "sickLeaveHours": 0,
      "vacationHours": 0,
      "absenceHours": 0
    },
    {
      "employeeId": 2,
      "regularHours": 152,
      "overtimeHours": 0,
      "sickLeaveHours": 8,
      "vacationHours": 0,
      "absenceHours": 0
    },
    {
      "employeeId": 3,
      "regularHours": 144,
      "overtimeHours": 5,
      "sickLeaveHours": 0,
      "vacationHours": 16,
      "absenceHours": 0
    }
  ]
}'

# Response with Multiple Calculations
{
  "id": "2",
  "state": "completed",
  "result": {
    "calculations": [
      {
        "employeeId": 1,
        "regularPay": 3200.00,
        "overtimePay": 450.00,
        "sickLeavePay": 0,
        "vacationPay": 0,
        "grossPay": 3650.00,
        "deductions": 730.00,
        "netPay": 2920.00
      },
      {
        "employeeId": 2,
        "regularPay": 3040.00,
        "overtimePay": 0,
        "sickLeavePay": 160.00,
        "vacationPay": 0,
        "grossPay": 3200.00,
        "deductions": 640.00,
        "netPay": 2560.00
      },
      {
        "employeeId": 3,
        "regularPay": 2880.00,
        "overtimePay": 150.00,
        "sickLeavePay": 0,
        "vacationPay": 320.00,
        "grossPay": 3350.00,
        "deductions": 670.00,
        "netPay": 2680.00
      }
    ],
    "summary": {
      "employeeCount": 3,
      "totalGrossPay": 10200.00,
      "totalDeductions": 2040.00,
      "totalNetPay": 8160.00
    }
  }
}
```

## 3. Excel Upload Example
```bash
# Download sample
curl -O http://localhost:3001/api/payroll/sample

# Upload Excel
curl -X POST http://localhost:3001/api/payroll/upload \
-F "file=@sample-attendance.xlsx"

# Response
{
  "jobId": "3",
  "message": "Excel file processed and calculation queued"
}
```

## 4. Error Cases
```bash
# Invalid Hours (Negative)
curl -X POST http://localhost:3001/api/payroll/calculate \
-H "Content-Type: application/json" \
-d '{
  "companyId": 1,
  "period": "2024-03",
  "attendanceList": [{
    "employeeId": 1,
    "regularHours": -160,
    "overtimeHours": 0,
    "sickLeaveHours": 0,
    "vacationHours": 0,
    "absenceHours": 0
  }]
}'

# Error Response
{
  "statusCode": 400,
  "message": ["regularHours must not be less than 0"],
  "error": "Bad Request"
}
```

## 🔍 Quick Reference
- Regular Pay Rate: $20/hour
- Overtime Rate: $30/hour (1.5x regular)
- Tax Rate: 20%
- Sick Leave: Paid at regular rate
- Vacation: Paid at regular rate

## 📊 Common Scenarios
1. Full Time (160 hrs): $3,200 gross / $2,560 net
2. Full Time + 15 OT hrs: $3,650 gross / $2,920 net
3. Part Time (80 hrs): $1,600 gross / $1,280 net
4. Sick Leave (8 hrs): Additional $160 gross
5. Vacation (16 hrs): Additional $320 gross

