import { Card } from "../../components/ui/card";

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
  return (
    <div className="min-h-screen w-full text-white relative">
      <div className="flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 lg:mb-10 text-center drop-shadow-lg">Palmyra Server Rules</h1>
        <div className="w-full max-w-5xl flex flex-col gap-6 lg:gap-8">
          {rules.map((section, idx) => (
            <Card key={idx} className="bg-neutral-900/90 p-4 sm:p-6 rounded-xl shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{section.title}</h2>
              <ul className="list-disc ml-4 sm:ml-6 space-y-2 sm:space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm sm:text-base leading-relaxed">{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
