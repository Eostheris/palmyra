import Image from "next/image";
import { Sparkles, Clock, MapPin, Phone, Calendar, Star, Heart, Music } from "lucide-react";

export default function VanillaUnicorn() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative px-4 py-8 sm:px-6 lg:px-8">
      <Image src="/unicornclubload.png" alt="Vanilla Unicorn" fill={true} className="object-cover absolute inset-0 -z-10 opacity-80" />
      {/* Readability overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="bg-transparent backdrop-blur-lg rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/10">
          {/* Content Section - Centered Layout */}
          <div className="flex flex-col items-center text-center">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 lg:mb-8 text-white drop-shadow-xl">
              Vanilla Unicorn
            </h1>
            
            <div className="bg-gradient-to-r from-pink-900/80 to-purple-900/80 rounded-xl p-6 sm:p-8 mb-8 w-full max-w-4xl border border-pink-500/30">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-pink-200">
                Looking to blow off some steam?
              </h2>
              <p className="text-lg sm:text-xl text-white leading-relaxed mb-4">
                Head to the <span className="font-bold text-pink-300">Vanilla Unicorn</span> for a one-of-a-kind experience you won&apos;t find anywhere else in Los Santos.
              </p>
              <p className="text-base sm:text-lg text-pink-100 leading-relaxed">
                Where fantasies come to life and the night never ends. Come discover what makes us the premier adult entertainment destination in Palmyra.
              </p>
            </div>

            <div className="bg-neutral-900/80 rounded-xl p-6 sm:p-8 mb-8 w-full max-w-4xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-pink-200 text-center">What We Offer</h2>
              <p className="text-sm sm:text-base text-white/90 text-center leading-relaxed mb-6">
                Step into a world of luxury entertainment where professional service meets unforgettable experiences. Our venue offers the finest adult entertainment in a safe, upscale environment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center">
                  <Music className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">Live Entertainment</h3>
                  <p className="text-sm text-white/80">Professional performers every night</p>
                </div>
                <div className="text-center">
                  <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-white mb-1">VIP Experiences</h3>
                  <p className="text-sm text-white/80">Exclusive private sessions available</p>
                </div>
              </div>
            </div>

            {/* Now Hiring Section */}
            <div className="bg-gradient-to-r from-pink-900/80 to-purple-900/80 rounded-xl p-6 sm:p-8 mb-8 w-full max-w-4xl border border-pink-400/30">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-200 text-center">Now Hiring!</h2>
              <p className="text-lg text-white text-center mb-6">
                Join our team and be part of Los Santos&apos; premier entertainment destination
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { title: "Dancers", icon: "💃" },
                  { title: "Bouncers", icon: "🛡️" },
                  { title: "Waiters", icon: "🍾" },
                  { title: "Bartenders", icon: "🍸" },
                  { title: "DJ", icon: "🎵" },
                  { title: "Management", icon: "👔" }
                ].map((position, index) => (
                  <div key={index} className="bg-black/40 rounded-lg p-4 text-center border border-pink-500/20">
                    <div className="text-2xl mb-2">{position.icon}</div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">{position.title}</h3>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 text-lg">
                    Apply Now
                  </button>
                </a>
                <p className="text-pink-200 mt-3 text-sm">
                  Competitive pay • Flexible schedules • Professional environment
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-pink-500/20 w-full max-w-4xl">
              <p className="text-white/90 text-center font-medium text-lg">
                🔞 <span className="font-bold">Adults Only</span> - Must be 18+ to enter
              </p>
              <p className="text-pink-200 text-center mt-2 text-sm">
                Professional, discrete, and unforgettable experiences await
              </p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[{
            title: "Premium Shows",
            desc: "Professional entertainment all night long.",
            Icon: Sparkles
          }, {
            title: "VIP Rooms",
            desc: "Private spaces for exclusive experiences.",
            Icon: Heart
          }, {
            title: "Full Bar",
            desc: "Premium drinks and cocktails.",
            Icon: Star
          }, {
            title: "Safe Environment",
            desc: "Professional security and staff.",
            Icon: Music
          }].map(({ title, desc, Icon }, i) => (
            <div key={i} className="bg-neutral-900/80 border border-pink-500/20 rounded-xl p-5 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-pink-500/20 border border-pink-400/30 text-pink-200">
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
          <div className="bg-neutral-900/80 border border-pink-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-pink-300" /> Hours</h3>
            <ul className="text-white/90 space-y-2">
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Mon - Thu</span><span>8 PM – 3 AM</span></li>
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Fri - Sat</span><span>7 PM – 4 AM</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>8 PM – 2 AM</span></li>
            </ul>
            <p className="text-xs text-white/60 mt-3">Times are server-time and may vary during events.</p>
          </div>

          <div className="bg-neutral-900/80 border border-pink-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-pink-300" /> Location</h3>
            <p className="text-white/90">Vanilla Unicorn</p>
            <p className="text-white/70">Strawberry Ave, Los Santos</p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <a href="#" className="inline-flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-2.5 font-medium transition-colors">
                <Calendar className="w-4 h-4" /> Visit Tonight
              </a>
              <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-2.5 font-medium transition-colors">
                <Star className="w-4 h-4" /> Apply for Job
              </a>
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-pink-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Phone className="w-5 h-5 text-pink-300" /> Contact</h3>
            <p className="text-white/90">Questions about our services?</p>
            <p className="text-white/70">Reach out to management in-game.</p>
            <a href="/resources?category=faq" className="mt-4 inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-medium">
              Learn more in Player Resources
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
