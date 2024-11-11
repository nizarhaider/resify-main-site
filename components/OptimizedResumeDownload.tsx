import React from 'react';

const OptimizedResumeDownload = ({ pdfBase64 }: { pdfBase64: string }) => {
  const filename = 'resume.pdf';
  
  return (
    <div className="mt-10 text-left bg-gray-100 p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Resume Optimization Complete!</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Your resume has been successfully optimized for ATS systems. The following improvements have been made:
        </p>
        <ul className="list-disc pl-5 mb-6">
          <li>Enhanced keyword optimization</li>
          <li>Improved formatting and layout</li>
          <li>Corrected spelling and grammar</li>
          <li>Strengthened experience descriptions</li>
        </ul>
      </div>

      <div className="flex justify-center">
      <a
        className="styled-like-a-button"
        download={filename}
        href={`data:application/pdf;base64,${pdfBase64}`}
        >Download
      </a>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          Note: This optimized version maintains your original content while improving its compatibility with ATS systems. 
          Review the changes and make any necessary adjustments before submitting to employers.
        </p>
      </div>
    </div>
  );
};

export default OptimizedResumeDownload;