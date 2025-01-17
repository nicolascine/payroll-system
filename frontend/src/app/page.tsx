'use client'

import { ExcelUpload } from '../components/ExcelUpload';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
          <h1 className="font-bold text-2xl text-gray-900">
            Payroll Management System
          </h1>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="gap-8 grid md:grid-cols-3">
          {/* Main Upload Section */}
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="mb-4 font-semibold text-gray-900 text-xl">
                  Upload Attendance Data
                </h2>
                
                {/* Sample Download Card */}
                <div className="bg-blue-50 mb-6 p-4 border border-blue-100 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-blue-800 text-sm">
                        Need a template?
                      </h3>
                      <div className="mt-2">
                        <a
                          href="http://localhost:3001/api/payroll/sample"
                          className="inline-flex items-center bg-blue-100 hover:bg-blue-200 px-4 py-2 border border-transparent rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-blue-700 text-sm focus:outline-none"
                          download="sample-attendance.xlsx"
                        >
                          Download Sample Excel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <ExcelUpload />
              </div>
            </div>

            {/* Data Format Example */}
            <div className="bg-white shadow mt-8 rounded-lg overflow-hidden">
              <div className="border-gray-200 px-6 py-5 border-b">
                <h3 className="font-medium text-gray-900 text-lg">
                  Expected Data Format
                </h3>
              </div>
              <div className="px-6 py-5">
                <div className="overflow-x-auto">
                  <table className="divide-y divide-gray-200 min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                          Employee ID
                        </th>
                        <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                          Regular Hours
                        </th>
                        <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                          Overtime
                        </th>
                        <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                          Sick Leave
                        </th>
                        <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                          Vacation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-gray-900 text-sm whitespace-nowrap">1</td>
                        <td className="px-6 py-4 text-gray-900 text-sm whitespace-nowrap">160</td>
                        <td className="px-6 py-4 text-gray-900 text-sm whitespace-nowrap">15</td>
                        <td className="px-6 py-4 text-gray-900 text-sm whitespace-nowrap">0</td>
                        <td className="px-6 py-4 text-gray-900 text-sm whitespace-nowrap">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Links */}
            <div className="bg-white shadow rounded-lg">
              <div className="border-gray-200 px-6 py-5 border-b">
                <h3 className="font-medium text-gray-900 text-lg">
                  Quick Links
                </h3>
              </div>
              <div className="px-6 py-5">
                <nav className="space-y-3">
                  <a
                    href="http://localhost:3001/admin/queues"
                    target="_blank"
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Queue Monitor
                  </a>
                  <a
                    href="http://localhost:3001/api"
                    target="_blank"
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    API Documentation
                  </a>
                </nav>
              </div>
            </div>

            {/* System Information */}
            <div className="bg-white shadow rounded-lg">
              <div className="border-gray-200 px-6 py-5 border-b">
                <h3 className="font-medium text-gray-900 text-lg">
                  System Information
                </h3>
              </div>
              <div className="px-6 py-5">
                <dl className="space-y-3">
                  <div>
                    <dt className="font-medium text-gray-500 text-sm">Regular Pay Rate</dt>
                    <dd className="mt-1 text-gray-900 text-sm">$20/hour</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 text-sm">Overtime Rate</dt>
                    <dd className="mt-1 text-gray-900 text-sm">$30/hour (1.5x)</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 text-sm">Tax Rate</dt>
                    <dd className="mt-1 text-gray-900 text-sm">20%</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 text-sm">Sick Leave</dt>
                    <dd className="mt-1 text-gray-900 text-sm">Paid at regular rate</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500 text-sm">Vacation</dt>
                    <dd className="mt-1 text-gray-900 text-sm">Paid at regular rate</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 