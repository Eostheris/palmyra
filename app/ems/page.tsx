import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { Badge } from "../../components/ui/badge";
import Link from "next/link";

export default function EMSPage() {
  return (
    <div className="min-h-screen w-full relative" style={{ background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/palmyrawide.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Image and Badge */}
          <div className="flex flex-col items-center space-y-6 order-2 lg:order-1">
            <div className="relative">
              <Image src="/SAFR.png" alt="EMS" width={300} height={225} className="sm:w-[350px] sm:h-[262px] lg:w-[400px] lg:h-[300px] rounded-2xl object-contain bg-white/10 p-6 lg:p-8 backdrop-blur-sm border border-white/20" />
              <Badge className="absolute -top-3 -right-3 bg-green-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1">NOW HIRING</Badge>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <Card className="bg-neutral-900/95 backdrop-blur-md p-6 sm:p-8 lg:p-12 rounded-2xl shadow-2xl border border-white/10 order-1 lg:order-2">
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white">Emergency Medical Services</h1>
                <p className="text-green-300 text-base sm:text-lg font-semibold">Saving Lives Every Day</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                  Be the difference between life and death. Our EMS team provides critical medical care, emergency response, 
                  and life-saving interventions across Los Santos. Every call matters, every second counts.
                </p>
                
                <div className="bg-green-950/50 rounded-lg p-4 border-l-4 border-green-400">
                  <h3 className="text-green-300 font-semibold mb-2">What We Offer:</h3>
                  <ul className="text-white/80 space-y-1 text-sm">
                    <li>• Advanced medical training</li>
                    <li>• State-of-the-art equipment</li>
                    <li>• Helicopter rescue operations</li>
                    <li>• Trauma center partnerships</li>
                  </ul>
                </div>
                
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Requirements:</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• Medical certification preferred</li>
                    <li>• Calm under pressure</li>
                    <li>• Compassionate personality</li>
                    <li>• Ability to work in teams</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4">
                <Button asChild className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-base lg:text-lg py-4 lg:py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Link href="/apply/ems">
                    Join EMS Today
                  </Link>
                </Button>
                <p className="text-center text-white/60 text-xs sm:text-sm mt-3">
                  Answer the call to save lives
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
