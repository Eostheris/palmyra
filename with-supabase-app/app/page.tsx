import Image from "next/image";
import { Button } from "@/components/ui/button";

  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-start">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] flex items-center justify-center">
        <Image src="/opengraph-image.png" alt="Palmyra Server" fill className="object-cover opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-5xl font-bold mb-4">Palmyra</h1>
          <p className="text-lg mb-6">A modern FiveM server experience</p>
          <Button size="lg" className="bg-white text-black font-semibold" asChild>
            <a href="fivem://connect/YOUR_SERVER_IP">Connect to Server</a>
          </Button>
        </div>
      </div>
      {/* Departments Section */}
      <section className="w-full max-w-5xl py-12 px-4">
        <h2 className="text-3xl font-semibold mb-8">Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example department cards, replace with dynamic data */}
          <div className="bg-neutral-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <Image src="/opengraph-image.png" alt="Police" width={120} height={80} className="rounded mb-4" />
            <h3 className="text-xl font-bold mb-2">Police Department</h3>
            <p className="mb-4 text-center">Uphold the law and keep Palmyra safe.</p>
            <Button variant="outline" className="w-full">Apply</Button>
          </div>
          <div className="bg-neutral-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <Image src="/opengraph-image.png" alt="EMS" width={120} height={80} className="rounded mb-4" />
            <h3 className="text-xl font-bold mb-2">EMS Department</h3>
            <p className="mb-4 text-center">Provide medical assistance and save lives.</p>
            <Button variant="outline" className="w-full">Apply</Button>
          </div>
          <div className="bg-neutral-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <Image src="/opengraph-image.png" alt="Fire" width={120} height={80} className="rounded mb-4" />
            <h3 className="text-xl font-bold mb-2">Fire Department</h3>
            <p className="mb-4 text-center">Respond to emergencies and protect the city.</p>
            <Button variant="outline" className="w-full">Apply</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
