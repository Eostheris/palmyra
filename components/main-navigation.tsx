'use client'

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import DiscordLoginButton from "./discord-login-button";
import UserDashboard from "./user-dashboard";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function MainNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('discord_user')
    setIsLoggedIn(!!savedUser)
  }, [])

  return (
    <header className="w-full fixed top-0 left-0 z-40 h-[64px] sm:h-[88px] bg-black/70 backdrop-blur flex items-center justify-between px-3 sm:px-4 lg:px-8 border-b border-neutral-800">
      <div className="flex items-center gap-2 sm:gap-8">
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center h-[40px] sm:h-[56px]" aria-label="Palmyra RP">
          <Image 
            src="/palmyravector.png" 
            alt="Palmyra RP" 
            width={120} 
            height={60} 
            className="sm:hidden object-contain" 
            style={{maxWidth: '120px', maxHeight: '60px'}} 
          />
          <Image 
            src="/palmyravector.png" 
            alt="Palmyra RP" 
            width={180} 
            height={90} 
            className="hidden sm:block object-contain" 
            style={{maxWidth: '180px', maxHeight: '90px'}} 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {/* City Services */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-base lg:text-lg font-semibold hover:bg-neutral-800 text-white data-[state=open]:bg-neutral-800">
                City Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 sm:p-6 w-[300px] sm:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-neutral-900 text-white">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 sm:p-6 no-underline outline-none focus:shadow-md"
                        href="/departments"
                      >
                        <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                          <Image 
                            src="/doj2.png" 
                            alt="Department of Justice" 
                            width={80}
                            height={80}
                            className="sm:w-[120px] sm:h-[120px] object-contain opacity-90"
                          />
                          <div>
                            <div className="text-base sm:text-lg font-medium text-white">
                              All Departments
                            </div>
                            <p className="text-xs sm:text-sm leading-tight text-muted-foreground text-gray-300">
                              View all city service departments and their information.
                            </p>
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/lspd"
                        className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-xs sm:text-sm font-medium leading-none text-white">LSPD</div>
                        <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground text-gray-300">
                          Los Santos Police Department
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/lscso"
                        className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-xs sm:text-sm font-medium leading-none text-white">LSCSO</div>
                        <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground text-gray-300">
                          Los Santos County Sheriff&apos;s Office
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/safr"
                        className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-xs sm:text-sm font-medium leading-none text-white">SAFR</div>
                        <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground text-gray-300">
                          San Andreas Fire & Rescue
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
                <Link href="/resources" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-base lg:text-lg font-semibold hover:bg-neutral-800 text-white")}>
                  Resources
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Businesses */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-base lg:text-lg font-semibold hover:bg-neutral-800 text-white data-[state=open]:bg-neutral-800">
                Businesses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 sm:p-6 w-[250px] sm:w-[300px] bg-neutral-900 text-white">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/autoexotic"
                        className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-xs sm:text-sm font-medium leading-none text-white">Auto Exotic</div>
                        <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground text-gray-300">
                          Premium automotive services
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/vanilla-unicorn"
                        className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-xs sm:text-sm font-medium leading-none text-white">Vanilla Unicorn</div>
                        <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground text-gray-300">
                          Adult entertainment venue
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/bennys"
                        className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-800"
                      >
                        <div className="text-xs sm:text-sm font-medium leading-none text-white">Benny&apos;s Motor Works</div>
                        <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground text-gray-300">
                          Custom automotive garage
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
                <Link href="/dojcodes" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-base lg:text-lg font-semibold hover:bg-neutral-800 text-white")}>
                  Penal Code
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Rules */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/rules" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-base lg:text-lg font-semibold hover:bg-neutral-800 text-white")}>
                  Rules
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-neutral-800">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-neutral-900 border-neutral-800">
            <SheetHeader>
              <SheetTitle className="text-white text-left">Navigation</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-white font-semibold text-sm">City Services</h3>
                <div className="space-y-1 ml-4">
                  <Link href="/lspd" className="block text-white/80 hover:text-white py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    LSPD
                  </Link>
                  <Link href="/lscso" className="block text-white/80 hover:text-white py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    LSCSO
                  </Link>
                  <Link href="/safr" className="block text-white/80 hover:text-white py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    SAFR
                  </Link>
                  <Link href="/departments" className="block text-white/80 hover:text-white py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    All Departments
                  </Link>
                </div>
              </div>
              
              <Link href="/resources" className="block text-white hover:text-white/80 py-2 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                Resources
              </Link>
              
              <div className="space-y-2">
                <h3 className="text-white font-semibold text-sm">Businesses</h3>
                <div className="space-y-1 ml-4">
                  <Link href="/autoexotic" className="block text-white/80 hover:text-white py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Auto Exotic
                  </Link>
                  <Link href="/vanilla-unicorn" className="block text-white/80 hover:text-white py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Vanilla Unicorn
                  </Link>
                  <Link href="/bennys" className="block text-white/80 hover:text-white py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Benny&apos;s Motor Works
                  </Link>
                </div>
              </div>
              
              <Link href="/dojcodes" className="block text-white hover:text-white/80 py-2 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                Penal Code
              </Link>
              
              <Link href="/rules" className="block text-white hover:text-white/80 py-2 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                Rules
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {isLoggedIn ? <UserDashboard /> : <DiscordLoginButton />}
        <a href="https://cfx.re/join/lgv9do" className="inline-flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap rounded-lg text-xs sm:text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 h-8 sm:h-12 px-3 sm:px-6">
          <Image src="/fivemlogo.png" alt="FiveM" width={16} height={16} className="sm:w-[24px] sm:h-[24px] brightness-0 invert" />
          <span className="hidden sm:inline">Connect to Server</span>
          <span className="sm:hidden">Connect</span>
        </a>
      </div>
    </header>
  );
}
