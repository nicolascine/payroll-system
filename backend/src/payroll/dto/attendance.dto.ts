import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';

export class AttendanceRecordDto {
  @ApiProperty({ example: 1, description: 'Employee ID' })
  @IsNumber()
  @IsPositive()
  employeeId: number;

  @ApiProperty({ example: 160, description: 'Regular working hours' })
  @IsNumber()
  @Min(0)
  regularHours: number;

  @ApiProperty({ example: 10, description: 'Overtime hours' })
  @IsNumber()
  @Min(0)
  overtimeHours: number;

  @ApiProperty({ example: 8, description: 'Sick leave hours' })
  @IsNumber()
  @Min(0)
  sickLeaveHours: number;

  @ApiProperty({ example: 0, description: 'Absence hours' })
  @IsNumber()
  @Min(0)
  absenceHours: number;

  @ApiProperty({ example: 16, description: 'Vacation hours' })
  @IsNumber()
  @Min(0)
  vacationHours: number;
} 