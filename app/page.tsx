import Image from 'next/image';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen w-full text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Server Introduction Section with cool effect */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center px-3 sm:px-4 lg:px-8 relative">
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="relative z-10 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-1 sm:mb-2 md:mb-4 drop-shadow-xl text-white">
            Palmyra RP
          </h1>
          <p className="text-white/85 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">Immersive. Mature. Fair.</p>
          
          {/* Text Container with Transparency */}
          <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 shadow-2xl">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-2xl mx-auto drop-shadow-lg text-white leading-relaxed">
              Welcome to Palmyra RP, the next evolution in FiveM roleplay. Our community is built for mature, immersive, and fair roleplay—where your story matters and every player is valued. Experience custom features, active staff, and a vibrant city that sets us apart from every other server. Join us and be part of something better.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
            {/* Connect to Server Button */}
            <Button asChild className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap rounded-lg font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base lg:text-lg">
              <a href="https://cfx.re/join/lgv9do">
                <Image src="/fivemlogo.png" alt="FiveM" width={20} height={20} className="sm:w-[24px] sm:h-[24px] brightness-0 invert" />
                Connect to Server
              </a>
            </Button>
            
            {/* Discord Join Button */}
            <Button asChild className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap rounded-lg font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg hover:shadow-xl transform hover:scale-105 h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base lg:text-lg">
              <a href="https://discord.gg/hRjnkveDdP" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}