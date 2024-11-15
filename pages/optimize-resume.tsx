import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.css";
import ATSSummary from "../components/OptimizeSummaryCard";
import DownloadDialog from "../components/DownloadDialog"; // New Component
import CircularProgress from "@mui/material/CircularProgress";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import React from "react";

registerPlugin(FilePondPluginFileValidateType);

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}
const OptimizeResume: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [evaluationData, setEvaluationData] = useState<any>(null);
  const [pdfContent, setPdfContent] = useState<string | ArrayBuffer | null>(null);
  const [imgContent, setImgContent] = useState<string | ArrayBuffer | null>(null);
  const [optimizedPdfContent, setOptimizedPdfContent] = useState<Blob | null>(null);

  const handleFileChange = (fileItems: any) => {
    const file = fileItems[0]?.file;
    setFiles(fileItems.map((fileItem: { file: any }) => fileItem.file));

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPdfContent(reader.result);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = `https://5g1par1mud.execute-api.ap-southeast-1.amazonaws.com/prod/assess_resume`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: pdfContent,
      });

      if (!response.ok) throw new Error("Failed to process the file");

      const data = await response.json();
      setEvaluationData(data);
      setImgContent(data.image_encoded);
      toast.success("Processing Complete!");
    } catch (error) {
      toast.error("An error occurred during processing.");
    } finally {
      setLoading(false);
    }
  };

  const fixIssuesHandler = async () => {
    if (!pdfContent) return;

    setLoading(true);

    try {
      const response = await fetch("https://5g1par1mud.execute-api.ap-southeast-1.amazonaws.com/prod/optimize_resume", {
        method: "POST",
        body: imgContent,
      });

      if (!response.ok) throw new Error("Failed to fix issues");

      const pdfBlob = await response.blob();
      setOptimizedPdfContent(pdfBlob);
      toast.success("Issues fixed successfully!");
    } catch (error) {
      toast.error("An error occurred while fixing issues.");
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
              onupdatefiles={handleFileChange}
              allowMultiple={false}
              name="file"
              labelIdle='Drag & Drop your PDF or <span class="filepond--label-action">Browse</span>'
              acceptedFileTypes={["application/pdf"]}
            />
          </div>

          {loading && (
            <div className="flex justify-center w-full py-4">
              <GradientCircularProgress />
            </div>
          )}

          {!loading && !evaluationData && !optimizedPdfContent && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
              type="submit"
            >
              Optimize Resume
            </button>
          )}
        </form>

        {!loading && evaluationData && !optimizedPdfContent && (
          <>
            <ATSSummary evaluationData={evaluationData} />
            <button
              onClick={fixIssuesHandler}
              className="bg-black rounded-xl text-white font-medium mt-5 px-4 py-2 hover:bg-black/80 w-full"
            >
              Fix Issues
            </button>
          </>
        )}

        {!loading && optimizedPdfContent && (
          <DownloadDialog pdfBlob={optimizedPdfContent} />
        )}

        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        <Footer />
      </main>
    </div>
  );
};

export default OptimizeResume;
