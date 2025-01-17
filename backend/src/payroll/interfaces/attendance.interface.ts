export interface EmployeeAttendance {
  employeeId: number;
  regularHours: number;
  overtimeHours: number;
  sickLeaveHours: number;
  absenceHours: number;
  vacationHours: number;
}

export interface PayrollCalculation {
  employeeId: number;
  baseSalary: number;
  regularHoursPay: number;
  overtimePay: number;
  deductions: number;
  totalPay: number;
} 