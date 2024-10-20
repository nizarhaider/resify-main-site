import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen px-4">
      <Head>
        <title>Welcome to Resify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-[95%] sm:max-w-[708px] text-slate-900">
          Welcome to Resify
        </h1>

        <p className="text-base sm:text-lg md:text-xl max-w-[95%] sm:max-w-[708px] text-slate-700 mt-4">
          Easily convert your resume into a personalized website using AI.
        </p>

        <div className="mt-10 space-y-4 sm:space-x-4 sm:space-y-0 flex flex-col sm:flex-row">
          <a
            href="/optimize-resume"
            className="bg-black text-white font-medium px-6 py-3 rounded-lg hover:bg-black/80 transition duration-200"
          >
            Optimize Resume
          </a>
          <a
            href="/convert-to-website"
            className="bg-black text-white font-medium px-6 py-3 rounded-lg hover:bg-black/80 transition duration-200"
          >
            Convert Resume to Website
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
