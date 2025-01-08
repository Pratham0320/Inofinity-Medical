"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Follow Us Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link
                href="https://www.facebook.com/inofinityrnd"
                target="_blank"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6 hover:text-blue-500 transition-transform transform hover:scale-110" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6 hover:text-blue-400 transition-transform transform hover:scale-110" />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCflNnm0U1MZNv-_qNbrpPDQ"
                target="_blank"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6 hover:text-red-600 transition-transform transform hover:scale-110" />
              </Link>
              <Link
                href="https://www.instagram.com/inofinityrnd/"
                target="_blank"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6 hover:text-pink-500 transition-transform transform hover:scale-110" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/inofinity-rnd-pvt-ltd/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6 hover:text-blue-600 transition-transform transform hover:scale-110" />
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="mailto:info@inofinityrnd.com"
                  className="hover:text-white"
                >
                  Email: info@inofinityrnd.com
                </Link>
              </li>
              <li>
                <div>
                  <Link href="tel:+917978597090" className="hover:text-white">
                    Phone: +91 7978597090
                  </Link>
                </div>
                <div className="pl-14">
                  <Link href="tel:+919439667800" className="hover:text-white">
                    +91 9439667800
                  </Link>
                </div>
              </li>
              <li>
                <span className="hover:text-white">
                  Address: SAI PARADISE-DUPLEX-95, Daruthenga, KISS Rd, Chandaka Industrial Estate, Patia, Bhubaneswar
                </span>
              </li>
            </ul>
          </div>

          {/* Products Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6">Products</h3>
            <ul className="space-y-3 text-gray-400">
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

          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6">About</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/blog"
                  target="_blank"
                  className="hover:text-gray-300 transition-colors"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  target="_blank"
                  className="hover:text-gray-300 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Inofinity Rnd Pvt Ltd. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
