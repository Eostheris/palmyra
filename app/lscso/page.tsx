import { Card } from "../../components/ui/card";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function LSCSOPage() {
  return (
    <div className="min-h-screen w-full relative" style={{ background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/palmyrawide.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 text-white">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image and Badge */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Image src="/lscso_badge.png" alt="LSCSO" width={400} height={300} className="rounded-2xl object-contain bg-white/10 p-8 backdrop-blur-sm border border-white/20" />
              <Badge className="absolute -top-3 -right-3 bg-yellow-600 text-white text-sm px-3 py-1">NOW HIRING</Badge>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <Card className="bg-neutral-900/95 backdrop-blur-md p-12 rounded-2xl shadow-2xl border border-white/10">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-white">Los Santos County Sheriff&apos;s Office</h1>
                <p className="text-yellow-300 text-lg font-semibold">State Wide Protection</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-white/90 text-lg leading-relaxed">
                  Serve and protect the expansive Los Santos County. LSCSO deputies patrol vast territories, from urban areas to 
                  remote countryside, handling everything from traffic enforcement to major criminal investigations.
                </p>
                
                <div className="bg-yellow-950/50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <h3 className="text-yellow-300 font-semibold mb-2">What We Offer:</h3>
                  <ul className="text-white/80 space-y-1 text-sm">
                    <li>• Diverse patrol assignments</li>
                    <li>• Specialized county units</li>
                    <li>• Advanced tactical training</li>
                    <li>• Strong brotherhood culture</li>
                  </ul>
                </div>
                
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Ideal Candidates:</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• Strong leadership qualities</li>
                    <li>• Adaptable to various situations</li>
                    <li>• Community-focused mindset</li>
                    <li>• Physical fitness standards</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4">
                <Button asChild className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-semibold text-lg py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer">
                    Join LSCSO Today
                  </a>
                </Button>
                <p className="text-center text-white/60 text-sm mt-3">
                  Serving Los Santos County with pride
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
