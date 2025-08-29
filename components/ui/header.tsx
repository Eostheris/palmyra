import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
  <header className="w-full fixed top-0 left-0 z-40 h-[88px] bg-black/70 backdrop-blur flex items-center justify-between px-4 sm:px-8 border-b border-neutral-800">
      <div className="flex items-center gap-8">
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center h-[56px]" aria-label="Palmyra RP">
          <img src="/palmyravector.png" alt="Palmyra RP" className="object-contain" style={{width: '140px', height: '56px', maxWidth: '140px', maxHeight: '56px'}} />
        </Link>
        <nav className="flex gap-6">
          {/* City Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-lg font-semibold hover:bg-neutral-800 cursor-pointer">City Services</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-900 text-white">
              <DropdownMenuItem><a href="/departments">All Departments</a></DropdownMenuItem>
              <DropdownMenuItem><a href="/lspd">LSPD</a></DropdownMenuItem>
              <DropdownMenuItem><a href="/lscso">LSCSO</a></DropdownMenuItem>
              <DropdownMenuItem><a href="/ems">EMS</a></DropdownMenuItem>
              <DropdownMenuItem><a href="/fire">Fire</a></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Resources Tab */}
          <Link href="/resources" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-lg font-semibold hover:bg-neutral-800 transition-colors">Resources</Link>
          {/* Businesses Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-lg font-semibold hover:bg-neutral-800 cursor-pointer">Businesses</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-900 text-white">
              <DropdownMenuItem><a href="/autoexotic">Auto Exotic</a></DropdownMenuItem>
              {/* Add more businesses here */}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Penal Code Tab */}
          <Link href="/dojcodes" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-lg font-semibold hover:bg-neutral-800 transition-colors">Penal Code</Link>
          {/* Rules Tab */}
          <Link href="/rules" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-transparent px-4 py-2 text-lg font-semibold hover:bg-neutral-800 transition-colors">Rules</Link>
        </nav>
      </div>
      <a href="https://cfx.re/join/lgv9do" className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 h-12 px-6">
        <Image src="/fivemlogo.png" alt="FiveM" width={24} height={24} className="brightness-0 invert" />
        Connect to Server
      </a>
    </header>
  );
}
