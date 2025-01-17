import * as path from 'path';
import * as XLSX from 'xlsx';

export function generateSampleExcel(): string {
  const data = [
    ['Employee ID', 'Regular Hours', 'Overtime Hours', 'Sick Leave Hours', 'Vacation Hours', 'Absence Hours'],
    [1, 160, 10, 0, 0, 0],
    [2, 152, 0, 8, 0, 0],
    [3, 144, 0, 0, 16, 0],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

  const fileName = 'sample-attendance.xlsx';
  const filePath = path.join(__dirname, '..', '..', '..', 'public', fileName);
  XLSX.writeFile(wb, filePath);

  return fileName;
} 