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
        webhookUrl: process.env.LSCSO_WEBHOOK_URL || "https://discord.com/api/webhooks/1412891622756323398/VqpZdtlm5M361JOypaUitXKGgsM6s7it-wzPKWV3e1YOLE2xWb-aMOeEN7askryVbZOB",
      },
      questions: [
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
      name: "San Andreas Fire & Rescue",
      slug: "safr",
      theme: {
        primary: "#DC2626", // Red
        accent: "#FEF08A", // Yellow
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.SAFR_WEBHOOK_URL || "https://discord.com/api/webhooks/1412891761046589461/7GdKylmShZj7_T5jnJeSzURxSV5iOC4pXEMU8IQgxDJMmDRAprdrmsBaFSowJlQxrGmd",
      },
      questions: [
        {
          id: "age",
          type: "number",
          label: "Your age",
          required: true,
          min: 18,
          max: 65,
        },
        {
          id: "preferredRole",
          type: "select",
          label: "Primary area of interest",
          options: ["Firefighter", "EMT/Paramedic", "Rescue Technician", "Fire/EMS Officer", "Both Fire & EMS"],
          required: true,
        },
        {
          id: "certifications",
          type: "multiSelect",
          label: "Current certifications (select all that apply)",
          options: ["Firefighter I", "Firefighter II", "Fire Officer", "EMT-B", "EMT-I", "Paramedic", "RN", "MD", "Rescue Technician", "None"],
          required: true,
        },
        {
          id: "experience",
          type: "longText",
          label: "Describe your fire service, EMS, or emergency response experience",
          required: true,
          maxLength: 1000,
          placeholder: "Tell us about any experience you have in firefighting, emergency medical services, rescue operations, or related fields...",
        },
        {
          id: "physical",
          type: "yesNo",
          label: "Are you physically able to perform demanding firefighting and emergency medical tasks?",
          required: true,
        },
        {
          id: "stressHandling",
          type: "longText",
          label: "How do you handle high-stress emergency situations?",
          required: true,
          maxLength: 500,
          placeholder: "Describe your approach to managing stress during critical incidents...",
        },
        {
          id: "availability",
          type: "multiSelect",
          label: "When are you available for shifts?",
          options: ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)", "Night (12AM-6AM)"],
          required: true,
        },
        {
          id: "motivation",
          type: "longText",
          label: "Why do you want to serve with San Andreas Fire & Rescue?",
          required: true,
          maxLength: 500,
          placeholder: "What motivates you to serve the community in emergency services?",
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
        webhookUrl: process.env.DOJ_WEBHOOK_URL || "https://discord.com/api/webhooks/1412893008327868458/JXHIM1spZ-PnQvtktlXyDIGnxSjTVQOn1umZR3ayWlMXRrEFTuNpH-KMAsl0S0U_F7Le",
      },
      questions: [
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
        webhookUrl: process.env.AUTOEXOTIC_WEBHOOK_URL || "https://discord.com/api/webhooks/1412891056277557471/EmVnsKXvezufPaIhF55Fcg5o4bqRGuDjYNy5_xG9iEijzwXeebAghfOMJAXmRyxFN_Ck",
      },
      questions: [
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
        {
          id: "mechanicExperience",
          type: "longText",
          label: "Any previous mechanic experience?",
          required: false,
          maxLength: 500,
          placeholder: "Describe any automotive repair, maintenance, or mechanical work experience you have...",
        },
        {
          id: "favoriteCar",
          type: "shortText",
          label: "Favorite car",
          required: false,
          maxLength: 100,
          placeholder: "What's your favorite car and why?",
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
        webhookUrl: process.env.VANILLA_UNICORN_WEBHOOK_URL || "https://discord.com/api/webhooks/1412892647349162014/SIk4vH_d-5C8VN6xXeBxAB_eOouq8zfRU1Ww1S4pHV9v1sntE91pZ9qopA2zNd1UBaI-",
      },
      questions: [
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
    {
      name: "Benny's Original Motor Works",
      slug: "bennys",
      theme: {
        primary: "#DC2626", // Red
        accent: "#FEF08A", // Yellow
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.BENNYS_WEBHOOK_URL || "https://discord.com/api/webhooks/1412892835958755431/QGPwLLFmwBBh4UdkWOF-TH1qJphO3FDgF-ngHpEB_65Vou0hy5Afcyqk076swyY82oty",
      },
      questions: [
        {
          id: "age",
          type: "number",
          label: "Your age",
          required: true,
          min: 18,
          max: 65,
        },
        {
          id: "position",
          type: "select",
          label: "What position are you applying for?",
          options: ["Mechanic", "Tuner Specialist", "Parts Specialist", "Manager", "Salesperson"],
          required: true,
        },
        {
          id: "experience",
          type: "longText",
          label: "Describe your automotive experience",
          required: true,
          maxLength: 1000,
          placeholder: "Tell us about your experience with cars, mechanics, tuning, or related fields...",
        },
        {
          id: "specialty",
          type: "multiSelect",
          label: "What are your automotive specialties? (select all that apply)",
          options: ["Engine Work", "Transmission", "Suspension", "Brakes", "Electrical", "Body Work", "Paint", "Tuning", "Performance Mods"],
          required: true,
          maxChoices: 5,
        },
        {
          id: "tools",
          type: "yesNo",
          label: "Do you have your own tools?",
          required: true,
        },
        {
          id: "availability",
          type: "multiSelect",
          label: "When are you available to work?",
          options: ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)", "Night (12AM-6AM)"],
          required: true,
        },
        {
          id: "whyBennys",
          type: "longText",
          label: "Why do you want to work at Benny's?",
          required: true,
          maxLength: 500,
          placeholder: "What attracts you to working at Benny's Original Motor Works?",
        },
      ],
    },
    {
      name: "Gun License Application",
      slug: "gun-license",
      theme: {
        primary: "#1E40AF", // Deep blue
        accent: "#3B82F6", // Blue
        foreground: "#FFFFFF",
      },
      target: {
        type: "webhook",
        webhookUrl: process.env.GUN_LICENSE_WEBHOOK_URL || "https://discord.com/api/webhooks/1412986436247883897/JiqnRPojWLGDMH3gbnmidD7L9uunWrQcXjRVsqwTEjtNQEe3sZHg-WC-2aK95JqzRORY",
      },
      questions: [
        {
          id: "age",
          type: "number",
          label: "Character age",
          required: true,
          min: 21,
          max: 80,
          helpText: "Must be 21 or older to apply for a gun license",
        },
        {
          id: "criminalHistory",
          type: "yesNo",
          label: "Do you have any criminal history?",
          required: true,
        },
        {
          id: "felonies",
          type: "yesNo",
          label: "Have you ever been convicted of a felony?",
          required: true,
        },
        {
          id: "criminalExplanation",
          type: "longText",
          label: "If you answered yes to criminal history, please explain",
          required: false,
          maxLength: 500,
          placeholder: "Provide details about your criminal history...",
        },
        {
          id: "gunSafety1",
          type: "select",
          label: "What is the first rule of gun safety?",
          options: [
            "Always keep the gun pointed in a safe direction",
            "Keep your finger on the trigger at all times",
            "Always keep the gun loaded",
            "Point the gun at what you want to destroy"
          ],
          required: true,
        },
        {
          id: "gunSafety2",
          type: "select",
          label: "When should you keep your finger off the trigger?",
          options: [
            "Only when cleaning the gun",
            "Until you are absolutely sure you want to shoot",
            "Only when the gun is unloaded",
            "Never, always keep it on the trigger"
          ],
          required: true,
        },
        {
          id: "selfDefense1",
          type: "select",
          label: "When is it legal to use a firearm in self-defense?",
          options: [
            "Whenever you feel threatened",
            "Only when your life is in immediate danger",
            "When someone insults you",
            "When protecting property only"
          ],
          required: true,
        },
        {
          id: "selfDefense2",
          type: "select",
          label: "What should you do after using a firearm in self-defense?",
          options: [
            "Leave the scene immediately",
            "Call 911 and remain at the scene",
            "Hide the weapon",
            "Continue about your day"
          ],
          required: true,
        },
        {
          id: "trickQuestion1",
          type: "yesNo",
          label: "True or False: It's legal to carry a concealed weapon without a permit",
          required: true,
        },
        {
          id: "trickQuestion2",
          type: "yesNo",
          label: "True or False: You can shoot someone for trespassing on your property",
          required: true,
        },
        {
          id: "trickQuestion3",
          type: "yesNo",
          label: "True or False: Alcohol and firearms can be safely mixed",
          required: true,
        },
        {
          id: "purpose",
          type: "select",
          label: "What is your primary reason for wanting a gun license?",
          options: [
            "Personal protection",
            "Sport/Recreation shooting",
            "Hunting",
            "Collection purposes",
            "Business security"
          ],
          required: true,
        },
        {
          id: "storage",
          type: "select",
          label: "How will you store your firearm when not in use?",
          options: [
            "In a locked gun safe",
            "In a locked case with trigger lock",
            "Hidden somewhere in my house",
            "Under my pillow",
            "In my car"
          ],
          required: true,
        },
        {
          id: "training",
          type: "longText",
          label: "Describe any firearms training or experience you have",
          required: true,
          maxLength: 500,
          placeholder: "Include any military, law enforcement, or civilian training...",
        },
      ],
    },
  ],
};
