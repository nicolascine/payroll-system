import { Injectable, Logger } from '@nestjs/common';

interface AttendanceRecord {
  employeeId: number;
  regularHours: number;
  overtimeHours: number;
  sickLeaveHours: number;
  absenceHours: number;
  vacationHours: number;
}

interface PayrollCalculation {
  employeeId: number;
  regularPay: number;
  overtimePay: number;
  sickLeavePay: number;
  vacationPay: number;
  grossPay: number;
  deductions: number;
  netPay: number;
}

@Injectable()
export class PayrollService {
  private readonly logger = new Logger(PayrollService.name);
  private readonly HOURLY_RATE = 20; // Base hourly rate
  private readonly OVERTIME_MULTIPLIER = 1.5;
  private readonly TAX_RATE = 0.2; // 20% tax rate

  async calculatePayroll(companyId: number, period: string, attendanceList: AttendanceRecord[]) {
    this.logger.log(`Starting payroll calculation for company ${companyId} - Period: ${period}`);
    
    const calculations = await Promise.all(
      attendanceList.map(async (attendance) => {
        this.logger.debug(`Processing employee ${attendance.employeeId}`);
        
        // Calculate different pay components
        const regularPay = attendance.regularHours * this.HOURLY_RATE;
        const overtimePay = attendance.overtimeHours * this.HOURLY_RATE * this.OVERTIME_MULTIPLIER;
        const sickLeavePay = attendance.sickLeaveHours * this.HOURLY_RATE;
        const vacationPay = attendance.vacationHours * this.HOURLY_RATE;

        // Calculate gross pay
        const grossPay = regularPay + overtimePay + sickLeavePay + vacationPay;

        // Calculate deductions
        const deductions = grossPay * this.TAX_RATE;

        // Calculate net pay
        const netPay = grossPay - deductions;

        const calculation: PayrollCalculation = {
          employeeId: attendance.employeeId,
          regularPay,
          overtimePay,
          sickLeavePay,
          vacationPay,
          grossPay,
          deductions,
          netPay
        };

        this.logger.debug(`Employee ${attendance.employeeId} calculation:`, {
          ...calculation,
          totalHours: attendance.regularHours + attendance.overtimeHours + 
                     attendance.sickLeaveHours + attendance.vacationHours
        });

        return calculation;
      })
    );

    const totalGrossPay = calculations.reduce((sum, calc) => sum + calc.grossPay, 0);
    const totalDeductions = calculations.reduce((sum, calc) => sum + calc.deductions, 0);
    const totalNetPay = calculations.reduce((sum, calc) => sum + calc.netPay, 0);

    this.logger.log(`Payroll summary for company ${companyId}:`, {
      period,
      employeeCount: calculations.length,
      totalGrossPay,
      totalDeductions,
      totalNetPay
    });

    return {
      companyId,
      period,
      calculations,
      summary: {
        employeeCount: calculations.length,
        totalGrossPay,
        totalDeductions,
        totalNetPay
      }
    };
  }
} 