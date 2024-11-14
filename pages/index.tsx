import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TestHero from "../components/test_hero";
import Script from "next/script";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <Head>
        <title>Welcome to Resify</title>
        <link rel="icon" href="/favicon.ico" />
        <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-NJXE71TQ9Z`}
        />

        <Script strategy="lazyOnload">
          {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-NJXE71TQ9Z', {
                      page_path: window.location.pathname,
                      });
                  `}
        </Script>
      </Head>
      <Header />

      <main className="flex flex-1 w-full flex-col items-center text-center mt-12 sm:mt-20">
        {/* Hero Section */}
        {/* <Hero/> */}
        <TestHero/>
        {/* Increased spacing between hero and services */}
        <div className="mt-28 w-full max-w-5xl px-4">
          {/* Services Section */}
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800">Resume Optimization</h3>
              <p className="text-gray-600 mt-2">
                Improve your resume's chances of getting noticed by ATS systems with our expert optimization service.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800">Website Conversion</h3>
              <p className="text-gray-600 mt-2">
                Transform your resume into a professional website that showcases your skills and experiences beautifully.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800">Personalized Templates</h3>
              <p className="text-gray-600 mt-2">
                Choose from a variety of stunning templates to make your resume stand out.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800">AI-Powered Insights</h3>
              <p className="text-gray-600 mt-2">
                Get data-driven insights into your resume and receive actionable feedback to enhance its effectiveness.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
