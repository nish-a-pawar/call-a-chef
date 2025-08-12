

const Home = () => {



  return (
    <div className="min-h-screen bg-[#fff9f5]">
    
      <div className="flex flex-col md:flex-row">
      
        <div className="flex-1 flex flex-col justify-center items-start p-8 md:p-16 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4b2e2e] leading-tight">
            Welcome to <span className="text-[#d2691e]">Call-A-Chef</span>
          </h1>
          <p className="text-lg text-[#5c4a4a] max-w-md">
            Enjoy home-style meals by skilled chefs near you. Fresh. Personal. Authentic.
          </p>

          <div className="space-x-4">
            <button className="btn btn-secondary text-white border-none hover:bg-secondary/80">
              Get Started
            </button>
            <button className="btn btn-outline text-secondary border-secondary hover:bg-secondary/20">
              Learn More
            </button>
          </div>
        </div>

     
        <div className="flex-1 relative overflow-hidden">
          <img
            src="https://img.pikbest.com/png-images/20250123/indian-cuisine-plateer-on-white-background_11439458.png!bw700"
            alt="Delicious Meal"
            className="w-full h-full object-contain p-4 md:p-10"
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/050/142/973/non_2x/cartoon-style-3d-chef-holding-spatula-and-giving-thumbs-up-icon-isolated-on-transparent-background-cutout-png.png"
            alt="Chef"
            className="absolute bottom-4 right-4 w-32 md:w-40 drop-shadow-lg hidden md:block"
          />
        </div>
      </div>

    
      
    </div>
  );
};

export default Home;
