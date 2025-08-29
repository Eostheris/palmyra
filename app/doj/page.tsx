import Image from "next/image";
import { Clock, Scale, Gavel, Shield, Star, Calendar } from "lucide-react";

export default function DOJPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative px-4 py-8 sm:px-6 lg:px-8">
      {/* Background with overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#29C1B0]/30">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image 
                src="/doj2.png" 
                alt="Department of Justice" 
                width={120} 
                height={120} 
                className="object-contain opacity-90"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#EA9449] via-[#29C1B0] to-[#EA9449] drop-shadow-2xl mb-4">
              Department of Justice
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#EA9449] to-[#29C1B0] mx-auto rounded-full mb-8"></div>
          </div>

          {/* Coming Soon Content */}
          <div className="bg-gradient-to-r from-[#EA9449]/20 to-[#29C1B0]/20 rounded-xl p-8 mb-8 border border-[#29C1B0]/30">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-12 h-12 text-[#29C1B0]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
              <p className="text-xl text-white/90 leading-relaxed mb-6">
                As the Palmyra server continues to expand and evolve, the Department of Justice will be implemented to provide federal oversight and prosecution services.
              </p>
              <p className="text-lg text-[#EA9449] font-medium">
                Stay tuned for updates on this exciting addition to our law enforcement structure!
              </p>
            </div>
          </div>

          {/* Future Features Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[{
              title: "Federal Oversight",
              desc: "High-level case supervision and coordination",
              Icon: Scale
            }, {
              title: "Prosecution Services",
              desc: "Federal criminal prosecution and litigation",
              Icon: Gavel
            }, {
              title: "Investigations",
              desc: "Complex federal crime investigations",
              Icon: Shield
            }].map(({ title, desc, Icon }, i) => (
              <div key={i} className="bg-neutral-900/80 border border-[#29C1B0]/20 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Icon className="w-8 h-8 text-[#29C1B0]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/80 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#29C1B0]/10 to-[#EA9449]/10 rounded-xl p-6 border border-[#EA9449]/30">
              <Star className="w-8 h-8 text-[#EA9449] mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-3">Want to be notified?</h3>
              <p className="text-white/80 mb-4">
                Follow our Discord and website updates for the latest information about DOJ implementation.
              </p>
              <a href="/resources" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EA9449] to-[#29C1B0] hover:from-[#29C1B0] hover:to-[#EA9449] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                <Calendar className="w-4 h-4" />
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
