'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Menu, X, Facebook, Twitter, Youtube, Instagram, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { usePathname } from 'next/navigation';
import { blogsData } from '@/app/blogs-data';


interface BlogPost {
id: string;
title: string;
description: string;
image: string;
content: string;
slug: string;
date: string;
}

export default function BlogPage() {
const [searchQuery, setSearchQuery] = useState('');
const [isScrolled, setIsScrolled] = useState(false);
const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const pathname = usePathname();
const backToTopRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);
    if (scrollPosition > 300) {
      if (backToTopRef.current) backToTopRef.current.style.display = 'block';
    } else {
      if (backToTopRef.current) backToTopRef.current.style.display = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const handleOpenPost = (post: BlogPost) => {
  setSelectedPost(post);
  setIsModalOpen(true);
};

const handleClosePost = () => {
  setSelectedPost(null);
  setIsModalOpen(false);
};

const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Perform search logic here (e.g., redirect to search results page)
  console.log("Searching for:", searchQuery);
}

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

return (
<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
  {/* Navigation */}
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
          src="/images/cropped-inofinity_logo-1 (1).png"
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
          <SearchForm value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onSubmit={handleSearchSubmit} />
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

  {/* Hero Section */}
  <section className="relative h-[40vh] min-h-[400px] w-full mt-14"> {/* Added margin-top */}
    <Image src="/images/Blog/hero.png" alt="Hero Image" fill className="object-cover" priority />
    <div className="absolute inset-0 bg-black/50" />
    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
      <div className="container px-4">
        <motion.h1
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Insights in Medical Technology
        </motion.h1>
        <motion.p
          className="mb-8 text-lg text-gray-200 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Stay informed about the latest advancements and breakthroughs in medical technology.
        </motion.p>
      </div>
    </div>
  </section>

  {/* Our Latest Blogs */}
  <section className="py-16 sm:py-24 bg-slate-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Latest Blogs</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogsData.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={`Thumbnail for ${post.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-gray-500">{post.date}</p>
              </CardHeader>
              <CardContent>
                <CardDescription>{post.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.slug}`} legacyBehavior>
                  <Button variant="outline" className="hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                    Read More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

  {/* Back to Top Button */}
  <button
    ref={backToTopRef}
    onClick={handleScrollToTop}
    className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hidden"
  >
    Back to Top
  </button>

  {/* Footer */}
  <footer className="bg-slate-900 text-white py-12 mt-16"> {/* Added margin-top */}
    <div className="container mx-auto px-40">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Follow Us Section */}
  <div className="mt-12">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Follow Us</h3>
    <div className="flex justify-center space-x-6">
      <Link
        href="https://www.facebook.com/inofinityrnd"
        target="_blank"
        className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
      >
        <Facebook className="h-6 w-6 text-blue-600" />
        <span className="sr-only">Facebook</span>
      </Link>
      <Link
        href="https://twitter.com"
        target="_blank"
        className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
      >
        <Twitter className="h-6 w-6 text-blue-600" />
        <span className="sr-only">Twitter</span>
      </Link>
      <Link
        href="https://www.youtube.com/channel/UCflNnm0U1MZNv-_qNbrpPDQ"
        target="_blank"
        className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
      >
        <Youtube className="h-6 w-6 text-red-600" />
        <span className="sr-only">YouTube</span>
      </Link>
      <Link
        href="https://www.instagram.com/inofinityrnd/"
        target="_blank"
        className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
      >
        <Instagram className="h-6 w-6 text-pink-600" />
        <span className="sr-only">Instagram</span>
      </Link>
      <Link
        href="https://www.linkedin.com/company/inofinity-rnd-pvt-ltd/"
        target="_blank"
        className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
      >
        <Linkedin className="h-6 w-6 text-blue-600" />
        <span className="sr-only">LinkedIn</span>
      </Link>
    </div>
  </div>
  {/* Copyright Section */}
  <div className="text-center mt-12 pt-8 border-t border-slate-500">
          <p className="text-md">© Inofinity Rnd Pvt Ltd</p>
          
        </div>
      </div>
    </div>
  </footer>
</div>
);
}

function NavLink({ href, children, external, onClick, className }: { href: string; children: React.ReactNode; external?: boolean; onClick?: () => void; className?: string }) {
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

function SearchForm({ value, onChange, onSubmit }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
return (
  <form onSubmit={onSubmit} className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="pl-8 pr-4 py-2 w-full rounded-full border border-gray-300 bg-white bg-opacity-80 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
      value={value}
      onChange={onChange}
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
      <SearchForm value={""} onChange={() => {}} onSubmit={() => {}} />
    </div>
  </motion.div>
);
}

