import Image from "next/image";

export default function AutoExoticPage() {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden z-0">
      <Image src="/autoexoticcshall.png" alt="Auto Exotic" fill={true} className="object-cover absolute inset-0 -z-10 opacity-80" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
  <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-12 max-w-7xl mx-auto flex flex-row gap-20 items-stretch shadow-2xl border border-white/10">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-xl text-center">Auto Exotic</h1>
            <p className="text-xl mb-6 text-white text-center drop-shadow-lg">
              Welcome to <span className="font-bold text-blue-300">Auto Exotic</span>, Palmyra&apos;s premier business for luxury vehicles and custom automotive services.<br />
              Experience the best in car culture and join our team or visit us for your next ride!
            </p>
            <div className="bg-neutral-900/80 rounded-xl p-6 mb-8 w-full">
              <h2 className="text-2xl font-bold mb-2 text-blue-200 text-center">About Us</h2>
              <p className="text-base text-white/90 text-center">
                We are a custom import dealership where players can buy luxury sports imports from our trained, knowledgeable professionals. Our staff is dedicated to helping you find your dream car and providing top-tier service every step of the way.
              </p>
            </div>
            <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer" className="inline-block w-full mb-4">
              <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-600 transition">Apply Now</button>
            </a>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <img src="/RonnieOnions.png" alt="Ronnie Onions" className="w-80 h-80 object-contain rounded-xl border-4 border-blue-400 shadow-lg mb-4" />
            <div className="bg-neutral-900/80 rounded-xl p-6 w-full">
              <h2 className="text-2xl font-bold mb-2 text-blue-200 text-center">Owner: Ronnie Onions</h2>
              <p className="text-base text-blue-100 text-center italic">
                Ronnie is passionate about repairs and takes pride in every vehicle that leaves his shop.<br />
                <span className="text-white/90">Expect quality, honesty, and a true love for the craft.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
