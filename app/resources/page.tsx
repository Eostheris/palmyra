"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const faqData = [
  {
    question: "How do I get started on Palmyra RP?",
    answer: "First, make sure you're whitelisted on our Discord. Then connect to the server using the FiveM client. You'll spawn in and can begin creating your character's story!"
  },
  {
    question: "What are the age requirements?",
    answer: "You must be 18 or older to play on Palmyra RP. Staff may verify your age at their discretion."
  },
  {
    question: "How do I apply for a job?",
    answer: "Visit the departments or businesses pages on our website. Each has application links and requirements listed."
  },
  {
    question: "Can I own multiple characters?",
    answer: "Yes, you can have multiple characters, but they must be completely separate with no shared knowledge or assets."
  },
  {
    question: "What happens if I break a rule?",
    answer: "Depending on the severity, you may receive a warning, temporary ban, or permanent ban. All punishments are at staff discretion."
  }
];

const controlsData = [
  { category: "Inventory & Items", binds: [
    { key: "TAB", action: "Inventory" },
    { key: "K", action: "Secondary Inventory" },
    { key: "F1", action: "Hotbar" },
    { key: "1-5", action: "Hotkeys" },
    { key: "R", action: "Reload Weapon" }
  ]},
  { category: "Phone", binds: [
    { key: "F1", action: "Open Phone" },
    { key: "RETURN", action: "Answer Call / Take Photo" },
    { key: "BACK", action: "Decline Call" },
    { key: "E", action: "Camera Flash Toggle" },
    { key: "X", action: "Freeze Camera" },
    { key: "UP", action: "Flip Camera" },
    { key: "Z", action: "Camera Roll Left" },
    { key: "C", action: "Camera Roll Right" },
    { key: "LEFT/RIGHT", action: "Phone Mode Navigation" },
    { key: "ALT", action: "Toggle Phone Focus" }
  ]},
  { category: "Dispatch & MDT", binds: [
    { key: "HOME", action: "Scoreboard" },
    { key: "LEFT/RIGHT", action: "Navigate Dispatch" },
    { key: "J", action: "Open Dispatch" },
    { key: "G", action: "Respond to Dispatch / Palmyra POS" },
    { key: "F10", action: "Ping Dispatch" },
    { key: "K", action: "MDT" }
  ]},
  { category: "Vehicle & Police", binds: [
    { key: "B", action: "Toggle Seatbelt" },
    { key: "Q", action: "Police Lights" },
    { key: "R", action: "Siren Cycle" },
    { key: "ALT", action: "Siren Toggle" },
    { key: "E", action: "Police Horn" },
    { key: "X", action: "Engine Toggle" },
    { key: ";", action: "Lock Vehicle" },
    { key: "Y", action: "Cruise Control" }
  ]},
  { category: "Radar & Lidar", binds: [
    { key: "I", action: "ProLaser Lidar" },
    { key: "L", action: "Radar Lock" },
    { key: "NUMPAD5", action: "Back Antenna" },
    { key: "NUMPAD6", action: "Back Camera" },
    { key: "NUMPAD8", action: "Front Antenna" },
    { key: "NUMPAD9", action: "Front Camera" },
    { key: "F5", action: "Remote" }
  ]},
  { category: "Helicam", binds: [
    { key: "SPACE", action: "Lock" },
    { key: "G", action: "Spotlight" },
    { key: "E", action: "Helicam On" },
    { key: "LCONTROL", action: "Adjust Spotlight Radius" },
    { key: "ALT", action: "Adjust Spotlight Brightness" },
    { key: "X", action: "Rappel" }
  ]},
  { category: "Interaction & Misc", binds: [
    { key: "E", action: "Property Interact / Interaction / Tackle / Passage" },
    { key: "F5", action: "Property Menu" },
    { key: "SPACE", action: "Sit Stand Up" },
    { key: "X", action: "Sit Stand Up / Cancel Progress" },
    { key: "J", action: "Gun Rack" },
    { key: "ALT", action: "Ox Target" }
  ]},
  { category: "Emotes", binds: [
    { key: "B", action: "Point" },
    { key: "X", action: "Cancel Emote" },
    { key: "U", action: "Hands Up" },
    { key: "G", action: "PTFX (Effects)" },
    { key: "F5", action: "Emote Menu" },
    { key: "J", action: "Relaxed Ride" }
  ]},
  { category: "Casino", binds: [
    { key: "RETURN", action: "Spin" },
    { key: "SPACE", action: "Bet One" },
    { key: "F", action: "Bet Max" }
  ]},
  { category: "Radio & Voice", binds: [
    { key: "ALT", action: "Radio Talk" },
    { key: "ESC", action: "Radio Menu Escape" },
    { key: "E", action: "Radio Menu E" },
    { key: "UP/DOWN", action: "Radio Navigation" },
    { key: "RETURN", action: "Radio Return" }
  ]},
  { category: "Utility & Other", binds: [
    { key: "L", action: "Toggle Chat" },
    { key: "I", action: "HUD Menu" },
    { key: "HOME", action: "Scoreboard" },
    { key: "BACK", action: "Close Binoculars" },
    { key: "Y", action: "Cruise Control" }
  ]}
];

function ResourcesContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'faq';

  const renderContent = () => {
    switch (activeCategory) {
      case "faq":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <p className="text-white mb-8 text-lg leading-relaxed">Common questions about Palmyra RP and how to get started.</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/20 border-2 rounded-lg px-4">
          <AccordionTrigger className="text-left text-white hover:text-white text-lg py-4 font-semibold">
                    {faq.question}
                  </AccordionTrigger>
          <AccordionContent className="text-white text-base leading-relaxed pt-2 pb-6 px-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <a href="/penalcode">
                  📋 View Penal Code
                </a>
              </Button>
            </div>
          </div>
        );

      case "controls":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Controls & Keybinds</h2>
              <p className="text-white mb-8 text-lg leading-relaxed">Essential keybinds for navigating Palmyra RP.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {controlsData.map((category, index) => (
                <Card key={index} className="bg-neutral-800/50 p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.binds.map((bind, bindIndex) => (
                      <div key={bindIndex} className="flex justify-between items-center py-2">
                        <span className="text-white text-lg">{bind.action}</span>
                        <Badge variant="outline" className="font-mono text-base px-4 py-2 bg-neutral-700 border-white/20">{bind.key}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case "licenses":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">Gun License Guide</h2>
              <p className="text-white/80 mb-12 text-xl leading-relaxed">How to obtain and maintain your firearms license in Los Santos.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <Card className="bg-neutral-800/50 p-8 border border-white/10">
                <h3 className="text-2xl font-semibold mb-6">Requirements</h3>
                <ul className="space-y-4 text-white/80 text-lg">
                  <li>• Must be 21+ years old in character</li>
                  <li>• Clean criminal record (no felonies - automatic disqualification)</li>
                  <li>• Must be a citizen in good standing</li>
                  <li>• Demonstrate understanding of self-defense laws</li>
                  <li>• Demonstrate understanding of gun safety laws</li>
                </ul>
              </Card>
              <Card className="bg-neutral-800/50 p-8 border border-white/10">
                <h3 className="text-2xl font-semibold mb-6">Process</h3>
                <ol className="space-y-4 text-white/80 text-lg">
                  <li>1. Submit online application below</li>
                  <li>2. Wait 24-48 hours for review</li>
                  <li>3. Visit any police station</li>
                  <li>4. Speak with an officer about results</li>
                  <li>5. Complete final interview and processing</li>
                  <li>6. Bring valid identification</li>
                  <li>7. Pay $5,000 licensing fee</li>
                  <li>8. Receive your firearms license</li>
                  <li>9. Always carry your license when armed</li>
                  <li>10. Follow the laws to maintain gun license</li>
                </ol>
              </Card>
            </div>
            <div className="mt-8 text-center space-y-4">
              <a 
                href="/apply/gun-license" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg mr-4"
              >
                Apply for Gun License
              </a>
              <a 
                href="/penalcode" 
                className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg"
              >
                View Penal Code
              </a>
            </div>
          </div>
        );

      case "jobs":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Employment Opportunities</h2>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">Join the workforce in Los Santos with various civilian and government positions.</p>
            </div>
            
            {/* Civilian Jobs */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Civilian Jobs</h3>
              <p className="text-white/70 mb-6">Open positions available to all citizens - no application required.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Trucker", requirements: "CDL License" },
                  { name: "Bus Driver", requirements: "Valid license" },
                  { name: "Garbage Collector", requirements: "No criminal record" },
                  { name: "Fishing", requirements: "Fishing license" },
                  { name: "Recycling", requirements: "None" },
                  { name: "Hunting", requirements: "Hunting license" },
                  { name: "Taxi Driver", requirements: "Valid license" },
                  { name: "Delivery Driver", requirements: "Vehicle required" },
                  { name: "More Coming Soon", requirements: "Stay tuned!" }
                ].map((job, index) => (
                  <Card key={index} className="bg-neutral-800/50 p-4 border border-white/10">
                    <h4 className="font-semibold mb-2 text-white">{job.name}</h4>
                    <p className="text-white/60 text-sm">{job.requirements}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Whitelisted Jobs */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Whitelisted Positions</h3>
              <p className="text-white/70 mb-6">Premium positions requiring applications and approval process.</p>
              
              {/* Government */}
              <div className="mb-6">
                <h4 className="text-xl font-medium mb-3 text-blue-300">Government & Law Enforcement</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "LSPD Officer", dept: "Los Santos Police Department", link: "/apply/lspd" },
                    { name: "LSCSO Deputy", dept: "Los Santos County Sheriff's Office", link: "/apply/lscso" },
                    { name: "SAFR Firefighter", dept: "San Andreas Fire & Rescue", link: "/apply/safr" },
                    { name: "DOJ Employee", dept: "Department of Justice", link: "/apply/doj" }
                  ].map((job, index) => (
                    <Card key={index} className="bg-blue-900/30 p-4 border border-blue-500/30">
                      <h5 className="font-semibold mb-1 text-white">{job.name}</h5>
                      <p className="text-blue-300 text-sm mb-2">{job.dept}</p>
                      <Button 
                        asChild 
                        variant="default"
                        size="sm" 
                        className="mt-2 w-full"
                      >
                        <a href={job.link}>
                          Apply Now
                        </a>
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Businesses */}
              <div>
                <h4 className="text-xl font-medium mb-3 text-green-300">Businesses</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "Real Estate Agent", company: "Real Estate", link: "/departments" },
                    { name: "Mechanic", company: "Auto Exotic", link: "/apply/autoexotic" },
                    { name: "Mechanic", company: "Benny's Motor Works", link: "/apply/bennys" },
                    { name: "Entertainer", company: "Vanilla Unicorn", link: "/apply/vanilla-unicorn" },
                    { name: "Cook/Server", company: "Burger Shot", link: "/departments" },
                    { name: "Bartender", company: "Horny's Bar", link: "/departments" }
                  ].map((job, index) => (
                    <Card key={index} className="bg-green-900/30 p-4 border border-green-500/30">
                      <h5 className="font-semibold mb-1 text-white">{job.name}</h5>
                      <p className="text-green-300 text-sm mb-2">{job.company}</p>
                      <Button 
                        asChild 
                        variant={job.link.startsWith('/apply/') ? 'default' : 'outline'}
                        size="sm" 
                        className="mt-2 w-full"
                      >
                        <a href={job.link}>
                          {job.link.startsWith('/apply/') ? 'Apply Now' : 'Learn More'}
                        </a>
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "businesses":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Business Ownership</h2>
              <p className="text-white/80 mb-6">Information about starting and running businesses in Los Santos.</p>
            </div>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="types">Business Types</TabsTrigger>
                <TabsTrigger value="process">How to Apply</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <Card className="bg-neutral-800/50 p-6">
                  <h3 className="text-lg font-semibold mb-4">Business Requirements</h3>
                  <p className="text-white/80 text-center text-lg">Coming Soon</p>
                </Card>
              </TabsContent>
              <TabsContent value="types" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Restaurant/Bar", "Auto Dealership", 
                    "Mechanic Shop", "Legal Firm", "Security Company"
                  ].map((type, index) => (
                    <Card key={index} className="bg-neutral-800/50 p-4">
                      <h4 className="font-semibold mb-2">{type}</h4>
                      <p className="text-white/60 text-center">Coming Soon</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="process" className="space-y-4">
                <Card className="bg-neutral-800/50 p-6">
                  <h3 className="text-lg font-semibold mb-4">Application Process</h3>
                  <p className="text-white/80 text-center text-lg">Coming Soon</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case "contacts":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Penal Code</h2>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                Access the complete Los Santos legal code and regulations.
              </p>
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <a href="/penalcode">
                  📋 View Penal Code
                </a>
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-white/80">This section is under development. Check back soon for more information!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-16 bg-transparent">
      <div className="max-w-none mx-auto px-4 lg:px-8 mt-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Player Resources
          </h1>
          <p className="text-xl text-white/80 max-w-6xl mx-auto leading-relaxed">
            Everything you need to know to succeed in Palmyra RP. Guides, tutorials, and essential information for players.
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <Card className="bg-neutral-900/90 backdrop-blur-md border border-white/10 p-6 lg:p-8 text-white">
            {renderContent()}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pb-16 bg-transparent">
        <div className="max-w-none mx-auto px-4 lg:px-8 mt-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Player Resources
            </h1>
            <p className="text-xl text-white/80 max-w-6xl mx-auto leading-relaxed">
              Loading...
            </p>
          </div>
        </div>
      </div>
    }>
      <ResourcesContent />
    </Suspense>
  );
}
