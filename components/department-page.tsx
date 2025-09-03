import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

interface DepartmentPageProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonColor: string;
  applyLink?: string;
}

export default function DepartmentPage({
  title,
  description,
  imageSrc,
  imageAlt,
  buttonColor,
  applyLink = "/apply"
}: DepartmentPageProps) {
  return (
    <div className="min-h-screen w-full text-white relative">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10 opacity-70"
        style={{ backgroundImage: 'url(/palmyrawide.png)' }}
      />
      <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 relative z-10">
        <Card className="max-w-xl w-full bg-neutral-900/90 p-8 rounded-xl shadow-xl flex flex-col items-center">
          <Image src={imageSrc} alt={imageAlt} width={160} height={120} className="rounded mb-6 object-contain" />
          <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
          <p className="mb-6 text-lg text-center">{description}</p>
          <Button asChild className={`w-full ${buttonColor} text-white font-semibold`}>
            <Link href={applyLink}>Apply Now</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
