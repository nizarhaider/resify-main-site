import React from "react";

interface DownloadDialogProps {
  pdfBlob: Blob;
}

const DownloadResume: React.FC<DownloadDialogProps> = ({ pdfBlob }) => {
    const downloadPdf = () => {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "optimized_resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    
    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
            Your Optimized Resume
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 text-center mb-2">
                Your resume has been optimized and is ready for download
            </p>
            <p className="text-xs text-gray-500 text-center">
                Format: PDF | Optimized for ATS systems
            </p>
            </div>
    
            <button
            onClick={downloadPdf}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 flex items-center justify-center transition-colors duration-200"
            >
            {/* Simple download icon using SVG */}
            <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
            </svg>
            <span>Download Resume</span>
            </button>
        </div>
        </div>
    );
    };
    
    export default DownloadResume;