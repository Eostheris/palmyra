import { createClient } from "@/lib/supabase/server";
import { DiscordAuthButton } from "./discord-auth-button";
import { DiscordVerification } from "./discord-verification";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import { Button } from "./ui/button";

export async function EnhancedAuthButton() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="flex flex-col gap-4 p-4 bg-neutral-900/90 rounded-lg border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#EA9449] to-[#29C1B0] flex items-center justify-center text-white font-semibold text-sm">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium">Welcome back!</p>
              <p className="text-white/60 text-sm">{user.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
        
        {/* Discord Verification Component */}
        <DiscordVerification user={user} />
        
        <div className="pt-2 border-t border-white/10">
          <p className="text-white/80 text-sm">
            🎮 Ready to join the action? Make sure you're verified above!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-neutral-900/90 rounded-lg border border-white/10">
      <div className="text-center">
        <h3 className="text-white font-semibold mb-2">Join Palmyra RP</h3>
        <p className="text-white/80 text-sm mb-4">
          Connect with Discord to verify your membership and access exclusive content.
        </p>
      </div>
      
      <DiscordAuthButton />
      
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="text-white/60 text-xs">OR</span>
        <div className="flex-1 h-px bg-white/20"></div>
      </div>
      
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline" className="flex-1">
          <Link href="/auth/login">Email Login</Link>
        </Button>
        <Button asChild size="sm" variant="default" className="flex-1">
          <Link href="/auth/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
