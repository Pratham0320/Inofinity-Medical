'use client'

import React from 'react'
import Link from "next/link"
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Follow Us Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://www.facebook.com/inofinityrnd" target="_blank"  className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Facebook className="h-5 w-5 text-slate-600" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" target="_blank"  className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Twitter className="h-5 w-5 text-slate-600" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.youtube.com/channel/UCflNnm0U1MZNv-_qNbrpPDQ" target="_blank"  className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Youtube className="h-5 w-5 text-slate-600" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="https://www.instagram.com/inofinityrnd/" target="_blank"  className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Instagram className="h-5 w-5 text-slate-600" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.linkedin.com/company/inofinity-rnd-pvt-ltd/" target="_blank"  className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Linkedin className="h-5 w-5 text-slate-600" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Products Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={scrollToTop} 
                  className="hover:text-gray-300 transition-colors"
                >
                  Sanjivani
                </button>
              </li>
              <li>
                <button 
                  onClick={scrollToTop} 
                  className="hover:text-gray-300 transition-colors"
                >
                  Kalamscope
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="https://inofinityrnd.com/index.php/contact/" target="_blank"  
                  className="hover:text-gray-300 transition-colors"
                >
                  Email
                </Link>
              </li>
              <li>
                <Link 
                  href="https://inofinityrnd.com/index.php/contact/" target="_blank"  
                  className="hover:text-gray-300 transition-colors"
                >
                  Contact no
                </Link>
              </li>
              <li>
                <Link 
                  href="https://inofinityrnd.com/index.php/contact/" target="_blank"  
                  className="hover:text-gray-300 transition-colors"
                >
                  Address
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6">About</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="https://inofinityrnd.com/index.php/blog/" target="_blank"  
                  className="hover:text-gray-300 transition-colors"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link 
                  href="https://inofinityrnd.com/index.php/blog/" target="_blank" className="hover:text-gray-300 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-12 pt-8 border-t border-slate-500">
          <p className="text-sm">© Inofinity Rnd Pvt Ltd</p>
          
        </div>
      </div>
    </footer>
  )
}

