import { Card } from "../../components/ui/card";
import Image from "next/image";
import { Button } from "../../components/ui/button";

const departments = [
  {
    name: "Los Santos Police Department (LSPD)",
    image: "/lspdvectorizeai.png",
    description: "Apply to join the Los Santos Police Department and serve the city.",
    link: "https://tally.so/r/wMWLEg"
  },
  {
    name: "Los Santos County Sheriffs Office (LSCSO)",
    image: "/lscso_badge.png",
    description: "Apply to join the LS County Sheriffs and protect the county.",
    link: "https://tally.so/r/wMWLEg"
  },
  {
    name: "EMS Department",
  image: "/SAFR.png",
    description: "Provide medical assistance and save lives.",
    link: "https://tally.so/r/wMWLEg"
  },
  {
    name: "Fire Department",
    image: "/palmyraloading2.png",
    description: "Respond to emergencies and protect the city.",
    link: "https://tally.so/r/wMWLEg"
  }
];

export default function DepartmentsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-4 text-white">
      <Image src="/palmyrawide.png" alt="Palmyra Background" fill={true} className="object-cover fixed inset-0 -z-10 opacity-70" />
      <h1 className="text-5xl font-bold mb-10 text-center">Departments</h1>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {departments.map((dept, idx) => (
          <Card key={idx} className="bg-neutral-900/90 p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Image src={dept.image} alt={dept.name} width={120} height={80} className="rounded mb-4 object-contain" />
            <h2 className="text-xl font-bold mb-2 text-center">{dept.name}</h2>
            <p className="mb-4 text-center text-base text-white/80">{dept.description}</p>
            <Button variant="outline" className="w-full font-semibold" asChild>
              <a href={dept.link} target="_blank" rel="noopener noreferrer">Apply</a>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
