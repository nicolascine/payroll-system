import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PayrollResult, PayrollService } from './payroll.service';

@Processor('payroll')
export class PayrollProcessor {
  private readonly logger = new Logger(PayrollProcessor.name);

  constructor(private readonly payrollService: PayrollService) {}

  @Process('calculate')
  async handleCalculation(job: Job): Promise<PayrollResult> {
    this.logger.debug('Starting payroll calculation job...', {
      jobId: job.id,
      timestamp: new Date().toISOString()
    });

    const { companyId, period, attendanceList } = job.data;

    try {
      const result = await this.payrollService.calculatePayroll(companyId, period, attendanceList);
      
      this.logger.debug('Payroll calculation completed successfully', {
        jobId: job.id,
        companyId,
        period,
        employeeCount: result.summary.employeeCount,
        totalNetPay: result.summary.totalNetPay
      });

      return result;
    } catch (error) {
      this.logger.error(`Error calculating payroll: ${error.message}`, {
        jobId: job.id,
        companyId,
        period,
        error: error.stack
      });
      throw error;
    }
  }
} 