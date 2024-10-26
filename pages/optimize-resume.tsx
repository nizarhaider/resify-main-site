import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.css";
import ATSSummary from '../components/OptimizeSummaryCard';

// Register the FilePond plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(FilePondPluginFileValidateType);

const OptimizeResume: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [responseData, setResponseData] = useState<any>(null);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [pdfContent, setPdfContent] = useState<string | ArrayBuffer | null>(null); // Store the PDF content


  useEffect(() => {
    if (loading) {
      setStatusMessages(["Initializing..."]);
      setTimeout(() => setStatusMessages((prev) => [...prev, "Uploading resume..."]), 2000);
      setTimeout(() => setStatusMessages((prev) => [...prev, "Processing your data..."]), 10000);

    } else {
      setStatusMessages([]); // Clear the messages after loading is done
      setProgress(100); // Complete progress bar when done
    }
  }, [loading]);

  // Read the file content when files change
  const handleFileChange = (fileItems: any) => {
    const file = fileItems[0]?.file; // Get the first file
    setFiles(fileItems.map((fileItem: { file: any }) => fileItem.file)); // Update state with the files

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPdfContent(reader.result); // Set the PDF content
      };
      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer for binary content
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setProgress(0); // Reset progress bar

    const formData = new FormData();

    const url = `https://acgtr3fps5.execute-api.ap-southeast-1.amazonaws.com/prod/optimize_resume`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: pdfContent, 
      });

      if (!response.ok) throw new Error("Failed to process the file");

      const data = await response.json();
      setResponseData(data);

      toast.success("Processing Complete!");
    } catch (error) {
      toast.error("An error occurred during processing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen px-4">
      <Head>
        <title>Resify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center sm:px-4 mt-12 sm:mt-20">
        <h1 className="text-3xl sm:text-6xl font-bold max-w-[90%] sm:max-w-[708px] text-slate-900">
          Optimize your resume with our Ai ATS checker
        </h1>

        <form onSubmit={submitHandler} className="max-w-xl w-full mt-10">
          <div className="flex items-center space-x-3 mb-5">
            <Image src="/1-black.png" width={30} height={30} alt="Bitmoji" />
            <p className="text-left font-medium">Upload your resume (PDF)</p>
          </div>

          <div className="mb-10">
            <FilePond
              files={files}
              onupdatefiles={handleFileChange} // Use the new handler
              allowMultiple={false}
              name="file"
              labelIdle='Drag & Drop your PDF or <span class="filepond--label-action">Browse</span>'
              acceptedFileTypes={['application/pdf']}
            />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
              type="submit"
            >
              Optimize Resume &rarr;
            </button>
          )}

          {loading && (
            <div className="w-full">
              <div className="bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {statusMessages.map((message, index) => (
                <p key={index} className="text-gray-700">
                  {message}
                </p>
              ))}
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 disabled w-full"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            </div>
          )}
        </form>

        {responseData && <ATSSummary responseData={responseData} />}



        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        <Footer />
      </main>
    </div>
  );
};

export default OptimizeResume;
