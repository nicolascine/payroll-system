import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { AttendanceRecordDto } from './attendance.dto';

export class CalculatePayrollDto {
  @ApiProperty({ example: 1, description: 'Company ID' })
  @IsNumber()
  companyId: number;

  @ApiProperty({ example: '2024-03', description: 'Payroll period (YYYY-MM)' })
  @IsString()
  period: string;

  @ApiProperty({ type: [AttendanceRecordDto], description: 'List of attendance records' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  attendanceList: AttendanceRecordDto[];
} 