import { Leaf, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const testimonials = [
  {
    quote:
      "The food was incredible! It felt like a gourmet meal prepared right in my kitchen. The chef was friendly and professional.",
    author: "Jane D.",
    city: "San Francisco, CA",
  },
  {
    quote:
      "Call-A-Chef made our anniversary dinner unforgettable. It was so personal and the quality was top-notch.",
    author: "Mark S.",
    city: "Seattle, WA",
  },
  {
    quote:
      "Finally, an easy way to get healthy, home-cooked meals without all the hassle. I'm a regular user now!",
    author: "Emily R.",
    city: "Austin, TX",
  },
];
const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Function to navigate to the previous testimonial
  const goToPrevious = () => {
    setCurrentTestimonial((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Function to navigate to the next testimonial
  const goToNext = () => {
    setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fff9f5]">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center items-start p-8 md:p-16 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold leading-tight text-[tomato]"
          >
            Welcome to Call-A-Chef
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-4 text-lg text-gray-600"
          >
            Savor authentic, home-style meals crafted by skilled local chefs.
            Freshly prepared, personalized to your taste, and delivered with a
            touch of genuine care.
          </motion.p>

          <div className="space-x-4">
            <button className="btn btn-secondary text-white border-none hover:bg-secondary/80">
              Get Started
            </button>
            <button className="btn btn-outline text-secondary border-secondary hover:bg-secondary/20">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 animate-fade-in-right">
          <div className="relative w-full max-w-lg md:max-w-none">
            <img
              src="https://img.pikbest.com/png-images/20250123/indian-cuisine-plateer-on-white-background_11439458.png!bw700"
              alt="Delicious Meal"
              className="h-[500px] object-contain p-2 md:p-4" // reduced padding
            />
            <img
              src="https://static.vecteezy.com/system/resources/previews/050/142/973/non_2x/cartoon-style-3d-chef-holding-spatula-and-giving-thumbs-up-icon-isolated-on-transparent-background-cutout-png.png"
              alt="Chef"
              className="absolute bottom-2 right-2 w-28 md:w-36 drop-shadow-lg hidden md:block" // moved closer
            />
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Call-A-Chef?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
              <Leaf size={48} className="text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Freshly Made</h3>
              <p className="text-gray-600">
                Get freshly made meals by top chefs in your locality.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
              <Clock size={48} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Timely Service</h3>
              <p className="text-gray-600">
                Meals are prepared and delivered to you on time, every time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
              <Users size={48} className="text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Trusted Community</h3>
              <p className="text-gray-600">
                Trusted by millions of users for their daily meals and special
                occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-100 rounded-t-3xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>
          <div className="relative max-w-3xl mx-auto px-8 py-12 bg-white rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-orange-200 text-orange-600 hover:bg-orange-300 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <p className="flex-1 text-2xl italic text-gray-700 mx-4 transition-opacity duration-500 ease-in-out opacity-100">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-orange-200 text-orange-600 hover:bg-orange-300 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="text-lg font-semibold text-gray-800">
              - {testimonials[currentTestimonial].author}
              <span className="block text-sm font-normal text-gray-500">
                {testimonials[currentTestimonial].city}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
