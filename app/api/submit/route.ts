import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "@/lib/config";
import type { DepartmentConfig } from "@/lib/types";

function findDept(slug: string): DepartmentConfig | undefined {
  return appConfig.departments.find((d) => d.slug === slug);
}

function answersToFields(answers: Record<string, unknown>, dept: DepartmentConfig) {
  return dept.questions.map((q) => {
    const raw = answers[q.id];
    const val = Array.isArray(raw) ? raw.join(", ") : raw === true ? "Yes" : raw === false ? "No" : `${raw ?? ""}`;
    return {
      name: q.label,
      value: val.length > 0 ? (val.length > 1024 ? val.slice(0, 1021) + "..." : val) : "(no answer)",
      inline: false,
    };
  });
}

async function postToWebhook(url: string, payload: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Webhook failed: ${res.status}`, errorText);
    throw new Error(`Webhook failed: ${res.status} - ${errorText}`);
  }
}

async function postToChannel(channelId: string, payload: Record<string, unknown>) {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) throw new Error("DISCORD_BOT_TOKEN is required for channel target");
  const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Channel post failed: ${res.status}: ${text}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, answers, discordId } = await req.json();
    if (!slug || typeof slug !== "string") return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    if (!discordId || typeof discordId !== "string") return NextResponse.json({ error: "Missing discordId" }, { status: 400 });

    // Clean Discord ID - remove 'discord:' prefix if present for webhook mentions
    const cleanDiscordId = discordId.replace(/^discord:/, '');
    console.log('Original Discord ID:', discordId);
    console.log('Cleaned Discord ID:', cleanDiscordId);

    const dept = findDept(slug);
    if (!dept) return NextResponse.json({ error: "Unknown department" }, { status: 404 });

    const fields = answersToFields(answers ?? {}, dept);

    const embed = {
      title: `${dept.name} Application`,
      description: `**Applicant:** <@${cleanDiscordId}> (ID: ${cleanDiscordId})`,
      color: 0x2b2d31, // Discord embed color
      fields,
      timestamp: new Date().toISOString(),
      footer: { text: `Submitted via Palmyra RP ${dept.slug} form` },
    };

    // Create a short name for the department/business
    const shortNames: Record<string, string> = {
      "lspd": "LSPD",
      "lscso": "LSCSO", 
      "ems": "EMS",
      "fire": "FIRE",
      "doj": "DOJ",
      "autoexotic": "Auto Exotic",
      "vanilla-unicorn": "Vanilla Unicorn"
    };

    const shortName = shortNames[dept.slug] || dept.slug.toUpperCase();
    const characterName = answers.characterName || `User-${cleanDiscordId}`;
    
    const payload = {
      content: `🆕 **New Application for ${dept.name}** from <@${cleanDiscordId}>`,
      embeds: [embed],
      allowed_mentions: { parse: ["users"] },
      thread_name: `${characterName} - ${shortName}`,
    };

    console.log('Sending webhook payload:', JSON.stringify(payload, null, 2));

    console.log('Sending webhook payload:', JSON.stringify(payload, null, 2));

    if (dept.target.type === "webhook") {
      await postToWebhook(dept.target.webhookUrl, payload);
    } else {
      await postToChannel(dept.target.channelId, payload);
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error('Application submission error:', e);
    const errorMessage = e instanceof Error ? e.message : "Submit error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
