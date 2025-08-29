import { 
  HelpCircle, 
  Gamepad2, 
  FileText, 
  Briefcase, 
  Building, 
  Users, 
  Shield,
  Car,
  MapPin,
  Phone,
  ChevronDown,
  BookOpen,
  Settings
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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
      { title: "Emergency Contacts", url: "#contacts", icon: Phone },
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
  return (
    <Sidebar className="border-r border-white/10 bg-transparent fixed top-20 left-0 h-[calc(100vh-5rem)] z-20">
      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-xl font-bold mb-4 px-2 bg-black/20 backdrop-blur-sm rounded-lg py-2">
            Player Resources
          </SidebarGroupLabel>
        </SidebarGroup>
        
        {menuGroups.map((group, groupIndex) => (
          <Collapsible key={group.title} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between text-white/90 hover:text-white text-base font-semibold py-2 px-2 bg-black/20 backdrop-blur-sm rounded-lg mb-2">
                  {group.title}
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild
                          isActive={activeCategory === item.url.substring(1)}
                          className="text-white/70 hover:text-white hover:bg-white/10 data-[active=true]:bg-transparent data-[active=true]:text-white py-3 rounded-md mx-1"
                        >
                          <button
                            onClick={() => onCategoryChange?.(item.url.substring(1))}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left"
                          >
                            <item.icon size={18} />
                            <span className="text-sm font-medium">{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
