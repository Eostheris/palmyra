export type QuestionType =
  | "shortText"
  | "longText"
  | "select"
  | "multiSelect"
  | "yesNo"
  | "number"
  | "date";

export interface QuestionBase {
  id: string; // unique key
  label: string;
  required?: boolean;
  helpText?: string;
}

export interface ShortTextQuestion extends QuestionBase {
  type: "shortText";
  placeholder?: string;
  maxLength?: number;
}

export interface LongTextQuestion extends QuestionBase {
  type: "longText";
  placeholder?: string;
  maxLength?: number;
}

export interface SelectQuestion extends QuestionBase {
  type: "select";
  options: string[];
}

export interface MultiSelectQuestion extends QuestionBase {
  type: "multiSelect";
  options: string[];
  maxChoices?: number;
}

export interface YesNoQuestion extends QuestionBase {
  type: "yesNo";
}

export interface NumberQuestion extends QuestionBase {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
}

export interface DateQuestion extends QuestionBase {
  type: "date";
  min?: string; // YYYY-MM-DD
  max?: string; // YYYY-MM-DD
}

export type Question =
  | ShortTextQuestion
  | LongTextQuestion
  | SelectQuestion
  | MultiSelectQuestion
  | YesNoQuestion
  | NumberQuestion
  | DateQuestion;

export type Answers = Record<string, unknown>;

export interface DepartmentTheme {
  // Tailwind-friendly hex or hsl() strings; used inline or as CSS vars
  primary: string;
  accent: string;
  foreground: string;
}

export interface DiscordWebhookTarget {
  type: "webhook";
  webhookUrl: string; // keep in server-side config or read at runtime; never expose client-side
}

export interface DiscordChannelTarget {
  type: "channel";
  channelId: string; // requires DISCORD_BOT_TOKEN
}

export type DiscordTarget = DiscordWebhookTarget | DiscordChannelTarget;

export interface DepartmentConfig {
  name: string;
  slug: string;
  theme: DepartmentTheme;
  target: DiscordTarget;
  questions: Question[];
}

export interface AppConfig {
  departments: DepartmentConfig[];
}
