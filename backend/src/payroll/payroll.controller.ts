import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, NotFoundException, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import { Response } from 'express';
import * as path from 'path';
import { CalculatePayrollDto } from './dto/calculate-payroll.dto';
import { PayrollService } from './payroll.service';
import { generateSampleExcel } from './utils/excel-generator';

@ApiTags('Payroll')
@Controller('api/payroll')
export class PayrollController {
  constructor(
    @InjectQueue('payroll') private payrollQueue: Queue,
    private readonly payrollService: PayrollService,
  ) {}

  @Post('calculate')
  @ApiOperation({ summary: 'Queue a new payroll calculation' })
  @ApiResponse({ status: 201, description: 'Calculation queued successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async calculatePayroll(@Body() data: CalculatePayrollDto) {
    const job = await this.payrollQueue.add('calculate', data);
    return { jobId: job.id, message: 'Payroll calculation queued' };
  }

  @Get('job/:id')
  @ApiOperation({ summary: 'Get payroll calculation job status and result' })
  @ApiResponse({ status: 200, description: 'Job details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async getJobStatus(@Param('id') id: string) {
    const job = await this.payrollQueue.getJob(id);
    
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    const [state, result, progress] = await Promise.all([
      job.getState(),
      job.returnvalue,
      job.progress()
    ]);

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
  @ApiOperation({ summary: 'Get queue statistics' })
  @ApiResponse({ status: 200, description: 'Queue statistics retrieved successfully' })
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload Excel file for payroll calculation' })
  async uploadFile(@UploadedFile() file: any) {
    const attendanceList = await this.payrollService.processExcelFile(file);
    const job = await this.payrollQueue.add('calculate', {
      companyId: 1,
      period: '2024-03',
      attendanceList
    });
    return { jobId: job.id, message: 'Excel file processed and calculation queued' };
  }

  @Get('sample')
  @ApiOperation({ summary: 'Generate sample Excel file' })
  async getSampleFile(@Res() res: Response) {
    const fileName = generateSampleExcel();
    return res.download(path.join(__dirname, '..', '..', 'public', fileName));
  }
} 