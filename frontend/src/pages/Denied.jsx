import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CircleX } from 'lucide-react';
const Denied = () => {
    const navigate =useNavigate();

    const handleGoHome =()=>{
        navigate('/');
    }
  return (
     <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4 sm:p-8">
      
      <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 space-y-6 bg-white shadow-xl rounded-3xl max-w-xl w-full">
 
        <CircleX size={96} className="text-red-500/20" />

     
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">
          Access Denied
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          You do not have the necessary permissions to view this page. If you believe this is an error, please contact the site administrator.
        </p>

       
        <button
          onClick={handleGoHome}
          className="mt-4 px-8 py-3 bg-secondary text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out hover: transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  )
}

export default Denied
