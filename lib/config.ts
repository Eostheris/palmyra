import { AppConfig } from "./types";

export const appConfig: AppConfig = {
  departments: [
    {
      name: "Los Santos Police Department",
      slug: "lspd",
      theme: {
        primary: "#1E3A8A", // Deep blue
        accent: "#60A5FA", // Light blue
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.LSPD_WEBHOOK_URL || "https://discord.com/api/webhooks/1412868159244992532/osRNwmGMgYI6T79F7uEWLTraZz-Fz0O8C8JRLrZwJkqlpGHuWk35MqOuDqqDnf6dNtj8", 
      },
      questions: [
        {
          id: "characterName",
          type: "characterSelect",
          label: "Select your character",
          required: true,
          helpText: "Choose which character you are applying with",
        },
        {
          id: "age",
          type: "number",
          label: "Your age",
          required: true,
          min: 18,
          max: 80,
        },
        {
          id: "experience",
          type: "longText",
          label: "Describe your relevant law enforcement experience",
          required: true,
          maxLength: 1000,
          placeholder: "Tell us about any experience you have in law enforcement, security, or related fields...",
        },
        {
          id: "preferredRole",
          type: "select",
          label: "Preferred division",
          options: ["Patrol", "Traffic", "Detective", "Gang Unit", "SWAT"],
          required: true,
        },
        {
          id: "availability",
          type: "multiSelect",
          label: "Availability (select all that apply)",
          options: ["Weekdays", "Weeknights", "Weekends", "Overnights"],
        },
        {
          id: "whyLSPD",
          type: "longText",
          label: "Why do you want to join LSPD?",
          required: true,
          maxLength: 500,
        },
        {
          id: "tos",
          type: "yesNo",
          label: "Do you agree to our Rules/SOP and Code of Conduct?",
          required: true,
        },
      ],
    },
    {
      name: "Los Santos County Sheriff's Office",
      slug: "lscso",
      theme: {
        primary: "#059669", // Dark green
        accent: "#34D399", // Light green
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.LSCSO_WEBHOOK_URL || "https://discord.com/api/webhooks/REPLACE_ME",
      },
      questions: [
        {
          id: "characterName",
          type: "characterSelect",
          label: "Select your character",
          required: true,
          helpText: "Choose which character you are applying with",
        },
        {
          id: "age",
          type: "number",
          label: "Age",
          required: true,
          min: 18,
          max: 80,
        },
        {
          id: "experience",
          type: "longText",
          label: "Law enforcement or military experience",
          required: true,
          maxLength: 1000,
        },
        {
          id: "availability",
          type: "multiSelect",
          label: "When are you available to patrol?",
          options: ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)", "Night (12AM-6AM)"],
        },
        {
          id: "whySheriff",
          type: "longText",
          label: "Why do you want to join the Sheriff's Office?",
          required: true,
          maxLength: 500,
        },
      ],
    },
    {
      name: "Emergency Medical Services",
      slug: "ems",
      theme: {
        primary: "#DC2626", // Red
        accent: "#FCA5A5", // Light red
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.EMS_WEBHOOK_URL || "https://discord.com/api/webhooks/REPLACE_ME",
      },
      questions: [
        {
          id: "characterName",
          type: "characterSelect",
          label: "Select your character",
          required: true,
          helpText: "Choose which character you are applying with",
        },
        {
          id: "emtCert",
          type: "select",
          label: "Medical Certification Level",
          options: ["EMT-B", "EMT-I", "Paramedic", "RN", "MD", "None"],
          required: true,
        },
        {
          id: "medicalExperience",
          type: "longText",
          label: "Describe your medical experience",
          required: true,
          maxLength: 1000,
        },
        {
          id: "stressful",
          type: "longText",
          label: "How do you handle stressful medical situations?",
          required: true,
          maxLength: 500,
        },
        {
          id: "why",
          type: "longText",
          label: "Why do you want to join EMS?",
          required: true,
          maxLength: 500,
        },
      ],
    },
    {
      name: "Fire Department",
      slug: "fire",
      theme: {
        primary: "#B91C1C", // Dark red
        accent: "#FEF08A", // Yellow
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.FIRE_WEBHOOK_URL || "https://discord.com/api/webhooks/REPLACE_ME",
      },
      questions: [
        {
          id: "characterName",
          type: "characterSelect",
          label: "Select your character",
          required: true,
          helpText: "Choose which character you are applying with",
        },
        {
          id: "age",
          type: "number",
          label: "Age",
          required: true,
          min: 18,
          max: 65,
        },
        {
          id: "certification",
          type: "select",
          label: "Fire/Rescue Certification",
          options: ["Firefighter I", "Firefighter II", "Fire Officer", "Rescue Technician", "None"],
          required: true,
        },
        {
          id: "experience",
          type: "longText",
          label: "Fire service or emergency response experience",
          required: true,
          maxLength: 1000,
        },
        {
          id: "physical",
          type: "yesNo",
          label: "Are you physically able to perform demanding firefighting tasks?",
          required: true,
        },
        {
          id: "motivation",
          type: "longText",
          label: "What motivates you to serve as a firefighter?",
          required: true,
          maxLength: 500,
        },
      ],
    },
    {
      name: "Department of Justice",
      slug: "doj",
      theme: {
        primary: "#7C2D12", // Brown
        accent: "#FED7AA", // Light orange
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.DOJ_WEBHOOK_URL || "https://discord.com/api/webhooks/REPLACE_ME",
      },
      questions: [
        {
          id: "characterName",
          type: "characterSelect",
          label: "Select your character",
          required: true,
          helpText: "Choose which character you are applying with",
        },
        {
          id: "position",
          type: "select",
          label: "Position applying for",
          options: ["Judge", "District Attorney", "Public Defender", "Court Clerk"],
          required: true,
        },
        {
          id: "legalEducation",
          type: "longText",
          label: "Legal education and background",
          required: true,
          maxLength: 1000,
        },
        {
          id: "legalExperience",
          type: "longText",
          label: "Previous legal or judicial experience",
          required: true,
          maxLength: 1000,
        },
        {
          id: "philosophy",
          type: "longText",
          label: "Your judicial philosophy or approach to justice",
          required: true,
          maxLength: 500,
        },
      ],
    },
    {
      name: "Auto Exotic Dealership",
      slug: "autoexotic",
      theme: {
        primary: "#1E40AF", // Blue
        accent: "#60A5FA", // Light blue
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.AUTOEXOTIC_WEBHOOK_URL || "https://discord.com/api/webhooks/REPLACE_ME",
      },
      questions: [
        {
          id: "characterName",
          type: "characterSelect",
          label: "Select your character",
          required: true,
          helpText: "Choose which character you are applying with",
        },
        {
          id: "age",
          type: "number",
          label: "Your age",
          required: true,
          min: 18,
          max: 80,
        },
        {
          id: "experience",
          type: "longText",
          label: "Describe your sales or automotive experience",
          required: true,
          maxLength: 1000,
          placeholder: "Tell us about any experience you have in sales, automotive industry, or customer service...",
        },
        {
          id: "preferredRole",
          type: "select",
          label: "Position of interest",
          options: ["Sales Associate", "Finance Manager", "Lot Attendant", "Service Advisor"],
          required: true,
        },
        {
          id: "availability",
          type: "multiSelect",
          label: "When are you available to work?",
          options: ["Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings"],
          required: true,
          maxChoices: 3,
        },
        {
          id: "whyJoin",
          type: "longText",
          label: "Why do you want to work at Auto Exotic?",
          required: true,
          maxLength: 500,
        },
      ],
    },
    {
      name: "Vanilla Unicorn",
      slug: "vanilla-unicorn",
      theme: {
        primary: "#EC4899", // Pink
        accent: "#F472B6", // Light pink
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.VANILLA_UNICORN_WEBHOOK_URL || "https://discord.com/api/webhooks/REPLACE_ME",
      },
      questions: [
        {
          id: "characterName",
          type: "characterSelect",
          label: "Select your character",
          required: true,
          helpText: "Choose which character you are applying with",
        },
        {
          id: "age",
          type: "number",
          label: "Your age",
          required: true,
          min: 18,
          max: 80,
        },
        {
          id: "experience",
          type: "longText",
          label: "Describe your hospitality or entertainment experience",
          required: true,
          maxLength: 1000,
          placeholder: "Tell us about any experience you have in hospitality, entertainment, or customer service...",
        },
        {
          id: "preferredRole",
          type: "select",
          label: "Position of interest",
          options: ["Bartender", "Security", "DJ", "Dancer", "Host/Hostess", "Manager"],
          required: true,
        },
        {
          id: "availability",
          type: "multiSelect",
          label: "When are you available to work?",
          options: ["Weekdays", "Weekends", "Evenings", "Late Night"],
          required: true,
          maxChoices: 3,
        },
        {
          id: "whyJoin",
          type: "longText",
          label: "Why do you want to work at Vanilla Unicorn?",
          required: true,
          maxLength: 500,
        },
      ],
    },
  ],
};
