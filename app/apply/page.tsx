import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function ApplyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4">
      <Card className="max-w-xl w-full bg-neutral-900/80 text-white p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Apply to Palmyra Departments</h1>
        <p className="mb-6 text-lg">Ready to join? Choose your department and submit your application. We value every member of our community!</p>
        <Button asChild className="w-full bg-white text-black font-semibold">
          <a href="https://tally.so/r/wMWLEg" target="_blank" rel="noopener noreferrer">Start Application</a>
        </Button>
      </Card>
    </div>
  );
}
