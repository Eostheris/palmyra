"use client";

import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { useState, useMemo } from "react";

// Define types for PenalCode structure
interface Statute {
  id: string;
  title: string;
  description: string;
  class: "Felony" | "Misdemeanor" | "Infraction";
  months: number;
  fine: number;
}

interface PenalCodeCategory {
  Title: string;
  Statutes: { [key: string]: Statute };
}

// Import the data with type assertion
import PenalCodeRaw from "../penalcode";

export default function DOJCodesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  const getClassColor = (penalClass: string) => {
    switch (penalClass) {
      case 'Felony':
        return 'bg-red-500 text-white';
      case 'Misdemeanor':
        return 'bg-orange-500 text-white';
      case 'Infraction':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Explicitly type the imported data
  const typedPenalCode: PenalCodeCategory[] = PenalCodeRaw;

  // Filter and search functionality
  const filteredCategories = useMemo(() => {
    return typedPenalCode.map(category => {
      const filteredStatutes = Object.entries(category.Statutes).filter(([, statute]) => {
        const matchesSearch = searchTerm === "" || 
          statute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          statute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          statute.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesClass = selectedClass === "All" || statute.class === selectedClass;
        
        return matchesSearch && matchesClass;
      });

      return filteredStatutes.length > 0 ? {
        ...category,
        Statutes: Object.fromEntries(filteredStatutes)
      } : null;
    }).filter((category): category is PenalCodeCategory => category !== null);
  }, [typedPenalCode, searchTerm, selectedClass]);

  return (
    <div className="min-h-screen w-full relative" style={{ background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(/palmyrawide.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="flex flex-col w-full px-6 py-8 relative z-10">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto w-full mb-8">
          <h1 className="text-6xl font-bold mb-6 text-center drop-shadow-xl text-white">DOJ Penal Codes</h1>
          <p className="text-xl text-center text-white/80 mb-8 max-w-3xl mx-auto">
            Complete reference guide for Los Santos Department of Justice penal codes and statutes
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto w-full mb-8">
          <Card className="bg-neutral-900/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by code, title, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-neutral-800 border-neutral-600 text-white placeholder:text-white/60 text-lg py-3"
                />
              </div>
              <div className="flex gap-2">
                {["All", "Felony", "Misdemeanor", "Infraction"].map((classType) => (
                  <button
                    key={classType}
                    onClick={() => setSelectedClass(classType)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedClass === classType
                        ? "bg-blue-600 text-white"
                        : "bg-neutral-700 text-white/80 hover:bg-neutral-600"
                    }`}
                  >
                    {classType}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto w-full">
          {filteredCategories.length === 0 ? (
            <Card className="bg-neutral-900/95 backdrop-blur-md p-12 rounded-2xl shadow-2xl border border-white/10 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">No Results Found</h3>
              <p className="text-white/70">Try adjusting your search terms or filters</p>
            </Card>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category: PenalCodeCategory, categoryIdx: number) => (
                <div key={categoryIdx} className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-2">{category.Title}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Object.entries(category.Statutes).map(([key, statute]: [string, Statute]) => (
                      <Card key={key} className="bg-neutral-900/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/10 hover:bg-neutral-800/90 transition-all duration-300 hover:scale-105">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white leading-tight">{statute.title}</h3>
                              <p className="text-sm text-blue-300 font-mono mt-1">{statute.id}</p>
                            </div>
                            <Badge className={`${getClassColor(statute.class)} ml-2 text-xs font-bold`}>
                              {statute.class}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-white/90 leading-relaxed line-clamp-4">
                            {statute.description}
                          </p>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-white/10">
                            <div className="text-center">
                              <p className="text-xs text-white/60">Months</p>
                              <p className="text-lg font-bold text-white">{statute.months}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-white/60">Fine</p>
                              <p className="text-lg font-bold text-green-400">${statute.fine.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
