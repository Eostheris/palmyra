import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { appConfig } from "@/lib/config";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Apply to Palmyra Departments</h1>
          <p className="text-lg text-white/80 mb-8">Ready to join? Choose your department and submit your application. We value every member of our community!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appConfig.departments.map((dept) => (
            <Card 
              key={dept.slug} 
              className="bg-neutral-900/80 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-white/20"
              style={{
                background: `linear-gradient(135deg, ${dept.theme.primary}20 0%, ${dept.theme.accent}20 100%)`,
                borderColor: dept.theme.accent + "40"
              }}
            >
              <h2 className="text-xl font-bold mb-3" style={{ color: dept.theme.accent }}>
                {dept.name}
              </h2>
              <p className="text-white/70 text-sm mb-4">
                {dept.questions.length} questions • 5-10 minutes
              </p>
              <Button 
                asChild 
                className="w-full font-semibold transition-colors"
                style={{ 
                  backgroundColor: dept.theme.accent, 
                  color: dept.theme.primary,
                }}
              >
                <Link href={`/apply/${dept.slug}`}>
                  Apply Now
                </Link>
              </Button>
            </Card>
          ))}
        </div>
        
        <Card className="max-w-xl mx-auto bg-neutral-900/80 text-white p-6 rounded-xl shadow-xl border border-white/10">
          <h2 className="text-xl font-bold mb-3">Legacy Application</h2>
          <p className="mb-4 text-white/70">
            Prefer the original application form? You can still use our Tally form.
          </p>
          <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
            <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer">
              Use Legacy Form
            </a>
          </Button>
        </Card>
      </div>
    </div>
  );
}
