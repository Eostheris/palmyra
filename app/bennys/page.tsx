import Image from "next/image";
import Link from "next/link";
import { Wrench, Car, Clock, MapPin, Phone, Calendar, Star, Settings } from "lucide-react";

export default function BennysPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative px-4 py-8 sm:px-6 lg:px-8">
      <Image src="/bennys.png" alt="Benny's Original Motor Works" fill={true} className="object-cover absolute inset-0 -z-10 opacity-80" />
      {/* Readability overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/10">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center lg:items-stretch">
            
            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 lg:mb-6 text-white drop-shadow-xl">
                Benny's Original Motor Works
              </h1>
              <p className="text-lg sm:text-xl mb-6 text-white drop-shadow-lg leading-relaxed">
                Welcome to <span className="font-bold text-red-300">Benny's Original Motor Works</span>, Palmyra's premier custom garage.<br className="hidden sm:block" />
                We specialize in high-performance modifications, custom builds, and expert mechanical services!
              </p>
              
              <div className="bg-neutral-900/80 rounded-xl p-4 sm:p-6 mb-6 lg:mb-8 w-full">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-red-200 text-center">What We Do</h2>
                <p className="text-sm sm:text-base text-white/90 text-center leading-relaxed">
                  From lowriders to supercars, we transform your vision into reality. Our team of skilled mechanics and tuners 
                  provide everything from basic maintenance to complete custom builds. Performance upgrades, body modifications, 
                  paint jobs, and mechanical repairs - we do it all with precision and passion.
                </p>
              </div>
              
              <Link href="/apply/bennys" className="inline-block w-full">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 sm:py-4 rounded-lg shadow-lg transition-colors text-base sm:text-lg">
                  Join Our Team
                </button>
              </Link>
            </div>
            
            {/* Services Grid */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Wrench className="w-5 h-5 text-red-300" />, title: "Custom Builds", desc: "Complete vehicle transformations" },
                  { icon: <Car className="w-5 h-5 text-red-300" />, title: "Performance Tuning", desc: "Engine & transmission upgrades" },
                  { icon: <Settings className="w-5 h-5 text-red-300" />, title: "Mechanical Repairs", desc: "Expert maintenance services" },
                  { icon: <Star className="w-5 h-5 text-red-300" />, title: "Paint & Body", desc: "Custom paint and bodywork" }
                ].map((service, i) => (
                  <div key={i} className="bg-neutral-900/80 border border-white/10 rounded-xl p-5 flex items-start gap-4">
                    <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        {service.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed mt-1">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Info */}
              <div className="space-y-4">
                <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-4">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-red-300" /> Hours</h3>
                  <div className="space-y-2 text-white/80">
                    <p className="flex justify-between"><span>Monday - Friday:</span> <span>8:00 AM - 10:00 PM</span></p>
                    <p className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 8:00 PM</span></p>
                    <p className="flex justify-between"><span>Sunday:</span> <span>12:00 PM - 6:00 PM</span></p>
                  </div>
                </div>

                <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-4">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-red-300" /> Location</h3>
                  <p className="text-white/80 mb-3">Located in the heart of Los Santos</p>
                  <div className="flex gap-2">
                    <a href="#" className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2.5 font-medium transition-colors">
                      <MapPin className="w-4 h-4" /> Visit Shop
                    </a>
                    <Link href="/apply/bennys" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-lg py-2.5 font-medium transition-colors">
                      <Wrench className="w-4 h-4" /> Apply Now
                    </Link>
                  </div>
                </div>

                <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-4">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Phone className="w-5 h-5 text-red-300" /> Contact</h3>
                  <p className="text-white/80">Phone: (555) BENNYS-1</p>
                  <a href="/resources?category=faq" className="mt-4 inline-flex items-center gap-2 text-red-300 hover:text-red-200 font-medium">
                    <Calendar className="w-4 h-4" /> Book Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
