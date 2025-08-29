import { Card } from "../../components/ui/card";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

const departments = [
  {
    name: "Los Santos Police Department",
    shortName: "LSPD",
    image: "/lspdvectorizeai.png",
    description: "The primary law enforcement agency serving Los Santos. Join the LSPD to protect and serve the community with honor and integrity.",
    link: "/lspd",
    status: "Recruiting"
  },
  {
    name: "Los Santos County Sheriff's Office",
    shortName: "LSCSO", 
    image: "/lscso_badge.png",
    description: "County-wide law enforcement protecting the greater Los Santos area. Serve with pride in the Sheriff's Office.",
    link: "/lscso",
    status: "Recruiting"
  },
  {
    name: "Emergency Medical Services",
    shortName: "EMS",
    image: "/SAFR.png",
    description: "Life-saving medical professionals responding to emergencies across the city. Be the difference between life and death.",
    link: "/ems",
    status: "Recruiting"
  },
  {
    name: "Los Santos Fire Department",
    shortName: "LSFD",
    image: "/SAFR.png",
    description: "First responders handling fires, rescues, and emergency situations. Run towards danger to save lives.",
    link: "/fire",
    status: "Recruiting"
  }
];

export default function DepartmentsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">City Services</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
            Join our dedicated teams of professionals serving the Los Santos community. Each department offers unique opportunities to make a difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {departments.map((dept, idx) => (
            <Card key={idx} className="bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <Image 
                      src={dept.image} 
                      alt={dept.name} 
                      width={80} 
                      height={80} 
                      className="rounded-lg object-contain bg-white/10 p-2" 
                    />
                    <Badge className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-1">
                      {dept.status}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">{dept.name}</h2>
                    <p className="text-sm text-white/60 font-semibold">{dept.shortName}</p>
                  </div>
                </div>
                
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  {dept.description}
                </p>
                
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  <a href={dept.link}>Learn More</a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Card className="bg-neutral-900/90 backdrop-blur-md border border-white/10 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Ready to Serve?</h2>
            <p className="text-white/80 mb-6">
              All departments are actively recruiting qualified candidates. Applications are reviewed regularly.
            </p>
            <Button asChild className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-lg px-8 py-3">
              <a href="/apply">Start Your Application</a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
