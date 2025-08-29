import Image from 'next/image';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <main className="h-screen w-full text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Server Introduction Section with cool effect */}
      <section className="flex flex-col items-center justify-center h-full w-full text-center px-4 relative">
        <Image src="/palmyrawide.png" alt="Palmyra Background" fill={true} className="object-cover fixed inset-0 -z-10 opacity-70" />
        <div className="relative z-10">
          <h1 className="text-7xl font-extrabold mb-6 drop-shadow-lg text-white">Palmyra RP</h1>
          <p className="text-2xl max-w-2xl mb-8 drop-shadow-lg text-white/90">
            Welcome to Palmyra RP, the next evolution in FiveM roleplay. Our community is built for mature, immersive, and fair roleplay—where your story matters and every player is valued. Experience custom features, active staff, and a vibrant city that sets us apart from every other server. Join us and be part of something better.
          </p>
          <Button size="lg" className="bg-white text-black font-semibold shadow-xl" asChild>
            <a href="https://cfx.re/join/lgv9do">Connect to Server</a>
          </Button>
        </div>
      </section>
    </main>
  );
}