import React from 'react';

export default function Hero() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl px-4 sm:px-8">          
        {/* Mobile view image */}
        <div className="block sm:hidden w-full mb-6">
        <img
            src="/resume_hero.png" 
            alt="Resify Screenshot"
            className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
        />
        </div>

        <div className="sm:text-left sm:w-1/2">
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
        </div>

        {/* Desktop view image */}
        <div className="hidden sm:flex mt-10 sm:mt-0 sm:w-1/2 justify-center">
        <img
            src="/resume_hero.png" // Replace with the correct image path
            alt="Resify Screenshot"
            className="w-full max-w-xs rounded-lg shadow-lg"
        />
        </div>
        </div>
    )}