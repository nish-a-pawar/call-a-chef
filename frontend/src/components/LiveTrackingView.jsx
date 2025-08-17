import React from "react";
import { ChefHat, Home } from "lucide-react";

const LiveTrackingView = ({ progress = 50 }) => {
  return (
    <section className="relative flex justify-between items-center bg-amber-50  w-full h-40 rounded-2xl shadow-xl px-10">
  
      <div className="absolute top-1/2 left-20 right-20 h-2 bg-gray-200 rounded-full -translate-y-1/2">
     
        <div
          className="h-2 bg-green-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

    
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-lg">
          <ChefHat size={32} className="text-yellow-600" />
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700">Chef</p>
      </div>

    
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-lg">
          <Home size={32} className="text-[tomato]" />
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700">Home</p>
      </div>
    </section>
  );
};

export default LiveTrackingView;
