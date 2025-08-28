import { Card } from "../../components/ui/card";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function LSPDPage() {
  return (
    <div className="min-h-screen w-full relative" style={{ background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/palmyrawide.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 text-white">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image and Badge */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Image src="/lspdvectorizeai.png" alt="LSPD" width={400} height={300} className="rounded-2xl object-contain bg-white/10 p-8 backdrop-blur-sm border border-white/20" />
              <Badge className="absolute -top-3 -right-3 bg-blue-600 text-white text-sm px-3 py-1">NOW HIRING</Badge>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <Card className="bg-neutral-900/95 backdrop-blur-md p-12 rounded-2xl shadow-2xl border border-white/10">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-white">Los Santos Police Department</h1>
                <p className="text-blue-300 text-lg font-semibold">Protect and Serve</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-white/90 text-lg leading-relaxed">
                  Join the elite force that keeps Los Santos safe. As an LSPD officer, you&apos;ll be at the forefront of law enforcement, 
                  responding to emergency calls, conducting investigations, and building community relationships.
                </p>
                
                <div className="bg-blue-950/50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="text-blue-300 font-semibold mb-2">What We Offer:</h3>
                  <ul className="text-white/80 space-y-1 text-sm">
                    <li>• Comprehensive training programs</li>
                    <li>• Career advancement opportunities</li>
                    <li>• Specialized units (SWAT, Detective, Traffic)</li>
                    <li>• Competitive benefits and equipment</li>
                  </ul>
                </div>
                
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Requirements:</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• Clean criminal record</li>
                    <li>• Strong communication skills</li>
                    <li>• Commitment to professionalism</li>
                    <li>• Available for various shifts</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4">
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer">
                    Apply to LSPD Today
                  </a>
                </Button>
                <p className="text-center text-white/60 text-sm mt-3">
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
