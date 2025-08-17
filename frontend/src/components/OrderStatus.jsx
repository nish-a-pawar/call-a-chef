import React from "react";
import { useState,useEffect } from "react";
import {
  ChefHat,
  Timer,
  CookingPot,
  MapPin,
  CircleCheckBig,
} from "lucide-react";

const steps = [
  { id: 1, label: "Pending", icon: Timer },
  { id: 2, label: "Chef Accepted", icon: ChefHat },
  { id: 3, label: "Cooking", icon: CookingPot },
  { id: 4, label: "Out for Delivery", icon: MapPin },
  { id: 5, label: "Delivered", icon: CircleCheckBig },
];

const OrderStatus = () => {
  const [currentStep ,setCurrentStep] =useState(1);
   useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);


  return (
    <section className="flex justify-between items-center  bg-amber-50 w-full h-40 max-w-5xl mx-auto px-4 my-5 rounded-2xl shadow-xl">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

       

       

        return (
          <div key={step.id} className="relative flex-1 flex flex-col items-center">

            {index > 0 && (
              <div
                className={`absolute top-5 -left-1/2 w-full h-1 
                  ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}

          
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full z-10 border-2 
                ${
                  isCompleted
                    ? "bg-green-500 text-white border-green-500"
                    : isActive
                    ? "bg-yellow-400 text-white border-yellow-400 animate-pulse"
                    : "bg-gray-200 text-gray-500 border-gray-300"
                }`}
            >
              <Icon className="w-6 h-6" />
            </div>

         
            <p
              className={`mt-2 text-sm font-medium text-center ${
                isCompleted ? "text-green-600" : isActive ? "text-yellow-600" : "text-gray-500"
              }`}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default OrderStatus;
