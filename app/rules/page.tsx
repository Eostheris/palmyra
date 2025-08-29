"use client";

import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Shield, ScrollText, Gavel, Car, User, DollarSign, Building2, MessageCircle, Activity, MapPin, Flag, UserCog, Link as LinkIcon, Check } from "lucide-react";

const rules = [
  {
    title: "Community Guidelines",
    items: [
      "You must be 18 or older. No exceptions. Staff may verify your age at their discretion.",
      "Prioritize fair, immersive roleplay. Do not dodge consequences or force scenes just to 'win.' Let interactions play out, even if your character is caught, hurt, or loses.",
      "No cheating or exploits. Hacks or third-party programs are banned. Basic crosshairs are allowed.",
      "Never impersonate staff or emergency services. Staff use the titles ICE, DHS, or Federal Agents. Do not claim these roles.",
      "Speak only English in character. All in-game communication must be in English.",
      "Treat every scenario seriously. This is a roleplay server, not free-roam GTA Online.",
      "Avoid banned language. No racial slurs (including soft 'A'), discriminatory terms, or hateful speech.",
      "Show maturity and common sense. Immature or disrespectful behavior may lead to removal.",
      "Respect everyone, in and out of character.",
      "No racism, sexism, or discrimination.",
      "No harassment, bullying, or abuse.",
      "No trolling, baiting, or flame wars.",
      "No spam or unsolicited advertising.",
      "No real-money trading. Trading in-game items, currency, vehicles, or businesses for real money is prohibited unless approved by management.",
      "Gang leaders cannot hold command roles. If you lead or belong to a gang, you cannot serve as a department commander or detective.",
      "Use a clear microphone. Your voice chat must be audible and understandable.",
      "Record your gameplay. Clipping or recording software (e.g., Medal, OBS, NVIDIA Shadowplay) must be ready for evidence requests."
    ]
  },
  {
    title: "Roleplay Rules",
    items: [
      "FailRP: Keep roleplay realistic. No impossible stunts like jumping unhurt from a moving car or shrugging off a bullet.",
      "FearRP: Show genuine fear. If you’re outnumbered or threatened, act like your life depends on it.",
      "Value of Life: Always protect your character’s safety. Law enforcement must preserve life whenever possible.",
      "Powergaming: Do not force actions on others or exploit game mechanics for an advantage.",
      "Metagaming: Do not use out-of-character information (streams, Discord, calls) in roleplay.",
      "Revenge RP: After death, your character forgets all events leading up to it. No returning for payback.",
      "No RDM/VDM: Random or vehicle-based kills require at least 45 seconds of roleplay setup (dialogue, threats).",
      "Combat Logging: Do not quit, crash, or use F8 intentionally to avoid roleplay outcomes.",
      "OOC Chat: Keep all in-game chat in character."
    ]
  },
  {
    title: "Criminal RP Rules",
    items: [
      "Keep crimes realistic. No repetitive, grindy loops (e.g., robbing five stores back-to-back or kidnapping multiple cops in one night).",
      "Plan major crimes. Robberies and high-stakes events require a clear plan.",
      "Valid roleplay reasons are required. You cannot rob or kidnap someone without justification (e.g., at least 10 LEO on duty to kidnap an officer).",
      "Limit group size. Major crimes are restricted to a maximum of two vehicles or six participants.",
      "Move on after success. Do not camp or bait law enforcement at a scene.",
      "Use realistic vehicles. Avoid vehicles that break police chase dynamics (e.g., monster trucks)."
    ]
  },
  {
    title: "Law Enforcement & Emergency Services",
    items: [
      "Stay in character. Officers must represent their department professionally.",
      '“Dirty Cop” status requires staff approval.',
      "Use department assets responsibly. Helicopters, BearCats, and other equipment are for official use only.",
      "Give suspects a fair chance. Engage in proper roleplay before making arrests or using force."
    ]
  },
  {
    title: "Vehicle Rules",
    items: [
      "Drive realistically. Avoid extreme speeds and physics exploits (ramps, bunny hops, car launching).",
      "Treat crashes seriously. Flipped or damaged vehicles indicate your character is injured.",
      "Stolen emergency vehicles require valid roleplay and must be abandoned quickly.",
      "No “ocean dumps.” Vehicle disposal must be roleplayed, not simply driven into water."
    ]
  },
  {
    title: "Character Rules",
    items: [
      "Use realistic names. No meme or celebrity names.",
      "No cop baiting. Do not provoke police just to start a chase.",
      "ERP (Erotic Roleplay) is allowed but must be responsible and consensual. Understand the risks and consequences if arrested."
    ]
  },
  {
    title: "New Life Rule (NLR)",
    items: [
      "Forget all events leading to your death.",
      "Wait at least 15 minutes before returning to the location."
    ]
  },
  {
    title: "Economy & Property Rules",
    items: [
      "No money or item transfers between characters.",
      "No scamming. Misleading or exploiting others is prohibited.",
      "Use businesses and homes realistically.",
      "No money farming or bug abuse."
    ]
  },
  {
    title: "Business Rules",
    items: [
      "Businesses require whitelist approval. Owners are responsible for MLOs, vehicles, and clothing.",
      "Ownership transfers need staff approval.",
      "Criminal fronts are allowed but must remain realistic.",
      "No illicit money laundering between players.",
      "Employees must wear appropriate outfits when clocked in."
    ]
  },
  {
    title: "Discord & Communication Rules",
    items: [
      "Follow all Discord rules.",
      "No doxing, spamming, or threats.",
      "City chat = IC. Discord = OOC. Do not mix the two.",
      "Use designated channels for bugs, staff help, and suggestions."
    ]
  },
  {
    title: "Medical RP",
    items: [
      "Stage 1: Unconscious. You may remember events but speak only if appropriate for your injury.",
      "Stage 2: Dead. You cannot speak or recall anything unless EMS treats you before death."
    ]
  },
  {
    title: "Green Zones",
    items: [
      "Passive RP only in these areas: Legion Square Park, Police stations, hospitals, fire stations, Clothing stores, tattoo shops, barber shops, Any area with 15+ people, Recycling and trucking centers."
    ]
  },
  {
    title: "Reporting Players",
    items: [
      "Reports are out-of-character. Provide video evidence. Unsupported claims will be closed.",
      "Reportable offenses include: RDM/VDM, OOC chat, cheating, harassment, bullying, slurs, trolling, or toxic behavior."
    ]
  },
  {
    title: "Staff",
    items: [
      "Do not impersonate staff.",
      "Respect staff decisions. No public arguments.",
      "No power abuse.",
      "Staff decisions are final. Use proper appeal channels.",
      "Refer to staff only as ICE, DHS, or Federal Agents. Terms like 'Angels,' 'Gods,' or 'Higher Powers' are banned."
    ]
  }
];

export default function RulesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const iconFor = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("community")) return Shield;
    if (t.includes("roleplay")) return ScrollText;
    if (t.includes("criminal")) return Gavel;
    if (t.includes("law enforcement") || t.includes("emergency")) return User;
    if (t.includes("vehicle")) return Car;
    if (t.includes("character")) return User;
    if (t.includes("new life")) return ScrollText;
    if (t.includes("economy") || t.includes("property")) return DollarSign;
    if (t.includes("business")) return Building2;
    if (t.includes("discord") || t.includes("communication")) return MessageCircle;
    if (t.includes("medical")) return Activity;
    if (t.includes("green zone")) return MapPin;
    if (t.includes("report")) return Flag;
    if (t.includes("staff")) return UserCog;
    return ScrollText;
  };

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const emphasizeWords = (text: string) => {
    // Underline only selected emphasis words; no color changes
    const pattern = /(\bNOT\b|\bNO\b|\bNEVER\b|\bMUST\b|\bCANNOT\b|\bDON'T\b|\bDO NOT\b)/gi;
    const parts = text.split(pattern);
    return parts.map((part, i) => {
      if (part.match(pattern)) {
        return (
          <span key={i} className="underline underline-offset-4 decoration-2">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const copySectionLink = (slug: string) => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${slug}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(slug);
        window.location.hash = slug; // Also navigate
        setTimeout(() => setCopied(null), 1500);
      });
    } catch {
      // no-op
    }
  };

  return (
    <>
      {/* Sidebar like Resources */}
  <div className="border-r border-white/10 bg-black/60 shadow-lg backdrop-blur-md fixed" style={{top:'var(--header-h)', height:`calc(100vh - var(--header-h))`, left:0, width:256, zIndex:20, overflowY:'auto'}}>
        <div className="p-4 space-y-4">
          <div className="text-white text-xl font-bold px-3 py-3 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">Rules</div>
          <div className="space-y-1">
            {rules.map((section) => {
              const slug = slugify(section.title);
              const Icon = iconFor(section.title);
              return (
                <a key={slug} href={`#${slug}`} className="flex items-center gap-3 px-3 py-2.5 text-left rounded-md transition-all duration-200 text-white/70 hover:text-white hover:bg-white/5 border border-transparent">
                  <Icon size={16} className="flex-shrink-0" />
                  <span className="text-sm font-medium">{section.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="min-h-screen w-full text-white relative">
        <div className="ml-64 pl-6 flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="w-full max-w-[90rem]">{/* wider container */}
            <div className="text-center mb-8 lg:mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">Palmyra Server Rules</h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-4xl mx-auto">Please read carefully. These rules exist to keep roleplay fair and immersive for everyone. Violations may result in warnings, suspensions, or permanent removal.</p>
            <p className="text-white/60 text-xs mt-2">Last updated: Aug 28, 2025</p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Main sections */}
              <div className="lg:col-span-10 flex flex-col gap-6 lg:gap-8">
                {rules.map((section, idx) => {
                  const slug = slugify(section.title);
                  const Icon = iconFor(section.title);
                  return (
                    <Card key={idx} id={slug} className="bg-neutral-900/90 p-6 sm:p-8 rounded-xl shadow-lg border border-white/10" style={{scrollMarginTop:'var(--header-h)'}}>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-3">
                          <span className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-200"><Icon className="w-5 h-5" /></span>
                          <h2 className="text-2xl sm:text-3xl font-semibold">{section.title}</h2>
                        </div>
                        <button onClick={() => copySectionLink(slug)} className="text-white/60 hover:text-white flex items-center gap-2 text-sm">
                          {copied === slug ? <Check className="w-4 h-4 text-green-400" /> : <LinkIcon className="w-4 h-4" />}
                          <span className="hidden sm:inline">{copied === slug ? "Copied" : "Copy link"}</span>
                        </button>
                      </div>
                      <ul className="list-disc ml-6 sm:ml-7 space-y-3 sm:space-y-4 marker:text-blue-300">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-lg sm:text-xl leading-relaxed text-white/95">{emphasizeWords(item)}</li>
                        ))}
                      </ul>
                    </Card>
                  );
                })}
              </div>

              {/* Sidebar meta */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 flex flex-col gap-4">
                  <Card className="bg-neutral-900/80 border border-white/10 p-4">
                    <h3 className="text-sm font-semibold mb-2">Report a violation</h3>
                    <p className="text-xs text-white/80 mb-3">If you believe a rule has been broken, gather video evidence and submit a report.</p>
                    <a href="/resources?category=faq" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-medium">How to report</a>
                  </Card>
                  <Card className="bg-neutral-900/80 border border-white/10 p-4">
                    <h3 className="text-sm font-semibold mb-2">Need clarification?</h3>
                    <p className="text-xs text-white/80">Ask in the Discord help channels or contact staff via in-game reports.</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
