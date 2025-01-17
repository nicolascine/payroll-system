import React, { useState } from 'react';

export const ExcelUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setResult('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/payroll/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(`Success! Job ID: ${data.jobId}`);
    } catch (error) {
      setResult('Error uploading file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center w-full">
        <label className="flex flex-col justify-center items-center border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 border-dashed rounded-lg w-full h-32 cursor-pointer">
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <svg className="mb-4 w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mb-2 text-gray-500 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-gray-500 text-xs">Excel files only</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {file && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">Selected file:</span>
          <span className="font-medium text-gray-900 text-sm">{file.name}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || isLoading}
        className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          !file || isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Processing...' : 'Upload and Process'}
      </button>

      {result && (
        <div className={`mt-4 p-4 rounded-md ${
          result.includes('Success')
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }`}>
          {result}
        </div>
      )}
    </div>
  );
}; 