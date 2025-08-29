import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function PolicePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-xl w-full bg-neutral-900/80 text-white p-6 sm:p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center sm:text-left">
          Los Santos Police Department
        </h1>
        <p className="mb-6 text-base sm:text-lg leading-relaxed text-center sm:text-left">
          Uphold the law and keep Palmyra safe. Join our police department and make a difference in the community.
        </p>
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base sm:text-lg transition-colors">
          <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer">Apply Now</a>
        </Button>
      </Card>
    </div>
  );
}
