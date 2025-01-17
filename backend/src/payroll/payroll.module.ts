import { Module } from '@nestjs/common';
import { PayrollProcessor } from './payroll.processor';
import { PayrollSchedule } from './payroll.schedule';
import { PayrollService } from './payroll.service';

@Module({
  imports: [],
  providers: [PayrollService, PayrollProcessor, PayrollSchedule],
  exports: [PayrollService]
})
export class PayrollModule {} 