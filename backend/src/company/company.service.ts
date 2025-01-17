import { Injectable } from '@nestjs/common';

export interface Company {
  id: number;
  name: string;
  payrollPeriod: string;
}

@Injectable()
export class CompanyService {
  // Mock data for demonstration
  private companies: Company[] = [
    { id: 1, name: 'Company A', payrollPeriod: '2024-03' },
    { id: 2, name: 'Company B', payrollPeriod: '2024-03' }
  ];

  async getCompaniesForPayroll(): Promise<Company[]> {
    // In a real application, this would fetch from database
    return this.companies;
  }

  async getCompanyById(id: number): Promise<Company | undefined> {
    return this.companies.find(company => company.id === id);
  }
} 