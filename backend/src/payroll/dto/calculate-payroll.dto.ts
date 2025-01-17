import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { EmployeeAttendance } from '../interfaces/attendance.interface';

export class AttendanceDto implements EmployeeAttendance {
  @IsNumber()
  employeeId: number;

  @IsNumber()
  regularHours: number;

  @IsNumber()
  overtimeHours: number;

  @IsNumber()
  sickLeaveHours: number;

  @IsNumber()
  absenceHours: number;

  @IsNumber()
  vacationHours: number;
}

export class CalculatePayrollDto {
  @IsNumber()
  companyId: number;

  @IsString()
  period: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceDto)
  attendanceList: AttendanceDto[];
} 