import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { Badge } from "../../components/ui/badge";
import Link from "next/link";

export default function SAFRPage() {
  return (
    <div className="min-h-screen w-full relative" style={{ background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/palmyrawide.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 text-white">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image and Badge */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Image src="/SAFR.png" alt="San Andreas Fire & Rescue" width={400} height={300} className="rounded-2xl object-contain bg-white/10 p-8 backdrop-blur-sm border border-white/20" />
              <Badge className="absolute -top-3 -right-3 bg-red-600 text-white text-sm px-3 py-1">NOW HIRING</Badge>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <Card className="bg-neutral-900/95 backdrop-blur-md p-12 rounded-2xl shadow-2xl border border-white/10">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-white">San Andreas Fire & Rescue</h1>
                <p className="text-red-300 text-lg font-semibold">Courage, Honor, Dedication</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-white/90 text-lg leading-relaxed">
                  When disaster strikes, we answer the call. SAFR handles structure fires, vehicle accidents, 
                  rescue operations, and emergency medical situations. Be part of an elite team that runs towards danger 
                  and saves lives.
                </p>
                
                <div className="bg-red-950/50 rounded-lg p-4 border-l-4 border-red-400">
                  <h3 className="text-red-300 font-semibold mb-2">What We Offer:</h3>
                  <ul className="text-white/80 space-y-1 text-sm">
                    <li>• Advanced firefighting training</li>
                    <li>• Emergency medical services</li>
                    <li>• Technical rescue operations</li>
                    <li>• Hazmat response certification</li>
                    <li>• Strong team brotherhood</li>
                  </ul>
                </div>
                
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Requirements:</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• Physical fitness standards</li>
                    <li>• Quick decision-making skills</li>
                    <li>• Team-oriented mindset</li>
                    <li>• Willingness to learn</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4">
                <Button asChild className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Link href="/apply/safr">
                    Join SAFR
                  </Link>
                </Button>
                <p className="text-center text-white/60 text-sm mt-3">
                  Be the hero Palmyra needs
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
