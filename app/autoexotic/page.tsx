import Image from "next/image";

export default function AutoExoticShell() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative px-4 py-8 sm:px-6 lg:px-8">
      <Image src="/autoexoticcshall.png" alt="Auto Exotic" fill={true} className="object-cover absolute inset-0 -z-10 opacity-80" />
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/10">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center lg:items-stretch">
            
            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 lg:mb-6 text-white drop-shadow-xl">
                Auto Exotic
              </h1>
              <p className="text-lg sm:text-xl mb-6 text-white drop-shadow-lg leading-relaxed">
                Welcome to <span className="font-bold text-blue-300">Auto Exotic</span>, Palmyra&apos;s premier business for luxury vehicles and custom automotive services.<br className="hidden sm:block" />
                Experience the best in car culture and join our team or visit us for your next ride!
              </p>
              
              <div className="bg-neutral-900/80 rounded-xl p-4 sm:p-6 mb-6 lg:mb-8 w-full">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-blue-200 text-center">About Us</h2>
                <p className="text-sm sm:text-base text-white/90 text-center leading-relaxed">
                  We are a custom import dealership where players can buy luxury sports imports from our trained, knowledgeable professionals. Our staff is dedicated to helping you find your dream car and providing top-tier service every step of the way.
                </p>
              </div>
              
              <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer" className="inline-block w-full">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 sm:py-4 rounded-lg shadow-lg transition-colors text-base sm:text-lg">
                  Apply Now
                </button>
              </a>
            </div>
            
            {/* Image and Owner Section */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 lg:gap-8">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-80 lg:h-80 relative">
                <Image 
                  src="/RonnieOnions.png" 
                  alt="Ronnie Onions" 
                  fill={true}
                  className="object-contain rounded-xl border-4 border-blue-400 shadow-lg" 
                />
              </div>
              
              <div className="bg-neutral-900/80 rounded-xl p-4 sm:p-6 w-full">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-blue-200 text-center">
                  Owner: Ronnie Onions
                </h2>
                <p className="text-sm sm:text-base text-blue-100 text-center italic leading-relaxed">
                  Ronnie is passionate about repairs and takes pride in every vehicle that leaves his shop.<br />
                  <span className="text-white/90">Expect quality, honesty, and a true love for the craft.</span>
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}