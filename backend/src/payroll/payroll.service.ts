import { Injectable, Logger } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { AttendanceRecordDto } from './dto/attendance.dto';

@Injectable()
export class PayrollService {
  private readonly logger = new Logger(PayrollService.name);
  private readonly HOURLY_RATE = 20; // $20 per hour
  private readonly OVERTIME_MULTIPLIER = 1.5;
  private readonly TAX_RATE = 0.2; // 20% tax rate

  async calculatePayroll(
    companyId: number,
    period: string,
    attendanceList: AttendanceRecordDto[],
  ): Promise<PayrollResult> {
    this.logger.debug(`Calculating payroll for company ${companyId}, period ${period}`);

    const calculations = attendanceList.map(attendance => {
      // Calculate different types of pay
      const regularPay = attendance.regularHours * this.HOURLY_RATE;
      const overtimePay = attendance.overtimeHours * this.HOURLY_RATE * this.OVERTIME_MULTIPLIER;
      const sickLeavePay = attendance.sickLeaveHours * this.HOURLY_RATE;
      const vacationPay = attendance.vacationHours * this.HOURLY_RATE;

      // Calculate gross pay
      const grossPay = regularPay + overtimePay + sickLeavePay + vacationPay;

      // Calculate deductions (20% tax)
      const deductions = grossPay * this.TAX_RATE;

      // Calculate net pay
      const netPay = grossPay - deductions;

      this.logger.debug(`Calculated pay for employee ${attendance.employeeId}`, {
        regularPay,
        overtimePay,
        grossPay,
        netPay
      });

      return {
        employeeId: attendance.employeeId,
        regularPay,
        overtimePay,
        sickLeavePay,
        vacationPay,
        grossPay,
        deductions,
        netPay,
      };
    });

    // Calculate summary
    const summary = calculations.reduce(
      (acc, curr) => ({
        employeeCount: acc.employeeCount + 1,
        totalGrossPay: acc.totalGrossPay + curr.grossPay,
        totalDeductions: acc.totalDeductions + curr.deductions,
        totalNetPay: acc.totalNetPay + curr.netPay,
      }),
      { employeeCount: 0, totalGrossPay: 0, totalDeductions: 0, totalNetPay: 0 },
    );

    return {
      calculations,
      summary,
    };
  }

  async processExcelFile(file: any): Promise<AttendanceRecordDto[]> {
    const workbook = XLSX.read(file.buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Skip header row
    return data.slice(1).map(row => ({
      employeeId: row[0],
      regularHours: row[1],
      overtimeHours: row[2],
      sickLeaveHours: row[3],
      vacationHours: row[4],
      absenceHours: row[5]
    }));
  }
}

export interface PayrollCalculationResult {
  employeeId: number;
  regularPay: number;
  overtimePay: number;
  sickLeavePay: number;
  vacationPay: number;
  grossPay: number;
  deductions: number;
  netPay: number;
}

export interface PayrollSummary {
  employeeCount: number;
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
}

export interface PayrollResult {
  calculations: PayrollCalculationResult[];
  summary: PayrollSummary;
} 