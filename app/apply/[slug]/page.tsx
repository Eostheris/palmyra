import { notFound } from "next/navigation";
import Wizard from "@/components/Wizard";
import { appConfig } from "@/lib/config";

interface Props {
  params: { slug: string };
}

export default function ApplyPage({ params }: Props) {
  const dept = appConfig.departments.find((d) => d.slug === params.slug);
  if (!dept) return notFound();
  
  return (
    <div className="min-h-screen">
      <Wizard dept={dept} logoUrl="/palmyravector.png" />
    </div>
  );
}

export async function generateStaticParams() {
  return appConfig.departments.map((dept) => ({
    slug: dept.slug,
  }));
}
