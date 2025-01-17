import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { CompanyService } from '../company/company.service';

@Injectable()
export class PayrollSchedule {
  private readonly logger = new Logger(PayrollSchedule.name);

  constructor(
    @InjectQueue('payroll') private payrollQueue: Queue,
    private readonly companyService: CompanyService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async schedulePayrollCalculations() {
    this.logger.debug('Checking companies for payroll calculation...');
    
    const companies = await this.companyService.getCompaniesForPayroll();
    
    for (const company of companies) {
      await this.payrollQueue.add('calculate', {
        companyId: company.id,
        period: company.payrollPeriod,
      }, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      });
    }
  }

  @Cron(CronExpression.EVERY_WEEK)
  async processWeeklyPayroll() {
    // Process weekly payroll
  }

  @Cron('0 0 15,30 * *')
  async processBiweeklyPayroll() {
    // Process bi-weekly payroll
  }

  @Cron('0 0 1 * *')
  async processMonthlyPayroll() {
    // Process monthly payroll
  }
} 