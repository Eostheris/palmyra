import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function PolicePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4">
      <Card className="max-w-xl w-full bg-neutral-900/80 text-white p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Los Santos Police Department</h1>
        <p className="mb-6 text-lg">Uphold the law and keep Palmyra safe. Join our police department and make a difference in the community.</p>
        <Button asChild className="w-full bg-blue-600 text-white font-semibold">
          <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer">Apply Now</a>
        </Button>
      </Card>
    </div>
  );
}
