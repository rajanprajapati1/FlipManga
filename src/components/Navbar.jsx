'use client'
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Badge } from "./ui/badge";
import SearchBar from "./SearchBar"
import { useRouter } from "next/navigation"

const navItems = [
  {
    title: "Trending",
    link: "#Trending",
    badge: "New",
  },
  {
    title: "Popular",
    link: "#Popular",
    // badge: "Hot",
  },
  // {
  //   title: "Genres",
  //   link: "/genres",
  //   // badge: "Variety",
  // },
  {
    title: "Latest Releases",
    link: "#latest",
    // badge: "New",
  },
];


export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const HandleDemo = () => {
    router.push(`read/Demon Slayer?id=0acb51ef-3d71-4993-81a0-8cbcfb88fa9e`)
  }
  return (
    <header className="bg-white text-black border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-5">
              {navItems.map((item, index) => (
                <div key={index} className="flex items-center relative">
                  <a href={item.link} className="font-medium">
                    {item.title}
                  </a>
                  {item?.badge && <Badge className={"absolute -top-3 -right-5 text-[11px] px-2 py-0"}>{item.badge}</Badge>}
                </div>
              ))}
            </nav>
          </div>
          <div className="hidden md:flex md:items-center space-x-5">
            <SearchBar />
            <Button  onClick={HandleDemo} >Try it Now ❤️</Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About Us</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Solutions</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Resources</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Pricing</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2">
              <Button className="w-full">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}