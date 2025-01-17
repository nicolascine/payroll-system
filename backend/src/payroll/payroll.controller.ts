import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { PayrollService } from './payroll.service';

@Controller('api/payroll')
export class PayrollController {
  constructor(
    @InjectQueue('payroll') private payrollQueue: Queue,
    private readonly payrollService: PayrollService,
  ) {}

  @Post('calculate')
  async calculatePayroll(@Body() data: any) {
    const job = await this.payrollQueue.add('calculate', data);
    return { jobId: job.id, message: 'Payroll calculation queued' };
  }

  @Get('job/:id')
  async getJobStatus(@Param('id') id: string) {
    const job = await this.payrollQueue.getJob(id);
    if (!job) {
      return { message: 'Job not found' };
    }

    const state = await job.getState();
    const result = job.returnvalue;
    const progress = await job.progress();

    return {
      id: job.id,
      state,
      progress,
      result,
      failedReason: job.failedReason,
      timestamp: job.timestamp,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn,
    };
  }

  @Get('queue/info')
  async getQueueInfo() {
    const [active, waiting, completed, failed] = await Promise.all([
      this.payrollQueue.getActive(),
      this.payrollQueue.getWaiting(),
      this.payrollQueue.getCompleted(),
      this.payrollQueue.getFailed(),
    ]);

    return {
      active: active.length,
      waiting: waiting.length,
      completed: completed.length,
      failed: failed.length,
      jobs: {
        active: active.map(job => ({ id: job.id, timestamp: job.timestamp })),
        waiting: waiting.map(job => ({ id: job.id, timestamp: job.timestamp })),
        completed: completed.map(job => ({ id: job.id, timestamp: job.timestamp })),
        failed: failed.map(job => ({ id: job.id, timestamp: job.timestamp })),
      }
    };
  }
} 