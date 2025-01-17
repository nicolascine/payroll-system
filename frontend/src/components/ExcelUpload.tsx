import React, { useState } from 'react';

export const ExcelUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

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
    }
  };

  const downloadSample = async () => {
    window.open('http://localhost:3001/api/payroll/sample', '_blank');
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl">Excel Payroll Upload</h2>
      <div className="space-y-4">
        <button
          onClick={downloadSample}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Download Sample Excel
        </button>
        <div>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="mb-4"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!file}
          className="bg-blue-500 disabled:bg-gray-300 px-4 py-2 rounded text-white"
        >
          Upload and Process
        </button>
        {result && (
          <div className="bg-gray-100 mt-4 p-4 rounded">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}; 