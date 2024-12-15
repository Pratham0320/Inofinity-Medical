'use client'

import Image from "next/image"
import Link from "next/link"
import { Search, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'


export function ContactNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform search logic here (e.g., redirect to search results page)
    console.log("Searching for:", searchInput);
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
    variants={navVariants}
    initial="hidden"
    animate="visible"
      className={`fixed top-3 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/20 text-gray-800 h-14 rounded-full shadow-lg backdrop-blur-lg' : 'bg-transparent text-white h-14'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo_PNG.png"
            alt="Inofinity Logo"
            width={isScrolled ? 144 : 192}
            height={isScrolled ? 48 : 64}
            className="h-auto transition-all duration-300"
            priority
          />
        </Link>
        <div className="flex items-center">
          <motion.div
            variants={linkVariants}
            className="hidden md:flex items-center space-x-6"
          >
          <NavLink href="/">HOME</NavLink>
          <NavLink href="/contact">CONTACT</NavLink>
          <NavLink href="/blog">BLOG</NavLink>
          <SearchForm />
          </motion.div>
          <motion.button
              variants={linkVariants}
              className={`md:hidden p-2 rounded-full ${
                isScrolled ? 'text-gray-800 bg-white/20 backdrop-blur-lg hover:bg-white/40' : 'text-white hover:bg-black/20'
              } transition-colors`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </motion.nav>
  )
}

interface NavLinkProps {
href: string
children: React.ReactNode
external?: boolean
onClick?: () => void
className?: string
}


function NavLink({ href, children, external, onClick, className }: NavLinkProps) {
return (
<Link
  href={href}
  className={`relative font-medium py-2 group ${
    external ? 'text-blue-400 hover:text-blue-300' : 'text-white hover:text-yellow-300'
  } ${className}`}
  onClick={onClick}
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
>
  {children}
  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-yellow-300 transform scale-x-0 transition-transform duration-300 ease-out origin-center group-hover:scale-x-100" />
</Link>
)
}

function SearchForm() {
return (
<form className="relative">
  <input
    type="text"
    placeholder="Search..."
    className="pl-8 pr-4 py-2 w-full rounded-full border border-gray-300 bg-white bg-opacity-80 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
  />
  <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-yellow-400">
    <Search className="h-5 w-5" />
  </button>
</form>
)
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
if (!isOpen) return null;

return (
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  className="md:hidden bg-gray-800 text-white py-4 px-4 rounded-lg shadow-lg fixed top-14 left-0 right-0 z-50"
>
  <div className="flex flex-col space-y-4">
    <NavLink href="/" onClick={() => { onClose(); }} className="text-white hover:text-yellow-300">HOME</NavLink>
    <NavLink href="/contact" onClick={onClose}>CONTACT US</NavLink>
    <NavLink href="/blog" onClick={onClose} className="text-white hover:text-yellow-300">BLOG</NavLink>
    <SearchForm />
  </div>
</motion.div>
);
}

