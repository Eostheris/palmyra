import Image from 'next/image';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen w-full text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Server Introduction Section with cool effect */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="relative z-10 max-w-3xl sm:max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 sm:mb-4 drop-shadow-xl text-white">
            Palmyra RP
          </h1>
          <p className="text-white/85 text-sm sm:text-base">Immersive. Mature. Fair.</p>
          
          {/* Text Container with Transparency */}
          <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-2xl">
            <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-lg text-white leading-relaxed">
              Welcome to Palmyra RP, the next evolution in FiveM roleplay. Our community is built for mature, immersive, and fair roleplay—where your story matters and every player is valued. Experience custom features, active staff, and a vibrant city that sets us apart from every other server. Join us and be part of something better.
            </p>
          </div>
          
          {/* Updated Connect Button to Match Header Style */}
          <Button asChild className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 h-12 px-6 text-base sm:text-lg">
            <a href="https://cfx.re/join/lgv9do">
              <Image src="/fivemlogo.png" alt="FiveM" width={24} height={24} className="brightness-0 invert" />
              Connect to Server
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}