"use client";
import React, { useEffect, useMemo, useState } from "react";
import type { DepartmentConfig, Answers } from "@/lib/types";
import Question from "@/components/Question";
import ArrowButton from "@/components/ArrowButton";
import ProgressDots from "@/components/ProgressDots";
import { fetchDiscordUser } from "@/lib/getDiscordUser";
import Image from "next/image";

interface Character {
  citizenid: string;
  charinfo: {
    firstname: string;
    lastname: string;
  };
}

interface Props {
  dept: DepartmentConfig;
  logoUrl?: string; // optional site logo path
}

export default function Wizard({ dept, logoUrl }: Props) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [discordId, setDiscordId] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loadingCharacters, setLoadingCharacters] = useState(false);

  useEffect(() => {
    fetchDiscordUser().then((u) => {
      setDiscordId(u?.id ?? null);
      if (u?.id) {
        fetchUserCharacters(u.id);
      }
    });
  }, []);

  const fetchUserCharacters = async (discordId: string) => {
    try {
      setLoadingCharacters(true);
      
      // First get the user data from Discord ID
      const userResponse = await fetch(`/api/fivem/user?discordId=${discordId}`);
      if (!userResponse.ok) {
        console.log('User not found in FiveM database');
        return;
      }
      
      const userData = await userResponse.json();
      
      // Then get all characters for this user
      const charactersResponse = await fetch(`/api/fivem/characters?userId=${userData.userId}`);
      if (!charactersResponse.ok) {
        console.log('No characters found for user');
        return;
      }
      
      const charactersData = await charactersResponse.json();
      setCharacters(charactersData);
      
      // Auto-select first character if only one exists
      if (charactersData.length === 1) {
        setSelectedCharacter(charactersData[0]);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoadingCharacters(false);
    }
  };

  // Department/Business specific styling
  const getDepartmentStyling = (slug: string) => {
    const styles = {
      lspd: {
        backgroundImage: "/lspdbackground.png",
        primaryColor: "#1E3A8A",
        accentColor: "#60A5FA",
        overlayColor: "rgba(30, 58, 138, 0.65)"
      },
      lscso: {
        backgroundImage: "/lscsobackground.png", 
        primaryColor: "#059669",
        accentColor: "#34D399",
        overlayColor: "rgba(5, 150, 105, 0.85)"
      },
      safr: {
        backgroundImage: "/SAFRbackground.png",
        primaryColor: "#DC2626",
        accentColor: "#FEF08A", 
        overlayColor: "rgba(220, 38, 38, 0.75)"
      },
      doj: {
        backgroundImage: "/doj2.png",
        primaryColor: "#7C2D12", 
        accentColor: "#FED7AA",
        overlayColor: "rgba(124, 45, 18, 0.85)"
      },
      autoexotic: {
        backgroundImage: "/autoexoticcshall.png",
        primaryColor: "#1E40AF",
        accentColor: "#60A5FA",
        overlayColor: "rgba(30, 64, 175, 0.85)"
      },
      "vanilla-unicorn": {
        backgroundImage: "/unicornclubload.png",
        primaryColor: "#7C2D12",
        accentColor: "#F472B6", 
        overlayColor: "rgba(124, 45, 18, 0.75)"
      },
      bennys: {
        backgroundImage: "/bennysbackground.png",
        primaryColor: "#DC2626",
        accentColor: "#FEF08A",
        overlayColor: "rgba(220, 38, 38, 0.75)"
      },
      "gun-license": {
        backgroundImage: "/palmyrawide.png",
        primaryColor: "#1E40AF",
        accentColor: "#3B82F6",
        overlayColor: "rgba(30, 64, 175, 0.75)"
      }
    };
    
    return styles[slug as keyof typeof styles] || {
      backgroundImage: "/wallpaper.png",
      primaryColor: "#1E3A8A",
      accentColor: "#60A5FA", 
      overlayColor: "rgba(30, 58, 138, 0.85)"
    };
  };

  const styling = getDepartmentStyling(dept.slug);

  const q = dept.questions[idx];

  const isValid = useMemo(() => {
    if (!q) return false;
    const v = answers[q.id];
    if (!q.required) return true;
    if (q.type === "yesNo") return typeof v === "boolean";
    if (q.type === "multiSelect") return Array.isArray(v) && v.length > 0;
    return v !== undefined && v !== null && `${v}`.trim() !== "";
  }, [q, answers]);

  const next = () => {
    if (!isValid) return;
    setIdx((i) => Math.min(i + 1, dept.questions.length - 1));
  };

  const back = () => setIdx((i) => Math.max(i - 1, 0));

  const onChange = (val: unknown) => setAnswers((prev) => ({ ...prev, [q.id]: val }));

  async function onSubmit() {
    setError(null);
    if (!discordId) {
      setError("You must be logged in with Discord to submit.");
      return;
    }
    if (!selectedCharacter) {
      setError("Please select a character for this application.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          slug: dept.slug, 
          discordId, 
          answers,
          character: {
            citizenid: selectedCharacter.citizenid,
            name: `${selectedCharacter.charinfo.firstname} ${selectedCharacter.charinfo.lastname}`
          }
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Submit failed (${res.status}).`);
      }
      setSuccess(true);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Unknown error.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div 
        className="min-h-screen relative flex flex-col items-center justify-center gap-6 text-center"
        style={{
          backgroundImage: `url('${styling.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        
        {/* Success content */}
        <div className="relative z-10 max-w-2xl mx-auto p-8">
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-700 shadow-2xl">
            {logoUrl ? (
              <Image src={logoUrl} alt="Logo" width={80} height={80} className="mx-auto mb-6" />
            ) : null}
            <h1 
              className="text-4xl font-bold text-white mb-4 text-center"
            >
              {dept.slug === 'gun-license' ? 'Gun License Application Submitted!' : 'Application Submitted Successfully!'}
            </h1>
            {dept.slug === 'gun-license' ? (
              <>
                <p className="text-xl text-gray-300 mb-4 text-center">
                  Your gun license application has been submitted for review.
                </p>
                {selectedCharacter && (
                  <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                    <p className="text-blue-300 text-sm text-center">
                      <strong>Applied for character:</strong> {selectedCharacter.charinfo.firstname} {selectedCharacter.charinfo.lastname} ({selectedCharacter.citizenid})
                    </p>
                  </div>
                )}
                <div className="text-gray-300 mb-6 space-y-3 text-left">
                  <p className="font-semibold text-yellow-400 text-center">⚠️ Important Next Steps:</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Wait 24-48 hours for initial application review</li>
                    <li>Visit any police station to speak with an officer about your results</li>
                    <li>Bring valid identification for processing</li>
                    <li>Complete final interview and background verification</li>
                  </ol>
                </div>
                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-4">
                  <p className="text-red-300 font-medium text-sm">
                    <strong>Requirements:</strong> No felonies (automatic disqualification), must be a citizen in good standing, 
                    and demonstrate understanding of self-defense and gun laws.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-xl text-gray-300 mb-4 text-center">
                  Thanks for your interest in joining {dept.name}. Your application has been sent for review.
                </p>
                {selectedCharacter && (
                  <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                    <p className="text-blue-300 text-sm text-center">
                      <strong>Applied for character:</strong> {selectedCharacter.charinfo.firstname} {selectedCharacter.charinfo.lastname} ({selectedCharacter.citizenid})
                    </p>
                  </div>
                )}
                <p className="text-gray-400 text-center">
                  You should receive a response within 24-48 hours.
                </p>
              </>
            )}
            <div 
              className="mt-6 p-4 rounded-xl border border-green-500/30 bg-green-900/20"
            >
              <p className="text-green-400 font-medium text-center">✅ Application received and processed</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('${styling.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat"
      }}
    >
      
      <div className="relative z-10 w-full max-w-2xl rounded-lg bg-gray-900 p-8 border border-gray-700 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <Image src={logoUrl} alt="Logo" width={40} height={40} />
            ) : null}
            <div>
              <h2 
                className="text-xl font-bold text-white"
              >
                {dept.name} Application
              </h2>
              <p className="text-sm text-gray-400">Question {idx + 1} of {dept.questions.length}</p>
            </div>
          </div>
          <ProgressDots total={dept.questions.length} current={idx} accent={dept.theme.accent} />
        </div>

        {/* Question card */}
        <div 
          className="rounded-lg p-6 border border-gray-600 bg-gray-800"
        >
          <Question q={q} value={answers[q.id]} onChange={onChange} />
        </div>

        {/* Character Selection - Show on last question */}
        {idx === dept.questions.length - 1 && (
          <div className="mt-4 rounded-lg p-6 border border-blue-600/50 bg-blue-900/20">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              👤 Character Information
            </h3>
            
            {loadingCharacters ? (
              <div className="flex items-center gap-2 text-gray-300">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span>Loading your characters...</span>
              </div>
            ) : characters.length === 0 ? (
              <div className="text-yellow-300 text-sm">
                ⚠️ No characters found in the FiveM database. Make sure you&apos;ve joined the server and created a character.
              </div>
            ) : characters.length === 1 ? (
              <div className="text-green-300 text-sm">
                ✅ Application will be submitted for: <strong>{selectedCharacter?.charinfo.firstname} {selectedCharacter?.charinfo.lastname}</strong> ({selectedCharacter?.citizenid})
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-gray-300 text-sm font-medium">Select the character for this application:</label>
                <select
                  value={selectedCharacter?.citizenid || ''}
                  onChange={(e) => {
                    const character = characters.find(c => c.citizenid === e.target.value);
                    setSelectedCharacter(character || null);
                  }}
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">-- Select a character --</option>
                  {characters.map((character) => (
                    <option key={character.citizenid} value={character.citizenid}>
                      {character.charinfo.firstname} {character.charinfo.lastname} ({character.citizenid})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {error ? (
          <p className="mt-4 rounded-xl bg-red-500/20 px-4 py-2 text-sm" role="alert">{error}</p>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={idx === 0}
            className="rounded-lg px-5 py-3 font-medium border disabled:opacity-30 transition-all hover:bg-gray-700"
            style={{ 
              borderColor: "#6B7280", 
              color: "#D1D5DB",
              backgroundColor: "#374151"
            }}
          >
            Back
          </button>

          {idx < dept.questions.length - 1 ? (
            <ArrowButton
              onClick={next}
              disabled={!isValid}
              className="hover:bg-blue-600 transition-all rounded-lg"
              style={{ 
                backgroundColor: "#3B82F6", 
                color: "white",
                border: "1px solid #2563EB"
              }}
            />
          ) : (
            <ArrowButton
              label={submitting ? "Submitting..." : "Submit"}
              onClick={onSubmit}
              disabled={!isValid || submitting || (characters.length > 0 && !selectedCharacter)}
              className="hover:bg-blue-600 transition-all rounded-lg"
              style={{ 
                backgroundColor: "#3B82F6", 
                color: "white",
                border: "1px solid #2563EB"
              }}
            />
          )}
        </div>

        <div className="mt-6 text-right text-xs opacity-70">
          {discordId ? (
            <span>Logged in as Discord ID: {discordId}</span>
          ) : (
            <span>Login with Discord required</span>
          )}
        </div>
      </div>
    </div>
  );
}
