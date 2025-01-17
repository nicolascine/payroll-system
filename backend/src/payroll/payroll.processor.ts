import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PayrollService } from './payroll.service';

@Processor('payroll')
export class PayrollProcessor {
  private readonly logger = new Logger(PayrollProcessor.name);

  constructor(private readonly payrollService: PayrollService) {}

  @Process('calculate')
  async handleCalculation(job: Job) {
    this.logger.debug('Start calculating payroll...');
    const { companyId, period } = job.data;

    try {
      await this.payrollService.calculatePayroll(companyId, period);
      this.logger.debug(`Payroll calculated for company ${companyId}`);
    } catch (error) {
      this.logger.error(`Error calculating payroll: ${error.message}`);
      throw error;
    }
  }
} 