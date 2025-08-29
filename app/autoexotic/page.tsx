import Image from "next/image";
import { Car, Wrench, DollarSign, Shield, Clock, MapPin, Phone, Calendar, Star } from "lucide-react";

export default function AutoExoticShell() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative px-4 py-8 sm:px-6 lg:px-8">
  <Image src="/autoexoticcshall.png" alt="Auto Exotic" fill={true} className="object-cover absolute inset-0 -z-10 opacity-80" />
  {/* Readability overlay */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
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

        {/* Services */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[{
            title: "Vehicle Sales",
            desc: "Top-tier sports and luxury imports.",
            Icon: Car
          }, {
            title: "Custom Mods",
            desc: "Performance, visuals, and tuning.",
            Icon: Wrench
          }, {
            title: "Fair Pricing",
            desc: "Honest deals and trade-ins.",
            Icon: DollarSign
          }, {
            title: "Warranty Care",
            desc: "We stand behind our work.",
            Icon: Shield
          }].map(({ title, desc, Icon }, i) => (
            <div key={i} className="bg-neutral-900/80 border border-white/10 rounded-xl p-5 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-200">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  {title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hours & Location */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-300" /> Hours</h3>
            <ul className="text-white/90 space-y-2">
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Mon - Fri</span><span>5 PM – 11 PM</span></li>
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Saturday</span><span>3 PM – 12 AM</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>3 PM – 10 PM</span></li>
            </ul>
            <p className="text-xs text-white/60 mt-3">Times are server-time and may vary during events.</p>
          </div>

          <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-300" /> Location</h3>
            <p className="text-white/90">Auto Exotic Showroom</p>
            <p className="text-white/70">Morningwood Blvd, Los Santos</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href="#" className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2.5 font-medium transition-colors">
                <Calendar className="w-4 h-4" /> Visit
              </a>
              <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-lg py-2.5 font-medium transition-colors">
                <Star className="w-4 h-4" /> Apply
              </a>
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Phone className="w-5 h-5 text-blue-300" /> Contact</h3>
            <p className="text-white/90">Questions or fleet orders?</p>
            <p className="text-white/70">Reach out to management on Discord.</p>
            <a href="/resources?category=faq" className="mt-4 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-medium">
              Learn more in Player Resources
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}