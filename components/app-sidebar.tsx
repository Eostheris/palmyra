import { 
  HelpCircle, 
  Gamepad2, 
  Briefcase, 
  Building, 
  Users, 
  Shield,
  Car,
  MapPin,
  ShieldCheck,
  ChevronDown
} from "lucide-react"
import { useState } from "react"

// Menu items grouped by category
const menuGroups = [
  {
    title: "Getting Started",
    items: [
      { title: "FAQ", url: "#faq", icon: HelpCircle },
      { title: "Controls & Keybinds", url: "#controls", icon: Gamepad2 },
    ]
  },
  {
    title: "Legal & Safety",
    items: [
      { title: "Gun License", url: "#licenses", icon: Shield },
      { title: "Public Safety", url: "#contacts", icon: ShieldCheck },
    ]
  },
  {
    title: "Economy & Careers",
    items: [
      { title: "Jobs", url: "#jobs", icon: Briefcase },
      { title: "Businesses", url: "#businesses", icon: Building },
    ]
  },
  {
    title: "Community",
    items: [
      { title: "Gangs", url: "#gangs", icon: Users },
      { title: "Vehicles", url: "#vehicles", icon: Car },
      { title: "Locations", url: "#locations", icon: MapPin },
    ]
  }
]

interface AppSidebarProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function AppSidebar({ activeCategory, onCategoryChange }: AppSidebarProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(menuGroups.map(group => group.title)) // All sections open by default
  );

  const toggleSection = (sectionTitle: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionTitle)) {
      newOpenSections.delete(sectionTitle);
    } else {
      newOpenSections.add(sectionTitle);
    }
    setOpenSections(newOpenSections);
  };

  return (
    <div className="border-r border-white/10 bg-black/60 shadow-lg backdrop-blur-md fixed lg:block hidden" style={{top:'var(--header-h)', left:0, width:256, height:`calc(100vh - var(--header-h))`, zIndex:20, overflowY:'auto'}}>
      <div className="bg-transparent p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6 px-2 sm:px-3 py-2 sm:py-3 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
          Player Resources
        </div>

        {/* Menu Groups */}
        {menuGroups.map((group) => {
          const isOpen = openSections.has(group.title);
          return (
            <div key={group.title} className="space-y-1 sm:space-y-2">
              {/* Section Header */}
              <button 
                onClick={() => toggleSection(group.title)}
                className="flex w-full items-center justify-between text-white/90 hover:text-white text-sm sm:text-base font-semibold py-2 sm:py-3 px-2 sm:px-3 bg-black/20 backdrop-blur-sm rounded-lg transition-all duration-200 hover:bg-black/30 border border-white/5"
              >
                <span>{group.title}</span>
                <ChevronDown 
                  className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Section Items */}
              {isOpen && (
                <div className="space-y-1 ml-1 sm:ml-2">
                  {group.items.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => onCategoryChange?.(item.url.substring(1))}
                      className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 text-left rounded-md transition-all duration-200 ${
                        activeCategory === item.url.substring(1) 
                          ? 'bg-white/10 text-white border border-white/20' 
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <item.icon size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">{item.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}