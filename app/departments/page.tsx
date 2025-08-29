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
    name: "Department of Justice",
    shortName: "DOJ",
    image: "/doj2.png",
    description: "Federal oversight and prosecution services for Los Santos. Upholding justice and the rule of law at the highest level.",
    link: "/doj",
    status: "Coming Soon"
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
        {/* Discord Join Button */}
        <div className="text-center mb-8">
          <a 
            href="https://discord.gg/hRjnkveDdP" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join Palmyra Discord
          </a>
        </div>
        
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
                    <Badge className={`absolute -top-2 -right-2 text-white text-xs px-2 py-1 ${
                      dept.status === 'Coming Soon' ? 'bg-orange-600' : 'bg-green-600'
                    }`}>
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
