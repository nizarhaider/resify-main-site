import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.css";

// Register the FilePond plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(FilePondPluginFileValidateType);

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [bitmoji, setBitmoji] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [pdfContent, setPdfContent] = useState<string | ArrayBuffer | null>(null); // Store the PDF content

  const imageSelectHandler = (image: string) => {
    setBitmoji(image);
  };

  useEffect(() => {
    if (loading) {
      setStatusMessages(["Initializing..."]);
      setTimeout(() => setStatusMessages((prev) => [...prev, "Uploading resume..."]), 5000);
      setTimeout(() => setStatusMessages((prev) => [...prev, "Processing your data..."]), 10000);
      setTimeout(() => setProgress(50), 5000); // Simulate progress
      setTimeout(() => setProgress(80), 10000); // Simulate more progress
    } else {
      setStatusMessages([]); // Clear the messages after loading is done
      setProgress(100); // Complete progress bar when done
    }
  }, [loading]);

  // Read the file content when files change
  const handleFileChange = (fileItems: any) => {
    const file = fileItems[0]?.file; // Get the first file
    setFiles(fileItems.map((fileItem: { file: any; }) => fileItem.file)); // Update state with the files

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
    if (files.length === 0 || !bitmoji) return;

    setLoading(true);
    setProgress(0); // Reset progress bar

    const formData = new FormData();
    const template_option = "Tech";
    const gender = bitmoji === "bitmoji_male.png" ? "male" : "female";

    // Use the PDF content in the fetch request
    const url = `https://p06gwkgwea.execute-api.ap-southeast-1.amazonaws.com/prod/resume_to_website?template_option=${template_option}&gender=${gender}`;

    try {
      // Send the PDF content as the request body
      const response = await fetch(url, {
        method: "POST",
        body: pdfContent, // Send the PDF content directly
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
          Generate your next Website portfolio using AI
        </h1>

        <form onSubmit={submitHandler} className="max-w-xl w-full mt-10">
          <div className="flex items-center space-x-3 mb-5">
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

          <div className="flex items-center space-x-3 mb-5">
            <p className="text-left font-medium">Select your Bitmoji.</p>
          </div>

          <div className="flex justify-center space-x-5 sm:justify-around mb-5">
            <img
              src="/bitmoji_male.png"
              alt="Male Bitmoji"
              width={140}
              height={150}
              onClick={() => imageSelectHandler("bitmoji_male.png")}
              className={`cursor-pointer ${bitmoji === "bitmoji_male.png" ? 'border-2 border-black' : ''}`}
            />
            <img
              src="/bitmoji_female.png"
              alt="Female Bitmoji"
              width={140}
              height={150}
              onClick={() => imageSelectHandler("bitmoji_female.png")}
              className={`cursor-pointer ${bitmoji === "bitmoji_female.png" ? 'border-2 border-black' : ''}`}
            />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
              type="submit"
            >
              Generate Website &rarr;
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

        {responseData && (
          <div className="mt-10 text-left bg-gray-100 p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg w-full">
            <h3 className="sm:text-2xl text-xl font-bold text-slate-900 mb-4 border-b-2 border-gray-300 pb-2">
              Result:
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700">Total Tokens:</span>
                <span className="ml-2 text-gray-900">{responseData.total_tokens}</span>
              </div>

              <div className="flex items-center">
                <span className="font-semibold text-gray-700">Cost Incurred:</span>
                <span className="ml-2 text-gray-900">{responseData.cost_incurred}</span>
              </div>

              <div className="flex items-center">
                <span className="font-semibold text-gray-700">Website URL:</span>
                <a 
                  href={responseData.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 underline hover:text-blue-800"
                >
                  {responseData.website_url}
                </a>
              </div>
            </div>
          </div>
        )}

        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
