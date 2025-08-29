import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function MainNavigation() {
  return (
    <header className="w-full fixed top-0 left-0 z-40 h-[88px] bg-black/70 backdrop-blur flex items-center justify-between px-4 sm:px-8 border-b border-neutral-800">
      <div className="flex items-center gap-8">
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center h-[56px]" aria-label="Palmyra RP">
          <img src="/palmyravector.png" alt="Palmyra RP" className="object-contain" style={{width: '140px', height: '56px', maxWidth: '140px', maxHeight: '56px'}} />
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            {/* City Services */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-lg font-semibold hover:bg-neutral-800 text-white data-[state=open]:bg-neutral-800">
                City Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-neutral-900 text-white">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/departments"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          All Departments
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground text-gray-300">
                          View all city service departments and their information.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/lspd"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-sm font-medium leading-none text-white">LSPD</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-gray-300">
                          Los Santos Police Department
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/lscso"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-sm font-medium leading-none text-white">LSCSO</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-gray-300">
                          Los Santos County Sheriff's Office
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/ems"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-sm font-medium leading-none text-white">EMS</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-gray-300">
                          Emergency Medical Services
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/fire"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-sm font-medium leading-none text-white">Fire</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-gray-300">
                          Fire Department
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Resources */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/resources" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-lg font-semibold hover:bg-neutral-800 text-white")}>
                  Resources
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Businesses */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-lg font-semibold hover:bg-neutral-800 text-white data-[state=open]:bg-neutral-800">
                Businesses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[300px] bg-neutral-900 text-white">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/autoexotic"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-sm font-medium leading-none text-white">Auto Exotic</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-gray-300">
                          Premium automotive services
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {/* Add more businesses here */}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Penal Code */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dojcodes" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-lg font-semibold hover:bg-neutral-800 text-white")}>
                  Penal Code
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Rules */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/rules" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-lg font-semibold hover:bg-neutral-800 text-white")}>
                  Rules
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <a href="https://cfx.re/join/lgv9do" className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 h-12 px-6">
        <Image src="/fivemlogo.png" alt="FiveM" width={24} height={24} className="brightness-0 invert" />
        Connect to Server
      </a>
    </header>
  );
}
