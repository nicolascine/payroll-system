import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PayrollController } from './payroll.controller';
import { PayrollProcessor } from './payroll.processor';
import { PayrollSchedule } from './payroll.schedule';
import { PayrollService } from './payroll.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payroll',
    }),
  ],
  controllers: [PayrollController],
  providers: [PayrollService, PayrollProcessor, PayrollSchedule],
  exports: [PayrollService]
})
export class PayrollModule {} 