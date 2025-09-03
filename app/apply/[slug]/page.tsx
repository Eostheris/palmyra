import { notFound } from "next/navigation";
import Wizard from "@/components/Wizard";
import { appConfig } from "@/lib/config";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ApplyPage({ params }: Props) {
  const { slug } = await params;
  const dept = appConfig.departments.find((d) => d.slug === slug);
  if (!dept) return notFound();
  
  return (
    <Wizard dept={dept} logoUrl="/palmyravector.png" />
  );
}

export async function generateStaticParams() {
  return appConfig.departments.map((dept) => ({
    slug: dept.slug,
  }));
}
