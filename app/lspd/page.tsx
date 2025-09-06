import { Card } from "../../components/ui/card";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import Link from "next/link";

export default function LSPDPage() {
  return (
    <div className="min-h-screen w-full relative" style={{ background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/palmyrawide.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="flex flex-col items-center justify-center min-h-screen py-16 sm:py-20 lg:py-24 px-3 sm:px-4 lg:px-8 text-white">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Side - Image and Badge */}
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 order-2 md:order-1">
            <div className="relative">
              <Image 
                src="/lspdvectorizeai.png" 
                alt="LSPD" 
                width={250} 
                height={190} 
                className="sm:w-[350px] sm:h-[260px] lg:w-[400px] lg:h-[300px] rounded-2xl object-contain bg-white/10 p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-white/20" 
              />
              <Badge className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1">NOW HIRING</Badge>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <Card className="bg-neutral-900/95 backdrop-blur-md p-6 sm:p-8 lg:p-12 rounded-2xl shadow-2xl border border-white/10 order-1 md:order-2">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white">Los Santos Police Department</h1>
                <p className="text-blue-300 text-base sm:text-lg font-semibold">Protect and Serve</p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Join the elite force that keeps Los Santos safe. As an LSPD officer, you&apos;ll be at the forefront of law enforcement, 
                  responding to emergency calls, conducting investigations, and building community relationships.
                </p>
                
                <div className="bg-blue-950/50 rounded-lg p-3 sm:p-4 border-l-4 border-blue-400">
                  <h3 className="text-blue-300 font-semibold mb-2 text-sm sm:text-base">What We Offer:</h3>
                  <ul className="text-white/80 space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                    <li>• Comprehensive training programs</li>
                    <li>• Career advancement opportunities</li>
                    <li>• Specialized units (SWAT, Detective, Traffic)</li>
                    <li>• Competitive benefits and equipment</li>
                  </ul>
                </div>
                
                <div className="bg-neutral-800/50 rounded-lg p-3 sm:p-4">
                  <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Requirements:</h3>
                  <ul className="text-white/70 space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                    <li>• Clean criminal record</li>
                    <li>• Strong communication skills</li>
                    <li>• Commitment to professionalism</li>
                    <li>• Available for various shifts</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-3 sm:pt-4">
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm sm:text-base lg:text-lg py-4 sm:py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Link href="/apply/lspd">
                    Apply to LSPD Today
                  </Link>
                </Button>
                <p className="text-center text-white/60 text-xs sm:text-sm mt-2 sm:mt-3">
                  Applications reviewed within 24-48 hours
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
